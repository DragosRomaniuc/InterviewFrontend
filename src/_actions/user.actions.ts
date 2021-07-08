import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

enum UserActionType {
  LOGIN_REQUEST = 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE = 'USERS_LOGIN_FAILURE',

  LOGOUT = 'USERS_LOGOUT',

  GET_USER = 'GET_USER',
}

const login = (username: string, password: string, from) => {
  return async (dispatch) => {
    dispatch(request({ username }));
    try {
      const user = await userService.login(username, password);
      dispatch(success(user));
      history.push(from);
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
    }
  };

  function request(user) {
    return { type: UserActionType.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserActionType.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserActionType.LOGIN_FAILURE, error };
  }
};

const logout = () => {
  userService.logout();
  return { type: UserActionType.LOGOUT };
};

export const userActions = {
  login,
  logout,
};
