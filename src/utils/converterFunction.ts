import {
  DynamicSelectFieldInput,
  FormatDataMultiple,
  PromotionCheckingConverterInput,
} from "../interface/params/InputParams";
import { FilterField, SortFieldResult } from "../interface/params/SelectField";
import CustomResponseError from "../middleware/errorClass/errorClass";

export class ConverterData {
  static arrangeArrayObjectData(data: string[]): FormatDataMultiple[] {
    const arrayObjectData: FormatDataMultiple[] = [];
    const chunkSize = 15;

    for (let i = 15; i < data.length; i += chunkSize) {
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
          case 3: {
            if (value === "-") {
              obj["tempatLahir"] = null;
            } else {
              obj["tempatLahir"] = value;
            }
            break;
          }
          case 4: {
            if (value === "-") {
              obj["tanggalLahir"] = null;
            } else {
              const [day, month, year] = value.split("-").map(Number);
              obj["tanggalLahir"] = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            }
            break;
          }
          case 5:
            if (value === "-") {
              obj["originalRank"] = null;
            } else {
              obj["originalRank"] = value;
            }
            break;
          case 6:
            if (value === "-") {
              obj["pangkatSejak"] = null;
            } else {
              const [day, month, year] = value.split("-").map(Number);
              obj["pangkatSejak"] = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            }
            break;
          case 7:
            if (value === "-") {
              obj["namaJabatan"] = null;
            } else {
              obj["namaJabatan"] = value;
            }
            break;
          case 8: {
            if (value === "-") {
              obj["jabatanSejak"] = null;
            } else {
              const [day, month, year] = value.split("-").map(Number);
              obj["jabatanSejak"] = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            }
            break;
          }
          case 9:
            if (value === "-") {
              obj["PNSSejak"] = null;
            } else {
              const [day, month, year] = value.split("-").map(Number);
              obj["PNSSejak"] = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            }
            break;
          case 10:
            if (value === "-") {
              obj["pendidikanTerakhir"] = null;
            } else {
              obj["pendidikanTerakhir"] = value;
            }
            break;
          case 11: {
            const [day, month, year] = value.split("-").map(Number);
            if (value === "-") {
              obj["jaksaSejak"] = null;
            } else {
              obj["jaksaSejak"] = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            }
            break;
          }
          case 12:
            if (value === "-") {
              obj["keterangan"] = null;
            } else {
              obj["keterangan"] = value;
            }
            break;
          case 13:
            if (value === "-") {
              obj["unitId"] = null;
            } else {
              obj["unitId"] = parseInt(value);
            }
            break;
          case 14:
            if (value === "-") {
              obj["eselon"] = null;
            } else {
              obj["eselon"] = value;
            }
            break;
        }
      });
      if (obj["jaksaSejak"]) {
        obj["jaksa"] = true;
      } else {
        obj["jaksa"] = false;
      }
      arrayObjectData.push(obj);
    }
    return arrayObjectData;
  }

  static GenderConverter(param: string): string {
    const parseIntegerFromNIP = parseInt(param.split("").join("")[14]);
    if (parseIntegerFromNIP === 1) {
      return "L";
    } else if (parseIntegerFromNIP === 2) {
      return "P";
    } else {
      return "";
    }
  }
  static numericRankConverter(params: string | null): number {
    if (!params) return 0;
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
      case "(I/d)":
        numericRank = 4;
        break;
      case "(I/c)":
        numericRank = 3;
        break;
      case "I/b":
        numericRank = 2;
        break;
      case "I/a":
        numericRank = 1;
        break;
    }
    return numericRank;
  }
  static originalRankConverter(param: number): string | null {
    let originalRank: string | null;
    switch (param) {
      case 0:
        originalRank = null;
        break;
      case 1:
        originalRank = "(I/a)";
        break;
      case 2:
        originalRank = "(I/b)";
        break;
      case 3:
        originalRank = "(I/c)";
        break;
      case 4:
        originalRank = "(I/d)";
        break;
      case 5:
        originalRank = "(II/a)";
        break;
      case 6:
        originalRank = "(II/b)";
        break;
      case 7:
        originalRank = "(II/c)";
        break;
      case 8:
        originalRank = "(II/d)";
        break;
      case 9:
        originalRank = "(III/a)";
        break;
      case 10:
        originalRank = "(III/b)";
        break;
      case 11:
        originalRank = "(III/c)";
        break;
      case 12:
        originalRank = "(III/d)";
        break;
      case 13:
        originalRank = "(IV/a)";
        break;
      case 14:
        originalRank = "(IV/b)";
        break;
      case 15:
        originalRank = "(IV/c)";
        break;
      case 16:
        originalRank = "(IV/d)";
        break;
      case 17:
        originalRank = "(IV/e)";
        break;
      default:
        originalRank = null;
    }
    return originalRank;
  }

  static originalRankFullConverter({
    jaksa,
    originalRank,
  }: {
    jaksa: boolean;
    originalRank: string;
  }): string | null {
    let result: string | null;
    if (jaksa) {
      switch (originalRank) {
        case "(IV/d)":
          result = "Jaksa Utama Madya (IV/d)";
          break;
        case "(IV/c)":
          result = "Jaksa Utama Muda (IV/c)";
          break;
        case "(IV/b)":
          result = "Jaksa Utama Pratama (IV/b)";
          break;
        case "(IV/a)":
          result = "Jaksa Madya (IV/a)";
          break;
        case "(III/d)":
          result = "Jaksa Muda (III/d)";
          break;
        case "(III/c)":
          result = "Jaksa Pratama (III/c)";
          break;
        case "(III/b)":
          result = "Ajun Jaksa (III/b)";
          break;
        case "(III/a)":
          result = "Ajun Jaksa Madya (III/a)";
          break;
        default:
          result = originalRank;
      }
    } else {
      switch (originalRank) {
        case "(IV/a)":
          result = "Adi Wira (IV/a)";
          break;
        case "(III/d)":
          result = "Sena Wira (III/d)";
          break;
        case "(III/c)":
          result = "Madya Wira (III/c)";
          break;
        case "(III/b)":
          result = "Muda Wira (III/b)";
          break;
        case "(III/a)":
          result = "Yuana Wira (III/a)";
          break;
        case "(II/d)":
          result = "Sena Darma (II/d)";
          break;
        case "(II/c)":
          result = "Madya Darma (II/c)";
          break;
        case "(II/b)":
          result = "Muda Darma (II/b)";
          break;
        case "(II/a)":
          result = "Yuana Darma (II/a)";
          break;
        default:
          result = originalRank;
      }
    }
    return result;
  }

  static promotionYADConverter(params: Date): Date {
    let lastPromotionDate: Date = new Date(params);
    // console.log(params);
    const day = lastPromotionDate.getDate();
    const month = lastPromotionDate.getMonth();
    const year = lastPromotionDate.getFullYear();
    lastPromotionDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
    if (params.getDate() !== 1 && params.getMonth() % 2 === 0) {
      const day = 1;
      const month = lastPromotionDate.getMonth() + 1;
      const year = lastPromotionDate.getFullYear();
      lastPromotionDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
      lastPromotionDate.setFullYear(lastPromotionDate.getFullYear() + 4);
    } else if (lastPromotionDate.getDate() !== 1 && lastPromotionDate.getMonth() % 2 !== 0) {
      const day = 1;
      const month = lastPromotionDate.getMonth();
      const year = lastPromotionDate.getFullYear();
      lastPromotionDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
      lastPromotionDate.setFullYear(lastPromotionDate.getFullYear() + 4);
    } else {
      lastPromotionDate.setFullYear(lastPromotionDate.getFullYear() + 4);
    }
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
    function checkingNullAndConvertStringToDate(param: string | null): Date | null {
      const date = param !== null ? new Date(param) : new Date("");
      if (date.toString() !== "Invalid Date") return date;
      return null;
    }
    function checkingNullAndConvertStringToNumber(param: string | null): number | null {
      const number = param ? parseInt(param) : null;
      return number;
    }
    Object.keys(params).forEach((key) => {
      switch (key) {
        case "gender":
          result.gender = params[key] as string;
          break;
        case "tempatLahir":
          result.tempatLahir = params[key];
          break;
        case "tanggalLahir": {
          result.tanggalLahir = checkingNullAndConvertStringToDate(params[key]);
          break;
        }
        case "numericRank":
          result.numericRank = this.numericRankConverter(params[key]);
          break;
        case "eselon":
          result.eselon = params[key];
          break;
        case "pangkatSejak": {
          result.pangkatSejak = checkingNullAndConvertStringToDate(params[key]);
          break;
        }
        case "namaJabatan":
          result.namaJabatan = params[key];
          break;
        case "jabatanSejak": {
          result.jabatanSejak = checkingNullAndConvertStringToDate(params[key]);
          break;
        }
        case "PNSSejak": {
          result.PNSSejak = checkingNullAndConvertStringToDate(params[key]);
          break;
        }
        case "pendidikanTerakhir":
          result.pendidikanTerakhir = params[key];

          break;
        case "promotionYAD": {
          result.promotionYAD = checkingNullAndConvertStringToDate(params[key]);
          break;
        }
        case "jaksa": {
          const jaksa = params[key] === "true" ? true : false;
          result.jaksa = jaksa;
          break;
        }
        case "jaksaSejak": {
          result.jaksaSejak = checkingNullAndConvertStringToDate(params[key]);
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
          result.jabatanId = checkingNullAndConvertStringToNumber(params[key]);
          break;
        case "unitId":
          result.unitId = checkingNullAndConvertStringToNumber(params[key]);
      }
    });
    return result;
  };

  static dynamicSortFieldConverter = (params: DynamicSelectFieldInput): SortFieldResult[] => {
    const expectedSortField = [
      "nama",
      "tanggalLahir",
      "tempatLahir",
      "numericRank",
      "pangkatSejak",
      "jabatanSejak",
      "PNSSejak",
      "promotionYAD",
      "jaksaSejak",
      "unitId",
    ];
    const keysOfParams = Object.keys(params).filter((value) => expectedSortField.includes(value));
    const result = [] as SortFieldResult[];
    keysOfParams.map((key) => {
      if (!["asc", "desc"].includes(params[key] as string))
        throw new CustomResponseError({
          name: "InvalidInputType",
          statusCode: 400,
          message: "Please Input ASC or DESC for ordering",
        });
      result.push({
        field: key,
        direction: params[key] as string,
      });
    });
    return result;
  };

  static dynamicResultFieldConverter = (params: FilterField): DynamicSelectFieldInput => {
    const result = {} as DynamicSelectFieldInput;
    function checkingNull(param: string | null): string | null {
      const string = param ? param : null;
      return string;
    }
    function checkingNullAndConvertDate(param: Date | null): string | null {
      const date = param ? param.toLocaleDateString() : "";
      const string = date !== "Invalid Date" ? date : null;
      return string;
    }

    Object.keys(params).forEach((key) => {
      switch (key) {
        case "gender":
          result.gender = checkingNull(params[key]);
          break;
        case "tempatLahir":
          result.tempatLahir = params[key];
          break;
        case "tanggalLahir": {
          result.tanggalLahir = checkingNullAndConvertDate(params[key]);
          break;
        }
        case "numericRank":
          result.originalRank = this.originalRankConverter(params[key] as number);
          break;
        case "pangkatSejak": {
          result.pangkatSejak = checkingNullAndConvertDate(params[key]);
          break;
        }
        case "namaJabatan":
          result.namaJabatan = params[key];
          break;
        case "jabatanSejak": {
          result.jabatanSejak = checkingNullAndConvertDate(params[key]);
          break;
        }
        case "PNSSejak": {
          result.PNSSejak = checkingNullAndConvertDate(params[key]);
          break;
        }
        case "pendidikanTerakhir":
          result.pendidikanTerakhir = params[key];
          break;
        case "promotionYAD":
          {
            result.promotionYAD = checkingNullAndConvertDate(params[key]);
          }
          break;
        case "jaksa": {
          if (params[key]) {
            result.jaksa = "true";
          }
          break;
        }
        case "jaksaSejak": {
          result.jaksaSejak = checkingNullAndConvertDate(params[key]);
          break;
        }
        case "keterangan": {
          result.keterangan = params[key];
          break;
        }
        case "promotionChecking": {
          if (params[key]) {
            result.promotionChecking = "true";
          }
          break;
        }
        case "marker": {
          if (params[key]) {
            result.marker = "true";
          }
          break;
        }
        case "keteranganTambahan": {
          result.keteranganTambahan = params[key] as string;
          break;
        }
        case "jabatanId":
          result.jabatanId = params[key]?.toString() as unknown as string;
          break;
        case "unitId":
          result.unitId = params[key]?.toString() as unknown as string;
      }
    });
    return result;
  };
}
