import { Notes } from "../models/Notes.js";
import mongoose from "mongoose";
export const createNote = async (req, res) => {
    try {
      const { text} = req.body;
      const image = req.files?.image ? `/assets/${req.file.filename}` : null;
      const audio = req.files?.audio ? `/assets/${req.files.filename}` : null;
      const note = new Notes({
        userId: req.user, // Assuming you have user authentication middleware
        text,
        image,
        audio,
      });
      const savedNote = await note.save();
      res.status(201).json(savedNote);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create note' });
    }
  };
  
  // Get all notes for a user
  export const getNotes = async (req, res) => {
    try {
      const notes = await Notes.find({ userId: req.user });
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve notes' });
    }
  };
  
  // Delete a note
  export const deleteNote = async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) return res.status(404).json({ error: 'Note not found' });
  
      if (note.userId.toString() !== req.user.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      await note.remove();
      res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  };