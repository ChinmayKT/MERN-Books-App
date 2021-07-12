const router = require('express').Router()

const userController = require('../controllers/userController')


//Register user
router.post('/register', userController.registerUser )

//Login user
router.post('/login', userController.login)

// verify token
router.get('/verify' , userController.verifiedToken)

//get  profile
router.get('/profile', userController.profile)

//edit profile
router.put('/profileEdit', userController.editProfile)




module.exports = router