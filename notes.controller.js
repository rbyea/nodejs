const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added!"));
}

function getList(notes) {
  notes.forEach((note) => {
    console.log(chalk.blue("id: " + note.id, "title: " + note.title));
  });
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.green("Here is the list of notes: "));
  getList(notes);
}

async function deleteNote(id) {
  const notes = await getNotes();
  const filterNotes = notes.filter((note) => note.id !== id);
  saveDb(filterNotes);
  getList(filterNotes);
}

async function saveDb(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  deleteNote,
};
