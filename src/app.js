import  express  from "express";
import indexRouter from "./routes/index.routes.js"
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", indexRouter)


app.use((req,res,next)=> {
    res.status(404).json({
        message: "not found"
    })
});

export default app;