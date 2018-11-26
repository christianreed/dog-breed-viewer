import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Routes from "./Routes";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
