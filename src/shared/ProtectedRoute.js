//@ts-check
import React from "react";
import { Route, Redirect } from "react-router";
import { HomePageSpinner } from "./primitives/Spinner";
import { DataContext } from "./DataContext";
export { DataContext };
export class ProtectedRoute extends React.Component {
  static contextType = DataContext;
  state = {
    authenticated: null
  };
  componentDidMount() {
    this.isAuthenticated();
  }
  isAuthenticated() {
    let { dispatch, actions } = this.context;
    return dispatch({ type: actions.AUTHENTICATE })
      .then(data => {
        this.setState({ authenticated: Boolean(data) });
      })
      .catch(error => {
        this.setState({ authenticated: false });
      });
  }
  render() {
    let { authenticated } = this.state;
    if (authenticated === null) {
      return <HomePageSpinner />;
    }
    if (authenticated === false) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props} />;
  }
}

export default ProtectedRoute;
