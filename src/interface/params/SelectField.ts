import { Pegawai } from "@prisma/client";

import { PersonnelInterface } from "./PersonnelInterface";

export interface SelectFieldInterface {
  NIP: boolean | undefined;
  NRP: boolean | undefined;
  nama: boolean | undefined;
  gender: boolean | undefined;
  tempatLahir: boolean | undefined;
  tanggalLahir: boolean | undefined;
  originalRank: boolean | undefined;
  pangkatSejak: boolean | undefined;
  jabatanSejak: boolean | undefined;
  PNSSejak: boolean | undefined;
  pendidikanTerakhir: boolean | undefined;
  promotionYAD: boolean | undefined;
  jaksa: boolean | undefined;
  jaksaSejak: boolean | undefined;
  keterangan: boolean | undefined;
  promotionChecking: boolean | undefined;
  marker: boolean | undefined;
  keteranganTambahan: boolean | undefined;
  namaJabatan: boolean | undefined;
  jabatanId: boolean | undefined;
  unitId: boolean | undefined;
  jabatan: boolean | undefined;
  unitKerja: boolean | undefined;
}

export interface FilterField extends Omit<Pegawai, "NIP" | "NRP" | "nama"> {}

export interface SortField {
  nama: string | undefined;
  tanggalLahir: string | undefined;
  tempatLahir: string | undefined;
  numericRank: string | undefined;
  pangkatSejak: string | undefined;
  jabatanSejak: string | undefined;
  PNSSejak: string | undefined;
  promotionYAD: string | undefined;
  jaksaSejak: string | undefined;
  unitId: string | undefined;
}

export interface DynamicFilterResult {
  personnels: PersonnelInterface[];
  filterField: FilterField;
  sortField: SortField;
  count: number;
}

export interface SortFieldResult {
  field: string;
  direction: string;
}

export interface FilterSortResult {
  personnel: PersonnelInterface | PersonnelInterface[];
  count: number;
}
