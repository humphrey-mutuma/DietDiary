// catch errors here
import { Request, Response, NextFunction } from "express";


// Define types for the function parameters and return value
type AsyncHandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Define the asyncErrorHandler function with TypeScript types
export const asyncErrorHandler = (fn: AsyncHandlerFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);