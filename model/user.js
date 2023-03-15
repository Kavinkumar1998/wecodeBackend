import mongoose from "mongoose";
 import jwt from "jsonwebtoken";

 const userSchema = new mongoose.Schema( 
    {
    FirstName:{
          type: String, 
          required:true,
          maxlength : 32,
          trim : true
         },
         LastName:{
            type: String, 
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
           password:{
            type: String, 
            required:true,
            
           },
           role:{
            type:String,
            required:true

           }
      })

 const generateAuthToken = (id) =>{
    return jwt.sign({id}, process.env.SECRET_KEY)
}


 const User = mongoose.model("User",userSchema);
export {User, generateAuthToken} 