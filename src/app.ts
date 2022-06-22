import express, { Application } from "express";

import ImgRouter from "./routes/ImageRoute";

export const app: Application = express();

/* ROUTES */
app.use("/resizeImage", ImgRouter);

export default app;
