import React from "react";
import PlaybackInfo from "./PlaybackInfo";
import PlayerButtons from "./PlayerButtons";
import Timeline from "./Timeline";
import api from "../../data/api";
import "./PlayerBar.css";
import MediaControls from "./MediaControls";

const defaultState = {
  context: {
    metadata: {}
  },
  paused: true,
  position: 0,
  duration: 1,
  shuffleMode: false,
  repeatMode: 0,
  volume: 0,
  track: {
    id: "4g9e5hnElJZSOoJBRLrq1I",
    name: "these days",
    album: {
      name: "these days",
      images: [
        {
          url: "./disc.png"
        }
      ]
    },
    artists: [
      {
        name: "guccihighwaters"
      }
    ]
  }
};

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.intervalHandle = undefined;
    this.state = defaultState;

    this.onSeek = this.onSeek.bind(this);
    this.getPlaybackState = this.getPlaybackState.bind(this);
  }

  componentDidMount() {
    this.mountPlayer();
  }

  componentWillUnmount() {
    this.player.disconnect();
  }

  mountPlayer() {
    if (window.Spotify !== undefined) {
      this.player = new window.Spotify.Player({
        name: "Nico's Spotify Player",
        getOAuthToken: cb => {
          cb(api.getAuth().accessToken);
        }
      });

      this.createEventHandlers();

      this.player.connect();

      // expose for global use
      window.player = this.player;

      this.getPlaybackState();
    } else {
      setTimeout(() => {
        this.mountPlayer();
      }, 1000);
    }
  }

  createEventHandlers() {
    this.player.on("initialization_error", e => {
      console.error("initialization_error", e);
    });
    this.player.on("authentication_error", e => {
      console.error("authentication_error", e);
    });
    this.player.on("account_error", e => {
      console.error("account_error", e);
    });
    this.player.on("playback_error", e => {
      console.error("playback_error", e);
    });

    this.player.on("player_state_changed", data => {

      console.log(data)
      let wasPaused = this.state.paused;

      if (data !== null) {
        this.setState(
          {
            context: data.context,
            duration: data.duration,
            position: data.position,
            paused: data.paused,
            repeatMode: data.repeat_mode,
            shuffleMode: data.shuffle,
            track: data.track_window.current_track
          },
          () => {
            let isPlaying = !this.state.paused;
            if (wasPaused && isPlaying) this.startTimer();
            else if (!wasPaused && !isPlaying) {
              this.stopTimer();
            }
          }
        );
      } else {
      }
    });

    this.player.on("ready", data => {
      this.setState({
        deviceId: data.deviceId
      });
    });
  }

  getPlaybackState() {
    api
      .getMyCurrentPlaybackState()
      .then(data => {
        this.setState(
          {
            track: data.item,
            paused: !data.is_playing,
            duration: data.item.duration_ms,
            position: data.progress_ms,
            shuffleMode: data.shuffle_state,
            repeatMode: parseRepeatMode(data.repeat_state),
            volume: data.device.volume_percent
          },
          () => {
            if (!this.state.paused) this.startTimer();
          }
        );
      })
      .catch(console.log);
  }

  onSeek(position) {
    this.player.seek(position);
  }

  startTimer() {
    this.intervalHandle = setInterval(() => {
      this.setState(
        {
          position: this.state.position + 1000
        },
        () => {
          if (this.state.position >= this.state.duration) {
            this.stopTimer();
            setTimeout(this.getPlaybackState);
          }
        }
      );
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalHandle);
  }

  render() {
    return (
      <div className="row player-bar">
        <PlaybackInfo
          image={this.state.track.album.images[0].url}
          track={this.state.track.name}
          artist={this.state.track.artists[0].name}
        />
        <div className="col-6 ctrl-display">
          <PlayerButtons
            paused={this.state.paused}
            shuffleMode={this.state.shuffleMode}
            repeatMode={this.state.repeatMode}
          />
          <Timeline
            position={this.state.position}
            duration={this.state.duration}
            onSeek={this.onSeek}
          />
        </div>
        <MediaControls />
      </div>
    );
  }
}

function parseRepeatMode(mode) {
  const types = ["off", "context", "track"];
  if (typeof mode === "string") return types.indexOf(mode);
  else if (typeof mode === "number") return types[mode];
  else throw new Error("Invalid repeat mode: " + mode);
}