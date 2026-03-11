const express = require('express');
const router = express.Router();
const prisma = require('../src/lib/prisma');

router.get('/', async (req, res) => {
    try {
        const data = await prisma.kategori.findMany();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//tambah kategori
router.post('/', async (req,res) => {
    const { nama_kategori } = req.body;
    try {
        const kategori_baru = await prisma.kategori.create({
            data: { nama_kategori}
        });
        res.status(201).json(kategori_baru);
    }catch (error){
        res.status(400).json({ error: error.message });
    }
});


//tampilkan kategori
router.get('/:id', async(req,res) => {
    const { id } = req.params;
    try {
        const kategori = await prisma.kategori.findUnique({
            where : { id_kategori: Number(id)},
        });
        if(!kategori) {
            return res.status(404).json({ message: 'Kategori tersebut tidak ada'})
        }
        res.json(kategori)
    } catch (error) {
        res.status(500).json({eror: error.message})
    }
});

//update kategori
router.put("/:id", async(req,res) => {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    try {
        const updateKategori = await prisma.kategori.update({
            where: {id_kategori: Number(id)},
            data: {
                nama_kategori
            }
        });
        res.json(updateKategori)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

//detelete berdasarkan id
router.delete('/:id', async(req, res)=> {
    const { id } = req.params;
    try{
        await prisma.kategori.delete({
            where: { id_kategori: Number(id)}
        
        });
        return res.status(200).json({ message: `Kategori dengan ID ${id} berhasil dihapus!`})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


//delete buku berdasarkan id_Kategori
router.delete('/kategori/:id_kategori', async(req,res) => {
    const {id_kategori } = req.params;
    try {
        // simpan hasil penghapusan ke variabel "deleteKategori"
        const deleteKategori = await prisma.kategori.deleteMany({
            where: { id_kategori: Number(id_kategori)}
        });
         
        //check apakah ada data yang akan dihapus
        if( deleteKategori.count === 0 ){
            return res.status(404).json({ message: "Tidak ada kategori dengan ID tersebut" });
        } 
        res.json({
            message: `Berhasil menghapus ${deleteKategori.count} kategori dengan ID ${id_kategori}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})



module.exports = router;