import React from "react";
import "./MenuButton.css";
import ControlButton from "../misc/ControlButton";

export default function MenuButton({ image, active, onClick }) {
  return (
    <div className={"menu-item" + (active ? " active" : "")}>
      <ControlButton image={image} onClick={onClick}/>
    </div>
  );
}
