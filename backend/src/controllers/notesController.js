import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find();
    res.status(200).json(note);
  } catch (error) {
    console.error("Error On getAllNote Method", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).send(savedNote);
  } catch (error) {
    console.error("Error On createNote Method", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateNote = (req, res) => {
  res.status(200).send("Your Note Update Successfully");
};
export const deleteNote = (req, res) => {
  res.status(200).send("Your Delete Note Successfully");
};
