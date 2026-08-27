const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const filename = Date.now() + extension

        cb(null, filename)
    }

})

const uploads = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'), false)
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = uploads