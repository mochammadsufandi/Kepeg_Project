import mammoth from "mammoth";

interface InputMultipleParams {
  files: Express.Multer.File;
}

class InputPersonnelService {
  static async InputMultiple(params: InputMultipleParams) {
    // const extractTextFromWord = async (filepath: Buffer<ArrayBufferLike>) => {
    //   const result = await mammoth.extractRawText({ filepath });
    //   console.log(result);
    // };
    // extractTextFromWord(params.files.buffer);
    const fileBuffer = params.files.buffer;
    const oi = await mammoth.extractRawText({ buffer: fileBuffer });
    console.log(oi);
  }
}

export default InputPersonnelService;
