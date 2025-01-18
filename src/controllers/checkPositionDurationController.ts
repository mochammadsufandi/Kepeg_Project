import { NextFunction, Request, Response } from "express";
import CheckAndCronService from "../services/checkPositionDurationService";

class CheckControllerAndCron {
  static async checkPositionDuration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.headers;
      const duration = await CheckAndCronService.checkPositionDuration(params);
      res.status(200).json({
        message: "Cek Lama Jabatan Sukses",
        duration,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default CheckControllerAndCron;
