/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataProvider from "./DataProvider";
import Spinner from "./primitives/Spinner";
import { DataContext } from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import Application from "./application";
export const WithRouter = ({
  heading,
  children,
  adapter,
  firebase,
  context,
  toNextPage = () => {},
  RouterComponent,
  routerProps = {},
  auth,
  SwitchComponent,
  test = true,
  agent
}) => {
  let RComponent = RouterComponent || Router;
  let SComponent = SwitchComponent || Switch;
  return (
    <Application>
      <DataProvider
        test={test}
        adapter={adapter}
        context={context}
        appFirebase={firebase}
        auth={auth}
        agent={agent}
      >
        <Global
          styles={css`
            a.regular-link {
              cursor: pointer;
            }
          `}
        />
        <>
          <RComponent {...routerProps}>
            {heading}
            <SComponent>
              {" "}
              <Route
                path="/login"
                render={props => {
                  return (
                    <React.Suspense fallback={<Spinner />}>
                      <DataContext.Consumer>
                        {({ dispatch, actions }) => {
                          return (
                            <LoginPage
                              login={props =>
                                dispatch({
                                  type: actions.LOGIN_USER,
                                  value: props
                                })
                              }
                              toNextPage={() => {
                                toNextPage(props);
                              }}
                            />
                          );
                        }}
                      </DataContext.Consumer>
                    </React.Suspense>
                  );
                }}
              />
              {children}
            </SComponent>
          </RComponent>
        </>
      </DataProvider>
    </Application>
  );
};

export default WithRouter;
