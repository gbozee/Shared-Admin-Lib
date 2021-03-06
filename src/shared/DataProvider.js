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
  dispatch = action => {
    let { context, appFirebase } = this.props;
    let firebaseFunc = {};
    if (appFirebase) {
      firebaseFunc = appFirebase(context.keys);
    }
    let options = context.dispatch(
      action,
      {
        [actions.TOKEN_EXIST]: this.tokenExist,
        [actions.AUTHENTICATE]: this.authenticateUser,
        [actions.LOGIN_USER]: this.loginUser
      },
      firebaseFunc
    );
    options = context.dispatch(action, options, firebaseFunc);

    if (this.props.test) {
      console.log(action);
    }
    return options[action.type](action.value, this);
  };
  state = {
    context: {
      state: {
        auth: false,
        agent: this.props.agent,
        ...this.props.context.state
      },
      dispatch: this.dispatch,
      actions: { ...actions, ...this.props.context.actions }
    }
  };
  getAdapter = () => {
    return this.props.adapter;
  };
  componentDidMount() {
    let { context, appFirebase } = this.props;
    this.authenticateUser(data => {
      if (data) {
        if (appFirebase) {
          let firebaseFunc = this.props.appFirebase(context.keys);
          firebaseFunc.loadFireStore().then(db => {
            this.props.context.componentDidMount(this, firebaseFunc, data);
          });
        } else {
          this.props.context.componentDidMount(this, {}, data);
        }
      }
    });
  }
  updateState = (obj, callback = () => {}) => {
    let { context } = this.state;
    this.setState(
      {
        context: { ...context, state: { ...context.state, ...obj } }
      },
      () => {
        callback(this.state);
      }
    );
  };

  getToken() {
    let data = loadState();
    if (Boolean(data)) {
      return data.token;
    }
    return undefined;
  }
  tokenExist = () => {
    return Boolean(this.getToken());
  };
  authenticateUser = (callback = () => {}) => {
    let { auth } = this.state.context.state;
    let { authenticateUser } = this.props.auth;
    if (auth) {
      return new Promise(resolve => resolve(true));
    }
    return authenticateUser(this.props.context.keys, this.getToken()).then(
      data => {
        if (data) {
          this.updateState({ auth: Boolean(data), agent: data }, () => {
            callback(data);
          });
        }
        return data;
      }
    );
  };

  loginUser = ({ email, password }) => {
    let { loginUser } = this.props.auth;
    return loginUser(this.props.context.keys, { email, password })
      .then(data => {
        if (data) {
          saveState({ token: data.token });
          this.updateState({ auth: true, agent: data.uid });
        } else {
          throw new Error("Not Logged In");
        }
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
