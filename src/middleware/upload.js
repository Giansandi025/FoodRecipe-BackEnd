const multer = require('multer')
const path = require('path')
const { failed } = require('../helpers/response')

// management file
const maxSize = 2 * 1024 * 1024
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public')
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const filename = Date.now() + '' + ext
      cb(null, filename)
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext === '.jpg' || ext === '.png') {
      cb(null, true)
    } else {
      const error = {
        message: 'file must be jpg or png'
      }
      cb(error, false)
    }
  },
  limits: {
    fileSize: maxSize
  }
})

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('photo')
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, err, 'error', 'an error occured')
    } else {
      next()
    }
  })
}

module.exports = upload
