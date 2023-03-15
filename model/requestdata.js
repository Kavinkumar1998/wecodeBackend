import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    name : {
        type : String,
            required:true,
            maxlength : 32,
            trim : true
        },
        email:{
            type: String, 
            required:true,
            maxlength : 32,
            trim : true
           },
           phoneNumber:{
            type: String, 
            required:true,
            
           },
           service :{
            type : String,
           
        }
})

const RequestService = mongoose.model("userrequest",requestSchema)
export {RequestService}