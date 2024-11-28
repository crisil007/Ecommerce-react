
const users = require('../db/models/users');
const user_type = require("../db/models/user_type"); 
const AddData=require("../db/models/product")
const bcrypt = require('bcrypt');
const { success_function, error_function } = require("../utils/responseHandler"); 
const mongoose = require("mongoose");
const fileUpload=require("../utils/fileUpload").fileUpload;
const category = require('../db/models/category')

exports.addProducts = async function (req, res) {
    try {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files); // Debug files

        const matchedCategory = await category.findOne({ category: req.body.category });
        if (!matchedCategory) {
            return res.status(400).send({ success: false, message: "Invalid category" });
        }

        const images = (req.files['images'] || []).map(file => ({
            url: file.path,
            alt: req.body.altText || 'Product Image',
        }));

        const newProduct = new AddData({
            sellerID: req.params.id,
            name: req.body.name,
            price: req.body.price,
            category: matchedCategory._id,
            images,
        });

        const productDetails = await newProduct.save();
        return res.status(200).send({
            success: true,
            message: "Product added successfully",
            data: productDetails,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).send({ success: false, message: "Product adding failed, please try again." });
    }
};


exports.getProducts = async function(req,res){
    try {
        let productData = await AddData.find();
        console.log("productData",productData);

        if(!productData){
            let response = error_function({
                success  : false,
                statusCode : 400,
                
            });
            return res.status(response.statusCode).send(response);
            
        }else{
            let response = success_function({
                success : true,
                statusCode : 200,
                message : "fetching successfull",
                data : productData,
            });
            return res.status(response.statusCode).send(response);
            
        }

    } catch (error) {
        console.log("error",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "something went wrong",
        });
        return res.status(response.statusCode).send(response);
        
    }
}


