import { UserActionType } from '_actions/UserActionType';

export const users = (state = {} as any, action) => {
  if (action.type === UserActionType.GET_USER) {
    return {
      loading: true,
    };
  } else {
    return state;
  }
};
