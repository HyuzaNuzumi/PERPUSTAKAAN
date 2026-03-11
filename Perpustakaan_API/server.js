const express = require('express');
const app = express();
const port = 3000;

//kategori
const kategoriRoutes = require('./routes/kategori')
//buku
const bukuRoutes = require('./routes/buku')

//middleware (express bisa membaca JSON dari bodyrequest)
app.use(express.json());

//router kategori
app.use('/kategori', kategoriRoutes);

//router buku
app.use('/buku', bukuRoutes);



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})