const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma');
const pengembalianService = require('../src/service/pengembalianService')

router.get('/', async (req, res) => {
    try {
        const data = await prisma.pengembalian.findMany();
        res.status(200).json(data);
    } catch (error){
        res.status(500).json({ error: error.message})
    }
});

//kirim data baru
router.post('/', async (req,res) => {
    const { id_transaksi, denda } = req. body;
        //pengecekan id harus berupa angka
         if(isNaN(id_transaksi)){
            return res.status(400).json({
                message: "ID harus berupa angka yang valid"
            });
        }
    try {
        const baruPengembalian = await prisma.pengembalian.create({
            data: {
                id_transaksi: Number(id_transaksi),
                tanggal_pengembalian: new Date(),
                denda: denda
            },
            include: {
                transaksi: true 
            },
        });
        res.status(201).json(baruPengembalian);
    } catch (error){
        res.status(400).json({ message: "Buku tidak ditemukan!"})
    }
})

// pengembalianBuku
router.put('/Pengembalian/:id', async (req, res) => {
    const { id } = req.params;

    //pengecekan id harus berupa angka
    if(isNaN(id_transaksi)){
        return res.status(400).json({
            message: "ID harus berupa angka yang valid"
            });
        }
    try {
        const pengembalianBaru = await prisma.transaksi.findUnique({
            where: { id_transaksi: Number(id) }
        });

        //pengecekan apakah data transaksi ada
        if(!pengembalianBaru)
            return res.status(404).json({ message: "Transaksi tidak ditemukan!"})

        //pengecekan apakah buku sudah dikembalikan
        if(pengembalianBaru.status === "Kembali")
            return res.status(400).json({ message: "Buku sudah pernah dikembalikan!"});


        //pengembalianService { total_Denda }
        // Nilai ini dikirim sebagai argumen ke service
        const totaldenda = pengembalianService.hitungDenda(pengembalianBaru.tanggal_status_tempo);

        const [catatan, statusBaru ] = await prisma.$transaction([
            prisma.pengembalian.create({
                data: {
                    id_transaksi: Number(id),
                    denda: totaldenda,
                    tanggal_pengembalian: new Date()
                }
            }),
            prisma.transaksi.update({
                where: { id_transaksi: Number(id)},
                data: { status: "Kembali"}
            })
        ]);
        res.status(200).json({
            message: "Buku berhasil dikembalikan",
            detail_pengembalian : catatan,
            status_transaksi: statusBaru.status
        })
    } catch (error){
        res.status(500).json({ error: error.message });
    }
})

