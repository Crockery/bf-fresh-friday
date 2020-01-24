import snoowrap from 'snoowrap'
import { compareTwoStrings } from 'string-similarity'
import uniqWith from 'lodash/uniqWith'

import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from './etc/conf'

import { daysSince } from './helpers'

const r = new snoowrap({
  refreshToken: REFRESH_TOKEN,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  userAgent: '100gecs'
})

const sub = r.getSubreddit('hiphopheads')

export const getAllPosts = (query: string, excludeTerms: string[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    sub.search({
      query,
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
        .map(post => post.title)
        .filter(title => !title.includes(excludeTerms[0]) && !title.includes(excludeTerms[1]))

      resolve(uniqWith(posts, (a, b) => {
        const similarity = compareTwoStrings(a, b)
        if (similarity > 0.8) console.log(a, b)
        return similarity > 0.8
      }))
    }).catch(e => reject(e))
  })
}
