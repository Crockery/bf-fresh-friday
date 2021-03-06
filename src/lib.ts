import snoowrap from 'snoowrap'
import { compareTwoStrings } from 'string-similarity'
import uniqWith from 'lodash/uniqWith'
import fs from 'fs'
import path from 'path'
import SpotifyWebApi from 'spotify-web-api-node'

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} from './etc/conf'

import { daysSince } from './helpers'

const reddit = new snoowrap({
  refreshToken: REFRESH_TOKEN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  userAgent: '100gecs'
})

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
})

const sub = reddit.getSubreddit('hiphopheads')

export const getAllPosts = (query: string, excludeTerms: string[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    sub.search({
      query: `title:"${query}"`,
      time: 'week',
      sort: 'new'
    }).then(res => res.fetchMore({
      skipReplies: true,
      append: true,
      amount: 250
    })).then(res => {
      const posts = res
        .filter(post => {
          const since = daysSince(post.created)
          return since < 7
        })
        .filter(post => post.ups > 5)
        .sort((a, b) => b.ups - a.ups)
        .map(post => post.title)
        .filter(title => !title.toLowerCase().includes(excludeTerms[0].toLowerCase()) &&
          !title.toLowerCase().includes(excludeTerms[1].toLowerCase()) &&
          title.toLowerCase().includes(query.toLowerCase())
        )

      resolve(uniqWith(posts, (a, b) => {
        const similarity = compareTwoStrings(a, b)
        if (similarity > 0.85) console.log(a, b)
        return similarity > 0.85
      }))
    }).catch(e => reject(e))
  })
}

export const getSpotifyData = async () => {
  const data = await spotify.getNewReleases({
    country: 'CA',
    limit: 80
  }).then(_data => {
    console.log(_data.body)
    return _data
  })
  console.log(data)
}

export const writeList = (songs, albums, videos): Promise<any> => {
  const targetFile = path.resolve(__dirname, './posts/post.txt')

  return new Promise((res, rej) => {
    const stream = fs.createWriteStream(targetFile, { encoding: 'utf8', flags: 'w' })
    stream.write(`[FRESH MUSIC FRIDAY]

Here are the albums, singles that dropped this week.

If you're releasing some music, or know someone who is and want it included in this post, please do DM me! Otherwise feel free to drop it in the comments.

𝕮𝖆𝖓𝖆𝖉𝖆
[ᴀʟʙᴜᴍs]

[sɪɴɢʟᴇs]

𝕿𝖍𝖊 𝖀.𝕶.
[ᴀʟʙᴜᴍs]

[sɪɴɢʟᴇs]

𝕿𝖍𝖊 𝕽𝖊𝖘𝖙
[ᴀʟʙᴜᴍs]

[sɪɴɢʟᴇs]

[ALBUMS]
${albums.join(`\r\n`)}

[SINGLES]
${songs.join(`\r\n`)}

[VIDEOS]
${videos.join(`\r\n`)}
`)
    stream.on('finish', res)
  })
}
