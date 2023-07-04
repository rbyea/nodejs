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

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.bgWhite(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function editNote(editObj) {
  const notes = await getNotes();
  const { title, id } = editObj;

  const findNotesIndex = notes.findIndex((note) => note.id === id);

  if (typeof title !== "object") {
    notes[findNotesIndex] = { ...notes[findNotesIndex], ...editObj };
    await saveNotes(notes);

    console.log(
      chalk.bgGreenBright(
        `Note with id="${id}" has been update Title = ${title}.`
      )
    );
  } else {
    console.log(
      chalk.bgRedBright(
        `Note with id="${id}" not edit. Title = ${title}.`
      )
    );
  }
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
