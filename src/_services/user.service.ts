import { baseRequestService } from './baseRequest.service';

/* eslint-disable sonarjs/no-duplicate-string */
export interface UserLoginResponse {
  readonly code: string;
  readonly expire: string;
  readonly token: string;
}

const login = (username: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return baseRequestService(
    `https://frontend-task.production.cloud.chattermill.xyz/login`,
    requestOptions
  ).then((user: UserLoginResponse) => {
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const userService = {
  login,
  logout,
};
