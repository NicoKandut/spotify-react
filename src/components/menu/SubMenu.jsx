import React from "react";
import api from "../../data/api";
import "./SubMenu.css";
import InlineButton from "../misc/InlineButton";

export default function SubMenu(props) {
  switch (props.type) {
    case "home":
      return <HomeMenu {...props} />;
    case "library":
      return <LibraryMenu {...props} />;
    case "browse":
      return <BrowseMenu {...props} />;
    default:
      return null;
  }
}

export function HomeMenu(props) {
  return (
    <div className="submenu">
      <h1 className="">Home</h1>
      <ul className="list-menu">
        <MenuEntry title="Activity" />
        <MenuEntry
          title="Playlists"
          entry={
            <Playlists playlists={props.playlists} onClick={props.onClick} />
          }
        />
      </ul>
    </div>
  );
}

export class LibraryMenu extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.setViewport = props.onClick;
    this.display = this.display.bind(this);
  }

  display(type) {
    switch (type) {
      case "songs":
        api.getMySavedTracks().then(data => {
          this.setViewport("songs", undefined, data.items);
        });
        break;
      case "albums":
        api.getMySavedAlbums().then(data => {
          this.setViewport("albums", undefined, data);
        });
        break;
      case "artists":
        api.getMyTopArtists().then(data => {
          this.setViewport("artists", undefined, data);
        });
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="submenu">
        <h1 className="">Library</h1>
        <ul className="list-menu">
          <MenuEntry
            title="Songs"
            entry={
              <InlineButton text="View" onClick={() => this.display("songs")} />
            }
          />
          <MenuEntry
            title="Albums"
            entry={
              <InlineButton
                text="View"
                onClick={() => this.display("albums")}
              />
            }
          />
          <MenuEntry
            title="Artists"
            entry={
              <InlineButton
                text="View"
                onClick={() => this.display("artists")}
              />
            }
          />
        </ul>
      </div>
    );
  }
}

export function BrowseMenu() {
  return (
    <div className="submenu">
      <h1 className="">Library</h1>
      <ul className="list-menu">
        <MenuEntry
          title="Search"
          entry={
            <input type="search" placeholder="Search" className="inp-search" />
          }
        />
        <MenuEntry title="Made for you" />
        <MenuEntry title="Charts" />
        <MenuEntry title="New Releases" />
      </ul>
    </div>
  );
}

function MenuEntry({ title, entry = null }) {
  return (
    <li>
      <h1>{title}</h1>
      {entry}
    </li>
  );
}

function Playlists(props) {
  return (
    <ul className="list-menu">
      {props.playlists.map(p => (
        <li
          key={p.id}
          className="d-flex playlist"
          onClick={() => props.onClick("playlist", p)}
        >
          <img
            src={p.images[0].url}
            alt={p.images[0].url}
            className="playlist-thumbnail"
          />
          <div>
            <span className="playlist-name">{p.name}</span>
            <br />
            <span className="playlist-desc-small">
              {p.owner.display_name} - {p.tracks.total} songs
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
