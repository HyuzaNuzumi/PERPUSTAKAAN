
# API Sistem Informasi Perpustakaan

Halo! Ini adalah proyek belajar saya dalam membangun sistem backend untuk perpustakaan. Proyek ini dibuat untuk memahami bagaimana cara menghubungkan server Node.js dengan database MySQL menggunakan teknologi modern.

### Teknologi yang Digunakan:
**Node.js & Express.js**: Sebagai kerangka utama server.
**Prisma ORM**: Sebagai penghubung kode program dengan database (MySQL/MariaDB).
**MySQL/XAMPP**: Sebagai tempat penyimpanan data buku, kategori, dan anggota.

### Fitur yang Sudah Berjalan:
**Koneksi Database**: Berhasil mengatasi konflik versi MySQL dan melakukan sinkronisasi tabel menggunakan Prisma Migrate.
**Struktur Folder Rapi**: Memisahkan logika koneksi database di `src/lib` dan rute API di folder `routes`.
**Auto-Restart Server**: Menggunakan fitur bawaan Node.js `--watch` untuk mempermudah pengembangan tanpa instalasi tambahan yang rumit.

### Cara Menjalankan Proyek:
1. Pastikan MySQL di XAMPP sudah menyala.
2. Jalankan perintah `npm install` untuk memasang semua kebutuhan.
3. Jalankan server dengan perintah:
   ```bash
   npm run dev