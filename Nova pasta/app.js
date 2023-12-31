import express from "express";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT, () =>
   console.log(`Magic happens on port ${process.env.PORT}`)
);