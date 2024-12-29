import { SingleEditParams } from "../interface/params/InputParams";
import CustomResponseError from "../middleware/errorClass/errorClass";
import { ConverterData } from "../utils/converterFunction";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EditService {
  static async editPersonnel(params: SingleEditParams): Promise<void> {
    const editField = { ...params, numericRank: 0, promotionChecking: false };
    if (editField.tanggalLahir) {
      const tanggalLahir = new Date(editField.tanggalLahir);
      if (tanggalLahir.toString() !== "Invalid Date") {
        editField.tanggalLahir = tanggalLahir;
      }
    }
    if (editField.pangkatSejak) {
      const pangkatSejak = new Date(editField.pangkatSejak);
      if (pangkatSejak.toString() !== "Invalid Date") {
        editField.pangkatSejak = pangkatSejak;
      }
    }
    if (editField.jabatanSejak) {
      const jabatanSejak = new Date(editField.jabatanSejak);
      if (jabatanSejak.toString() !== "Invalid Date") {
        editField.jabatanSejak = jabatanSejak;
      }
    }
    if (editField.PNSSejak) {
      const PNSSejak = new Date(editField.PNSSejak);
      if (PNSSejak.toString() !== "Invalid Date") {
        editField.PNSSejak = PNSSejak;
      }
    }
    if (editField.promotionYAD) {
      const promotionYAD = new Date(editField.promotionYAD);
      if (promotionYAD.toString() !== "Invalid Date") {
        editField.promotionYAD = promotionYAD;
      }
    }
    if (editField.jaksa?.toString() === "true") {
      editField.jaksa = true;
    }
    editField.jabatanId = parseInt(editField.jabatanId?.toString() as string);
    editField.unitId = parseInt(editField.unitId?.toString() as string);
    editField.numericRank = ConverterData.numericRankConverter(editField.originalRank as string);
    editField.promotionChecking = ConverterData.promotionCheckingConverter({
      pendidikanTerakhir: editField?.pendidikanTerakhir as string,
      numericRank: editField.numericRank,
    });
    const existingPersonnel = await prisma.pegawai.findUnique({
      where: {
        NIP: editField.NIP,
      },
    });
    if (!existingPersonnel)
      throw new CustomResponseError({
        name: "PersonnelNotFound",
        statusCode: 400,
        message: "Personnel is Not Found",
      });
    console.log(editField);
    await prisma.pegawai.update({
      where: {
        NIP: editField.NIP,
      },
      data: editField,
    });
  }
}

export default EditService;
