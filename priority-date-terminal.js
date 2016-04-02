'use strict';

const inquirer = require('inquirer'),
priorityDate = require('priority-date').default,
_ = require('lodash/object'),
currentMonth = new Date().getUTCMonth() + 1,
nextMonth = currentMonth === 12 ? 1 : currentMonth + 1,
year = new Date().getUTCFullYear();

const questions = [
  {
    type: 'checkbox',
    message: 'Look up cut-off dates for:',
    name: 'Month',
    choices: [
      {
        name: `${currentMonth}-${year}`
      },
      {
        name: `${nextMonth}-${year}`
      }
    ],
    validate: function(answer) {
      if (answer.length < 1) {
        return "Please choose a month"
      }
      return true;
    }
  },
  {
    type: 'list',
    name: 'Country',
    message: 'What is your country of birth?',
    choices: [
      'chinaMLB',
      'philippines',
      'mexico',
      'india',
      'allExcept'
    ]
  },
  {
    type: 'list',
    name: 'Category',
    message: 'What is your Immigration Category?',
    choices: [
      'familySponsered',
      'employmentBased'
    ]
  }
];

inquirer.prompt( questions, function( answers ) {
  const moreQuestions = answers.Category === 'employmentBased' ? [{
    type: 'list',
    name: 'Type',
    message: 'What is your employment based category?',
    choices: [
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'fifthb',
      'otherWorkers',
      'certainReligiousWorkers'
    ]
  }] : [{
    type: 'list',
    name: 'Type',
    message: 'What is your family based category?',
    choices: [
      'F1',
      'F2a',
      'F2b',
      'F3',
      'F4'
    ]
  }];

  inquirer.prompt(moreQuestions, function(moreanswers) {

    const info = _.merge(answers, moreanswers),
          arr = [].concat(info['Month'][0]).concat(info['Category']).concat(info['Type']).concat(info['Country']),
          arr_1 = [].concat(info['Month'][1]).concat(info['Category']).concat(info['Type']).concat(info['Country']);

    console.log("\nYour info:", info);

    priorityDate().then(function(result) {
      console.log("\nYour priority date for currentMonth: ", _.result(result, arr.join('.')));

      if (info['Month'].length > 1){
        console.log("\nYour priority date for nextMonth: ", _.result(result, arr_1.join('.')));
      }
    });
  });
});
