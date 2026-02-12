-- CreateTable
CREATE TABLE `Anggota` (
    `id_anggota` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(25) NOT NULL,
    `alamat` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id_anggota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jabatan` (
    `id_jabatan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jabatan` VARCHAR(25) NOT NULL,

    UNIQUE INDEX `Jabatan_nama_jabatan_key`(`nama_jabatan`),
    PRIMARY KEY (`id_jabatan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Petugas` (
    `id_petugas` INTEGER NOT NULL,
    `nama` VARCHAR(25) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` CHAR(255) NOT NULL,
    `id_jabatan` INTEGER NOT NULL,

    UNIQUE INDEX `Petugas_username_key`(`username`),
    PRIMARY KEY (`id_petugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buku` (
    `id_buku` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(25) NOT NULL,
    `penulis` VARCHAR(25) NOT NULL,
    `penerbit` VARCHAR(25) NOT NULL,
    `tahun_terbit` INTEGER NULL,
    `id_kategori` INTEGER NOT NULL,
    `status` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id_buku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id_transaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_anggota` INTEGER NOT NULL,
    `id_petugas` INTEGER NOT NULL,
    `tanggal_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_status_tempo` DATE NOT NULL,
    `status` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id_transaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailPeminjaman` (
    `id_detail` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transaksi` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,

    PRIMARY KEY (`id_detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengembalian` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `id_transaksi` INTEGER NOT NULL,
    `tanggal_pengembalian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `denda` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Petugas` ADD CONSTRAINT `Petugas_id_jabatan_fkey` FOREIGN KEY (`id_jabatan`) REFERENCES `Jabatan`(`id_jabatan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Buku` ADD CONSTRAINT `Buku_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `Kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_anggota_fkey` FOREIGN KEY (`id_anggota`) REFERENCES `Anggota`(`id_anggota`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_petugas_fkey` FOREIGN KEY (`id_petugas`) REFERENCES `Petugas`(`id_petugas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPeminjaman` ADD CONSTRAINT `DetailPeminjaman_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPeminjaman` ADD CONSTRAINT `DetailPeminjaman_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `Buku`(`id_buku`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengembalian` ADD CONSTRAINT `Pengembalian_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id_transaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
