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
