import { Action } from '_domain/Action';
import { AnyAction } from '_domain/AnyAction';

export enum AlertTypes {
  SUCCESS = 'ALERT_SUCCESS',
  ERROR = 'ALERT_ERROR',
  CLEAR = 'ALERT_CLEAR',
}

export interface SuccessAction extends Action {
  type: AlertTypes.SUCCESS;
  message: string;
}

export interface ErrorAction extends Action {
  type: AlertTypes.ERROR;
  message: string;
}

const success = (message: string): SuccessAction => {
  return { type: AlertTypes.SUCCESS, message };
};

const error = (message: string): ErrorAction => {
  return { type: AlertTypes.ERROR, message };
};

const clear = (): AnyAction => {
  return { type: AlertTypes.CLEAR };
};

export const alertActions = {
  success,
  error,
  clear,
};
