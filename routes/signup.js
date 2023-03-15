import express from "express";
import bcrypt from "bcrypt";
import { User,generateAuthToken} from "../model/user.js";

const router =  express.Router();


router.post("/",async (req,res)=>{
    try{
        const{FirstName,LastName,email,password}= req.body;
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
    user = await User({
        FirstName:req.body.FirstName,
        LastName: req.body.LastName,
        email:req.body.email,
        password: hassedPassword,
    }).save();
    const token = generateAuthToken(user._id);
    res.status(201).json({message : "Successfully signed up", token})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : "Internal server error"}) 
    }
})
export const signupRouter = router;