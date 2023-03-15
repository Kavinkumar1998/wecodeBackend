import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
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
       status :{
        type : String


    }
}
)
    
    

const Content = mongoose.model("content", contentSchema)
export {Content}
