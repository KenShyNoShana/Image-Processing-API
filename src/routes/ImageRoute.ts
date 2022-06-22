import { Router } from "express";
import ImgController from "../controllers/ImageController";

const router = Router();

router.get("/", ImgController.resizeImage);

export default router;
