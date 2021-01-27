import React from "react";
import "./Friends.css";

export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //get followers
  }

  render() {
    return (
      <div>
        <span className="message">Currently unavailable</span>
      </div>
    );
  }
}
