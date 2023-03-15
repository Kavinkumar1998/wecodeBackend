import express from "express";
import { Content } from "../model/content.js";
import {ac} from "../config/Acess.js"
const router = express.Router();


//adding lead
router.post("/addLeadData",async(req,res)=>{
    const permission = ac.can(req.user.role).createAny('Leads');
    if (permission.granted) {
try{
    const  leaddata = await new Content(req.body).save();
    if(!leaddata){
         res.status(400).json({message:"Error posting your content"})
       }
        res.status(200).json({message:"lead added"})
}
catch(error){
    res.status(500).json({message:"Internal server error"})
}
    }
                                 
else {
                
res.status(403).json({message:"you are not authorized"});
 }
})

//veiwng leads
router.get("/allLeads", async (req,res)=>{
    const permission = ac.can(req.user.role).readAny('Leads');
    if (permission.granted) {
    try{
        const leads = await Content.find()
        if(!leads){
            res.status(400).json({message:"No leads"})
          }
           res.status(200).json(leads)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    } }
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     }
})

//get user by id
router.get("/allLeads/:id", async (req,res)=>{
    const permission = ac.can(req.user.role).readAny('Leads');
    if (permission.granted) {
    const{id}=req.params
    try{
        const leads = await Content.findOne({_id:id})
        if(!leads){
            res.status(400).json({message:"No Lead"})
          }
           res.status(200).json(leads)
    } 
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }  }
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     } 
})
//edit leads
router.put("/editLead/:id", async (req,res)=>{
    const permission = ac.can(req.user.role).updateAny('Leads');
if (permission.granted) {
    const{id}=req.params
    try{
        const updated = req.body;
        const leads = await Content.findOneAndUpdate({_id:id},{$set:updated})
        return  res.status(200).json({data:"Edited Successfully"})
      }
      catch (error) {
        return  res.status(500).json({data:"Internal server error"})
    }}
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     } 
  })

  //delete leads
  router.delete("/deleteLeads/:id",async(req,res)=>{
    const permission = ac.can(req.user.role).deleteAny('Leads');
    if (permission.granted) {
    const{id}= req.params;
    try{
        const deleted = await Content.findByIdAndDelete({_id:id});
        if(!deleted){
            return res.status(400).json({message:"Error Deleting your lead"}) 
        }
        res.status(200).json({message:"Deleted Succesfully"}) 
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }}
                                 
    else {
                    
    res.status(403).json({message:"you are not authorized"});
     } 
})

export const LeadRouter = router;