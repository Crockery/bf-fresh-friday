import { getAllPosts, writeList } from '../lib'
import { formatTitle } from '../helpers'

async function run() {
  try {
    console.log(__dirname)
    let singles = await getAllPosts('[FRESH]', ['VIDEO', 'ALBUM'])
    let albums = await getAllPosts('[FRESH ALBUM]', ['VIDEO', '[FRESH]'])
    let videos = await getAllPosts('[FRESH VIDEO]', ['ALBUM', '[FRESH]'])

    singles = singles.map(formatTitle)
    albums = albums.map(formatTitle)
    videos = videos.map(formatTitle)

    await writeList(singles, albums, videos)

    console.log(singles)
  } catch (e) {
    console.log(e)
  }

}

run()
  .then(() => {
    console.log('done!')
  })
  .catch(e => console.log(e))
