import type { Notification } from "shared/notification";

export const createValidationError = (notification: Notification) => ({
  type: "ValidationError" as const,
  message: "Validation failed",
  notification,
});

export type ValidationError = ReturnType<typeof createValidationError>;

export const isValidationError = (error: unknown): error is ValidationError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    (error as any).type === "ValidationError"
  );
};
