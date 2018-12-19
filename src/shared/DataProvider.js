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
    let { context } = this.props;
    let firebaseFunc = this.props.appFirebase(context.keys);
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
        withdrawals: [],
        hired_transactions: [],
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
    let { context } = this.props;
    let firebaseFunc = this.props.appFirebase(context.keys);
    this.props.context.componentDidMount(this, firebaseFunc);
    // this.updateState({
    //   verified_transactions: this.getAdapter().loadVerifications()
    // });
  }
  updateState = obj => {
    let { context } = this.state;
    this.setState({
      context: { ...context, state: { ...context.state, ...obj } }
    });
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
  authenticateUser = () => {
    let { auth } = this.state.context.state;
    if (auth) {
      return new Promise(resolve => resolve(true));
    }
    return this.props.authenticateUser(this.getToken()).then(data => {
      this.updateState({ auth: data });
      return true;
    });
  };

  loginUser = ({ email, password }) => {
    return this.getAdapter()
      .login(email, password)
      .then(data => {
        saveState({ token: data });
        this.updateState({ auth: true });
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
