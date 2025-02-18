import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const satuanKerja = [
  { nama: "Kejaksaan Tinggi Jambi" },
  { nama: "Kejaksaan Negeri Jambi" },
  { nama: "Kejaksaan Negeri Batanghari" },
  { nama: "Kejaksaan Negeri Bungo" },
  { nama: "Kejaksaan Negeri Sungai Penuh" },
  { nama: "Kejaksaan Negeri Merangin" },
  { nama: "Kejaksaan Negeri Tanjung Jabung Barat" },
  { nama: "Kejaksaan Negeri Sarolangun" },
  { nama: "Kejaksaan Negeri Tebo" },
  { nama: "Kejaksaan Negeri Muaro Jambi" },
  { nama: "Kejaksaan Negeri Tanjung Jabung Timur" },
  { nama: "Cabjari Batanghari Muara Tembesi" },
  { nama: "Cabjari Tanjung Jabung Timur Nipah Panjang" },
  { nama: "PPPK" },
];

async function seedSatuanKerja() {
  await prisma.unitKerja.createMany({
    data: satuanKerja,
  });
}

seedSatuanKerja();
