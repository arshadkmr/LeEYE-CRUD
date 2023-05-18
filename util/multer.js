/* eslint-disable indent */
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname !== 'image') {
            cb(null, 'public/uploadedImages')
        } else {
            cb(null, 'public/banners')
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }

})

exports.upload = multer({ storage })
