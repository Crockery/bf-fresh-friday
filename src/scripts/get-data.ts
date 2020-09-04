import { getRedditData } from '../lib/reddit'
import { writeList } from '../lib/post'
import { getSpotifyData } from '../lib/spotify'

import { formatTitle, redditDataToNameAndArtist } from '../helpers'

async function run() {
  try {
    let { tracks, albums } = await getRedditData()

    tracks = tracks.map(formatTitle)
    albums = albums.map(formatTitle)

    console.log(tracks)

    const singlesData = redditDataToNameAndArtist(tracks, false)
    const albumData = redditDataToNameAndArtist(albums, true)

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
