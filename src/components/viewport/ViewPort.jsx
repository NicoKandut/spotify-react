import React from "react";
import Playlist from "./Playlist";
import "./Viewport.css";
import TrackList from "./TrackList";

export default function Viewport(props) {
  console.log(props);
  let view;
  switch (props.type) {
    case "playlist":
      view = <Playlist {...props.subject} />;
      break;
    case "songs":
      view = <TrackList tracks={props.data} playlist_uri={null}/>;
      break;
    default:
      view = null;
  }

  return <div className="flex-grow-1 viewport">{view}</div>;
}
