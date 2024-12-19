import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../utils/uploadFile";
import InputPersonnelService from "../services/InputPersonnelService";

class InputPersonnelController {
  static async inputMultiple(req: Request, res: Response, next: NextFunction): Promise<void> {
    uploadFile(req, res, async (multererror) => {
      if (multererror) return next(multererror);

      try {
        const files = req.file as Express.Multer.File;
        const params = { files };
        await InputPersonnelService.InputMultiple(params);
        res.status(200).json({
          message: "Input Multiple Personnel is Success",
        });
      } catch (err) {
        console.log(err);
        next(err);
      }
    });
  }
}

export default InputPersonnelController;
