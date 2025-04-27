import type { Request, Response, NextFunction, RequestHandler } from "express";
import { asyncHandler } from "utils/asyncHandler";

// Esta função recebe um objeto de handlers e aplica asyncHandler em todos eles
export const wrapAsyncHandlers = <
  T extends Record<
    string,
    (req: Request, res: Response, next: NextFunction) => Promise<any>
  >,
>(
  handlers: T,
): { [K in keyof T]: RequestHandler } => {
  const wrapped = {} as { [K in keyof T]: RequestHandler };

  for (const key in handlers) {
    if (typeof handlers[key] === "function") {
      wrapped[key] = asyncHandler(handlers[key]);
    }
  }

  return wrapped;
};
