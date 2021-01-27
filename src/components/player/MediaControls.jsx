import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Slider from "rc-slider";
import api from "../../data/api";
import "./MediaControls.css";
import ControlButton from "../misc/ControlButton";

export default class MediaControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      volume: 0,
      sound: true
    };

    this.onChangeDevice = this.onChangeDevice.bind(this);
    this.updateDevices = this.updateDevices.bind(this);
    this.onToggleVolume = this.onToggleVolume.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.setVolume = this.setVolume.bind(this);

    this.player = window.Spotify;
  }

  componentDidMount() {
    this.updateDevices();
  }

  onChangeDevice(id) {
    api
      .transferMyPlayback([id])
      .then(() => {
        let devs = this.state.devices, 
        volume = this.state.volume;
        devs.forEach(d => {
          d.is_active = d.id === id
          if(d.is_active) {
            volume = d.volume_percent
          }
        });

        this.setState({
          devices: devs,
          volume: volume
        });
      })
      .catch(console.log);
  }

  updateDevices() {
    api
      .getMyDevices()
      .then(data => {
        this.setState({
          devices: data.devices
        });
      })
      .catch(console.log);
  }

  onToggleVolume(e) {
    this.setState(
      {
        sound: !this.state.sound
      },
      this.setVolume
    );
  }

  onChangeVolume(e) {
    this.setState(
      {
        volume: e
      },
      this.setVolume
    );
  }

  setVolume() {
    api
      .setVolume((this.state.sound ? 1 : 0) * this.state.volume)
      .then()
      .catch(console.log);
  }

  render() {
    const popover = (
      <Popover title="Your devices">
        <DeviceList
          devices={this.state.devices}
          onChangeDevice={this.onChangeDevice}
        />
      </Popover>
    );

    const handle = props => {
      const { value, dragging, index, ...restProps } = props;
      return <Slider.Handle value={value} {...restProps} className="handle" />;
    };

    return (
      <div className="col-3 d-flex media-controls">
        <div className="devices">
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <ControlButton image="./devices.svg" onClick={this.updateDevices} />
          </OverlayTrigger>
        </div>
        <div className="d-flex flex-grow-1 volume">
          <ControlButton image="./sound.svg" onClick={this.onToggleVolume} />
          <Slider
            min={0}
            max={100}
            value={this.state.volume}
            handle={handle}
            onChange={this.onChangeVolume}
            className="flex-grow-1 volume-slider"
          />
        </div>
      </div>
    );
  }
}

export function DeviceList(props) {
  return (
    <div>
      {props.devices.map(d => (
        <Device
          key={d.id}
          id={d.id}
          name={d.name}
          type={d.type}
          active={d.is_active}
          onClick={props.onChangeDevice}
        />
      ))}
    </div>
  );
}

export function Device(props) {
  return (
    <div
      className={"d-flex device" + (props.active ? " active" : "")}
      onClick={() => props.onClick(props.id)}
    >
      <img src="./disc.png" alt={props.type} className="img-small img-device" />
      <div className="mt-2">
        <span className="device-name">{props.name}</span>
        <br />
        <span className="device-type">{props.type}</span>
      </div>
    </div>
  );
}
