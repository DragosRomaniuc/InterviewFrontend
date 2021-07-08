import { UserActionType } from '_actions/UserActionType';
import { Action } from '_domain/Action';
import { UserLoginResponse } from '_services';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export interface AuthenticationState {
  readonly loggingIn?: boolean;
  readonly loggedIn?: boolean;
  readonly user?: UserLoginResponse;
}

export interface AuthenticationAction extends Action {
  type:
    | UserActionType.LOGIN_REQUEST
    | UserActionType.LOGIN_SUCCESS
    | UserActionType.LOGIN_FAILURE
    | UserActionType.LOGOUT;
  user: UserLoginResponse;
}

export const authentication = (
  state: AuthenticationState = initialState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case UserActionType.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case UserActionType.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case UserActionType.LOGIN_FAILURE:
      return {};
    case UserActionType.LOGOUT:
      return {};
    default:
      return state;
  }
};
