import { getRedditData } from '../lib/reddit'
import { writeData } from '../lib/post'
import { getSpotifyData } from '../lib/spotify'

import { formatTitle, redditDataToNameAndArtist } from '../helpers'
import { write } from 'fs'

async function run() {
  try {
    let { tracks, albums } = await getRedditData()

    tracks = tracks.map(formatTitle)
    albums = albums.map(formatTitle)
    
    await writeData(tracks, albums)

    // const singlesData = redditDataToNameAndArtist(tracks, false)
    // const albumData = redditDataToNameAndArtist(albums, true)
    // await writeList(singles, albums)

    // await getSpotifyData()

  } catch (e) {
    console.log(e)
  }
}

run()
  .then(() => {
    console.log('done!')
  })
  .catch(e => console.log(e))
