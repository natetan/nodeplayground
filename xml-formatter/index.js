const fs = require('fs');

const formatXml = () => {
  const args = process.argv.splice(2);
  const sourceFile = args[0];
  let destinationFile = args[1];

  fs.readFile(sourceFile, (err, data) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    data = String(data);
    data = data.slice(1, data.length - 2);
    data = data.replace(/\n/g, '');
    data = data.replace(/\\"/g, '"');

    if (!destinationFile) {
      destinationFile = 'results/test.xml';
    }
    fs.writeFile(destinationFile, data, writeErr => {
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