import express from "express";
import { RequestService } from "../model/requestdata.js";
import {ac} from "../config/Acess.js"
const router = express.Router();


//add request
router.post("/addRequest",async(req,res)=>{
    const permission = ac.can(req.user.role).createAny('userRequests');
    if (permission.granted) {
    try{  
const  userrequest = await new RequestService(req.body).save();
if(!userrequest){
     res.status(400).json({message:"Error posting your request"})
   }
    res.status(200).json({message:"request added"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }}
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     }

})


//veiw requests

router.get("/allRequests", async (req,res)=>{
    const permission = ac.can(req.user.role).createAny('userRequests');
    if (permission.granted) {
    try{
        const allrequests = await RequestService.find();
        if(!allrequests){
            res.status(400).json({message:"No requests"})
          }
           res.status(200).json(allrequests)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }}
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     }
})
//get request by id
router.get("/allRequests/:id", async (req,res)=>{
    const permission = ac.can(req.user.role).createAny('userRequests');
    if (permission.granted) {
    const{id}=req.params
    try{
        const allrequests = await RequestService.findOne({_id:id})
        if(!allrequests){
            res.status(400).json({message:"No requests"})
          }
           res.status(200).json(allrequests)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }}
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     }
    
})
//edit requests
router.put("/editRequests/:id",async (req,res)=>{
    const permission = ac.can(req.user.role).createAny('userRequests');
    if (permission.granted) {
    const {id}=req.params;
    try{
      const updated = req.body;
      const result = await RequestService.findOneAndUpdate({_id:id},{$set:updated})
      return  res.status(200).json({data:"Edited Successfully"})
    }
    catch (error) {
      return  res.status(500).json({data:"Internal server error"})
  }}
                                 
  else {
                  
  res.status(403).json({message:"you are not authorized"});
   }
})
//delete requests
router.delete("/deleteRequests/:id",async(req,res)=>{
    const permission = ac.can(req.user.role).createAny('userRequests');
    if (permission.granted) {
    const{id}= req.params;
    try{
        const deleted = await RequestService.findByIdAndDelete({_id:id});
        if(!deleted){
            return res.status(400).json({message:"Error Deleting your Requests"}) 
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


export const RequestRouter= router;