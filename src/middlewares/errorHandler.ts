import type { Request, Response, NextFunction } from "express";
import { isValidationError } from "errors/validationError";
import { isAppError } from "errors/appError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isValidationError(err)) {
    return res.status(400).json({
      error: "Validation failed",
      errors: err.notification.errors.map((e) => ({
        field: e.field,
        error: e.message,
      })),
    });
  }

  if (isAppError(err)) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
