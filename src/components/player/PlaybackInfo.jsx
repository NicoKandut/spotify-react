import React from "react";
import "./PlaybackInfo.css";
import { SmallControlButton } from "../misc/ControlButton";

export default function PlaybackInfo(props) {
  return (
    <div className="d-flex col-3 info-display">
      <img src={props.image} alt="album art" className="img-small album-art" />
      <div className="mt-2">
        <span className="track-name">{props.track} </span><SmallControlButton image="plus.svg"/>
        <br />
        <span className="artist-name">{props.artist}</span>
      </div>
    </div>
  );
}
