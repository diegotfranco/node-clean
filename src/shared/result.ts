export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorDetails {
  message: string; // General error message
  errors?: FieldError[]; // Optional array of field-specific errors
}

export type Result<T> = Success<T> | Failure;

export interface Success<T> {
  isSuccess: true;
  value: T;
}

export interface Failure {
  isSuccess: false;
  error: ErrorDetails;
}

export const success = <T>(value: T): Success<T> => ({
  isSuccess: true,
  value,
});

export const fail = (error: string | ErrorDetails): Failure => ({
  isSuccess: false,
  error: typeof error === "string" ? { message: error } : error,
});

export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
  result.isSuccess;

export const isFailure = <T>(result: Result<T>): result is Failure =>
  !result.isSuccess;

export const getValue = <T>(result: Result<T>): T => {
  if (isFailure(result)) throw new Error(result.error.message);
  return result.value;
};

export const getError = <T>(result: Result<T>): ErrorDetails => {
  if (isSuccess(result)) throw new Error("Result is successful, no error.");
  return result.error;
};
