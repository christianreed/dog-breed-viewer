import React from "react";
import { Route, Switch } from "react-router-dom";

import Breed from "./containers/Breed";
import Home from "./containers/Home";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:breed/:subBreed?" component={Breed} />
  </Switch>
);
