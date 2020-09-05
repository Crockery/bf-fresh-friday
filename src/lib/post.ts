import fs from 'fs'
import path from 'path'

export const writeList = (songs, albums): Promise<any> => {
  const targetFile = path.resolve(__dirname, '../data/post.txt')

  return new Promise((res, rej) => {
    const stream = fs.createWriteStream(targetFile, { encoding: 'utf8', flags: 'w' })
    stream.write(`[FRESH MUSIC FRIDAY]

Here are the albums, singles that dropped this week.

If you're releasing some music, or know someone who is and want it included in this post, please do DM me! Otherwise feel free to drop it in the comments.

[ALBUMS]
${albums.join(`\r\n`)}

[SINGLES]
${songs.join(`\r\n`)}
`)
    stream.on('finish', res)
  })
}

export const writeData = (singles: string[], albums: string[]): Promise<any> => {
  const targetFile = path.resolve(__dirname, '../data/data.json')

  return new Promise((res, rej) => {
    const stream = fs.createWriteStream(targetFile, { encoding: 'utf8', flags: 'w' })
    stream.write(`{
"singles": [
  ${singles.map((single, i) => {
    const dontUseComma = i === (singles.length - 1)
    return `"${single.replace(/"/g, "'")}"${dontUseComma ? '' : ','}`
  }).join(`\r\n`)}
],
"albums": [
  ${albums.map((album, i) => {
    const dontUseComma = i === (albums.length - 1)
    return `"${album.replace(/"/g, "'")}"${dontUseComma ? '' : ','}`
  }).join(`\r\n`)}
]
}`)
    stream.on('finish', res)
    stream.on('error', rej)
  })
}
