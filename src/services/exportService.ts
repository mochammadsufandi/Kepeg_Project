import { cacheData } from "../utils/cacheData";
import CustomResponseError from "../middleware/errorClass/errorClass";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from "docx";
import { PersonnelInterface } from "../interface/params/PersonnelInterface";
import { FilterField } from "../interface/params/SelectField";
import { ConverterData } from "../utils/converterFunction";

class ExportService {
  static async exportFile(params: string): Promise<Buffer> {
    const data = cacheData.get(params);
    const filteredData = data?.personnels;
    const filterFields = data?.filterField as FilterField;
    const sortFields = data?.sortField;
    if (!filteredData || !filterFields)
      throw new CustomResponseError({
        name: "NoData",
        statusCode: 400,
        message: "No Data Found for Exporting",
      });
    const filterConvertToStringObject = ConverterData.dynamicResultFieldConverter(filterFields);
    const keyFilterFields = Object.keys(filterConvertToStringObject);
    const keySortFields = Object.keys(sortFields);
    const filterResult = keyFilterFields.map((key) => {
      return `${key} : ${filterConvertToStringObject[key]}`;
    });
    console.log(keySortFields);
    const sortResult = keySortFields.map((key) => {
      return `${key} : ${sortFields[key]}`;
    });
    console.log(sortResult);
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "customStyle",
            name: "Custom Style",
            run: {
              font: "Arial",
              size: 20,
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                orientation: "landscape",
              },
            },
          },
          children: [
            new Paragraph({
              text: "Filtered Personnel Report",
              heading: "Heading1",
              alignment: "center",
            }),
            new Paragraph({
              text: "Generated on " + new Date().toLocaleDateString(),
              spacing: { after: 300 },
            }),
            new Paragraph({
              text: "Filtered By :",
            }),
            ...filterResult.map(
              (value) =>
                new Paragraph({
                  text: value,
                })
            ),
            new Paragraph({
              text: "Sort By :",
              spacing: { before: 300 },
            }),
            ...sortResult.map(
              (value) =>
                new Paragraph({
                  text: value,
                })
            ),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("No")] }),
                    new TableCell({ children: [new Paragraph("Nama, Tanggal Lahir, NRP, NIP")] }),
                    new TableCell({ children: [new Paragraph("Pangkat Sejak")] }),
                    new TableCell({ children: [new Paragraph("Jabatan Sejak")] }),
                    new TableCell({ children: [new Paragraph("Pegawai Negeri Sejak")] }),
                    new TableCell({ children: [new Paragraph("Pendidikan Terakhir")] }),
                    new TableCell({ children: [new Paragraph("Kenaikan Pangkat Y.A.D")] }),
                    new TableCell({ children: [new Paragraph("Jaksa Sejak")] }),
                    new TableCell({ children: [new Paragraph("Ket.")] }),
                  ],
                }),
                ...filteredData.map(
                  (person: PersonnelInterface, idx: number) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph((idx + 1).toString())],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(person.nama),
                            new Paragraph({
                              text:
                                person.tempatLahir +
                                ", " +
                                person.tanggalLahir.toLocaleDateString(),
                            }),
                            new Paragraph({ text: "NRP. " + person.NRP }),
                            new Paragraph({ text: "NIP. " + person.NIP }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: person.originalRank }),
                            new Paragraph({ text: person.pangkatSejak.toLocaleDateString() }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: person.jabatanId?.toString() }),
                            new Paragraph({ text: person.jabatanSejak.toLocaleDateString() }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: person.PNSSejak?.toLocaleDateString() }),
                          ],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: person.pendidikanTerakhir })],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: person.promotionYAD.toLocaleDateString() }),
                          ],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({ text: person.jaksaSejak?.toLocaleDateString() }),
                          ],
                        }),
                        new TableCell({ children: [new Paragraph({ text: person.keterangan })] }),
                      ],
                    })
                ),
              ],
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
            }),
          ],
        },
      ],
    });
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  }
}

export default ExportService;
