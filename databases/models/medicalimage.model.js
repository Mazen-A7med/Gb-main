import mongoose from "mongoose";

const Schema= new mongoose.Schema ({
name: {
    type: String,
    unique: [true, 'name is required'],
    trim: true,
    required: true,
    minLength: [2,'too short name']
},
medicalhistory:{ 
    status:{
        type: String,
        enum:['patient',"impatient"],
        default :'impatient'
    }
},
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
imagePath: {
    type: String,
    required: true
},
description: String,
},
{ timestamps: true})
export const medicalimageModel = mongoose.model('medicalimage',Schema)



