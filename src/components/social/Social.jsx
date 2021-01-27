import React from "react";
import "./Social.css";
import Friends from "./Friends";

export default function Social({ user }) {
  return (
    <div className="d-flex flex-column social">
      <div className="you">
        <h3>You</h3>
        <User
          name={user.display_name}
          image={user.images[0].url}
          followers={user.followers.total}
        />
      </div>
      <div className="friends">
        <h3>Your Friends</h3>
        <Friends />
      </div>
    </div>
  );
}

function User({ image, name, followers }) {
  return (
    <div className="d-flex">
      <img src={image} alt={image} className="img-user" />
      <div className="user-details">
        <span className="user-name">{name}</span>
        <br />
        <span className="user-followers">
          {followers + " follower" + (followers !== 1 ? "s" : "")}
        </span>
      </div>
    </div>
  );
}
