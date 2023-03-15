import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { dataBaseConnection } from "./db.js";
import { signupRouter } from "./routes/signup.js";
import { loginRouter } from "./routes/login.js"
import { userRouter } from "./routes/Users.js";
import { LeadRouter } from "./routes/Leads.js";
import { RequestRouter } from "./routes/userRequests.js";
import {isSignedIn} from "./controllers/Autherization.js"

//en config
dotenv.config();

//dbconnection
dataBaseConnection();

const app = express();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("server started");
  });
app.use(express.json()); 
app.use(cors());
app.use("/api/userRequests",isSignedIn,RequestRouter)
app.use("/api/Leads",isSignedIn,LeadRouter)
app.use("/api/Users",isSignedIn,userRouter)
app.use("/api/login",loginRouter)
app.use("/api/signup",signupRouter)
app.listen(PORT,()=>console.log(`server is started at ${PORT}`));