/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { RequestListItem, BaseListItem } from "../../shared/reusables";
import { Flex, Text, Box } from "@rebass/emotion";
import {
  Button,
  DialogButton,
  CloseButton,
  Dropdown
} from "../../shared/primitives";
import Application from "../../shared/application";
import { format } from "date-fns";
import Table from "../../shared/components/Table";
import { Toast } from "../../shared/primitives/Toast";

export const GroupBookingListItem = ({
  skill,
  no_of_students = 0,
  amount = 0,
  order,
  first_session,
  last_session,
  tutor,
  status,
  schedule,
  detailPageUrl = () => {},
  ...rest
}) => {
  let stringDate = `${format(first_session, "MMM DD YYYY")} - ${format(
    last_session,
    "MMM DD YYYY"
  )}`;
  console.log(rest)
  return (
    <BaseListItem
      wholeSection={false}
      leftTop={stringDate}
      heading={schedule}
      subHeading={`Tutor: ${tutor.first_name}`}
      rightSection={amount.toLocaleString()}
      rightTop={`${no_of_students} students`}
      rightBottom={<Text>Skill: {skill}</Text>}
      {...rest}
    >
      <Box
        width="30%"
        css={css`
          align-self: center;
        `}
      >
        {status === "initialized" ? (
          <Button
            css={css`
              font-size: 14px;
              padding-top: 8px;
              padding-bottom: 8px;
              width: auto;
              align-self: center;
              margin-top: -20px;
            `}
          >
            Book Class
          </Button>
        ) : (
          <Text>{status}</Text>
        )}
      </Box>
    </BaseListItem>
  );
};

const toText = x => x.replace(/_/g, " ");
export const GroupBookingDetailClientTable = ({
  data,
  admin_actions = {},
  booking_detail,
  payTutor = () => {}
}) => {
  const [current_action, setCurrentAction] = React.useState("");
  const [showToast, setShowToast] = React.useState(false);
  let [selectedAll, setSelectedAll] = React.useState(false);
  let [selectedItems, setSelectedItems] = React.useState([]);
  const customer_columns = [
    {
      Header: "Full name",
      accessor: "name",
      Cell: ({ original: { name } }) => <Text>{name}</Text>
    },
    {
      Header: props => {
        console.log(props);
        return "Email";
      },
      accessor: "email",
      Cell: ({ value }) => <span className="number">{value}</span>
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      Header: "Full Payment",
      accessor: "full_payment",
      Cell: ({ value }) => <Text>{value && `✔`}</Text>
    }
  ];
  const onAdminActionChange = () => {
    if (current_action) {
      if (selectedItems.length > 0) {
        admin_actions[current_action](selectedItems, selectedAll);
        setShowToast(true);
      }
    }
  };
  let styling = css`
    align-self: center;
  `;
  let options = [["", "-----------"]].concat(
    Object.keys(admin_actions).map(x => [x, toText(x)])
  );
  console.log(options);
  return (
    <Box>
      <Table
        adminActions={
          <Flex mb="10px" justifyContent="space-between">
            <Box>
              <label>Action: </label>
              <Dropdown
                css={css`
                  padding-top: 3px;
                  padding-bottom: 3px;
                `}
                options={options}
                value={current_action}
                onChange={value => setCurrentAction(value)}
              />

              <button
                onClick={onAdminActionChange}
                css={css`
                  margin-left: 10px;
                  padding-top: 3px;
                  padding-bottom: 3px;
                `}
              >
                Go
              </button>
            </Box>
            <Text css={styling}>Total Amount: N{booking_detail.amount}</Text>
            <Text css={styling}>
              Tutor earns: N
              {(booking_detail.amount * booking_detail.percent_split) / 100}
            </Text>
            {booking_detail.status === "completed" ? (
              "Tutor Paid"
            ) : (
              <button onClick={payTutor}>Pay Tutor</button>
            )}
          </Flex>
        }
        data={data}
        columns={customer_columns}
        {...{ selectedAll, setSelectedAll, selectedItems, setSelectedItems }}
        keyField="email"
      />
      <Toast
        status="success"
        title="Admin Action"
        showToast={showToast}
        onClose={() => setShowToast(false)}
        showCloseButton
      >
        {current_action && toText(current_action)} Completed
      </Toast>
    </Box>
  );
};
