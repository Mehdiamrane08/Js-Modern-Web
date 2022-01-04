const fs = require("fs");

const baseFolder = __dirname + "/../";

const printFileHyperlinks = (directory) => {
  const hyperlinkArray = [];
  const directoryPath = baseFolder + directory;

  fs.readdirSync(directoryPath).forEach((file, index) => {
    console.log(`N°${index}: ${file}`);
    const relativeHyperlink = `<li><a href="./${file}">${file}</a></li>`;
    hyperlinkArray.push(relativeHyperlink);
  });

  if (hyperlinkArray.length === 0) return "";
  const hyperlinkList = "<ul>" + hyperlinkArray.join("") + "</ul>";
  console.log("html hyperlink list:", hyperlinkList);
  return hyperlinkList;
};




const asyncPrintFileHyperlinks = (directory, callback) => {
  const hyperlinkArray = [];
  const directoryPath = baseFolder + directory;

  fs.readdir(directoryPath, (err, files) => {
    files.forEach((file, index) => {
      console.log(`N°${index}: ${file}`);
      const relativeHyperlink = `<li><a href="./${file}">${file}</a></li>`;
      hyperlinkArray.push(relativeHyperlink);
    });
    if (hyperlinkArray.length === 0) return "";

    const hyperlinkList = "<ul>" + hyperlinkArray.join("") + "</ul>";
    console.log("html hyperlink list:", hyperlinkList);
    callback(hyperlinkList);
  });
};

module.exports = { printFileHyperlinks, asyncPrintFileHyperlinks };
