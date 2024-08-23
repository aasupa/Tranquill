import express from "express";
import { dataCount } from "../controllers/totalCountController";

const app = express();
const router = express.Router();

router.get("/data-count", dataCount);

export default router;
