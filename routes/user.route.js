const express = require('express')
const multer  = require('multer')

let upload = multer({ dest: './public/uploads/' })

const controller = require('../controllers/user.controller')
const validate = require('../validate/user.validate')
const authMiddleware = require('../middlewares/auth.middleware');

let router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.get)

router.post('/create', upload.single('avatar'), 
                        controller.postCreate)

module.exports = router
