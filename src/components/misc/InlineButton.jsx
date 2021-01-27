import React from "react";
import "./InlineButton.css";

export default function InlineButton({ text, onClick }) {
  return (
    <span className="btn-inline" onClick={onClick}>
      {text}
    </span>
  );
}
