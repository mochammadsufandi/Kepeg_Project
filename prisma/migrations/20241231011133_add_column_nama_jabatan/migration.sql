/*
  Warnings:

  - Added the required column `namaJabatan` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pegawai" ADD COLUMN     "namaJabatan" TEXT NOT NULL;
