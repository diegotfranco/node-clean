import type { Request, Response } from "express"

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    error: "Not Found",
    method: req.method,
    path: req.originalUrl,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};
