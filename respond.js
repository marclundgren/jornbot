require('dotenv').config();

const hash = (argv = []) => {
  return argv.reduce((hash, arg) => {
    let parts = arg.split('=');
    hash[parts[0]] = parts[1];
    return hash;
  }, {});
};

const {
  SLACK_TOKEN,
  userIds = [
    'UC8HXT3D1', // Anton
    'U2GJFJA77' // Marc
  ]
} = process.env;
