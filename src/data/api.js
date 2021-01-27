import Spotify from 'spotify-web-api-js'

let spotify = new Spotify(),
auth = {
    accessToken: null,
    tokenType: null,
    expiresIn: null
}

spotify.setAuth = (info) => {
    auth = info
    spotify.setAccessToken(info.accessToken);
}

spotify.getAuth = () => {
      return auth
}

export default spotify;
