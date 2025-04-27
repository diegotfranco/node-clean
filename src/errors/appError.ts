export type AppError = {
  message: string;
  statusCode: number;
  isOperational: boolean;
};

const createAppError = (
  message: string,
  statusCode: number,
  isOperational = true,
): AppError => {
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
      createAppError(message ?? defaultMessage, statusCode);
    return acc;
  },
  {} as Record<string, (message?: string) => AppError>,
);

export const isAppError = (error: any): error is AppError => {
  return (
    error &&
    typeof error.message === "string" &&
    typeof error.statusCode === "number"
  );
};
