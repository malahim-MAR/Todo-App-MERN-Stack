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

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const UpdatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!UpdatedNote) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    res.status(200).json(UpdatedNote);
  } catch (error) {
    console.error("Error On updateNote Method", error);
    res.status(500).json({ message: "Server Error" });
  }
  res.status(200).send("Your Note Update Successfully");
};
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note Not Found" });
    }
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.error("Error On deleteNote Method", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  res.status(200).send("Your Delete Note Successfully");
};
