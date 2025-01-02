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
  [key: string]: string;
}

export interface SingleInputParams extends FormatDataMultiple {}

export interface SingleEditParams {
  NIP: string | undefined;
  NRP: string | undefined;
  nama: string | undefined;
  tempatLahir: string | undefined;
  tanggalLahir: Date | undefined;
  originalRank: string | undefined;
  pangkatSejak: Date | undefined;
  jabatanSejak: Date | undefined;
  PNSSejak: Date | undefined;
  pendidikanTerakhir: string | undefined;
  promotionYAD: Date | undefined;
  jaksa: boolean | undefined;
  jaksaSejak: Date | undefined;
  namaJabatan: string | undefined;
  jabatanId: number | undefined;
  unitId: number | undefined;
  gender: string | undefined;
  marker: boolean | undefined;
  keteranganTambahan: string | undefined;
}
