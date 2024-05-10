import mongoose from "mongoose"


export const  dbconnection =()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/node_gp').then (()=>{
        console.log("database connected")
    }) .catch ((err)=>{
        console.log("database error");
    })
}