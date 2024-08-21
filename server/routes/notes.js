import express from "express";
import{ createNote, getNotes, deleteNote} from "../controllers/Note.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import path from 'path';


const router = express.Router();

//const upload = multer({ dest: "public/assets/" });
router.post('/', verifyToken, createNote);
//router.post('/', verifyToken, upload.fields([{name:'image'},{name:'audio'}]), createNote); // Save a note
router.get('/', verifyToken, getNotes); // Get all notes
router.delete('/:id', verifyToken, deleteNote); // Delete a note

export default router;