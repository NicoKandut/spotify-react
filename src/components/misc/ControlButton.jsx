import React from "react";
import "./ControlButton.css";

export default function ControlButton(props) {
  return (
    <button className="btn-ctrl" onClick={props.onClick}>
      <img
        src={props.image}
        alt={props.image}
        className="img-ctrl hover-grow"
      />
    </button>
  );
}

export function SmallControlButton(props) {
  return (
    <button className="btn-ctrl" onClick={props.onClick}>
      <img src={props.image} alt={props.image} className="img-ctrl-small" />
    </button>
  );
}
