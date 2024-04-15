import express from "express";
import { addTag, getTags } from "../controllers/tagController";

const tagRouter = express.Router();

tagRouter.get("/", getTags);
tagRouter.post("/", addTag);

export default tagRouter;
