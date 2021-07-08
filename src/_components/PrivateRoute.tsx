/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;

        if (!localStorage.getItem('user')) {
          return (
            <Redirect
              to={{ pathname: 'auth/login', state: { from: location } }}
            />
          );
        }

        const jwt = JSON.parse(localStorage.getItem('user'));

        const expireIn = new Date(jwt.expire).getTime();
        const nowDate = new Date().getTime();

        if (expireIn - nowDate < 0) {
          return (
            <Redirect
              to={{ pathname: 'auth/login', state: { from: location } }}
            />
          );
        }
        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
};
