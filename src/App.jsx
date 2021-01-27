import React from "react";
import "./App.css";
import Login from "./components/Login";
import Overview from "./components/Overview";
import api from "./data/api";

class App extends React.Component {
  constructor(props) {
    super(props);

    let search = window.location.hash.substr(1),
      params = new URLSearchParams(search),
      error = params.get("error"),
      accessToken = params.get("access_token"),
      tokenType = params.get("token_type"),
      expiresIn = params.get("expires_in");

    api.setAuth({
      accessToken: accessToken,
      tokenType: tokenType,
      expiresIn: expiresIn
    });

    this.state = {
      loggedIn: !error && accessToken ? true : false,
      error: error
    };
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn ? (
          <Login error={this.state.error} />
        ) : (
          <Overview />
        )}
      </div>
    );
  }
}

export default App;
