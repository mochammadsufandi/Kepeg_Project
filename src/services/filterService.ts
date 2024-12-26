import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { SelectField } from "../utils/selectFunction";
import { PersonnelInterface } from "../interface/params/PersonnelInterface";
import { ConverterData } from "../utils/converterFunction";
import { FilterField } from "../interface/params/SelectField";
const prisma = new PrismaClient();

export class FilterService {
  static async filterNIPNRP(params: Request["headers"]): Promise<PersonnelInterface | null> {
    let NIP: string = "";
    let NRP: string = "";
    let personnel = {} as PersonnelInterface | null;
    const selectionColumn = SelectField.dynamicColumn();

    if (typeof params.nip === "string") {
      NIP = params.nip;
      personnel = await prisma.pegawai.findUnique({
        where: { NIP },
        select: selectionColumn,
      });
    } else if (typeof params.nrp === "string") {
      NRP = params.nrp;
      personnel = await prisma.pegawai.findUnique({
        where: { NRP },
        select: selectionColumn,
      });
    }

    return personnel;
  }

  static async searchByName(params: Request["headers"]): Promise<PersonnelInterface[]> {
    let name: string = "";
    const selectionColumn = SelectField.dynamicColumn();
    if (typeof params.nama === "string") {
      name = params.nama;
    }
    const personnels = await prisma.pegawai.findMany({
      where: {
        nama: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: selectionColumn,
    });
    return personnels;
  }

  static async dynamicFilter(params: Request["headers"]): Promise<PersonnelInterface[]> {
    const fields = params.filterfields;
    let filterFields = {} as FilterField;
    if (fields) {
      const object = JSON.parse(fields as unknown as string);
      filterFields = ConverterData.dynamicFieldConverter(object);
    }

    console.log(filterFields);
    const originalRank = filterFields.originalRank as string;
    const pendidikanTerakhir = filterFields.pendidikanTerakhir as string;
    const keterangan = filterFields.keterangan as string;
    const keteranganTambahan = filterFields.keteranganTambahan as string;

    const personnels = await prisma.pegawai.findMany({
      where: {
        ...filterFields,
        originalRank: {
          contains: originalRank,
          mode: "insensitive",
        },
        pendidikanTerakhir: {
          contains: pendidikanTerakhir,
          mode: "insensitive",
        },
        keterangan: {
          contains: keterangan,
          mode: "insensitive",
        },
        keteranganTambahan: {
          contains: keteranganTambahan,
          mode: "insensitive",
        },
      },
    });
    return personnels;
  }
}
