const express = require('express')
const passport = require('../config/passport')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const router =express.Router()


router.route('/users')
.get(userController.getUser)//Ruta para obtener los usuarios
.post(userController.validateUser, userController.uploadUser)//Ruta para cargar validar y cargar un nuevo usuario

router.route('/users/:id')
.delete(userController.deleteUser)//Ruta para borrar un usario
.put(userController.modifyUser)//Ruta para modificar un usuario (mediante insomnia)

router.route('/fullUser')//ruta para obtener todos los datos del usuario cuando los quiera modificar
.get(passport.authenticate('jwt', {session: false}), userController.getFullUser)

router.route('/modifyUser')//Ruta para modificar un usuario y este carga un archivo
.put(passport.authenticate('jwt', {session: false}), userController.modifyUser)

router.route('/login')//Ruta para logear un usuario
.post(userController.logUser)

router.route('/getUser')//Ruta para obtener si el usuario existe
.post(userController.getUsersExist)

router.route('/validateToken')//Ruta para validar el token del usuario para perdurar la sesión
.get(passport.authenticate('jwt', {session: false}), userController.validateToken)

router.route('/houses')
.get(houseController.getHouse)//Ruta para obtener las casas
.put(passport.authenticate('jwt', {session: false}), houseController.uploadHouse)//Ruta para cargar una caja

router.route('/houseByUser')//Ruta para obtener las casas que un usuario subio
.get(passport.authenticate('jwt', {session: false}), houseController.getHouseByUser)

router.route('/house/:id')
.get(houseController.getHouseById)//Ruta para obtener una casa mediante su id
.put(houseController.modifyHouse)//Ruta para modificar una casa

router.route('/modifyUser1')//Ruta para modificar un usuario sin subir algun archivo
.put(passport.authenticate('jwt', {session: false}), userController.modifyUser1)

router.route('/viewsHouse/:id')//Ruta para aumentar en una las vistas de la casa
.get(houseController.uploadViews)

router.route('/sendMail')//Ruta para generar nueva contraseña
.put(userController.getNewPass)


router.route('/houseComment/:id')
.get(houseController.getCommentsByHouseId)
.post(passport.authenticate('jwt', {session: false}), houseController.commentHouse)


module.exports = router