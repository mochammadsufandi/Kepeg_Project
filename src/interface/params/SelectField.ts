import { Pegawai } from "@prisma/client";

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
  jabatanId: boolean | undefined;
  unitId: boolean | undefined;
  jabatan: boolean | undefined;
  unitKerja: boolean | undefined;
}

export interface FilterField extends Omit<Pegawai, "NIP" | "NRP" | "nama"> {}
