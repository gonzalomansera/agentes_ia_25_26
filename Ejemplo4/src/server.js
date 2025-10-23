//- Fichero encargado de levantar una API REST con Express

import express from "express";
import { config } from "dotenv";
import chips from "./db/db.js";
import cors from "cors";


// variables de entorno
config();

const PORT=process.env.PORT || 4001 ;
const HOST=process.env.HOST;
const NODE_ENV= process.env.NODE_ENV;
const SERVER_URL= process.env.SERVER_URL || "http://localhost";

const app =express();


// cors 
app.use(cors())

//voy a permitir json como cuerpo de peticion 
app.use(express.json());

//midleware
app.use((req,res,next)=>{
    const timeData= new Date().toISOString;
    console.log(`${timeData} ${req.method} ${req.url} -IP ${req.ip}`)
    next();
})

//Bienvenida..
//info de la API 
app.get('/',(req,res)=>{
    res.json({
        message:"Mini API de post de papas",
        version:"1.0.0",
        endpoints : {
            "GET /chips ":"Obtiene toas las papas fritas ",
            "DELETE /chips":"Elimina todas las papas fritas de la API"
        }
    });
});
// Devuelve
app.get("/chips",(req,res)=>{
    console.log("Peticion GET para traer todas mis papatas fritas de la API ");
    res.json({
        succes:true,
        data:chips,
        count:chips.length
        
    })
})
app.delete("/chips",(req,res)=>{
    res.json({
    succes:true,
    data:chips,
    count:chips.length
        
  })  
})
app.listen(PORT,HOST,()=>{
    console.log(`😁🎉🎉Servidor levantado en ${SERVER_URL}:${PORT}`);
    
})