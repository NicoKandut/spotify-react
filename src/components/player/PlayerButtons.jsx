import React from "react";
import ControlButton from "../misc/ControlButton";
import api from "../../data/api";
import "./PlayerButtons.css";

export default class PlayerButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: props.paused,
      shuffleMode: props.shuffleMode,
      repeatMode: props.repeatMode
    };

    this.onShuffleClick = this.onShuffleClick.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onRepeatClick = this.onRepeatClick.bind(this);
  }

  onShuffleClick() {
    api
      .setShuffle(!this.state.shuffleMode)
      .then(value => {
        this.setState({
          shuffleMode: value
        });
      })
      .catch(console.log);
  }

  onPreviousClick() {
    api
      .skipToNext()
      .then(value => {
        console.log(value);
      })
      .catch(console.log);
  }

  onPlayClick() {
    if (this.state.paused) {
      api
        .play()
        .then(console.log)
        .catch(console.log);
    } else {
      api
        .pause()
        .then(console.log)
        .catch(console.log);
    }
  }

  onNextClick() {
    api
      .skipToPrevious()
      .then(value => {
        console.log(value);
      })
      .catch(console.log);
  }

  onRepeatClick() {
    let newReapeatMode = this.parseRepeatMode(this.state.repeatMode + 1);

    api
      .setRepeat(newReapeatMode)
      .then(value => {
        this.setState({
          repeatMode: this.parseRepeatMode(value)
        });
      })
      .catch(console.log);
  }

  parseRepeatMode(mode) {
    const types = ["off", "context", "track"];
    if (typeof mode === "string") return types.indexOf(mode);
    else if (typeof mode === "number") return types[mode % 3];
    else throw new Error("Invalid repeat mode: " + mode);
  }

  render() {
    return (
      <div className="d-flex justify-content-center btn-bar">
        <ControlButton
          image={`./shuffle-${this.state.shuffleMode ? "on" : "off"}.svg`}
          onClick={this.onShuffleClick}
        />
        <ControlButton image="./previous.svg" onClick={this.onPreviousClick} />
        <ControlButton
          image={this.state.paused ? "./play.svg" : "./pause.svg"}
          onClick={this.onPlayClick}
        />
        <ControlButton image="./next.svg" onClick={this.onNextClick} />
        <ControlButton
          image={`./repeat-${this.state.repeatMode}.svg`}
          onClick={this.onRepeatClick}
        />
      </div>
    );
  }
}
