const mongoose=require('mongoose')
const user_type=require("./user_type")
const category = require('./category')

const AddData=new mongoose.Schema({
sellerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
    name:{
        type:String,
    },

     price:{
        type:String,
     },

     images: [
        {
            url: { type: String, required: true },
            alt: { type: String }
        }
    ],
     category:{
       type:mongoose.Schema.Types.ObjectId,
           ref:"category"
     }
})
module.exports =mongoose.model("products",AddData)