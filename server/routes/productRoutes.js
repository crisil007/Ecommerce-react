const express=require('express')
const router=express.Router()
const productController=require('../controllers/productController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post('/addProduct/:id',productController.addProducts),
router.post('/addProduct', upload.array('images',5), productController.addProducts);
router.get('/getproducts',productController.getProducts)

module.exports=router;