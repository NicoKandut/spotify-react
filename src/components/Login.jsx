import React from "react";
import urls from "../data/urls";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error,
    };
  }

  render() {
    return (
      <div>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <a
          href={urls.auth(
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/"
              : "https://nicokandut.github.io/spotify-react"
          )}
        >
          Login
        </a>
      </div>
    );
  }
}
