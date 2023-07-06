const URL = process.argv[2];
const path = process.argv[3];

const request = require('request'); // request module
const fs = require('fs'); // writing files
const readline = require('readline');

// Test if the file exist
fs.access('example_file.txt', fs.constants.F_OK, (err) => {
  console.log('\n> Checking if the file exists');

  if (!err) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(`The file ${path} already exists. Do you want to overwrite it? (Y/N)`), (answer) => {
      if (answer.toLowerCase() == 'y') {
        download();
      } else {
        console.log(`File not overwritten. Exiting the app.`);
        rl.close();
      }
    }
  } else {
    download();
  }
});

const download = () => {
  request(URL, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  
    fs.writeFile(path, body, err => {
      if (err) {
        console.error('Error saving the file', err);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
    })
  });
};
