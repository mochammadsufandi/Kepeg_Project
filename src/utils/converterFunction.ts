import {
  DynamicSelectFieldInput,
  FormatDataMultiple,
  PromotionCheckingConverterInput,
} from "../interface/params/InputParams";
import { FilterField } from "../interface/params/SelectField";

export class ConverterData {
  static arrangeArrayObjectData(data: string[]): FormatDataMultiple[] {
    const arrayObjectData: FormatDataMultiple[] = [];
    const chunkSize = 14;

    for (let i = 14; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);

      const obj = {} as FormatDataMultiple;
      chunk.forEach((value, idx) => {
        switch (idx) {
          case 0:
            obj["NIP"] = value.split(" ").join("");
            break;
          case 1:
            obj["NRP"] = value;
            break;
          case 2:
            obj["nama"] = value;
            break;
          case 3:
            obj["tempatLahir"] = value;
            break;
          case 4: {
            const [day, month, year] = value.split("-").map(Number);
            obj["tanggalLahir"] = new Date(Date.UTC(year, month - 1, day));
            break;
          }
          case 5:
            obj["originalRank"] = value;
            break;
          case 6:
            // eslint-disable-next-line no-case-declarations
            const [day, month, year] = value.split("-").map(Number);
            obj["pangkatSejak"] = new Date(Date.UTC(year, month - 1, day));
            break;
          case 7: {
            const [day, month, year] = value.split("-").map(Number);
            obj["jabatanSejak"] = new Date(Date.UTC(year, month - 1, day));
            break;
          }
          case 8: {
            const [day, month, year] = value.split("-").map(Number);
            if (value === "-") {
              obj["PNSSejak"] = null;
            } else {
              obj["PNSSejak"] = new Date(Date.UTC(year, month - 1, day));
            }
            break;
          }
          case 9:
            obj["pendidikanTerakhir"] = value;
            break;
          case 10: {
            const [day, month, year] = value.split("-").map(Number);
            if (value === "-") {
              obj["jaksaSejak"] = null;
            } else {
              obj["jaksaSejak"] = new Date(Date.UTC(year, month - 1, day));
            }
            break;
          }
          case 11:
            obj["keterangan"] = value;
            break;
          case 12:
            obj["unitId"] = parseInt(value);
            break;
          case 13:
            obj["jabatanId"] = parseInt(value);
        }
      });
      if (obj["jaksaSejak"]) obj["jaksa"] = true;
      arrayObjectData.push(obj);
    }
    return arrayObjectData;
  }

  static numericRankConverter(params: string): number {
    const originalRank = params.match(/\(.*?\)/g)?.[0];
    let numericRank = 0;
    switch (originalRank) {
      case "(IV/e)":
        numericRank = 17;
        break;
      case "(IV/d)":
        numericRank = 16;
        break;
      case "(IV/c)":
        numericRank = 15;
        break;
      case "(IV/b)":
        numericRank = 14;
        break;
      case "(IV/a)":
        numericRank = 13;
        break;
      case "(III/d)":
        numericRank = 12;
        break;
      case "(III/c)":
        numericRank = 11;
        break;
      case "(III/b)":
        numericRank = 10;
        break;
      case "(III/a)":
        numericRank = 9;
        break;
      case "(II/d)":
        numericRank = 8;
        break;
      case "(II/c)":
        numericRank = 7;
        break;
      case "(II/b)":
        numericRank = 6;
        break;
      case "(II/a)":
        numericRank = 5;
        break;
      case "(Id)":
        numericRank = 4;
        break;
      case "(Ic)":
        numericRank = 3;
        break;
      case "Ib":
        numericRank = 2;
        break;
      case "Ia":
        numericRank = 1;
        break;
    }
    return numericRank;
  }

  static promotionYADConverter(params: Date): Date {
    const lastPromotionDate = new Date(params);
    lastPromotionDate.setFullYear(lastPromotionDate.getFullYear() + 4);
    return lastPromotionDate;
  }

  static promotionCheckingConverter(params: PromotionCheckingConverterInput): boolean {
    const doctoral = /Dr./g.test(params.pendidikanTerakhir);
    const magister = /M./g.test(params.pendidikanTerakhir);
    const bachelor = /S./g.test(params.pendidikanTerakhir);
    const diploma = /D.III/g.test(params.pendidikanTerakhir);
    const SMA = /SM/g.test(params.pendidikanTerakhir);
    if (doctoral && params.numericRank < 16) {
      return true;
    } else if (magister && params.numericRank < 13) {
      return true;
    } else if (bachelor && params.numericRank < 12) {
      return true;
    } else if (diploma && params.numericRank < 10) {
      return true;
    } else if (SMA && params.numericRank < 10) {
      return true;
    } else {
      return false;
    }
  }

  static dynamicFieldConverter = (params: DynamicSelectFieldInput): FilterField => {
    const result = {} as FilterField;
    Object.keys(params).forEach((key) => {
      switch (key) {
        case "gender":
          result.gender = params.gender;
          break;
        case "tempatLahir":
          result.tempatLahir = params.tempatLahir;
          break;
        case "tanggalLahir": {
          const tanggalLahir = new Date(params[key]);
          if (tanggalLahir.toString() !== "Invalid Date") {
            result.tanggalLahir = tanggalLahir;
          }
          break;
        }
        case "originalRank":
          result.originalRank = params.originalRank;
          break;
        case "pangkatSejak": {
          const pangkatSejak = new Date(params[key]);
          if (pangkatSejak.toString() !== "Invalid Date") {
            result.pangkatSejak = pangkatSejak;
          }
          break;
        }
        case "jabatanSejak": {
          const jabatanSejak = new Date(params[key]);
          if (jabatanSejak.toString() !== "Invalid Date") {
            result.jabatanSejak = jabatanSejak;
          }
          break;
        }
        case "PNSSejak": {
          const PNSSejak = new Date(params[key]);
          if (PNSSejak.toString() !== "Invalid Date") {
            result.PNSSejak = PNSSejak;
          }
          break;
        }
        case "pendidikanTerakhir":
          result.pendidikanTerakhir = params[key];

          break;
        case "promotionYAD": {
          const promotionYAD = new Date(params[key]);
          if (promotionYAD.toString() !== "Invalid Date") {
            result.promotionYAD = promotionYAD;
          }
          break;
        }
        case "jaksa": {
          const jaksa = params[key] === "true" ? true : false;
          result.jaksa = jaksa;
          break;
        }
        case "jaksaSejak": {
          const jaksaSejak = new Date(params[key]);
          if (jaksaSejak.toString() !== "Invalid Date") {
            result.jaksaSejak = jaksaSejak;
          }
          break;
        }
        case "keterangan": {
          result.keterangan = params[key];
          break;
        }
        case "promotionChecking": {
          const promotionChecking = params[key] === "true" ? true : false;
          result.promotionChecking = promotionChecking;
          break;
        }
        case "marker": {
          const marker = params[key] === "true" ? true : false;
          result.marker = marker;
          break;
        }
        case "keteranganTambahan": {
          result.keteranganTambahan = params[key];
          break;
        }
        case "jabatanId":
          result.jabatanId = parseInt(params[key]);
          break;
        case "unitId":
          result.unitId = parseInt(params[key]);
      }
    });
    return result;
  };
}
