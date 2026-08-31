import express from "express"
import { aiSuggestion } from "../controllers/aiSuggestion.controller.js";

const router = express.Router()

router.post("/suggestions", aiSuggestion)

export default router