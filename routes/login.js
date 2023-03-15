import express from "express";
import bcrypt from "bcrypt";
import { generateAuthToken,User} from "../model/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const router  = express.Router();
dotenv.config();

router.post("/",async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
          return  res.status(400).json({message:"Invalid Credential"})
        }
        const ValidatedPassword = await bcrypt.compare(req.body.password,user.password)
        if(!ValidatedPassword){
            return res.status(400).json({message:"Invalid Credential"})
         }
const token = generateAuthToken(user._id);
res.status(200).json({message: "Loged in successfully", token})
        }
    catch(error){
        res.status(500).json({message :"Internal server error"})
    }
})

router.post("/forgetpassword", async(req,res)=>{
    const {email}=req.body;
    const user = await User.findOne({email:email})
if(!user){
    return res.status(400).json({message:"Invali Email"})
}
else{
    const randomNumber= Math.floor(100000 + Math.random()*900000);
    const Updated = {OTP:randomNumber};
    const setOtp = await User.updateOne({email:email},{$set:Updated});
    const sender = nodemailer.createTransport({
        service :"gmail",
        auth:{
            user:process.env.Email,
            pass:process.env.password,
        }
    });

const composeMail={
    from : process.env.Email,
    to:email,
    subject :"OTP for password reset",
    text : `${randomNumber}`,
                };
  sender.sendMail(composeMail,(error,info)=>{
    if(error){
        return res.status(400).json({message:"sending error"})
    }
    else{
        res.status(200).json({messsage:"mail sent"})
    }
  });
}
res.status(200).json({message:"OTP sent your email"})
})

router.post("/verifyotp",async(req,res)=>{
        const{OTP}= req.body;
const otp = +OTP;
const verifyotp = await User.findOne({OTP:otp})
if(!verifyotp){
    return res.status(400).json({message:"Invalid OTP"})
}else {
    const Updated= {OTP:otp}
const deleteotp = await User.updateOne({email:email},{$unset:Updated});
res.status(200).json({message:"OTP verified sucessfully"})
}
})


router.post("/setPassword", async (req,res)=>{
    try{
        const{email,password}= req.body;
        let user = await User.findOne({email:email});
        if(user){return res.status(400).json({message:"Email Already Exist"});}
        //password generation

        else if(password.length< 8){
         return   res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        else{
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(req.body.password,salt);
        //user updation
        const updated = {
            email:email,password:hassedPassword
        }
         const updatedb = await User.updateOne({email:email},{$set:updated})
    res.status(201).json({message : "Password Successfully Updated"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"}) 
    }

})

export const loginRouter = router;
