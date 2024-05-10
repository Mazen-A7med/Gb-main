
import express from 'express';
import { dbconnection } from './databases/dbConnection.js';
import medicalimageRouter from './src/modules/medicalimage/medicalimage.routes.js';
import patientRouter from './src/modules/patient/patient.routes.js';
import doctorRouter from './src/modules/Doctor/doctor.routes.js'
import { config } from "dotenv"

config({path:'./config/dev.config.env'})
const app = express()
const port = process.env.port


app.use(express.json())
app.use('/medical',medicalimageRouter)
app.use('/patient',patientRouter)
app.use('/doctor',doctorRouter)




dbconnection()
app.get('/', (req, res) => res.send('hello world '))
app.listen(port, () =>  console.log(`example app running on port ${port}`))















