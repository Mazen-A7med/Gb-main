
import Patient from "../../../databases/models/User.model.js";
import bcrypt from "bcryptjs"
import Doctor from "../../../databases/models/doctor.model.js";

//=================== sign up ========================
export const SignUpApi = async (req,res,next) =>{
    const {doctorname, email,password,phoneNumber,specialization} = req.body

    //=== user name check

    // const isUsernameExist = await User.findOne({username})
    // if (isUsernameExist) {
    //     return res.status(409).json({
    //         message: 'user name is already exist'
    //     })
    // }

    //==== email check
    const isEmailExist = await Doctor.findOne({email})
    if (isEmailExist) {
        return res.status(409).json({
            message: 'email is already exist',
        })
    }
    // hash password
    const hashPassword = bcrypt.hashSync(password, +process.env.salt_rounds)
    const createdUser = await Doctor.create({doctorname, email , phoneNumber , specialization , password: hashPassword })
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
    const {doctorname, password}= req.body
    const user = await Doctor.findOne({doctorname})

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
    const {doctorname , email , phoneNumber }= req.body
    const{_id , loggedInId} = req.query
    // authorization
    if (_id !== loggedInId) {
        return res.status(401).json({
            message: "updated fail",
        })
    }

    let updateObject = {}

    if (doctorname) {
        const isUsernameExist = await Doctor.findOne({doctorname})
        if (isUsernameExist) {
            return res.status(409).json({
                message: 'user name is already exist',
            })
        }
        updateObject.doctorname = doctorname

    }

    
    if (email) {
        const isEmailExist = await Doctor.findOne({email})
        if (isEmailExist) {
            return res.status(409).json({
                message: 'Email is already exist',
            })
        }
        updateObject.email = email

    }
    if (phoneNumber) {
        const isphoneNumberExist = await Doctor.findOne({phoneNumber})
        if (isphoneNumberExist) {
            return res.status(409).json({
                message: 'phone number is already exist',
            })
        }
        updateObject.phoneNumber = phoneNumber

    }


    const  updatedAccount = await Doctor.updateOne({_id},updateObject)
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
    const user = await Doctor.findByIdAndDelete({
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

//=========== get All Patient ================
export const getAllPatient = async (req, res, next) => {
    // const {_id} = req.params
    const user = await Patient.findById({_id:req.query._id }, 'username')
    if (!user) {
        return res.status(400).json({
            message: "invalid user id",
        })
    }
    res.status(200).json({
        message:"done",
        user
    })
}

