import scopes from "./scopes";
import clientInfo from "./clientInfo";

const urls = Object.freeze({
  api: () => "https://api.spotify.com/v1",
  accounts: () => "https://accounts.spotify.com",
  auth: redirect_uri =>
    `${urls.accounts()}/authorize?response_type=token&client_id=${
      clientInfo.id
    }${"&scope=" +
      encodeURIComponent(scopes.required())}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}`,
  player: () => `${urls.api()}/me/player`,
  shuffle: () => `${urls.player}/shuffle`,
  repeat: () => `${urls.player}/repeat`
});

export default urls;
