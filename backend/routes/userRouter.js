const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../Middlwares/auth1')




router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', userCtrl.resetPassword)

router.get('/logout', userCtrl.logout)


// Social Login
router.post('/google_login', userCtrl.googleLogin)





module.exports = router