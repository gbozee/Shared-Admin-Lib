/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Text, Heading } from "@rebass/emotion";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../shared/DataContext";
import Route from "react-router/Route";
import Switch from "react-router/Switch";
import Redirect from "react-router/Redirect";
import Link from "react-router-dom/Link";
import { DialogButton, Button } from "../shared/primitives";

import {
  ListGroup,
  ListItem,
  getDate,
  DetailItem,
  DetailHeader
} from "../shared/reusables";

function getDuration(start, end) {
  return `${getDate(start, true)} - ${getDate(end, true)}`;
}
const TransactionDetail = ({
  getBookingTransaction,
  detail,
  booking_transaction,
  deleteTransaction,
  loading
}) => {
  useEffect(() => {
    getBookingTransaction();
  }, []);
  return (
    <Flex flexDirection="column">
      <Flex
        mb={4}
        flexDirection="column"
        css={css`
          align-items: center;
        `}
      >
        <Heading fontSize={5}>{detail.amount}</Heading>
        <DialogButton
          dialogText="Are you sure you want to delete this transaction"
          confirmAction={() => deleteTransaction(detail.order)}
          my={2}
          width={400}
          disabled={loading}
          children="Delete Transaction"
        />
        <Text>{detail.status}</Text>
      </Flex>
      <Flex mb={4} flexDirection="column">
        <ListGroup name="Transaction Details" />
        <DetailItem label="Client Email">{detail.client_email}</DetailItem>
        <DetailItem label="Tutor email">{detail.tutor_email}</DetailItem>
        <DetailItem label="Duration">
          {getDuration(detail.booking.start_time, detail.booking.end_time)}
        </DetailItem>
        <DetailItem label="Made Payment">
          {detail.booking.made_payment ? "True" : "False"}
        </DetailItem>
        <DetailItem label="Booking Status">{detail.booking.status}</DetailItem>
      </Flex>
      <Flex mb={4} flexDirection="column">
        <ListGroup name="Booking Transaction" />
        {Array.isArray(booking_transaction) &&
          booking_transaction.map(x => (
            <ListItem
              key={x.order}
              heading={x.amount}
              subHeading={x.status}
              rightSection={getDate(x.date)}
            />
          ))}
      </Flex>
    </Flex>
  );
};
class TransactionList extends React.Component {
  toDetailPage = (order, status, condition = "EARNING") => {
    let {
      match: { params }
    } = this.props;
    if (status === condition) {
      this.props.goToTransactionDetail(params.order, order);
    }
  };
  render() {
    let { transactions = [] } = this.props;
    return (
      <React.Fragment>
        <ListGroup name="Transactions" />
        {transactions.map((transaction, index) => {
          return (
            <ListItem
              key={transaction.order}
              onClick={() => {
                this.toDetailPage(
                  transaction.order,
                  transaction.status,
                  "TUTOR EARNING"
                );
              }}
              heading={transaction.amount}
              subHeading={transaction.status}
              rightSection={getDate(transaction.date)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export const WDetailPage = ({ match, history, getWithdrawal, ...props }) => {
  const { dispatch, actions } = useContext(DataContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [booking_transaction, setBookingTransaction] = useState({});
  const [transactions, setTransactions] = useState(props.transactions || []);
  const [pending_verifications, setPendingVerifications] = useState([]);
  useEffect(() => {
    dispatch({ type: actions.GET_PENDING_VERIFICATIONS }).then(result => {
      let found = result.find(x => x.order.toString() === match.params.order);
      setPendingVerifications(result);
      setData(found ? { ...data, transfer_code: found.transfer_code } : data);
    });
    let result = dispatch({
      type: actions.GET_WITHDRAWAL,
      value: match.params.order
    });
    dispatch({
      type: actions.GET_WITHDRAWAL_TRANSACTIONS,
      value: match.params.order
    }).then(rr => {
      setTransactions(rr);
    });
    if (getWithdrawal) {
      setData(getWithdrawal(match.params.order));
    } else {
      if (Boolean(result)) {
        setData(result);
      } else {
        history.push("/withdrawals");
      }
      //should only happen in test scenarios
    }
  }, []);
  const verifyPayment = () => {
    setLoading(true);
    dispatch({
      type: actions.VERIFY_PAYSTACK_TRANSACTION,
      value: { code: data.transfer_code, order: match.params.order }
    }).then(({ status, ...rest }) => {
      if (status) {
        setPendingVerifications(rest.pending_verifications);
        history.push("/withdrawals");
      }
      setLoading(false);
    });
  };
  const makePayment = () => {
    setLoading(true);
    dispatch({ type: actions.MAKE_PAYMENT, value: data })
      .then(result => {
        setLoading(false);
        setPendingVerifications(result.pending_verifications);
        setData({ ...data, transfer_code: result.transfer_code });
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const deleteTransaction = order => {
    setLoading(true);
    dispatch({ type: actions.DELETE_TRANSACTION, value: order })
      .then(() => {
        history.push(`/withdrawals/${match.order}/transactions`);
        setTransactions(transactions.filter(x => x.order !== order));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const deleteWithdrawal = () => {
    setLoading(true);
    dispatch({ type: actions.DELETE_WITHDRAWAL, value: match.params.order })
      .then(() => {
        history.push("/withdrawals");
      })
      .catch(error => {
        setLoading(false);
      });
  };
  const getBookingTransaction = (booking_order, kind = "booking") => {
    setBookingTransaction({});
    dispatch({
      type: actions.GET_BOOKING_TRANSACTION,
      value: { order: booking_order, kind }
    })
      .then(result => {
        setBookingTransaction(result);
      })
      .catch(error => {});
  };
  const getTransactionDetail = transaction_id => {
    return transactions.find(x => x.order === parseInt(transaction_id));
  };
  const goToTransactionDetail = (withdrawal_id, transaction_id) => {
    // let record = this.getTransactionDetail(transaction_id);
    // this.getBookingTransaction(record.booking.order);
    history.push(
      `/withdrawals/${withdrawal_id}/transactions/${transaction_id}`
    );
  };
  return (
    <Flex flexDirection="column">
      <DetailHeader heading={data.amount} subHeading={`to ${data.email}`}>
        <Link to="/withdrawals">Back to Withdrawal</Link>
        {data.transfer_code ? (
          pending_verifications.map(x => x.order).includes(data.order) ? (
            <Button
              disabled={loading}
              onClick={verifyPayment}
              my={2}
              bg="green"
              width={400}
            >
              Verify Payment
            </Button>
          ) : (
            <Text>Verified</Text>
          )
        ) : (
          <DialogButton
            dialogText="Proceed with tutor payment? "
            confirmAction={makePayment}
            disabled={loading}
            my={2}
            width={400}
            children="Pay tutor"
          />
        )}
      </DetailHeader>
      <Flex mb={4} flexDirection="column">
        <ListGroup name="Details" />
        {Object.keys(data).length > 0 && (
          <>
            <DetailItem label="Account Number">{data.account_no}</DetailItem>
            <DetailItem label="Bank Name">{data.bank}</DetailItem>
            <DetailItem label="Account Name">{data.account_name}</DetailItem>
            <DetailItem label="Phone Number">{data.phone_no}</DetailItem>
            <DetailItem label="Amount in Wallet">
              {data.wallet_amount}
            </DetailItem>
          </>
        )}
      </Flex>
      <Flex mb={4} flexDirection="column">
        <Switch>
          <Route
            path={`/withdrawals/:order/transactions`}
            exact
            render={props => (
              <TransactionList
                transactions={transactions}
                goToTransactionDetail={goToTransactionDetail}
                {...props}
              />
            )}
          />
          <Route
            path={`/withdrawals/:order/transactions/:transaction_id`}
            exact
            render={props => {
              let detail = getTransactionDetail(
                props.match.params.transaction_id
              );
              if (detail) {
                return (
                  <TransactionDetail
                    detail={detail}
                    booking_transaction={booking_transaction}
                    deleteTransaction={deleteTransaction}
                    getBookingTransaction={() =>
                      getBookingTransaction(detail.booking.order)
                    }
                    loading={loading}
                    {...props}
                  />
                );
              }
              return (
                <Redirect
                  to={`/withdrawals/${props.match.params.order}/transactions`}
                />
              );
            }}
          />
        </Switch>
      </Flex>
      <DialogButton
        dialogText="Are you sure you want to delete this withdrawal? "
        confirmAction={deleteWithdrawal}
        disabled={loading}
        children="Delete Withdrawal"
      />
    </Flex>
  );
};

export default WDetailPage;
