import CustomResponseError from "../middleware/errorClass/errorClass";
import { ConverterData } from "../utils/converterFunction";
import { Pegawai, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EditService {
  static async editPersonnel({ data, NIP }: { data: Pegawai; NIP: string }): Promise<void> {
    const editField = { ...data, numericRank: 0, promotionChecking: false };
    if (!NIP)
      throw new CustomResponseError({
        name: "InvalidRequestQuery",
        statusCode: 400,
        message: "No NIP in Request Query",
      });
    const existingPersonnel = await prisma.pegawai.findUnique({
      where: {
        NIP: NIP,
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
      if (!isNaN(tanggalLahir.getTime())) {
        const date = new Date(
          Date.UTC(
            tanggalLahir.getFullYear(),
            tanggalLahir.getMonth(),
            tanggalLahir.getDate(),
            0,
            0,
            0,
            0
          )
        );
        editField.tanggalLahir = date;
      } else {
        editField.tanggalLahir = null;
      }
    }
    if (editField.pangkatSejak) {
      const pangkatSejak = new Date(editField.pangkatSejak);
      if (!isNaN(pangkatSejak.getTime())) {
        const date = new Date(
          Date.UTC(
            pangkatSejak.getFullYear(),
            pangkatSejak.getMonth(),
            pangkatSejak.getDate(),
            0,
            0,
            0,
            0
          )
        );
        editField.pangkatSejak = date;
      } else {
        editField.pangkatSejak = null;
      }
    }
    if (editField.jabatanSejak) {
      const jabatanSejak = new Date(editField.jabatanSejak);
      if (!isNaN(jabatanSejak.getTime())) {
        const date = new Date(
          Date.UTC(
            jabatanSejak.getFullYear(),
            jabatanSejak.getMonth(),
            jabatanSejak.getDate(),
            0,
            0,
            0,
            0
          )
        );
        editField.jabatanSejak = date;
      } else {
        editField.jabatanSejak = null;
      }
    }
    if (editField.PNSSejak) {
      const PNSSejak = new Date(editField.PNSSejak);
      if (!isNaN(PNSSejak.getTime())) {
        const date = new Date(
          Date.UTC(PNSSejak.getFullYear(), PNSSejak.getMonth(), PNSSejak.getDate(), 0, 0, 0, 0)
        );
        editField.PNSSejak = date;
      } else {
        editField.PNSSejak = null;
      }
    }
    if (editField.promotionYAD) {
      const promotionYAD = new Date(editField.promotionYAD);
      if (!isNaN(promotionYAD.getTime())) {
        const date = new Date(
          Date.UTC(
            promotionYAD.getFullYear(),
            promotionYAD.getMonth(),
            promotionYAD.getDate(),
            0,
            0,
            0,
            0
          )
        );
        editField.promotionYAD = date;
      } else {
        editField.promotionYAD = null;
      }
    }
    if (editField.jaksaSejak) {
      const jaksaSejak = new Date(editField.jaksaSejak);
      if (!isNaN(jaksaSejak.getTime())) {
        const date = new Date(
          Date.UTC(
            jaksaSejak.getFullYear(),
            jaksaSejak.getMonth(),
            jaksaSejak.getDate(),
            0,
            0,
            0,
            0
          )
        );
        editField.jaksaSejak = date;
      } else {
        editField.jaksaSejak = null;
      }
    }
    if (editField.jaksa?.toString() === "true") {
      editField.jaksa = true;
    } else if (editField.jaksa?.toString() === "false") {
      editField.jaksa = false;
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
    if (editField.jaksa !== null && editField.originalRank !== null) {
      editField.originalRank = ConverterData.originalRankFullConverter({
        jaksa: editField.jaksa,
        originalRank: editField.originalRank,
      });
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
    if (editField.marker?.toString() === "true") {
      editField.marker = true;
    } else if (editField.marker?.toString() === "false") {
      editField.marker = false;
    }

    await prisma.pegawai.update({
      where: {
        NIP: editField.NIP,
      },
      data: editField,
    });
  }
}

export default EditService;
