import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js"
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/upload", protectRoute, upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const ext = req.file.originalname.split(".").pop().toLowerCase();
    const imageExts = ["jpg", "jpeg", "png", "gif", "webp"];
    const fileType = imageExts.includes(ext) ? "image" : ext === "pdf" ? "pdf" : "doc";

    res.status(200).json({
        fileUrl: `/uploads/${req.file.filename}`,
        fileType,
        fileName: req.file.originalname
    });
});

export default router;