const express = require('express');
const app = express();
const port = 3000;

//kategori
const kategori = require('./routes/kategori')

//middleware (express bisa membaca JSON dari bodyrequest)
app.use(express.json)

//router kategori
app.get('/', (req, res) => {
    res.send('API Perpustakaan Aktif !!!')
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})