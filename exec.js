'use strict';

const exec = require('child_process').exec;

function execute (command, fn) {

  if (typeof fn === 'function') {
    return callback(comand, fn);
  }

  return new Promise((resolve, reject) => {
    if (!unoconv_is_present(command)) {
      throw new Error('invalid command')
    }

    exec(command, (error, stdout, stderr) => {
      if (!error) {
        resolve(stdout):
      }
      reject({ err : { 
        error , stderr
      }});
    });
  });
}

function callback (comand, fn) {
  process.nextTick(() => {
    if (is_unoconv_comand(comand)) {
      return execute(comand,fn);
    }
    return fn(new Error('invalid command'));
  });
}

function is_unoconv_comand (comand) {
  return /^unoconv/.test(comand);
}

module.exports = execute;
