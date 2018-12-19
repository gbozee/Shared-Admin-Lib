function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { Route, Redirect } from "react-router";
import { HomePageSpinner } from "./primitives/Spinner";
import { DataContext } from "./DataContext";
export { DataContext };
export class ProtectedRoute extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      authenticated: null
    });
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    let {
      dispatch,
      actions
    } = this.context;
    let exists = dispatch({
      type: actions.TOKEN_EXIST
    });
    return dispatch({
      type: actions.AUTHENTICATE
    }).then(data => {
      this.setState({
        authenticated: data
      });
    }).catch(error => {
      this.setState({
        autthenticated: false
      });
    });
  }

  render() {
    let {
      authenticated
    } = this.state;

    if (authenticated === null) {
      return React.createElement(HomePageSpinner, null);
    }

    if (authenticated === false) {
      return React.createElement(Redirect, {
        to: "/login"
      });
    }

    return React.createElement(Route, this.props);
  }

}

_defineProperty(ProtectedRoute, "contextType", DataContext);

export default ProtectedRoute;