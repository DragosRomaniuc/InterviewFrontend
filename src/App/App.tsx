/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { history } from '_helpers';
import { alertActions } from '_actions';
import { PrivateRoute } from '_components';
import { HomePage } from '_pages';
import AuthLayout from '_layouts/Auth';
import { appTheme } from '../config/style';

const theme = createTheme(appTheme);

export const appTestId = 'AppComponent';

const App = () => {
  const alert = useSelector((state: any) => {
    return state.alert;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((_location, _action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="jumbotron" data-testid={appTestId}>
      <div className="container">
        <div className="col-md-8 offset-md-2">
          <MuiThemeProvider theme={theme}>
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/feed" component={HomePage} />
                <Route
                  path="/auth"
                  render={(props) => <AuthLayout {...props} />}
                />
                <Redirect from="*" to="/feed" />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
};

export { App };
