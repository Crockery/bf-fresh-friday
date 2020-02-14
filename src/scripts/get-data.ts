import { getAllPosts } from '../lib'
import { formatTitle } from '../helpers'

import path from 'path'

async function run() {
  try {
    let singles = await getAllPosts('[FRESH]', ['VIDEO', 'ALBUM'])
    let albums = await getAllPosts('[FRESH ALBUM]', ['VIDEO', '[FRESH]'])
    let videos = await getAllPosts('[FRESH VIDEO]', ['ALBUM', '[FRESH]'])

    singles = singles.map(formatTitle)
    albums = albums.map(formatTitle)
    videos = videos.map(formatTitle)

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
