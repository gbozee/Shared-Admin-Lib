function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { loadState, saveState } from "./localStorage";
import { DataContext } from "./ProtectedRoute";
import PaymentContext from "./contexts/payment_verification";
import TutorContext from "./contexts/tutor_success";
export { DataContext };
export { ProtectedRoute } from "./ProtectedRoute";
const actions = {
  AUTHENTICATE: "AUTHENTICATE",
  TOKEN_EXIST: "TOKEN_EXIST",
  LOGIN_USER: "LOGIN_USER",
  ...PaymentContext.actions,
  ...TutorContext.actions
};
export class DataProvider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dispatch", action => {
      let options = PaymentContext.dispatch(action, {
        [actions.TOKEN_EXIST]: this.tokenExist,
        [actions.AUTHENTICATE]: this.authenticateUser,
        [actions.LOGIN_USER]: this.loginUser
      });
      options = TutorContext.dispatch(action, options);

      if (this.props.test) {
        console.log(action);
      }

      return options[action.type](action.value, this);
    });

    _defineProperty(this, "state", {
      context: {
        state: {
          auth: false,
          withdrawals: [],
          hired_transactions: [],
          verified_transactions: {},
          pending_verifications: []
        },
        dispatch: this.dispatch,
        actions
      }
    });

    _defineProperty(this, "getAdapter", () => {
      return this.props.adapter;
    });

    _defineProperty(this, "updateState", obj => {
      let {
        context
      } = this.state;
      this.setState({
        context: { ...context,
          state: { ...context.state,
            ...obj
          }
        }
      });
    });

    _defineProperty(this, "tokenExist", () => {
      return Boolean(this.getToken());
    });

    _defineProperty(this, "authenticateUser", () => {
      let {
        auth
      } = this.state.context.state;

      if (auth) {
        return new Promise(resolve => resolve(true));
      }

      return this.props.authenticateUser(this.getToken()).then(data => {
        this.updateState({
          auth: data
        });
        return true;
      });
    });

    _defineProperty(this, "loginUser", ({
      email,
      password
    }) => {
      return this.getAdapter().login(email, password).then(data => {
        saveState({
          token: data
        });
        this.updateState({
          auth: true
        });
      });
    });
  }

  componentDidMount() {
    TutorContext.componentDidMount(this); // this.updateState({
    //   verified_transactions: this.getAdapter().loadVerifications()
    // });
  }

  getToken() {
    let data = loadState();

    if (Boolean(data)) {
      return data.token;
    }

    return undefined;
  }

  render() {
    return React.createElement(DataContext.Provider, {
      value: this.state.context
    }, this.props.children);
  }

}
export default DataProvider;