import express from "express";
import cors from "cors";
import { config } from "dotenv";

//Crear un servidor express

// 0.- Cargar variables de entorno cargadas en memoria  

config();

// 1.- Crear un servidor express

const app = express();

// 2.- Cargar variables basandonos en las variables de entorno cargadas con config 

const PORT=process.env.PORT || 3002
const HOST=process.env.HOST || "0.0.0.0"
const NODE_ENV=process.env.NODE_ENV || "development"
const SERVER_URL=process.env.SERVER_URL || "http://localhost:3002"
const AI_API_URL = process.env.AI_API_URL || "http://localhost:11434"
const AI_MODEL=process.env.AI_MODEL || "llama3.2:1b"


// 3.- Paso a middleware a mi aplicacion
// a) Habilitar los cors 
app.use(cors());
// b) Habilitar JSON para preguntas y respuestas
app.use(express.json())
// (OPCIONAL) c) Crear una funcion que muestre info al usuario 
//---------------------^ ESTE PARENTESIS ES UN RETURN
const getInfoApi= () =>({
        service: "Servicio api-ollama",
        status: "ready",
        endpoints: {
            "GET /api ": "Mostramos informacion de la API-OLLAMA",
            "GET /api/models ": "Mostramos informacion de los modelos disponibles",
            "POST /api/consulta ": "Envia un prompt para realizar consultas a la IA"
        },
        model: AI_MODEL,
        host: `${HOST}:${PORT}`,
        ollama_url: AI_API_URL 
});
//^ ACABA AQUI 
// 5.- Generar los endpoints (IMPORTANTE) ❗❗❗
// ==> /
app.get("/",(req,res)=>{
    res.json(getInfoApi());

})

// ==> /api 
app.get("/api",(req,res)=>{
    res.json(getInfoApi());
})

// ==> /api/modelos
app.get("/api/models", async(req,res)=>{
    try {
      const response = await fetch(`${AI_API_URL}/api/tags`,
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            signal: AbortSignal.timeout(5000)
        });
        if(!response.ok){
            throw new Error("Error al hacer la peticion")
        }
        const data = await response.json();
        const nameModels = data.models.map((item) => ({ modelo: item.name }));
        res.json(nameModels);
    } catch (error) {
        res.status(502);
        error: "Fallo en el acceso al servidor con los modelos";
        message: error.message;            
    }
})
//post                  
app.post("/api/consulta", async(req,res)=>{
    const { prompt,model } = req.body || {};
    // El prompt eciste o es string?
    if(!prompt || typeof prompt !== "string"){
        return res.status(400).json();
        error: "Fallo en el acceso al servidor con los modelos";
        message: error.message; 
    }
    
    try{
    const response = await fetch(`${AI_API_URL}/api/generate`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: AI_MODEL,
            prompt,
            stream:false,
        }),
        signal: AbortSignal.timeout(30000),
    });
    if(!response.ok){
        throw new Error("Error al hacer la peticion")
    }
    const data= await response.json();
    res.json({
        response:data.response,
        model:data.model,
    });
    }catch(error){
        res.status(502);
        error: "Fallo en el acceso al servidor con los modelos";
        message: error.message;  
    }
})
// 6.- Levantar el servidor express para escuchar peticiones a mis endpoints
app.listen(PORT, HOST,()=>{
    console.log("----------🥇Servidor express funcionando🥇---------");
    console.log(`\t Servidor escuchando en http://${HOST} en el puerto ${PORT}`);
    console.log("\t Escuchando peticiones...");
})

