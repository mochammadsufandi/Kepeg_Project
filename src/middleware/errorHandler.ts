import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../interface/errorInterface";
import CustomResponseError from "./errorClass/errorClass";

export const errorHandler: ErrorRequestHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(err);
  switch (true) {
    case err instanceof CustomResponseError:
      res.status(err.statusCode).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
  next();
};
