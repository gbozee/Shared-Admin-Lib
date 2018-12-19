function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { HomePageSpinner } from "./primitives/Spinner";
import { loadState, saveState } from "./localStorage";
import { DataContext } from "./ProtectedRoute";
export { DataContext };
export { ProtectedRoute } from "./ProtectedRoute";
const actions = {
  GET_WITHDRAWALS: "GET_WITHDRAWALS",
  GET_WITHDRAWAL: "GET_WITHDRAWAL",
  MAKE_PAYMENT: "MAKE_PAYMENT",
  GET_BOOKING_TRANSACTION: "GET_BOOKING_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTIONS",
  GET_WITHDRAWAL_TRANSACTIONS: "GET_WITHDRAWAL_TRANSACTIONS",
  AUTHENTICATE: "AUTHENTICATE",
  TOKEN_EXIST: "TOKEN_EXIST",
  LOGIN_USER: "LOGIN_USER",
  GET_HIRED_TRANSACTIONS: "GET_HIRED_TRANSACTIONS",
  TRANSACTION_DETAIL: "TRANSACTION_DETAIL",
  GET_VERIFIED_TRANSACTIONS: "GET_VERIFIED_TRANSACTIONS"
};
export class DataProvider extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "dispatch", action => {
      let options = {
        [actions.GET_WITHDRAWALS]: this.fetchWithdrawals,
        [actions.GET_WITHDRAWAL]: this.getWithdrawalDetail,
        [actions.MAKE_PAYMENT]: this.makePayment,
        [actions.DELETE_WITHDRAWAL]: this.deleteWithdrawal,
        [actions.GET_BOOKING_TRANSACTION]: this.fetchBookingTransaction,
        [actions.DELETE_TRANSACTION]: this.deleteTransaction,
        [actions.GET_WITHDRAWAL_TRANSACTIONS]: this.getWithdrawalTransactions,
        [actions.TOKEN_EXIST]: this.tokenExist,
        [actions.AUTHENTICATE]: this.authenticateUser,
        [actions.LOGIN_USER]: this.loginUser,
        [actions.GET_HIRED_TRANSACTIONS]: this.fetchHiredTransactions,
        [actions.TRANSACTION_DETAIL]: this.getTransactionDetail,
        [actions.GET_VERIFIED_TRANSACTIONS]: this.getAllOrdersForVerifiedTransactions
      };

      if (this.props.test) {
        console.log(action);
      }

      return options[action.type](action.value);
    });

    _defineProperty(this, "state", {
      context: {
        state: {
          auth: false,
          withdrawals: [],
          hired_transactions: [],
          verified_transactions: {}
        },
        dispatch: this.dispatch,
        actions
      }
    });

    _defineProperty(this, "saveVerifiedTransactions", () => {
      let {
        verified_transactions
      } = this.state.context.state;
      return this.getAdapter().saveVerifications(verifications);
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

    _defineProperty(this, "fetchWithdrawals", refresh => {
      let {
        withdrawals
      } = this.state.context.state;

      if (!Boolean(refresh) && withdrawals.length > 0) {
        return new Promise(resolve => resolve(withdrawals));
      }

      return this.getAdapter().getAllWithdrawals().then(data => {
        this.updateState({
          withdrawals: data
        });
        return data;
      }).catch(err => {
        throw err;
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

    _defineProperty(this, "makePayment", order => {
      let {
        withdrawals
      } = this.state.context.state;
      return this.getAdapter().makePayment(order).then(() => {
        this.updateState({
          withdrawals: withdrawals.filter(x => x.order !== order)
        });
      }).catch(error => {
        throw error;
      });
    });

    _defineProperty(this, "deleteWithdrawal", order => {
      let {
        withdrawals
      } = this.state.context.state;
      return this.getAdapter().deleteWithdrawal(order).then(data => {
        this.updateState({
          withdrawals: withdrawals.filter(x => x.order !== order)
        });
      });
    });

    _defineProperty(this, "getWithdrawalDetail", order => {
      return this.state.context.state.withdrawals.find(x => x.order === order);
    });

    _defineProperty(this, "fetchBookingTransaction", booking_order => {
      return this.getAdapter().getBookingTransaction(booking_order);
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

    _defineProperty(this, "getWithdrawalTransactions", withdrawal_order => {
      return this.getAdapter().getTransactions(withdrawal_order);
    });

    _defineProperty(this, "fetchHiredTransactions", props => {
      return this.getAdapter().getHiredTransactions(props).then(data => {
        this.updateState({
          hired_transactions: data
        });
        return data;
      });
    });

    _defineProperty(this, "getTransactionDetail", order => {
      let {
        hired_transactions
      } = this.state.context.state;
      let record = hired_transactions.find(x => x.order == order);

      if (Boolean(record)) {
        return new Promise(resolve => resolve(record));
      }

      return this.getAdapter().getTransactionDetail(order);
    });

    _defineProperty(this, "deleteTransaction", order => {
      return this.getAdapter().deleteTransaction(order);
    });

    _defineProperty(this, "getAllOrdersForVerifiedTransactions", () => {
      let {
        verified_transactions
      } = this.state.context.state;
      return [].concat(...Object.values(verified_transactions)).map(x => x.order);
    });
  }

  getAdapter() {
    return this.props.adapter;
  }

  componentDidMount() {
    this.updateState({
      verified_transactions: this.getAdapter().loadVerifications()
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