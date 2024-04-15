import express, { Application } from "express";
import cors from "cors";

import corsOptions from "./config/corsOptions";
import { logger } from "./middlewares/logEvents";
import errorHandler from "./middlewares/errorHandler";
import credentials from "./middlewares/credentials";
import dotenv from "dotenv";
import mongoose from "mongoose";

import noteRouter from "./routes/noteRoutes";
import tagRouter from "./routes/tagRoutes";

dotenv.config();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("failed connection");
  });

const app: Application = express();
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/notes", noteRouter);
app.use("/api/tags", tagRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
