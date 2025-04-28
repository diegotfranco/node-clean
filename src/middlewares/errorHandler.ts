import type { ErrorRequestHandler } from "express";
import { isValidationError } from "errors/validationError";
import { isAppError } from "errors/appError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (isValidationError(err)) {
    res.status(400).json({
      error: "Validation failed",
      errors: err.notification.errors.map((e) => ({
        field: e.field,
        error: e.message,
      })),
    });
    return;
  }

  if (isAppError(err)) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
