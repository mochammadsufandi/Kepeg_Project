import { NextFunction, Request, Response } from "express";
import DeleteService from "../services/deleteService";

class DeleteController {
  static async marker(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      await DeleteService.marker(params);
      res.status(200).json({
        message: "Mark Personnel is Successfully ",
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.body;
      await DeleteService.delete(params);
      res.status(200).json({
        message: "Delete Personnel is Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default DeleteController;
