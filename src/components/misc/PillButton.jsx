import React from "react";
import "./PillButton.css";

export default function PillButton({ text, onClick }) {
  return <button className="btn-pill" onClick={onClick}>{text}</button>;
}
