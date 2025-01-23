import { DynamicSelectFieldInput, SingleEditParams } from "../interface/params/InputParams";
import CustomResponseError from "../middleware/errorClass/errorClass";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DeleteService {
  static async marker(params: SingleEditParams): Promise<void> {
    const { NIP, marker } = params;
    let boolMarker: boolean;
    if (!NIP)
      throw new CustomResponseError({
        name: "InvalidInput",
        statusCode: 400,
        message: "NIP is not Found, please input required field",
      });
    const existingPersonnel = await prisma.pegawai.findUnique({
      where: { NIP },
    });
    if (!existingPersonnel)
      throw new CustomResponseError({
        name: "NotFound",
        statusCode: 400,
        message: "Personnel is Not Found",
      });
    if (marker) {
      boolMarker = true;
    } else {
      boolMarker = false;
    }
    await prisma.pegawai.update({
      where: { NIP },
      data: {
        marker: boolMarker,
      },
    });
  }

  static async delete(params: DynamicSelectFieldInput): Promise<void> {
    const { NIP } = params;
    if (!NIP)
      throw new CustomResponseError({
        name: "InvalidInput",
        statusCode: 400,
        message: "NIP is not Found, please input required field",
      });
    const existingPersonnel = await prisma.pegawai.findUnique({
      where: { NIP },
    });
    if (!existingPersonnel)
      throw new CustomResponseError({
        name: "NotFound",
        statusCode: 400,
        message: "Personnel is Not Found",
      });
    await prisma.pegawai.delete({
      where: { NIP },
    });
  }
}

export default DeleteService;
