const inquirer = require('inquirer');
const writeData = require('./writeData.js')

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'list',
      name: 'medium',
      message: 'what did you waste your time consuming?',
      choices: [
        {
          key: 'm',
          name: 'Movie',
          value: 'movies',
        },
        {
          key: 't',
          name: 'TV',
          value: 'tv',
        },
        {
          key: 'b',
          name: 'Book',
          value: 'books',
        },
      ],
    },
    {
      name: 'title',
      message:'What was the title of this great piece of art?',
    },
  ])
  .then((answers) => {
    writeData(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('error', error)
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log('error', error)
      // Something else went wrong
    }
  });