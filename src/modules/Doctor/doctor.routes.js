import { Router } from "express";
import * as doctor from './doctor.controller.js'


const router = Router()



router.post('/',doctor.SignUpApi)
router.post('/signIn',doctor.signInApi)
router.put('/',doctor.updateUser)
router.delete('/',doctor.deleteUser)
router.get('/',doctor.getAllPatient)




export default router