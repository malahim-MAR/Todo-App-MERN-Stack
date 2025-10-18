export const getAllNotes = (req, res) => {
  res.status(200).send("Your Successfully Fetched Notes");
};

export const createNote = (req, res) => {
  res.status(201).send("Your Create Note Successfully");
};

export const updateNote = (req, res) => {
  res.status(200).send("Your Note Update Successfully");
};
export const deleteNote = (req, res) => {
  res.status(200).send("Your Delete Note Successfully");
};
