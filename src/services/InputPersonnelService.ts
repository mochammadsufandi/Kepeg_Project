import mammoth from "mammoth";
import { InputMultipleParams } from "../interface/params/InputParams";
import CustomResponseError from "../middleware/errorClass/errorClass";

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
    console.log(extractResult.value);
  }
}

export default InputPersonnelService;
