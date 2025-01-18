import { Request, Response, NextFunction } from "express";
import { FilterService } from "../services/filterService";
import { v4 as uuidv4 } from "uuid";
import { cacheData } from "../utils/cacheData";

export class FilterController {
  static async filterNIPNRP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.headers;
      const searchCache = cacheData;
      const personnels = await FilterService.filterNIPNRP(params);
      const cacheId = uuidv4();
      searchCache.set(cacheId, {
        personnels: [personnels],
        filterField: [{ searchBy: "NIP/NRP" }],
        sortField: {},
      });
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
        cacheId,
        sortField: { sortBy: "" },
        filterField: { searchBy: "NIP/NRP" },
      });
    } catch (err) {
      next(err);
    }
  }

  static async searchByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.headers;
      const searchCache = cacheData;
      const { personnel, count } = await FilterService.searchByName(params);
      const cacheId = uuidv4();
      searchCache.set(cacheId, {
        personnels: personnel,
        count,
        filterField: [{ searchBy: "name" }],
        sortField: {},
      });
      const { nama } = params;
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnel,
        cacheId,
        filterField: { nama: nama },
        sortField: { sortBy: "" },
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
      const { personnels, filterField, sortField, count } = data;
      const cacheId = uuidv4();
      filterCache.set(cacheId, { personnels, filterField, sortField, count });
      res.status(200).json({
        message: "Fetch Successfully",
        data: personnels,
        cacheId,
        filterField,
        sortField,
        count,
      });
    } catch (err) {
      next(err);
    }
  }
}
