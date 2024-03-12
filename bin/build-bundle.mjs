#!/usr/bin/env node

import esbuild from 'esbuild'
import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import babel from 'esbuild-plugin-babel'

const Burp_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', Burp_ROOT)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./@Burp/locales/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./Burp/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/Burp/bundle.mjs',
    './packages/Burp/dist/Burp.min.js',
    { standalone: 'Burp', format: 'iife' },
  ),
  buildBundle(
    './packages/Burp/bundle-legacy.mjs',
    './packages/Burp/dist/Burp.legacy.min.js',
    {
      standalone: 'Burp (with poly)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
  buildBundle(
    './packages/Burp/index.mjs',
    './packages/Burp/dist/Burp.min.mjs',
    { standalone: 'Burp (ESM)', format: 'esm' },
  ),
]

const localesModules = await fs.opendir(new URL('./@Burp/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@Burp/locales/src/${localeName}.js`,
        `./packages/@Burp/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

// Add BUNDLE-README.MD
methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', Burp_ROOT),
    new URL('./Burp/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
