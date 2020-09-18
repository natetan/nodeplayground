const fs = require('fs');
const xmlFormatter = require('xml-formatter');

/**
 * Reads in an XML file from the console and outputs a formatted xml file
 * 
 * node index.js [0] [1]
 * 
 * 0 - source file
 * 1- destination file (optional)
 */
const formatXml = () => {
  const args = process.argv.splice(2);
  const sourceFile = args[0];

  if (!sourceFile) {
    console.log('No source file given. Format: node index.js [sourceFile] [destinationFile].');
    return;
  }
  if (sourceFile.split('.')[1] !== 'xml') {
    console.log(`File ${sourceFile} is not xml.`);
    return;
  }
  let destinationFile = args[1];

  fs.readFile(sourceFile, (err, data) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    data = String(data).trim();
    if (data[0] === '"' && data[data.length - 1] === '"') {
      data = data.slice(1, data.length - 2);
    }
    data = data.replace(/\n/g, '');
    data = data.replace(/\\"/g, '"');

    var formattedXml = xmlFormatter(data, {
      indentation: '  '
    });

    if (!destinationFile) {
      destinationFile = `results/test.xml`;
    }
    fs.writeFile(destinationFile, formattedXml, writeErr => {
      if (writeErr) {
        console.log(`Write Error: ${writeErr.message}`);
        return;
      }
    });
    console.log(`Source ${sourceFile} has been formatted to ${destinationFile}`);
    return;
  });
}

formatXml();