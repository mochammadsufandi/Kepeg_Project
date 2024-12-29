import { NextFunction, Request, Response } from "express";
import EditService from "../services/editService";

class EditController {
  static async editPersonnel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      const personnel = await EditService.editPersonnel(params);
      res.status(200).json({
        message: "Edit Personnel is Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default EditController;
