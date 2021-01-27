const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-library-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "user-read-email",
  "user-read-birthdate",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "user-follow-read",
  "user-follow-modify"
];

export default {
  all() {
    return scopes.join(" ");
  },
  required() {
    return [
      "streaming",
      "user-read-private",
      "user-read-playback-state",
      "user-library-read"
    ].join(" ");
  }
};
