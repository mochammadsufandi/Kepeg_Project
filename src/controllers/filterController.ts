import { Request, Response, NextFunction } from "express";
import { FilterService } from "../services/filterService";
import { v4 as uuidv4 } from "uuid";
import { cacheData } from "../utils/cacheData";

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
      const filterCache = cacheData;
      const data = await FilterService.dynamicFilter(params);
      const { personnels, filterField, sortField } = data;
      const cacheId = uuidv4();
      filterCache.set(cacheId, { personnels, filterField, sortField });
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
        cacheId,
        filterField,
      });
    } catch (err) {
      next(err);
    }
  }
}
