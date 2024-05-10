
import express from "express" 
import { addmedicalimage, getAllmedicalimages } from "./medicalimage.controller.js"


const medicalimageRouter = express.Router ()

medicalimageRouter
.route('/medicalimages')
.post(addmedicalimage)
.get(getAllmedicalimages)

export default medicalimageRouter
