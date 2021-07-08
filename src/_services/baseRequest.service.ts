import { authHeader } from '_helpers';

const handleResponse = async (response: any) => {
  return response.json().then((data) => {
    if (response.status === 401 || response.status === 400) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return Promise.resolve(data);
  });
};

const baseRequestService = async (
  endpoint: string,
  options: Record<string, unknown>
): Promise<any> => {
  try {
    if (!endpoint || !options?.method) {
      return Promise.reject('Please enter endpoint');
    }

    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      ...options,
    };

    return fetch(endpoint, requestOptions).then(handleResponse);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { baseRequestService };
