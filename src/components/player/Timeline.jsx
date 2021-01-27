import React from "react";
import Slider from "rc-slider";
import "./Timeline.css";

const Handle = Slider.Handle; //TODO: extract slider

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return <Handle value={value} {...restProps} className="handle" />;
};

export default function Timeline(props) {
  return (
    <div className="d-flex justify-content-center">
      <span className="time">{formatTime(props.position)}</span>
      <Slider
        min={0}
        max={props.duration}
        value={props.position}
        handle={handle}  
        onChange={props.onSeek}
        className="timeline"
      />
      <span className="time">{formatTime(props.duration)}</span>
    </div>
  );
}

function formatTime(milliseconds) {
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
