const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssLogical = require('postcss-logical')
const postcssDirPseudoClass = require('postcss-dir-pseudo-class')
const cssnano = require('cssnano')
const { promisify } = require('node:util')
const fs = require('node:fs')
const path = require('node:path')
const resolve = require('resolve')
const glob = promisify(require('glob'))

const renderScss = promisify(sass.render)
const { mkdir, writeFile } = fs.promises

const cwd = process.cwd()
let chalk

function handleErr (err) {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
}

async function compileCSS () {
  ({ default:chalk } = await import('chalk'))
  const files = await glob('packages/{,@Burp/}*/src/style.scss')

  for (const file of files) {
    const importedFiles = new Set()
    const scssResult = await renderScss({
      file,
      importer (url, from, done) {
        resolve(url, {
          basedir: path.dirname(from),
          filename: from,
          extensions: ['.scss'],
        }, (err, resolved) => {
          if (err) {
            done(err)
            return
          }

          const realpath = fs.realpathSync(resolved)

          if (importedFiles.has(realpath)) {
            done({ contents: '' })
            return
          }
          importedFiles.add(realpath)

          done({ file: realpath })
        })
      },
    })

    const plugins = [
      autoprefixer,
      postcssLogical(),
      postcssDirPseudoClass(),
    ]
    const postcssResult = await postcss(plugins)
      .process(scssResult.css, { from: file })
    postcssResult.warnings().forEach((warn) => {
      console.warn(warn.toString())
    })

    const outputDir = path.join(path.dirname(file), '../dist')
    let outfile = path.join(outputDir, 'style.css')
    if (outputDir.includes(path.normalize('packages/Burp/'))) {
      outfile = path.join(outputDir, 'Burp.css')
    }
    await mkdir(outputDir, { recursive: true })
    await writeFile(outfile, postcssResult.css)
    console.info(
      chalk.green(' Built Burp CSS:'),
      chalk.magenta(path.relative(cwd, outfile)),
    )

    const minifiedResult = await postcss([
      cssnano({ safe: true }),
    ]).process(postcssResult.css, { from: outfile })
    minifiedResult.warnings().forEach((warn) => {
      console.warn(warn.toString())
    })
    await writeFile(outfile.replace(/\.css$/, '.min.css'), minifiedResult.css)
    console.info(
      chalk.green('Minified Bundle CSS:'),
      chalk.magenta(path.relative(cwd, outfile).replace(/\.css$/, '.min.css')),
    )
  }
}

compileCSS().then(() => {
  console.info(chalk.yellow('CSS Bundles OK'))
}, handleErr)
