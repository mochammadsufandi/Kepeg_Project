/*
  Warnings:

  - Added the required column `gender` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pegawai" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "jaksaSejak" TIMESTAMP(3),
ALTER COLUMN "numericRank" DROP NOT NULL,
ALTER COLUMN "PNSSejak" DROP NOT NULL,
ALTER COLUMN "keteranganTambahan" DROP NOT NULL;
