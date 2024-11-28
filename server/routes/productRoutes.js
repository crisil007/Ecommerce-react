const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')

router.post('/addProduct',productController.addProducts),
router.get('/getproducts',productController.getProducts)

module.exports=router;