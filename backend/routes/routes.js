const express = require('express')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const router =express.Router()


router.route('/users')
.get(userController.getUser)
.post(userController.validateUser, userController.uploadUser)

router.route('/users/:id')
.delete(userController.deleteUser)
.put(userController.modifyUser)

router.route('/login')
.post(userController.logUser)

router.route('/getUser')
.post(userController.getUsersExist)



router.route('/houses')
.get(houseController.getHouse)
.put(houseController.uploadHouse)


router.route('/house/:id')
.get(houseController.getHouseById)
.put(houseController.modifyHouse)
.delete(houseController.deleteHouse)

module.exports = router