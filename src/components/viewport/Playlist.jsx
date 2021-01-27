import React from "react";
import "./Playlist.css";
import ControlButton, { SmallControlButton } from "../misc/ControlButton";
import PillButton from "../misc/PillButton";
import api from "../../data/api";
import TrackList from "./TrackList";

export default function Playlist({
  name,
  images,
  description,
  tracks,
  owner,
  uri
}) {
  const image = images[0].url,
    duration = tracks.items
      .map(i => i.track.duration_ms)
      .reduce((a, b) => a + b);
  return (
    <div className="playlist">
      <div className="d-flex header">
        <img src={image} alt={image} className="img-playlist" />
        <div className="d-flex flex-column details">
          <div className="flex-grow-1" />
          <div>
            <h1 className="playlist-name">{name}</h1>
            <span className="flew-grow-1 playlist-desc">{description}</span>
          </div>

          <span className="playlist-meta">
            Created by {owner.display_name} - {tracks.total} songs,{" "}
            {formatTime(duration)}
          </span>
          <div className="d-flex action-bar">
            <PillButton text="Play" onClick={() => play(uri, 0)} />
            <div className="flex-grow-1" />
          </div>
        </div>
      </div>
      <TrackList tracks={tracks.items} playlist_uri={uri} />
    </div>
  );
}

function play(context, offset) {
  let body = {};
  if (typeof context === "string") {
    body.context_uri = context;
  } else if (typeof context === "object") {
    body.uris = context;
  }
  body.offset = { position: offset };

  console.log(body);

  api.play(body);
}

function formatTime(milliseconds) {
  let time = ~~(milliseconds / 1000),
    hrs = ~~(time / 3600),
    mins = ~~((time % 3600) / 60),
    ret = "";

  if (hrs > 0) {
    ret += "" + hrs + " h " + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + " min";
  return ret;
}
