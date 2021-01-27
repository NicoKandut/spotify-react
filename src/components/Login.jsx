import React from "react";
import urls from "../data/urls";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error
    };
  }

  render() {
    return (
      <div>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <a href={urls.auth("http://localhost:3000/")}>Login</a>
      </div>
    );
  }
}
