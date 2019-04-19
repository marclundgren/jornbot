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

const {
  channel = 'CGK0BQX1N' // #jorn
} = hash(process.argv);

const { RTMClient } = require('@slack/rtm-api');

const rtm = new RTMClient(SLACK_TOKEN);

const sendToJorn = (message, channelId) => {
  return rtm.sendMessage(message, channelId).catch(console.error);
};

rtm.start();

rtm.on('message', async (event) => {
  console.log({ event, 'event.user': event.user });

  if (event.text && userIds.find((id) => id === event.user)) {
    // if (event.channel === 'CGK0BQX1N') {
    await (new Promise((resolve) => setTimeout(resolve, 5000)));
    const { ts } = await sendToJorn(event.text, channel);
    console.log('Message sent successfully', ts, { text: event.text, channel });
    // }
  }
});
