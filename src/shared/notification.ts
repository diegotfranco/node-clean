export type NotificationItem = {
  field: string;
  message: string;
};

export type Notification = {
  errors: NotificationItem[];
};

export const createNotification = (): Notification => ({
  errors: [],
});

export const addError = (
  notification: Notification,
  field: string,
  message: string,
): Notification => ({
  errors: [...notification.errors, { field, message }],
});

export const hasErrors = (notification: Notification): boolean =>
  notification.errors.length > 0;

export const getErrors = (notification: Notification): NotificationItem[] =>
  notification.errors;

// Função para converter erro do Zod em Notification
import { ZodError } from "zod";

export const notificationFromZodError = (error: ZodError): Notification => {
  return {
    errors: error.errors.map((issue) => ({
      field: issue.path.join(".") || "unknown",
      message: issue.message,
    })),
  };
};
