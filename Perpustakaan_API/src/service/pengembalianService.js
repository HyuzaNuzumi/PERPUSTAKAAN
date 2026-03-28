class pengembalianService {
    static hitungDenda(tanggalTempo) {
        const tanggalKembali = new Date(); //hari dimana pengguna mengembalikan buku
        const tanggalJatuhTempo = new Date(tanggalTempo);

        //pengecekan apakah jatuh tempo atau tidak
        if (tanggalKembali <= tanggalJatuhTempo){
            return 0;
        }
        const selisihWaktu = tanggalKembali.getTime() - tanggalJatuhTempo.getTime();
        const selisihHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24));

        const tarifDenda = 2000;
        return selisihHari * tarifDenda;
    }
}

module.exports = pengembalianService;