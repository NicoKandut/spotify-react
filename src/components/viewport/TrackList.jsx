import React from "react";
import "./TrackList.css";
import ControlButton, { SmallControlButton } from "../misc/ControlButton";
import api from "../../data/api";

export default function TrackList({ tracks, playlist_uri }) {
  return (
    <table className="tracks">
      <thead>
        <tr>
          <th />
          <th />
          <th>Name</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((i, idx) => (
          <Track
            key={i.track.id}
            {...i}
            playlist_uri={playlist_uri}
            index={idx}
          />
        ))}
      </tbody>
    </table>
  );
}

export function Track({ added_at, track, playlist_uri, index }) {
  return (
    <tr>
      <td>
        <ControlButton
          image="./play.svg"
          onClick={() => play(playlist_uri, index)}
        />
      </td>
      <td>
        <SmallControlButton image="./plus.svg" onClick={() => {}} />
      </td>
      <td>{track.name}</td>
      <td>{track.artists.map(a => a.name).join(", ")}</td>
      <td>{track.album.name}</td>
      <td>{formatDate(added_at)}</td>
      <td>{formatDuration(track.duration_ms)}</td>
    </tr>
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

function formatDuration(milliseconds) {
  let time = ~~(milliseconds / 1000),
    hrs = ~~(time / 3600),
    mins = ~~((time % 3600) / 60),
    secs = ~~time % 60,
    ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

function formatDate(dateString) {
  let date = new Date(dateString);

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
