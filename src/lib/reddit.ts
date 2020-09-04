import snoowrap from 'snoowrap'
import uniqWith from 'lodash/uniqWith'
import { compareTwoStrings } from 'string-similarity'

import { daysSince } from '../helpers'

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN
} from '../etc/conf'

const reddit = new snoowrap({
  refreshToken: REFRESH_TOKEN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  userAgent: '100gecs'
})

const hiphopheads = reddit.getSubreddit('hiphopheads')
const popheads = reddit.getSubreddit('popheads')
const indieheads = reddit.getSubreddit('indieheads')
const pcmusic = reddit.getSubreddit('pcmusic')

interface SubRedditResponse {
  tracks: snoowrap.Submission[],
  albums: snoowrap.Submission[]
}

const getTracks = (sub: snoowrap.Subreddit): Promise<snoowrap.Submission[]> => {
  return new Promise((resolve, reject) => {
    sub.search({
      query: `title:"[FRESH]"`,
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
        .filter(post => !post.title.toLowerCase().includes('video') &&
          !post.title.toLowerCase().includes('album') &&
          post.title.toLowerCase().includes('[fresh]')
        )
        
      resolve(posts)
      // resolve(uniqWith(posts, (a, b) => {
      //   const similarity = compareTwoStrings(a, b)
      //   if (similarity > 0.85) console.log(a, b)
      //   return similarity > 0.85
      // }))

    }).catch(e => reject(e))
  })
}

const getAlbums = (sub: snoowrap.Subreddit): Promise<snoowrap.Submission[]> => {
  return new Promise((resolve, reject) => {
    sub.search({
      query: `title:"[FRESH ALBUM]"`,
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
        .filter(post => !post.title.toLowerCase().includes('video') &&
          !post.title.toLowerCase().includes('[fresh]') &&
          post.title.toLowerCase().includes('[fresh album]')
        )
        
      resolve(posts)
      // resolve(uniqWith(posts, (a, b) => {
      //   const similarity = compareTwoStrings(a, b)
      //   if (similarity > 0.85) console.log(a, b)
      //   return similarity > 0.85
      // }))
      //.sort((a, b) => b.ups - a.ups)

    }).catch(e => reject(e))
  })
}

const getHipHopHeads = async (): Promise<SubRedditResponse> => {
  const tracks = await getTracks(hiphopheads)
  const albums = await getAlbums(hiphopheads)
  return { tracks, albums }
}

const getPopHeads = async (): Promise<SubRedditResponse> => {
  const tracks = await getTracks(popheads)
  const albums = await getAlbums(popheads)
  return { tracks, albums }
}

const getIndieHeads = async (): Promise<SubRedditResponse> => {
  const tracks = await getTracks(indieheads)
  const albums = await getAlbums(indieheads)
  return { tracks, albums }
}

const getPcMusic = async (): Promise<SubRedditResponse> => {
  const tracks = await getTracks(pcmusic)
  const albums = await getAlbums(pcmusic)
  return { tracks, albums }
}

export const getRedditData = async (): Promise<{ tracks: string[], albums: string[] }> => {
  const { tracks: hhhTracks, albums: hhhAlbums } = await getHipHopHeads()
  const { tracks: popheadsTracks, albums: popheadsAlbums } = await getPopHeads()
  const { tracks: indieheadsTracks, albums: indieheadsAlbums } = await getIndieHeads()
  const { tracks: pcmusicTracks, albums: pcmusicAlbums } = await getPcMusic()

  const combinedTracks: string[] = [
    ...hhhTracks,
    ...popheadsTracks,
    ...indieheadsTracks,
    ...pcmusicTracks
  ].sort((a, b) => b.ups - a.ups)
  .map(track => track.title)

  const tracks = uniqWith(combinedTracks, (a, b) => {
    const similarity = compareTwoStrings(a, b)
    if (similarity > 0.85) console.log(a, b)
    return similarity > 0.85
  })

  const combinedAlbums: string[] = [
    ...hhhAlbums,
    ...popheadsAlbums,
    ...indieheadsAlbums,
    ...pcmusicAlbums
  ].sort((a, b) => b.ups - a.ups)
  .map(track => track.title)

  const albums = uniqWith(combinedAlbums, (a, b) => {
    const similarity = compareTwoStrings(a, b)
    if (similarity > 0.85) console.log(a, b)
    return similarity > 0.85
  })

  return { tracks, albums }
}
