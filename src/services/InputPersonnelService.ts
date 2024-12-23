import mammoth from "mammoth";
import { InputMultipleParams } from "../interface/params/InputParams";
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
}

export default InputPersonnelService;
