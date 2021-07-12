const router = require('express').Router()

const auth = require('../middlewares/auth')
const bookController = require('../controllers/bookController')


router.route('/')
    .get(auth ,bookController.getBooks )
    .post(auth , bookController.createBook)



router.route('/:id')
    .get(auth , bookController.getBook)
    .put(auth , bookController.updateBook)
    .delete(auth , bookController.deleteBook)





module.exports = router