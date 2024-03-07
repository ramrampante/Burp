#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import process from 'node:process'

const README_FILE_NAME = new URL('../README.md', import.meta.url)

const readme = await fs.open(README_FILE_NAME, 'r+')
const readmeContent = await readme.readFile()

const githubcontrib = spawn('npx', [
  'githubcontrib',
  '--owner', 'transloadit',
  '--repo', 'Burp',
  '--cols', '6',
  '--format', 'md',
  '--showlogin', 'true',
  '--sortOrder', 'desc',
], {
  stdio: ['ignore', 'pipe', 'inherit'],
})

githubcontrib.on('error', console.error)

const START_TAG = Buffer.from('<!--contributors-->\n')
const START_TAG_POSITION = readmeContent.indexOf(START_TAG) + START_TAG.byteLength

let cursor = START_TAG_POSITION
for await (const data of githubcontrib.stdout) {
  const { bytesWritten } = await readme.write(data.toString('utf-8'), cursor, 'utf-8')
  cursor += bytesWritten
}

if (cursor === START_TAG_POSITION) {
  console.log('Empty response from githubcontrib. GitHub’s rate limit?')
  await readme.close()
  process.exit(1)
}

await readme.write(
  readmeContent,
  readmeContent.indexOf('<!--/contributors-->'),
  undefined,
  cursor,
)
await readme.close()
