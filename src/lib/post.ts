import fs from 'fs'
import path from 'path'

export const writeList = (songs, albums): Promise<any> => {
  const targetFile = path.resolve(__dirname, './posts/post.txt')

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

export const postToArray = (): Promise<string[]> => {
  const targetFile = path.resolve(__dirname, './posts/post.txt')
  return new Promise((res, rej) => {
    const stream = fs.createReadStream(targetFile)
    return []
  })
}
