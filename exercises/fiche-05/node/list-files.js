const fs = require("fs");

const folderPathToListFiles = __dirname;

console.log(`Liste des fichiers du répertoire "${folderPathToListFiles}"`);

fs.readdir(folderPathToListFiles, (err, files) => {
  files.forEach((file, index) => console.log(`N°${index}: ${file}`));
});

console.log(`Fin du programme?`);
