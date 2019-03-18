/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { RequestListItem } from "../../shared/reusables";
import { Flex, Text, Box } from "@rebass/emotion";
import {
  Button,
  DialogButton,
  CloseButton,
  Dropdown,
  EmptyButton
} from "../../shared/primitives";
import Application from "../../shared/application";
import { format } from "date-fns";
import { Form } from "../../shared/components/FormComponent";
import * as yup from "yup";
import { Select } from "../../shared/components/form-elements";
const RemarkComponent = ({ text, remark, updateRemark, onCold }) => {
  const dispatch = ({ type, value }) => {
    if (type == "update-remark") {
      updateRemark({
        body: value,
        updated: format(new Date(), "YYYY-MM-D h:mmA")
      });
    }
    if (type == "cold") {
      onCold();
    }
  };
  return (
    <>
      <Flex
        flexDirection="column"
        css={css`
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <Text fontWeight="bold">Remarks</Text>
        <Text>{remark.body}</Text>
        <Text fontSize="12px">Last Updated: {remark.updated}</Text>
      </Flex>
      <RemarkModal dispatch={dispatch} remark={remark.body} text={text} />
    </>
  );
};

const confirmPrompt = (text, func) => {
  let result = confirm(text);
  if (result) {
    func();
  }
};

const GroupItemDetail = ({
  data,
  remark = [],
  actions,
  classList,
  createClass,
  updateRemarks = () => {},
  ...rest
}) => {
  let [currentStatus, setCurrentStatus] = React.useState(data.status);
  let mostRecentRemark = remark.sort((a, b) => {
    return new Date(b.updated) - new Date(a.updated);
  })[0] || { slug: data.slug };
  let [requestRemark, setRemark] = React.useState(mostRecentRemark);
  const updateRemark = record => {
    let newRecord = { ...record, slug: data.slug };
    setRemark(newRecord);
    updateRemarks([...remark, newRecord]);
  };
  const markAsCold = () => {
    actions.move_to_cold(data);
  };
  const onRequestPayed = () => {
    actions.mark_request_as_payed(data);
  };
  const onCreateBooking = (full_payment, amount) => {
    actions.add_client_to_group_class(data, { full_payment, amount });
  };
  return (
    <RequestListItem
      request_type="group"
      {...data}
      {...rest}
      rightTop={" "}
      rightBottom={
        <Flex>
          <Text mr={3}>Status: </Text>
          {data.booking ? (
            "Booked"
          ) : currentStatus === "payed" ? (
            "Payed"
          ) : (
            <Dropdown
              value={currentStatus}
              onChange={value => {
                confirmPrompt(
                  `Are you sure you want to change the request status to ${value}`,
                  () => {
                    setCurrentStatus(value);
                    if (value === "payed") {
                      onRequestPayed();
                    }
                  }
                );
              }}
              options={["pending", "payed"]}
            />
          )}
        </Flex>
      }
      children={
        <Flex
          flexDirection="column"
          css={css`
            flex: 1;
            align-self: flex-end;
            @media (max-width: 768px) {
              align-self: flex-start;
              margin-top: 10px;
            }
          `}
        >
          {currentStatus === "pending" ? (
            <RemarkComponent
              remark={requestRemark}
              updateRemark={updateRemark}
              onCold={markAsCold}
              text="Take action"
            />
          ) : data.booking ? null : (
            <Flex flexDirection="column" justifyContent="center">
              <AddToGroupClassModal
                amount={data.budget}
                classList={classList}
                createClass={createClass}
                onSubmit={onCreateBooking}
              />
            </Flex>
          )}
        </Flex>
      }
    />
  );
};

export const RequestItemDetail = ({
  type,
  data,
  remark,
  actions,
  classList,
  createClass,
  ...rest
}) => {
  return data.request_type === 5 ? (
    <GroupItemDetail
      remark={remark}
      actions={actions}
      classList={classList}
      createClass={createClass}
      data={{
        ...data,
        full_name: `${data.first_name} ${data.last_name}`,
        phone_no: data.number,
        skill: (data.request_subjects || []).join(","),
        summary: (
          <Text fontWeight="bold">
            Class Group:{" "}
            {
              (
                data.request_info || {
                  request_details: { schedule: {} }
                }
              ).request_details.schedule.summary
            }
          </Text>
        )
      }}
      {...rest}
    />
  ) : (
    <RequestListItem {...data} {...rest} />
  );
};
const buttonComponent = (
  <Button
    css={css`
      font-size: 14px;
      padding-top: 8px;
      padding-bottom: 8px;
      width: 40%;
      align-self: center;
      margin-top: -20px;
    `}
  />
);
export const AddToGroupClassModal = ({
  full_payment = true,
  amount = 40000,
  onSubmit = () => {},
  classList = [],
  createClass = () => {}
}) => {
  let [radio, selectReadio] = React.useState(full_payment);
  let [amountToBePaid, changeAmount] = React.useState(amount);
  let [selectedClass, setSelectedClass] = React.useState();
  return (
    <Application>
      <DialogButton
        renderComponent={onChange =>
          React.cloneElement(buttonComponent, {
            onClick: onChange,
            children: "Add to Class Group"
          })
        }
        heading="Add Client to class group"
        confirmAction={() => {
          if (selectedClass) {
            confirmPrompt("Are you sure?", () => {
              onSubmit(radio, amountToBePaid, selectedClass);
            });
          }
        }}
        dialogText={
          <Flex flexDirection="column">
            <Box mb={10}>
              <label htmlFor="part-payment">
                <input
                  id="part-payment"
                  type="radio"
                  name="payment_kind"
                  checked={!radio}
                  onChange={e => {
                    if (e.target.checked) {
                      selectReadio(false);
                    }
                  }}
                />
                Part Payment
              </label>
              <label htmlFor="full-payment">
                <input
                  id="full-payment"
                  type="radio"
                  name="payment_kind"
                  checked={radio}
                  onChange={e => {
                    if (e.target.checked) {
                      selectReadio(true);
                    }
                  }}
                />{" "}
                Full Payment
              </label>
            </Box>
            <Select
              label="Add to Class"
              options={classList}
              value={selectedClass}
              onChange={setSelectedClass}
            />
            <Box>
              <Text fontSize="15px">
                if the selected class doesn't exist yet, click{" "}
                <EmptyButton
                  onClick={createClass}
                  css={css`
                    display: inline;
                  `}
                >
                  <Text
                    css={css`
                      display: inline;
                      text-decoration: underline;
                      padding-right: 3px;
                    `}
                  >
                    Here
                  </Text>
                </EmptyButton>
                to create one
              </Text>
            </Box>
            {!radio && (
              <Flex
                mt="20px"
                p="5px"
                css={css`
                  label {
                    margin-right: 10px;
                    font-size: 15px;
                  }
                `}
              >
                <label htmlFor="amount-to-be-paid">Amount Paid: </label>
                <input
                  id="amount-to-be-paid"
                  type="number"
                  value={amountToBePaid}
                  onChange={e => changeAmount(e.target.value)}
                />
              </Flex>
            )}
          </Flex>
        }
      />
    </Application>
  );
};

export const RemarkModal = ({ text, dispatch, remark = "" }) => {
  let [remarkText, updateText] = React.useState(remark);
  return (
    <Application>
      <DialogButton
        css={css`
          font-size: 14px;
          padding-top: 8px;
          padding-bottom: 8px;
          width: 40%;
          align-self: center;
          margin-top: -20px;
          align-self: flex-end;
          position: absolute;
          width: 163px;
          @media (max-width: 768px) {
            margin-top: 10px;
            position: relative;
          }
        `}
        heading="Take action on Pending Request"
        footerChildren={onClose => (
          <Flex justifyContent="space-between">
            <CloseButton onClick={onClose} />
            <Button
              onClick={() => {
                confirmPrompt("Update request remark?", () => {
                  dispatch({ type: "update-remark", value: remarkText });
                  onClose();
                });
              }}
            >
              Update Remark
            </Button>
            <Button
              css={css`
                background-color: red;
              `}
              onClick={() => {
                confirmPrompt("Change request status to cold?", () => {
                  dispatch({ type: "cold" });
                  onClose();
                });
              }}
            >
              Move Request to Cold
            </Button>
          </Flex>
        )}
        dialogText={
          <Box>
            <textarea
              css={css`
                width: 100%;
              `}
              value={remarkText}
              onChange={e => updateText(e.target.value)}
              placeholder="Drop a remark on interaction with the client"
              rows={6}
            />
          </Box>
        }
      >
        {text}
      </DialogButton>
    </Application>
  );
};
const GroupBookingSchema = yup.object().shape({
  first_session: yup.string().required(),
  last_session: yup.string().required(),
  skill: yup.string().required(),
  tutor: yup.string().required(),
  display_name: yup.string().required()
});
export const GroupBookingCreateForm = ({
  onSubmit,
  skills = [],
  tutors = []
}) => {
  let data = [
    { name: "first_session", type: "date", label: "First session" },
    { name: "last_session", type: "date", label: "Last session" },
    {
      name: "skill",
      type: "select",
      options: skills,
      label: "Skill",
      defaultText: "Select Skill"
    },
    {
      name: "tutor",
      type: "select",
      options: tutors.map(x => [x.email, x.first_name]),
      label: "Tutor",
      defaultText: "Select Tutor"
    },
    { name: "display_name", label: "Booking Summary" }
  ];
  return (
    <Form
      fields={data}
      onSubmit={onSubmit}
      validationSchema={GroupBookingSchema}
      render={(fields, button) => {
        return (
          <>
            <Box mb={10}>{fields.display_name}</Box>
            <Flex mb={10} justifyContent="space-between">
              <Box width="100%" pr={3}>
                {fields.skill}
              </Box>
              <Box width="100%">{fields.tutor}</Box>
            </Flex>
            <Flex mb={10}>
              {fields.first_session}
              {fields.last_session}
            </Flex>
            {button}
          </>
        );
      }}
    />
  );
};
