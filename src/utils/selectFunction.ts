import { FilterField, SelectFieldInterface } from "../interface/params/SelectField";

export class SelectField {
  static dynamicColumn(): SelectFieldInterface {
    return {
      NIP: true,
      NRP: true,
      nama: true,
      gender: true,
      tempatLahir: true,
      tanggalLahir: true,
      originalRank: true,
      pangkatSejak: true,
      jabatanSejak: true,
      PNSSejak: true,
      pendidikanTerakhir: true,
      promotionYAD: true,
      jaksa: true,
      jaksaSejak: true,
      keterangan: true,
      promotionChecking: true,
      marker: true,
      keteranganTambahan: true,
      jabatanId: true,
      unitId: true,
      jabatan: true,
      unitKerja: true,
    };
  }

  // static dynamicFieldSelect(obj : any) : obj is FilterField {
  //   return (
  //     typeof obj.
  //   )
  // }
}
