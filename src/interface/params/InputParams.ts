export interface InputMultipleParams {
  files: Express.Multer.File;
}

export interface FormatDataMultiple {
  NIP: string;
  NRP: string;
  nama: string;
  gender: string;
  tempatLahir: string;
  tanggalLahir: Date;
  originalRank: string;
  numericRank: number;
  pangkatSejak: Date;
  jabatanSejak: Date;
  PNSSejak: Date;
  pendidikanTerakhir: string;
  promotionYAD: Date;
  jaksa: boolean;
  keterangan: string;
  promotionChecking: boolean;
  marker: boolean;
  keteranganTambahan: string;
  jabatanId: number;
  unitId: number;
}
