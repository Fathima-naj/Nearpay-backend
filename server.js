import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from "./routes/categoryRoutes.js"
import budgetRoutes from "./routes/budgetRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import reportRoutes from './routes/reportRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import cors from "cors";

dotenv.config();
connectDB();

const app=express();

const corsOptions = {
    origin:[process.env.CLIENT_URL,process.env.FOREIGN_URL], // Add frontend URL here,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    credentials: true, // Allow credentials (cookies, HTTP authentication)
  };
  console.log("CLIENT_URL from .env:", process.env.CLIENT_URL);

app.use(cors(corsOptions))
app.options("*", cors(corsOptions)); 
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/budget',budgetRoutes)
app.use('/api/expense',expenseRoutes)
app.use('/api/report',reportRoutes)
app.use('/api/dashboard',dashboardRoutes)

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running at ${PORT}`))