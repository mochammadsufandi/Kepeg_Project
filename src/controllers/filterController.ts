import { Request, Response, NextFunction } from "express";
import { FilterService } from "../services/filterService";

export class FilterController {
  static async filterNIPNRP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.headers;
      const personnels = await FilterService.filterNIPNRP(params);
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
      });
    } catch (err) {
      next(err);
    }
  }

  static async searchByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.headers;
      const personnels = await FilterService.searchByName(params);
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
      });
    } catch (err) {
      next(err);
    }
  }

  static async dynamicFilter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.headers;
      const personnels = await FilterService.dynamicFilter(params);
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
      });
    } catch (err) {
      next(err);
    }
  }
}
