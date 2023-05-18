const express = require("express")
const userRoute =express()
const userController = require('../controller/userController')
const multer = require("../util/multer")

userRoute.post('/add-product',multer.upload.array('images_upload',4),userController.insertProduct)
userRoute.get('/edit-product/:id',userController.editProduct)
userRoute.put('/edit-product/:id',multer.upload.array('images_upload',4),userController.updateProduct)
userRoute.delete('/delete-product/:id',userController.deleteProduct)
userRoute.get('/buy-product/:id',userController.buyProduct)


module.exports=userRoute