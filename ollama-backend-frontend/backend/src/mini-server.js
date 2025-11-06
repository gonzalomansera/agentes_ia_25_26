import express from "express";
import cors from "cors";
import { config } from "dotenv";

// Cargar variables de entorno desde .env
config();

const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || "0.0.0.0";
const SERVER_URL = process.env.SERVER_URL || `http://${HOST}:${PORT}`;
const AI_API_URL = process.env.AI_API_URL || "http://localhost:11434";
const AI_MODEL = process.env.AI_MODEL || "llama2";

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Función con info básica del servidor
const getAppInfo = () => ({
  name: "Mini Services backend ollama",
  version: "1.0.0",
  status: "running",
  description: "Servidor backend para manejar solicitudes de IA",
  endpoints: {
    "GET /api": "Información básica del servidor y del modelo IA",
    "GET /api/modelos": "Información del modelo de IA configurado en ollama",
    "POST /api/modelos/consulta": "Enviar un prompt al modelo de IA y obtener una respuesta",
  },
  model: AI_MODEL,
  host: `${HOST}:${PORT}`,
  ollama: {
    url: AI_API_URL,
  },
});

// Rutas
app.get("/", (req, res) => res.json(getAppInfo()));

app.get("/api", (req, res) => res.json(getAppInfo()));

// Obtener modelos de Ollama
app.get("/api/modelos", async (req, res) => {
  try {
    const response = await fetch(`${AI_API_URL}/api/tags`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener modelos de Ollama: ${response.statusText}`);
    }

    const data = await response.json();
    const modelos = data.models || [];

    res.json({
      total: modelos.length,
      modelos,
      origen: AI_API_URL,
    });
  } catch (error) {
    res.status(502).json({ error: `Error de fetching ollama: ${error.message}` });
  }
});

// Enviar prompt al modelo IA
app.post("/api/modelos/consulta", async (req, res) => {
  const { prompt, model } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "El campo 'prompt' es obligatorio y debe ser una cadena de texto",
    });
  }

  const targetModel = model || AI_MODEL;

  try {
    const response = await fetch(`${AI_API_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: targetModel,
        prompt,
        stream: false,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      throw new Error(`Error al generar respuesta: ${response.statusText}`);
    }

    const data = await response.json();

    res.json({
      prompt,
      modelo: targetModel,
      response: data.response || "",
      latency: data.latencyMs || null,
      origen: AI_API_URL,
    });
  } catch (error) {
    res.status(502).json({ error: `Error de generación: ${error.message}` });
  }
});

// Lanzar servidor
app.listen(PORT, HOST, () => {
  console.log(`
---------------------------------------------------------------------------------------------
 🖥️ Mini Server backend ollama by gonzalomansera 🖥️
 Servidor backend mini-server escuchando en ${SERVER_URL} (entorno: ${process.env.NODE_ENV || "dev"})
 Por favor accede a: ${SERVER_URL}/api para ver la información del servidor.
 Asegúrate de que el servicio de IA esté corriendo en: ${AI_API_URL}
---------------------------------------------------------------------------------------------
`);
});

export default app;
