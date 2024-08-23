import express from "express";
import{ createNote, getNotes, deleteNote, updateNote} from "../controllers/Note.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import path from 'path';



const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../public/assets'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     }
//   });
  
//   const upload = multer({ storage: storage });

//const upload = multer({ dest: "public/assets/" });
router.post('/', verifyToken, createNote);
//router.post('/', verifyToken, upload.fields([{name:'image'},{name:'audio'}]), createNote); // Save a note
router.get('/', verifyToken, getNotes); // Get all notes
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote); // Delete a note

export default router;