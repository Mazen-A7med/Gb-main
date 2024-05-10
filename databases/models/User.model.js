import { Schema, model} from "mongoose";

const userSchema= new Schema ({
username:{
    type: String,
    unique: [true, 'name is required'],
    trim:true,
    required: true,
    minlenght: [2,'too short name']
},
email:{
    type: String,
    unique: [true, 'email is required'],
    trim:true,
    required: true,
},
password:{
    type: String,
    required: true,
},
isActive :{
    types: Boolean,
},
role:{
    type:String,
    enum:['admin' ,'Patient' , 'doctor'],
    default :'Patient'
}
}, { timestamps: true})
const Patient = model('User',userSchema)


export default Patient