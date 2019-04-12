/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { Flex } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
// import BListPage from "../src/pages/BListPage";
// import BDetailPage from "../src/pages/BDetailPage";
// import BookingWorkingSection from "../src/pages/BookingWorkingSection";
import { MemoryRouter as Router, Route, Switch, Link } from "react-router-dom";
import devAdapter from "./adapters/dev";
import WithRouter from "../src/shared/PageSetup";
import bookingContext from "./bookingContext";
import requestContext from "./requestContext";
import appFirebase from "./adapters/backupFirebase";
// import { RequestDetailPage } from "../src/pages/RequestDetailsPage";
// import CSListPage from "../src/pages/CSListPage";
// import GLTutorDetailPage from "../src/pages/GLTutorDetailPage";
// import GLClientDetailPage from "../src/pages/GLClientDetailPage";
// import GLDetailPage from "../src/pages/GLDetailPage";
// import GLTutorBookingListPage from "../src/pages/GLTutorBookingListPage";
import auth from "./adapters/auth";
import SalesListPage from "../src/pages/SalesListPage";
import GroupBookingListPage from "../src/pages/GroupBookingListPage";
import GroupBookingDetailPage from "../src/pages/GroupBookingDetailPage";

const RouterWrapper = ({
  children,
  initialIndex = 0,
  test = true,
  topLinks,
  context
}) => {
  return (
    <WithRouter
      auth={auth}
      test={test}
      RouterComponent={Router}
      agent="Biola"
      heading={
        <Flex
          pb={3}
          justifyContent="space-between"
          css={css`
            flex-wrap: wrap;
            > a {
              padding-right: 10px;
              padding-bottom: 10px;
            }
          `}
        >
          {topLinks}
        </Flex>
      }
      routerProps={{
        initialEntries: [
          "/requests/one-on-one?from=2018-01-01&to=2019-03-14",
          "/requests/one-on-one/1228/transactions",
          "/requests/group",
          "/request/group/123",
          "/request-bookings",
          "/request-bookings/123",
          "/bookings/one-on-one",
          "/bookings/one-on-one/AABBDDESEES",
          "/bookings/group",
          "/bookings/group/123",
          "/booking-working-section"
        ],
        initialIndex
      }}
      adapter={devAdapter}
      context={context}
      firebase={appFirebase}
    >
      {children}
    </WithRouter>
  );
};
storiesOf("Sales and Customer Success Application", module)
  .add("Requests List Page", () => (
    <RouterWrapper
      context={requestContext}
      initialIndex={9}
      topLinks={
        <React.Fragment>
          <Link to="/requests/one-on-one?from=2018-01-01&to=2019-03-14">
            Regular Requests
          </Link>
          <Link to="/bookings/group">Group Bookings</Link>
          <Link to="/bookings/group/ADDESS">Group Booking Detail</Link>
          <Link to="/request-working-section">Request Working Section</Link>
        </React.Fragment>
      }
    >
      <Route
        path="/requests/one-on-one"
        exact
        render={props => {
          return (
            <SalesListPage
              {...props}
              detailPageUrl={order =>
                `/requests/one-on-one/${order}/transactions`
              }
            />
          );
        }}
      />
      {/* <Route
                path="/requests/one-on-one/:slug/transactions"
                render={props => {
                    return <RequestDetailPage {...props} />;
                }}
            /> */}
      <Route
        path="/requests/group"
        exact
        render={props => {
          return (
            <SalesListPage
              {...props}
              detailPageUrl={order => `/requests/group/${order}`}
            />
          );
        }}
      />
      <Route
        path="/bookings/group"
        exact
        render={props => {
          return <GroupBookingListPage {...props} />;
        }}
      />
      <Route
        path="/bookings/group/:order"
        exact
        render={props => {
          return <GroupBookingDetailPage {...props} />;
        }}
      />
    </RouterWrapper>
  ))
  .add("Booking List Page", () => (
    <RouterWrapper
      context={bookingContext}
      initialIndex={6}
      topLinks={
        <React.Fragment>
          <Link to="/bookings/one-on-one">Bookings</Link>
          <Link to="/bookings/group">Group lesson bookings</Link>
          <Link to="/request-bookings">Kola Bookings</Link>
          <Link to="/bookings/one-on-one/ADDESS">Booking Detail Page</Link>
          <Link to="/booking-working-section">Booking Working Page</Link>
        </React.Fragment>
      }
    >
      {/* <Route
                path="/request-bookings"
                render={props => {
                    return <CSListPage {...props} />;
                }}
            /> */}
      <Route
        path="/bookings/group"
        exact
        render={props => {
          return <GLTutorBookingListPage {...props} />;
        }}
      />
      {/*<Route
                path="/bookings/group/:order"
                render={props => {
                    return <GLTutorDetailPage {...props} />;
                }}
            />
            <Route
                path="/bookings/one-on-one"
                exact
                render={props => (
                    <BListPage {...props} detailPageUrl={order => `/bookings/${order}`} />
                )}
            />
            <Route
                path="/bookings/one-on-one/:order"
                render={props => {
                    return <BDetailPage {...props} />;
                }}
            />
            <Route
                path="/booking-working-section"
                render={props => (
                    <BookingWorkingSection
                        {...props}
                        detailPageUrl={slug => `/bookings/${slug}`}
                    />
                )}
            /> */}
    </RouterWrapper>
  ));
