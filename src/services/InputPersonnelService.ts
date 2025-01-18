import mammoth from "mammoth";
import { SingleInputParams, InputMultipleParams } from "../interface/params/InputParams";
import CustomResponseError from "../middleware/errorClass/errorClass";
import { ConverterData } from "../utils/converterFunction";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class InputPersonnelService {
  static async InputMultiple(params: InputMultipleParams) {
    if (!params.files)
      throw new CustomResponseError({
        name: "InvalidInputType",
        statusCode: 400,
        message: "Please Input Required File",
      });
    const fileToExtract = params.files?.buffer;
    const extractResult = await mammoth.extractRawText({
      buffer: fileToExtract,
    });
    const extractResultArray = extractResult.value.split("\n").filter((line) => line.trim() !== "");

    const data = ConverterData.arrangeArrayObjectData(extractResultArray);
    const convertData = data.map((data) => {
      const newObject = {
        ...data,
        gender: "",
        numericRank: 0,
        promotionYAD: new Date(),
        promotionChecking: true,
      };
      const genderConverter = ConverterData.GenderConverter(data.NIP);
      newObject.gender = genderConverter;
      const numericRankConverter = ConverterData.numericRankConverter(data.originalRank);
      newObject.numericRank = numericRankConverter;
      const promotionYAD = ConverterData.promotionYADConverter(data.pangkatSejak);
      newObject.promotionYAD = promotionYAD;
      const promotionCheckingConverter = ConverterData.promotionCheckingConverter({
        pendidikanTerakhir: newObject.pendidikanTerakhir,
        numericRank: newObject.numericRank,
      });
      newObject.promotionChecking = promotionCheckingConverter;
      return newObject;
    });
    await prisma.pegawai.createMany({
      data: convertData,
    });
  }

  static async inputSingle(params: SingleInputParams): Promise<void> {
    const keyArrayCheck = Object.keys(params);
    const requiredField = [
      "NIP",
      "NRP",
      "nama",
      // "tempatLahir",
      // "tanggalLahir",
      // "originalRank",
      // "pangkatSejak",
      // "namaJabatan",
      // "jabatanSejak",
      // "pendidikanTerakhir",
      // "jaksa",
      // "keterangan",
    ];
    requiredField.forEach((value) => {
      if (!keyArrayCheck.includes(value)) {
        throw new CustomResponseError({
          name: "InvalidInput",
          statusCode: 400,
          message: "Please Input All Required Field",
        });
      }
    });
    const inputField = {
      ...params,
      gender: "",
      numericRank: 0,
      promotionYAD: new Date() as Date | null,
      promotionChecking: false as boolean | null,
    };
    inputField.gender = ConverterData.GenderConverter(inputField.NIP);
    if (inputField.tanggalLahir) {
      const tanggalLahir = new Date(inputField.tanggalLahir);
      const timeZoneOffset = tanggalLahir.getTimezoneOffset() / 60;
      tanggalLahir.setHours(tanggalLahir.getHours() - timeZoneOffset);
      if (tanggalLahir.toString() !== "Invalid Date") {
        inputField.tanggalLahir = tanggalLahir;
      } else {
        inputField.tanggalLahir = null;
      }
    }
    if (inputField.pangkatSejak) {
      const pangkatSejak = new Date(inputField.pangkatSejak);
      const timeZoneOffset = pangkatSejak.getTimezoneOffset() / 60;
      pangkatSejak.setHours(pangkatSejak.getHours() - timeZoneOffset);
      if (pangkatSejak.toString() !== "Invalid Date") {
        inputField.pangkatSejak = pangkatSejak;
      } else {
        inputField.pangkatSejak = null;
      }
    }
    if (inputField.jabatanSejak) {
      const jabatanSejak = new Date(inputField.jabatanSejak);
      const timeZoneOffset = jabatanSejak.getTimezoneOffset() / 60;
      jabatanSejak.setHours(jabatanSejak.getHours() - timeZoneOffset);
      if (jabatanSejak.toString() !== "Invalid Date") {
        inputField.jabatanSejak = jabatanSejak;
      } else {
        inputField.jabatanSejak = null;
      }
    }
    if (inputField.PNSSejak) {
      const PNSSejak = new Date(inputField.PNSSejak);
      const timeZoneOffset = PNSSejak.getTimezoneOffset() / 60;
      PNSSejak.setHours(PNSSejak.getHours() - timeZoneOffset);
      if (PNSSejak.toString() !== "Invalid Date") {
        inputField.PNSSejak = PNSSejak;
      } else {
        inputField.PNSSejak = null;
      }
    }
    if (inputField.jaksaSejak) {
      const jaksaSejak = new Date(inputField.jaksaSejak);
      const timeZoneOffset = jaksaSejak.getTimezoneOffset() / 60;
      jaksaSejak.setHours(jaksaSejak.getHours() - timeZoneOffset);
      if (jaksaSejak.toString() !== "Invalid Date") {
        inputField.jaksaSejak = jaksaSejak;
      } else {
        inputField.jaksaSejak = null;
      }
    }
    inputField.promotionYAD =
      inputField.pangkatSejak !== null
        ? ConverterData.promotionYADConverter(inputField.pangkatSejak)
        : null;
    if (inputField.jaksa?.toString() === "true") {
      inputField.jaksa = true;
    } else if (inputField.jaksa?.toString() === "false") {
      inputField.jaksa = false;
    }
    if (inputField.jabatanId) {
      inputField.jabatanId = parseInt(inputField.jabatanId?.toString() as string);
    }
    if (inputField.unitId) {
      inputField.unitId = parseInt(inputField.unitId?.toString() as string);
    }
    if (inputField.jaksa !== null && inputField.originalRank !== null) {
      inputField.originalRank = ConverterData.originalRankFullConverter({
        jaksa: inputField.jaksa,
        originalRank: inputField.originalRank,
      });
    }
    inputField.numericRank =
      inputField.originalRank !== null
        ? ConverterData.numericRankConverter(inputField.originalRank)
        : 0;
    inputField.promotionChecking =
      inputField.pendidikanTerakhir !== null && inputField.numericRank !== null
        ? ConverterData.promotionCheckingConverter({
            pendidikanTerakhir: inputField.pendidikanTerakhir,
            numericRank: inputField.numericRank,
          })
        : null;
    console.log(inputField);
    const existingPersonnel = await prisma.pegawai.findUnique({
      where: {
        NIP: inputField.NIP,
      },
    });
    if (existingPersonnel)
      throw new CustomResponseError({
        name: "InvalidInput",
        statusCode: 400,
        message: "Personnel is Already Exist",
      });
    await prisma.pegawai.create({
      data: inputField,
    });
  }
}

export default InputPersonnelService;
