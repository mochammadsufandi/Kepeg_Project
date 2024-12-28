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
      const genderConverter = parseInt(data.NIP.split(" ").join("")[14]);
      if (genderConverter === 1) {
        newObject.gender = "L";
      } else if (genderConverter === 2) {
        newObject.gender = "P";
      }
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
    console.log(convertData);
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
      "tempatLahir",
      "tanggalLahir",
      "originalRank",
      "pangkatSejak",
      "jabatanSejak",
      "pendidikanTerakhir",
      "jaksa",
      "keterangan",
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
      promotionYAD: new Date(),
      promotionChecking: false,
    };
    const genderConverter = parseInt(inputField.NIP.split(" ").join("")[14]);
    if (genderConverter === 1) {
      inputField.gender = "L";
    } else if (genderConverter === 2) {
      inputField.gender = "P";
    }
    if (inputField.tanggalLahir) {
      const tanggalLahir = new Date(inputField.tanggalLahir);
      if (tanggalLahir.toString() !== "Invalid Date") {
        inputField.tanggalLahir = tanggalLahir;
      }
    }
    if (inputField.pangkatSejak) {
      const pangkatSejak = new Date(inputField.pangkatSejak);
      if (pangkatSejak.toString() !== "Invalid Date") {
        inputField.pangkatSejak = pangkatSejak;
      }
    }
    if (inputField.jabatanSejak) {
      const jabatanSejak = new Date(inputField.jabatanSejak);
      if (jabatanSejak.toString() !== "Invalid Date") {
        inputField.jabatanSejak = jabatanSejak;
      }
    }
    if (inputField.PNSSejak) {
      const PNSSejak = new Date(inputField.PNSSejak);
      if (PNSSejak.toString() !== "Invalid Date") {
        inputField.PNSSejak = PNSSejak;
      }
    }
    if (inputField.jaksa.toString() === "true") {
      inputField.jaksa = true;
    }
    inputField.jabatanId = parseInt(inputField.jabatanId?.toString() as string);
    inputField.unitId = parseInt(inputField.unitId?.toString() as string);
    inputField.numericRank = ConverterData.numericRankConverter(inputField.originalRank);
    inputField.promotionYAD = ConverterData.promotionYADConverter(inputField.pangkatSejak);
    inputField.promotionChecking = ConverterData.promotionCheckingConverter({
      pendidikanTerakhir: inputField.pendidikanTerakhir,
      numericRank: inputField.numericRank,
    });

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
