import { NextFunction, Request, Response } from "express";
import ExportService from "../services/exportService";

class ExportController {
  static async exportFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.query.cacheId as string;
      const data = await ExportService.exportFile(params);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      res.setHeader("Content-Disposition", 'attachment; filename="report.docx"');
      res.send(data);
    } catch (err) {
      next(err);
    }
  }
}

export default ExportController;
