#!/usr/bin/env node
/**
 * Compress ALL images (public + src/assets) to WebP for faster loading.
 * Run: npm run compress:images
 */

import sharp from 'sharp'
import { stat, readdir } from 'fs/promises'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const MAX_WIDTH = 1920
const WEBP_QUALITY = 82
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg'])

async function* walkDir(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
        yield* walkDir(full)
      } else if (e.isFile()) {
        const ext = (e.name.match(/\.[^.]+$/) || [])[0]?.toLowerCase()
        if (IMAGE_EXTS.has(ext)) yield full
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }
}

async function compressOne(inputPath) {
  const ext = (inputPath.match(/\.[^.]+$/) || [])[0]?.toLowerCase()
  if (!IMAGE_EXTS.has(ext)) return null
  const outPath = inputPath.replace(/\.[^.]+$/, '.webp')
  if (outPath === inputPath) return null
  try {
    const info = await stat(inputPath)
    const sizeBeforeMB = (info.size / 1024 / 1024).toFixed(2)
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath)
    const outInfo = await stat(outPath)
    const sizeAfterMB = (outInfo.size / 1024 / 1024).toFixed(2)
    const saved = ((1 - outInfo.size / info.size) * 100).toFixed(0)
    return { inputPath, outPath, name: basename(inputPath), sizeBeforeMB, sizeAfterMB, saved }
  } catch (err) {
    console.error(`  Error: ${inputPath}:`, err.message)
    return null
  }
}

async function main() {
  const dirs = [
    join(ROOT, 'public', 'assets', 'images'),
    join(ROOT, 'public', 'logos'),
    join(ROOT, 'src', 'assets'),
  ]
  const results = []
  for (const dir of dirs) {
    console.log(`\nProcessing ${dir.replace(ROOT, '')}...`)
    for await (const fp of walkDir(dir)) {
      const r = await compressOne(fp)
      if (r) {
        results.push(r)
        console.log(`  ${r.name}: ${r.sizeBeforeMB} MB → ${r.sizeAfterMB} MB (${r.saved}% smaller)`)
      }
    }
  }
  console.log(`\nDone! Compressed ${results.length} images to WebP.`)
  console.log('Update import paths from .png/.jpg to .webp in your components.')
  return results
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
