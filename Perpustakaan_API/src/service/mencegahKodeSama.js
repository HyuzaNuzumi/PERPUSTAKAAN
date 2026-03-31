const prisma = require('../src/lib/prisma');

class userService {
    /**
     * mengecek apakah username sudah ada didatabeses.
     * @params { string } username
     * @return { Promise<boolean> }
     */

    async checkKodeAnggota (kode_anggota) {
        const user = await prisma.anggota.findUnique({
            where: { kode_anggota }
        });
        return user // mengembalikan user jika ditemukan
    }
}

module.exports = new userService();