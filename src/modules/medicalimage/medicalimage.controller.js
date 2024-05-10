
import {  medicalimageModel } from "../../../databases/models/medicalimage.model.js"

const addmedicalimage = async(req, res, next)=>{
    let medicalimage = new medicalimageModel (req.body)
    await medicalimage .save()
    res.json({message:"success", medicalimage })
}

const getAllmedicalimages = async(req, res, next)=>{
    let medicalimages =  await medicalimages .find({})
    res.json({message:"success", medicalimages })
}

export {
    addmedicalimage,
    getAllmedicalimages
}