import SpotifyWebApi from 'spotify-web-api-node'

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} from '../etc/conf'

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
})

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
