function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { loadState, saveState } from "./localStorage";
import { DataContext } from "./ProtectedRoute";
export { DataContext };
export { ProtectedRoute } from "./ProtectedRoute";
const actions = {
  AUTHENTICATE: "AUTHENTICATE",
  TOKEN_EXIST: "TOKEN_EXIST",
  LOGIN_USER: "LOGIN_USER"
};
export class DataProvider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dispatch", action => {
      let {
        context
      } = this.props;
      let firebaseFunc = this.props.appFirebase(context.keys);
      let options = context.dispatch(action, {
        [actions.TOKEN_EXIST]: this.tokenExist,
        [actions.AUTHENTICATE]: this.authenticateUser,
        [actions.LOGIN_USER]: this.loginUser
      }, firebaseFunc);
      options = context.dispatch(action, options, firebaseFunc);

      if (this.props.test) {
        console.log(action);
      }

      return options[action.type](action.value, this);
    });

    _defineProperty(this, "state", {
      context: {
        state: {
          auth: false,
          agent: null,
          ...this.props.context.state
        },
        dispatch: this.dispatch,
        actions: { ...actions,
          ...this.props.context.actions
        }
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

    _defineProperty(this, "authenticateUser", (callback = () => {}) => {
      let {
        auth
      } = this.state.context.state;
      let firebaseFunc = this.props.appFirebase(this.props.context.keys);

      if (auth) {
        return new Promise(resolve => resolve(true));
      }

      return firebaseFunc.getUserToken(this.getToken()).then(data => {
        if (data) {
          this.updateState({
            auth: Boolean(data),
            agent: data
          }, () => {
            callback(data);
          });
        }

        return data;
      }); // return this.props.authenticateUser(this.getToken()).then(data => {
      //   this.updateState({ auth: data });
      //   return true;
      // });
    });

    _defineProperty(this, "loginUser", ({
      email,
      password
    }) => {
      let firebaseFunc = this.props.appFirebase(this.props.context.keys);
      return firebaseFunc.loginUser(email, password).then(data => {
        if (data) {
          saveState({
            token: data.token
          });
          this.updateState({
            auth: true,
            agent: data.uid
          });
        } else {
          throw "Not Logged In";
        }
      }).catch(error => {
        throw error;
      }); // return this.getAdapter()
      //   .login(email, password)
      //   .then(data => {
      //   });
    });
  }

  componentDidMount() {
    let {
      context
    } = this.props;
    let firebaseFunc = this.props.appFirebase(context.keys);
    this.authenticateUser(data => {
      if (data) {
        firebaseFunc.loadFireStore().then(db => {
          this.props.context.componentDidMount(this, firebaseFunc, data);
        });
      }
    });
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