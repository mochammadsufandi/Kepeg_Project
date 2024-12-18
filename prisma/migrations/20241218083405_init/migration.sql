-- CreateTable
CREATE TABLE "Pegawai" (
    "id" SERIAL NOT NULL,
    "NIP" TEXT NOT NULL,
    "NRP" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "originalRank" TEXT NOT NULL,
    "numericRank" DECIMAL(65,30) NOT NULL,
    "pangkatSejak" TIMESTAMP(3) NOT NULL,
    "jabatanSejak" TIMESTAMP(3) NOT NULL,
    "PNSSejak" TIMESTAMP(3) NOT NULL,
    "pendidikanTerakhir" TEXT NOT NULL,
    "promotionYAD" TIMESTAMP(3) NOT NULL,
    "jaksa" BOOLEAN NOT NULL,
    "keterangan" TEXT NOT NULL,
    "promotionChecking" BOOLEAN NOT NULL,
    "marker" BOOLEAN NOT NULL,
    "keteranganTambahan" TEXT NOT NULL,
    "jabatanId" INTEGER,
    "unitId" INTEGER,

    CONSTRAINT "Pegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitKerja" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "UnitKerja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jabatan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_NIP_key" ON "Pegawai"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_NRP_key" ON "Pegawai"("NRP");

-- CreateIndex
CREATE UNIQUE INDEX "UnitKerja_nama_key" ON "UnitKerja"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Jabatan_nama_key" ON "Jabatan"("nama");

-- AddForeignKey
ALTER TABLE "Pegawai" ADD CONSTRAINT "Pegawai_jabatanId_fkey" FOREIGN KEY ("jabatanId") REFERENCES "Jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pegawai" ADD CONSTRAINT "Pegawai_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "UnitKerja"("id") ON DELETE SET NULL ON UPDATE CASCADE;
