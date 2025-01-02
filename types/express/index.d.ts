import "express";
import { FilterField } from "../../src/interface/params/SelectField";
import { IncomingHttpHeaders } from "http";
import { DynamicSelectFieldInput } from "../../src/interface/params/InputParams";

declare global {
  namespace Express {
    interface Request {
      headers: {
        nip: string;
        nrp: string;
        nama: string;
      } & IncomingHttpHeaders;
    }
  }
}

declare module "http" {
  interface IncomingHttpHeaders {
    filterfields: FilterField;
    sortfields: DynamicSelectFieldInput;
  }
}
