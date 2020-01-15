import snoowrap from 'snoowrap'

import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from '../etc/conf'

async function run() {
  console.log('hello!')
  try {
    // Create the snoowrap instance
    const r = new snoowrap({
      refreshToken: REFRESH_TOKEN,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      userAgent: '100gecs'
    })

    // Get the subreddit
    const sub = r.getSubreddit('hiphopheads')

    // Cant use async/await bc this library is typed weird.
    // See: https://github.com/not-an-aardvark/snoowrap/issues/221
    const data = await new Promise<string[]>((resolve, rej) => {
      sub.search({
        query: 'title:"[FRESH]"',
        time: 'week',
        sort: 'new'
      }).then(res => resolve(res.map(post => post.title)))
    })

    console.log(data, data.length)
  } catch (e) {
    console.log(e)
  }

}

run()
  .then(() => {
    console.log('done!')
  })
  .catch(e => console.log(e))
