import multer, { FileFilterCallback } from "multer";
import { multerPersonnel } from "../middleware/multer";
import { Request } from "express";
import path from "path";
import CustomResponseError from "../middleware/errorClass/errorClass";

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedExtension = [".docx", ".doc"];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  console.log(fileExtension);

  if (allowedExtension.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new CustomResponseError({
        name: "InvalidInputType",
        statusCode: 400,
        message: "Please Input the Allowed Image Extension",
      })
    );
  }
};

export const uploadFile = multer({
  storage: multerPersonnel,
  fileFilter: fileFilter,
}).single("InputFile");
