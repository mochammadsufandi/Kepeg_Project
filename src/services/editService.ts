import CustomResponseError from "../middleware/errorClass/errorClass";
import { ConverterData } from "../utils/converterFunction";
import { Pegawai, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EditService {
  static async editPersonnel(params: Pegawai): Promise<void> {
    const editField = { ...params, numericRank: 0, promotionChecking: false };

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

    if (editField.tanggalLahir) {
      const tanggalLahir = new Date(editField.tanggalLahir);
      if (tanggalLahir.toString() !== "Invalid Date") {
        editField.tanggalLahir = tanggalLahir;
      } else {
        editField.tanggalLahir = null;
      }
    }
    if (editField.pangkatSejak) {
      const pangkatSejak = new Date(editField.pangkatSejak);
      if (pangkatSejak.toString() !== "Invalid Date") {
        editField.pangkatSejak = pangkatSejak;
      } else {
        editField.pangkatSejak = null;
      }
    }
    if (editField.jabatanSejak) {
      const jabatanSejak = new Date(editField.jabatanSejak);
      if (jabatanSejak.toString() !== "Invalid Date") {
        editField.jabatanSejak = jabatanSejak;
      } else {
        editField.jabatanSejak = null;
      }
    }
    if (editField.PNSSejak) {
      const PNSSejak = new Date(editField.PNSSejak);
      if (PNSSejak.toString() !== "Invalid Date") {
        editField.PNSSejak = PNSSejak;
      } else {
        editField.PNSSejak = null;
      }
    }
    if (editField.promotionYAD) {
      const promotionYAD = new Date(editField.promotionYAD);
      if (promotionYAD.toString() !== "Invalid Date") {
        editField.promotionYAD = promotionYAD;
      } else {
        editField.promotionYAD = null;
      }
    }
    if (editField.jaksa?.toString() === "true") {
      editField.jaksa = true;
    }
    if (editField.NIP) {
      editField.gender = ConverterData.GenderConverter(editField.NIP);
    }
    if (editField.jabatanId) {
      editField.jabatanId = parseInt(editField.jabatanId?.toString() as string);
    }
    if (editField.unitId) {
      editField.unitId = parseInt(editField.unitId?.toString() as string);
    }
    if (editField.originalRank) {
      editField.numericRank = ConverterData.numericRankConverter(editField.originalRank);
    }
    if (editField.pendidikanTerakhir && editField.numericRank) {
      editField.promotionChecking = ConverterData.promotionCheckingConverter({
        pendidikanTerakhir: editField?.pendidikanTerakhir as string,
        numericRank: editField.numericRank,
      });
    }
    console.log(editField);

    // await prisma.pegawai.update({
    //   where: {
    //     NIP: editField.NIP,
    //   },
    //   data: editField,
    // });
  }
}

export default EditService;
