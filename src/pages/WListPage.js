/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Button, Text } from "@rebass/emotion";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../shared/DataContext";
import { getTime, SectionListPage } from "../shared/reusables";
import { Link } from "react-router-dom";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { DateFilter } from "../shared/DateFilter";
import { parseQuery } from "../shared/utils";
import { useLoadData } from "./hooks";

export const WListPage = ({ location, detailPageUrl }) => {
  const { dispatch, actions, state } = useContext(DataContext);

  let { search } = location;
  let { status = "new" } = parseQuery(search);
  let [pending_verification, setPendingVerificatioin] = useState([]);
  let [filter, setFilter] = useState(status || "");
  let [in_paystack, setInPaystack] = useState(0);
  const fetchData = refresh =>
    dispatch({ type: actions.GET_WITHDRAWALS, value: refresh });

  let [{ data, loading }, { setData, setLoading, refreshList }] = useLoadData({
    fetchData
  });
  useEffect(() => {
    dispatch({ type: actions.GET_PENDING_VERIFICATIONS }).then(result => {
      setPendingVerificatioin(result);
    });
    dispatch({ type: actions.GET_PAYSTACK_BALANCE, value: true }).then(
      amount => {
        setInPaystack(amount);
      }
    );
  }, []);
  const filteredResults = () => {
    const filterCallback = w => {
      if (!filter) {
        return w;
      }
      return filter === "pending"
        ? pending_verification.map(x => x.order).includes(w.order)
        : !pending_verification.map(x => x.order).includes(w.order);
    };
    const transactionFunc = x => {
      let rr = pending_verification.find(
        o => o.order.toString() === x.order.toString()
      );
      if (rr) {
        return { ...x, transfer_code: rr.transfer_code };
      }
      return x;
    };
    return data.filter(filterCallback).map(transactionFunc);
  };

  const totalAmountToPay = () => {
    return data.map(x => x.amount).reduce((a, b) => a + b, 0);
  };
  const paystackBalance = () => {
    return state.paystack_balance;
  };
  const onFilterChange = e => {
    setFilter(e.target.value);
  };
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row-reverse" pr={2} pb={3} width={1}>
        <Button
          css={css`
            :active {
              opacity: 0.7;
            }
            :hover {
              cursor: pointer;
            }
          `}
          onClick={refreshList}
        >
          Refresh
        </Button>
        <DateFilter
          filterOptions={[
            { value: "", label: "Select Filter" },
            {
              value: "pending",
              label: "Awaiting Verification from paystack"
            },
            { value: "new", label: "Fresh Withdrawals" }
          ]}
          onFilterChange={onFilterChange}
          selection={filter}
        />
        <Flex
          justifyContent="space-around"
          css={css`
            flex: 2;
          `}
        >
          <Text fontSize={25}>
            Paystack Balance: {paystackBalance().toLocaleString()}
          </Text>
          <Text fontSize={25}>
            Total amount to pay: {totalAmountToPay().toLocaleString()}
          </Text>
        </Flex>
      </Flex>
      <SpinnerContainer condition={loading}>
        {data.length > 0 ? (
          <SectionListPage
            data={filteredResults()}
            LinkComponent={Link}
            callback={withdrawal => ({
              heading: `N${withdrawal.amount}`,
              subHeading: withdrawal.email,
              rightSection: getTime(withdrawal.date),
              verified: pending_verification
                .map(x => x.order)
                .includes(withdrawal.order),
              to: detailPageUrl(withdrawal.order)
            })}
          />
        ) : (
          <Flex
            css={css`
              align-items: center;
            `}
            flexDirection="column"
          >
            <Text fontSize={5}>
              Hit the refresh button to try again or check your network
            </Text>
          </Flex>
        )}
      </SpinnerContainer>
    </Flex>
  );
};

export default WListPage;
