/*
  Warnings:

  - A unique constraint covering the columns `[kode_anggota]` on the table `Anggota` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode_anggota` to the `Anggota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Anggota` ADD COLUMN `kode_anggota` VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Anggota_kode_anggota_key` ON `Anggota`(`kode_anggota`);
