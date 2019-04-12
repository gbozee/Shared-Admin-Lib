/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { Flex } from "@rebass/emotion";
import { useState, useEffect } from "react";
import { useSalesHook, useLoadData } from "./hooks";
import { GroupBookingDetailClientTable } from "../components/sales/details";

import { DataContext } from "../shared/DataContext";

const GroupBookingDetailPage = ({
  location,
  detailPageUrl = () => {},
  match: {
    params: { order }
  }
}) => {
  let { dispatch, actions } = useContext(DataContext);

  const loadData = () =>
    dispatch({ type: actions.GET_CLIENTS_FOR_GROUP_LESSON, value: { order } });
  const loadBookingDetail = () =>
    dispatch({ type: actions.GET_BOOKING_DETAIL, value: order });
  let [studentList, setStudentList] = useLoadData({
    fetchData: loadData
  });
  let [booking_detail, setBookingDetail] = useLoadData({
    fetchData: loadBookingDetail
  });
  return (
    <Flex flexDirection="column">
      <GroupBookingDetailClientTable
        data={studentList.data}
        admin_actions={{
          made_full_payment: records => {
            console.log(records);
          },
          send_curriculum_information_to_client: records => {
            console.log(records);
          }
        }}
        booking_detail={booking_detail.data}
      />
    </Flex>
  );
};

export default GroupBookingDetailPage;
