export type ApiError = {
  message: string;
  statusCode: number;
  isOperational: boolean;
};

const createApiError = (
  message: string,
  statusCode: number,
  isOperational = true,
): ApiError => {
  return { message, statusCode, isOperational };
};

const errorDefinitions = {
  badRequest: { defaultMessage: "Bad Request", statusCode: 400 },
  notFound: { defaultMessage: "Not Found", statusCode: 404 },
  internal: { defaultMessage: "Internal Server Error", statusCode: 500 },
} as const;

export const Errors = Object.entries(errorDefinitions).reduce(
  (acc, [key, { defaultMessage, statusCode }]) => {
    acc[key as keyof typeof errorDefinitions] = (message?: string) =>
      createApiError(message ?? defaultMessage, statusCode);
    return acc;
  },
  {} as Record<string, (message?: string) => ApiError>,
);

export const isApiError = (error: any): error is ApiError => {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.statusCode === "number"
  );
};
