import React from "react";
import "./Menu.css";
import api from "../../data/api";
import MenuButton from "./MenuButton";
import SubMenu, { HomeMenu, LibraryMenu, BrowseMenu } from "./SubMenu";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      playlists: []
    };

    this.onMenuClick = props.onMenuClick;

    this.toggleHomeMenu = this.toggleHomeMenu.bind(this);
    this.toggleLibraryMenu = this.toggleLibraryMenu.bind(this);
    this.toggleBrowseMenu = this.toggleBrowseMenu.bind(this);
  }

  componentDidMount() {
    api
      .getUserPlaylists(this.state.user.id, {
        limit: 100
      })
      .then(data => {
        this.setState(
          {
            playlists: data.items
          },
          this.toggleHomeMenu
        );
      });
  }

  toggleHomeMenu(e) {
    this.setState({
      menuName: "home",
      subMenuProps: {
        playlists: this.state.playlists,
        onClick: this.onMenuClick
      }
    });
  }

  toggleLibraryMenu(e) {
    this.setState({
      menuName: "library",
      subMenuProps: {
        onClick: this.onMenuClick
      }
    });
  }

  toggleBrowseMenu(e) {
    this.setState({
      menuName: "browse"
    });
  }

  render() {
    return (
      <div className="d-flex menu">
        <div className="d-flex flex-column sidebar">
          <MenuButton
            image="./home.svg"
            active={this.state.menuName === "home"}
            onClick={this.toggleHomeMenu}
          />
          <MenuButton
            image="./library.svg"
            active={this.state.menuName === "library"}
            onClick={this.toggleLibraryMenu}
          />
          <MenuButton
            image="./browse.svg"
            active={this.state.menuName === "browse"}
            onClick={this.toggleBrowseMenu}
          />
          <div className="flex-grow-1" />
          <MenuButton
            image="./settings.svg"
            active={this.state.menuName === "settings"}
            onClick={() => {}}
          />
        </div>
        <SubMenu type={this.state.menuName} {...this.state.subMenuProps} />
      </div>
    );
  }
}
