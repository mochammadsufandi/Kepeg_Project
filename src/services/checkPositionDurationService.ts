import { PrismaClient } from "@prisma/client";
import CustomResponseError from "../middleware/errorClass/errorClass";
import { Request } from "express";
const prisma = new PrismaClient();

class CheckAndCronService {
  static async checkPositionDuration(param: Request["headers"]): Promise<string> {
    const { nip: NIP } = param;
    const personnel = await prisma.pegawai.findUnique({
      where: { NIP: NIP as string },
    });
    if (!personnel)
      throw new CustomResponseError({
        name: "NoFound",
        statusCode: 400,
        message: "No Personnel Found",
      });
    const nowDate = new Date().getTime();
    const jabatanDate = personnel.jabatanSejak?.getTime();
    if (!jabatanDate)
      throw new CustomResponseError({
        name: "InvalidRequest",
        statusCode: 400,
        message: "Can't check position duration because the jabatan sejak is not existing",
      });
    const year = Math.floor((nowDate - jabatanDate) / (1000 * 3600 * 24 * 30 * 12));
    let month: number;
    if (year < 1) {
      month = Math.floor((nowDate - jabatanDate) / (1000 * 3600 * 24 * 30));
    } else {
      month = Math.floor(
        ((nowDate - jabatanDate) % (1000 * 3600 * 24 * 30 * 12)) / (1000 * 3600 * 24 * 30)
      );
    }
    return `${year} tahun, ${month} bulan`;
  }

  static async cronForCheckingPromotion() {}
}

export default CheckAndCronService;
