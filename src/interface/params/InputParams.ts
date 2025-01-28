export interface InputMultipleParams {
  files: Express.Multer.File;
}

export interface FormatDataMultiple {
  NIP: string;
  NRP: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: Date;
  originalRank: string;
  eselon: string;
  pangkatSejak: Date;
  jabatanSejak: Date;
  PNSSejak: Date | null;
  pendidikanTerakhir: string;
  jaksa: boolean;
  jaksaSejak: Date | null;
  namaJabatan: string;
  keterangan: string;
  jabatanId: number | null;
  unitId: number | null;
}

export interface PromotionCheckingConverterInput {
  pendidikanTerakhir: string;
  numericRank: number;
}

export interface DynamicSelectFieldInput {
  [key: string]: string | null;
}

export interface SingleInputParams {
  NIP: string;
  NRP: string;
  nama: string;
  tempatLahir: string | null;
  tanggalLahir: Date | null;
  originalRank: string | null;
  eselon: string | null;
  pangkatSejak: Date | null;
  jabatanSejak: Date | null;
  PNSSejak: Date | null;
  pendidikanTerakhir: string | null;
  jaksa: boolean | null;
  jaksaSejak: Date | null;
  namaJabatan: string | null;
  keterangan: string | null;
  jabatanId: number | null;
  unitId: number | null;
}

export interface SingleEditParams {
  NIP: string;
  NRP: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: Date;
  originalRank: string;
  pangkatSejak: Date;
  jabatanSejak: Date;
  PNSSejak: Date;
  pendidikanTerakhir: string;
  promotionYAD: Date;
  jaksa: boolean;
  jaksaSejak: Date;
  namaJabatan: string;
  jabatanId: number;
  unitId: number;
  gender: string;
  marker: boolean;
  keteranganTambahan: string;
}
