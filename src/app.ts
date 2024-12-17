import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3001",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is listening on PORT : ${port}`);
});
