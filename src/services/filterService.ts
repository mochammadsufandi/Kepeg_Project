import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { SelectField } from "../utils/selectFunction";
import { PersonnelInterface } from "../interface/params/PersonnelInterface";
import { ConverterData } from "../utils/converterFunction";
import {
  DynamicFilterResult,
  FilterField,
  FilterSortResult,
  SortField,
  SortFieldResult,
} from "../interface/params/SelectField";
import CustomResponseError from "../middleware/errorClass/errorClass";
const prisma = new PrismaClient();

export class FilterService {
  static async filterNIPNRP(params: Request["headers"]): Promise<PersonnelInterface | null> {
    let NIP: string = "";
    let NRP: string = "";
    let personnel = {} as PersonnelInterface | null;
    const selectionColumn = SelectField.dynamicColumn();

    if (typeof params.nip === "string" && params.nip.length > 0) {
      NIP = params.nip;
      personnel = await prisma.pegawai.findUnique({
        where: { NIP },
        select: selectionColumn,
      });
    } else if (typeof params.nrp === "string" && params.nrp.length > 0) {
      NRP = params.nrp;
      personnel = await prisma.pegawai.findUnique({
        where: { NRP },
        select: selectionColumn,
      });
    }
    if (!personnel)
      throw new CustomResponseError({
        name: "NoData",
        statusCode: 400,
        message: "Failed to Fetch Personnel",
      });

    return personnel;
  }

  static async searchByName(params: Request["headers"]): Promise<FilterSortResult> {
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
    const count = await prisma.pegawai.count({
      where: {
        nama: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    if (personnels.length === 0)
      throw new CustomResponseError({
        name: "NoData",
        statusCode: 400,
        message: "Failed To Fetch Personnel",
      });
    return { personnel: personnels, count };
  }

  static async dynamicFilter(params: Request["headers"]): Promise<DynamicFilterResult> {
    const filterFieldsInput = params.filterfields;
    const sortFieldsInput = params.sortfields;
    let filterFields = {} as FilterField;
    let sortFields = [] as SortFieldResult[];
    const selectionField = SelectField.dynamicColumn();
    if (filterFieldsInput) {
      const object = JSON.parse(filterFieldsInput as unknown as string);
      filterFields = ConverterData.dynamicFieldConverter(object);
    }
    if (sortFieldsInput) {
      const object = JSON.parse(sortFieldsInput as unknown as string);
      sortFields = ConverterData.dynamicSortFieldConverter(object);
    }

    const originalRank = filterFields.originalRank as string;
    const pendidikanTerakhir = filterFields.pendidikanTerakhir as string;
    const keterangan = filterFields.keterangan as string;
    const keteranganTambahan = filterFields.keteranganTambahan as string;
    const namaJabatan = filterFields.namaJabatan as string;
    // const pangkatSejak = filterFields.pangkatSejak?.toISOString().split("T")[0];
    // Construct the orderBy array
    const orderBy = sortFields.map(({ field, direction }) => ({ [field]: direction }));
    let orderField = {} as SortField;
    for (const value of orderBy) {
      orderField = { ...orderField, ...value };
    }
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
        namaJabatan: {
          contains: namaJabatan,
          mode: "insensitive",
        },
      },
      orderBy: orderBy,
      select: selectionField,
    });
    const count = await prisma.pegawai.count({
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
        namaJabatan: {
          contains: namaJabatan,
          mode: "insensitive",
        },
      },
      orderBy: orderBy,
    });
    if (personnels.length === 0)
      throw new CustomResponseError({
        name: "NoData",
        statusCode: 400,
        message: "Failed to Fetch Personnels",
      });
    return {
      personnels: personnels,
      filterField: filterFields,
      sortField: orderField,
      count,
    };
  }
}
