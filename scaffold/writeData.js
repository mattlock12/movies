const path = require('path');
const fs = require('fs');
const find = require('lodash/find');
const trimEnd = require('lodash/trimEnd');
const snakeCase = require('lodash/snakeCase');

const writeData = (answers) => {
  const mediumPath = path.join(__dirname, `../data/${answers.medium}/`)
  const jsonPath = path.join(mediumPath, 'data.json')


  let data  = fs.readFileSync(jsonPath, 'utf8');
  data = JSON.parse(data);

  if(find(data, (art) => trimEnd(art.title.toLowerCase()) ===trimEnd(answers.title.toLowerCase()))){
    console.error(`${answers.medium}: "${answers.title}" already exists. consider updating that review`)
  }
  else{
    const dirname = snakeCase(answers.title)
    data.push({
      title: answers.title,
      id: data.length + 1,
      dirname: dirname
    });
    const newDir = `${mediumPath}${dirname}`;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, '\t'));
    console.log(`Added data to ${answers.medium}`);
    fs.mkdirSync(newDir);
    console.log(`created directory ${newDir}`);
    fs.writeFileSync(`${newDir}/README.md`, '# WITTY TITLE GOES HERE\n');
    console.log('created README');
    console.log("happy writing! <(''<)")
  }
}
module.exports = writeData
