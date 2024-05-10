
import Patient from "../../../databases/models/User.model.js";
import bcrypt from "bcryptjs"
import Doctor from "../../../databases/models/doctor.model.js";

//=================== sign up ========================
export const SignUpApi = async (req,res,next) =>{
    const {username, email,password} = req.body

    //=== user name check

    // const isUsernameExist = await User.findOne({username})
    // if (isUsernameExist) {
    //     return res.status(409).json({
    //         message: 'user name is already exist'
    //     })
    // }

    //==== email check
    const isEmailExist = await Patient.findOne({email})
    if (isEmailExist) {
        return res.status(409).json({
            message: 'email is already exist',
        })
    }
    // hash password
    const hashPassword = bcrypt.hashSync(password, +process.env.salt_rounds)
    const createdUser = await Patient.create({username, email , password: hashPassword })
    if (!createdUser) {
        return res.status(500).json({
            message: 'user regestration failed',
        })
    }
    return res.status(201).json({
        message:'User regestration success',
        createdUser
    })

}
//=============== sign In =============================
export const signInApi = async (req,res,next)=>{
    const {username, password}= req.body
    const user = await Patient.findOne({ username})

    if (!user) {
        return res.status(400).json({
            message : " Invalid User ",
        })
    }

    //==== password checked
    const validPass=bcrypt.compareSync(password, user.password)
    if(!validPass){
        return res.status(400).json({
            message : " invalid password ",
        })
    }
    return res.status(202).json({
        message: "login success",
    })
}

//====================== update ======================
export const updateUser = async (req,res,next) =>{
    const {username , email }= req.body
    const{_id , loggedInId} = req.query
    // authorization
    if (_id !== loggedInId) {
        return res.status(401).json({
            message: "updated fail",
        })
    }

    let updateObject = {}

    if (username) {
        const isUsernameExist = await Patient.findOne({username})
        if (isUsernameExist) {
            return res.status(409).json({
                message: 'user name is already exist',
            })
        }
        updateObject.username = username

    }

    
    if (email) {
        const isEmailExist = await Patient.findOne({email})
        if (isEmailExist) {
            return res.status(409).json({
                message: 'Email is already exist',
            })
        }
        updateObject.email = email

    }


    const  updatedAccount = await Patient.updateOne({_id},updateObject)
    if (!updatedAccount.modifiedCount) {
        return res.status(400).json({
            message: " invalid user Id",
        })
    }
    return res.status(200).json({
        message: "updated done",
    })
}

//======================= delete Acount==================

export const deleteUser = async(req,res,next) =>{
    const {_id , loggedInId} = req.query

    //===== way 1 ============
    // const user = await User.findOneAndDelete({
    //     _id: loggedInId
    // })
    // if (!user) {
    //     return res.json({
    //         message: "deleted fail",
    //         status: 400
    //     })
    // }

    //==== way 2 =====
    if (_id !== loggedInId) {
        return res.status(401).json({
            message: "deleted fail",
        })
    }
    const user = await Patient.findByIdAndDelete({
        _id
    })
    if (!user) {
        return res.status(400).json({
            message: "invalid Id",
        })
    }
    return res.status(200).json({
        message: "deleted success",
    })
}

//=========== get All Doctors ================
export const getAllDoctors = async (req, res, next) => {
    // const {specialization} = req.params
    const user = await Doctor.find({specialization : req.query.specialization} , 'doctorname phoneNumber')
    if (!user) {
        return res.status(400).json({
            message: "invalid specialization",
        })
    }
    res.status(200).json({
        message:"done",
        user
    })
}