import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteControllers.js";

const router = express.Router();

// Route für alle Notizen
router.get("/notes", getAllNotes);

// Route für das Erstellen einer Notiz
router.post("/notes", createNote);

// Route für das Aktualisieren einer Notiz
router.put("/notes/:id", updateNote);

// Route für das Löschen einer Notiz
router.delete("/notes/:id", deleteNote);

export default router;
