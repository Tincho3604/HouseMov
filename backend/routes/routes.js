const express = require('express')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const router =express.Router()

router.route('/user')
.get(userController.getUser)
.post(userController.uploadUser)

router.route('/user/:id')
.delete(userController.deleteUser)
.put(userController.modifyUser)

router.route('/houses')
.get(houseController.getHouse)
.put(houseController.uploadHouse)


router.route('/house/:id')
.get(houseController.getHouseById)
.put(houseController.modifyHouse)
.delete(houseController.deleteHouse)

module.exports = router