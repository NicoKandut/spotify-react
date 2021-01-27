import React from "react";

import PlayerBar from "./player/PlayerBar";
import Social from "./social/Social";
import "./Overview.css";
import Menu from "./menu/Menu";
import Viewport from "./viewport/ViewPort";
import api from "../data/api";

const defaultUser = {
  name: "",
  followers: {
    total: 0
  },
  images: [
    {
      url: "" //TODO: default profile picture
    }
  ]
};

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      type: undefined,
      subject: undefined
    };

    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    api.getMe().then(data => {
      this.setState({
        user: data
      });
    });
  }

  setView(type, subject, data) {
    if (subject)
      api
        .getGeneric(subject.href)
        .then(data => {
          console.log(data);
          this.setState({
            type: type,
            subject: data
          });
        })
        .catch(console.log);
    else {
      this.setState({
        type: type,
        data: data
      });
    }
  }

  render() {
    return (
      <main className="d-flex flex-column">
        <div className="flex-grow-1 d-flex main-view">
          <Menu user={this.state.user} onMenuClick={this.setView} />
          <Viewport
            type={this.state.type}
            subject={this.state.subject}
            data={this.state.data}
          />
          <Social user={this.state.user} />
        </div>

        <PlayerBar />
      </main>
    );
  }
}
