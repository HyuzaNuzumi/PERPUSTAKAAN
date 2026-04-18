const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma');
const authValidator = require('./validators/AuthValidator');

//mengambil data dari anggota dan transaksinya
router.get('/', async(req,res) => {
    try {
        const data = await prisma.anggota.findMany({
            include: { transaksi: true } //include untuk relasi
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post(
  '/register', 
  authValidator.registerRules(), // Pasang aturan
  authValidator.handleError,    // Cek apakah ada error
  async (req, res) => {
    try{
        const { nama, alamat, kode_anggota } = req.body;

        //simpan anggota baru
        const anggotaBaru = await prisma.anggota.create({
            data: {
                nama,
                alamat,
                kode_anggota
            },
            include: { transaksi: true}
        });
        res.status(201).json({
            success: true,
            message: "Anggota berhasil dibuat",
            data: anggotaBaru
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Gagal mendaftar anggota",
            error: error.message
        })
    }
  }
);


module.exports = router;