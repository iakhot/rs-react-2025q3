import type { ApiError } from '../App';

export const composeErrorMessage = (error: ApiError): string => {
  if (error.status) {
    const status = error.status;
    const message = `${status} ${error.statusText}`;
    return status >= 500
      ? `Server side error: ${message}`
      : status >= 400
        ? `Client side error: ${message}`
        : `${message}`;
  } else return error.message;
};
