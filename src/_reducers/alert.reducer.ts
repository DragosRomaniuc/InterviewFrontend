import { AlertTypes } from '_actions';

export interface AlertState {
  readonly type?: string;
  readonly message?: string;
}

export const alert = (state: AlertState = {}, action): any => {
  switch (action.type) {
    case AlertTypes.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      };
    case AlertTypes.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      };
    case AlertTypes.CLEAR:
      return {};
    default:
      return state;
  }
};
