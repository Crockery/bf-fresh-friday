import { getAllPosts } from '../lib'

async function run() {
  try {
    const freshSingles = await getAllPosts('title:"[FRESH]"', ['VIDEO', 'ALBUM'])
    const freshAlbums = await getAllPosts('title:"[FRESH ALBUM]"', ['VIDEO', '[FRESH]'])
    const freshVideos = await getAllPosts('title:"[FRESH VIDEO]"', ['ALBUM', '[FRESH]'])

    console.log({
      videos: freshVideos.length,
      singles: freshSingles.length,
      albums: freshAlbums.length
    })
  } catch (e) {
    console.log(e)
  }

}

run()
  .then(() => {
    console.log('done!')
  })
  .catch(e => console.log(e))
