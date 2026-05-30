import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from './lib/db.js';
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app,server} from "./lib/socket.js"; // Importing the socket server
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/hello/dist");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // frontend URL,
    credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(frontendDistPath));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(frontendDistPath, "index.html"));
      });
    }    
server.listen(PORT, () => {
    console.log('Server is running on port 5001 ');
    connectDB();
    });