const { body, validationResult } = require('express-validator');
const mencegahKodeSama = require('../service/mencegahKodeSama');

class AuthValidator {
    //Method untuk mendefinisikan aturan registrasi
    registerRules() {
        return [
            body('kode_anggota').trim().notEmpty().withMessage('kode anggota tidak boleh kosong!')
            .custom(async (value) => {
                //memangil method dari service
                const isName = await mencegahKodeSama.checkKodeAnggota(value);
                if (isName) {
                    throw new Error('Kode anggota sudah digunakan');
                }
                return true;
            }),
            body('nama').trim().notEmpty().withMessage('Nama harus diisi!'),
            body('alamat').trim().notEmpty().withMessage('Alamat harus diisi!')
        ];
    }

    //method middleware untuk menangkap hasil validasi (error handler)  
    handleError(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
}

module.exports = new AuthValidator();