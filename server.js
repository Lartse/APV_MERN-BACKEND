import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import vetRouter from "./routes/vetRoutes.js";
import pacienteRouter from "./routes/pacienteRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use('/api/veterinarios', vetRouter)
app.use('/api/pacientes', pacienteRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server in PORT: ${PORT}`)
});