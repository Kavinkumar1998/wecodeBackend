import express from "express";
import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import {ac} from "../config/Acess.js"
const router = express.Router();

//add single user
router.post("/adduser",async(req,res)=>{
    const permission = ac.can(req.user.role).createAny('Users');
    if (permission.granted) {
    try{
        const{FirstName,LastName,email,password}= req.body;
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password,salt);

const  user = await new User(req.body).save();
if(!user){
     res.status(400).json({message:"Error posting your data"})
   }
    res.status(200).json({message:"User added"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
                                    }
                                 
                    else {
                                    
          res.status(403).json({message:"you are not authorized"});
                     }

})


//veiw users

router.get("/allUsers", async (req,res)=>{
    const permission = ac.can(req.user.role).readAny('Users');
    if (permission.granted) {
    try{
        const users = await User.find().select("-password")
        if(!users){
            res.status(400).json({message:"No Users"})
          }
           res.status(200).json(users)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }            }
    else {
                                    
        res.status(403).json({message:"you are not authorized"});
                   }


})
//get user by id
router.get("/allUsers/:id", async (req,res)=>{
const permission = ac.can(req.user.role).readAny('Users');
    if (permission.granted) {
    const{id}=req.params
    try{
        const users = await User.findOne({_id:id}).select("-password")
        if(!users){
            res.status(400).json({message:"No Users"})
          }
           res.status(200).json(users)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }     }
    else {
                                    
        res.status(403).json({message:"you are not authorized"});
                   }
})
//edit users
router.put("/editUsers/:id",async (req,res)=>{
    const permission = ac.can(req.user.role).updateAny('Users');
    if (permission.granted) {
    const {id}=req.params;
    try{
      const updated = req.body;
      const result = await User.findOneAndUpdate({_id:id},{$set:updated})
      return  res.status(200).json({data:"Edited Successfully"})
    }
    catch (error) {
      return  res.status(500).json({data:"Internal server error"})
  }}
  else {
                                    
    res.status(403).json({message:"you are not authorized"});
               }
})
//delete user 
router.delete("/deleteUsers/:id",async(req,res)=>{
    const permission = ac.can(req.user.role).deleteAny('Users');
    if (permission.granted) {
    const{id}= req.params;
    try{
        const deleted = await User.findByIdAndDelete({_id:id});
        if(!deleted){
            return res.status(400).json({message:"Error Deleting your content"}) 
        }
        res.status(200).json({message:"Deleted Succesfully"}) 
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }         
         }
         else {
                                    
            res.status(403).json({message:"you are not authorized"});
                       }
})

export const userRouter = router;