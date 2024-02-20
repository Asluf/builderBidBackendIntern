import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging

  if (res.headersSent) {
    return next(err); // If headers are already sent, pass the error to the default Express error handler
  }

  // Handle specific errors
  if (err.message === "Invalid data") {
    return res.status(400).json({ message: "Invalid data" });
  }

  // Handle other errors
  return res.status(500).json({ message: "Internal Server Error" });
};
