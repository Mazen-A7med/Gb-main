import { Router } from "express";
import * as patient from "./patient.controller.js";

const router = Router()



router.post('/',patient.SignUpApi)
router.post('/signin',patient.signInApi)
router.put('/',patient.updateUser)
router.delete('/',patient.deleteUser)
router.get('/',patient.getAllDoctors)








export default router