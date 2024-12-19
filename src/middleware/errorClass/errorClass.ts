import { CustomError } from "../../interface/errorInterface";

class CustomResponseError extends Error implements CustomError {
  statusCode: number;

  constructor({ message, statusCode, name }: CustomError) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

export default CustomResponseError;
