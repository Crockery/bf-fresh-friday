import SpotifyWebApi from 'spotify-web-api-node'

import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
} from '../etc/conf'

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
})

const setAccessToken = (): Promise<any> => {
  return new Promise((res, rej) => {
    spotify.clientCredentialsGrant().then(
      data => {
        // Save the access token so that it's used in future calls
        spotify.setAccessToken(data.body['access_token'])
        res()
      },
      rej
    )
  })
}

const getNewReleases = async (): Promise<any> => {
  return new Promise((res, rej) => {
    spotify.getNewReleases({
      country: 'CA',
      limit: 50
    }).then(
      data => {
        console.log(data.body.albums.items)
        res()
      },
      rej
    )
  })
}

export const getSpotifyData = async () => {
  try {
    await setAccessToken()
    await getNewReleases()
  } catch (e) {
    console.log(e)
  }
}
