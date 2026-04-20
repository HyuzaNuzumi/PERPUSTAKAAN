const express = require('express');
const pino = require('pino-http')();
const app = express();
const port = 3000;

//kategori
const kategoriRoutes = require('../Perpustakaan_API/routes/kategori');
//buku
const bukuRoutes = require('../Perpustakaan_API/routes/buku');
//anggota
const anggotaRoutes = require('../Perpustakaan_API/routes/anggota');
//jabatan
const jabatanRoutes = require('../Perpustakaan_API/routes/jabatan');
//petugas
const petugasRoutes = require('../Perpustakaan_API/routes/petugas');
//transaksi
const transaksiRoutes = require('../Perpustakaan_API/routes/transaksi');
//detailPeminjaman
const detailPeminjamanRoutes = require('../Perpustakaan_API/routes/detailPeminjaman');

//pengunaan pino
app.use(pino);

//middleware (express bisa membaca JSON dari bodyrequest)
app.use(express.json());

//router kategori
app.use('/kategori', kategoriRoutes);

//router buku
app.use('/buku', bukuRoutes);

//anggota
app.use('/anggota', anggotaRoutes);

//jabatan
app.use('/jabatan', jabatanRoutes);

//petugas
app.use('/petugas', petugasRoutes);

//transaksi
app.use('/petugas', petugasRoutes);

//transaksi
app.use('/transaksi', transaksiRoutes);

//detailPeminjaman
app.use('/detailPeminjaman', detailPeminjamanRoutes);



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})