const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = '#jorn';

// Initialize an Express application
const express = require('express');
const app = express();
// Initialize an Express application
// const express = require('express');
// const app = express();

(() => {
  app.post('/', async function (req, res, next) {
    const payload = req.body;
    res.sendStatus(200);

    console.log('payload', payload);

    if (payload.event.type === 'app_mention') {
      if (payload.event.text.includes('tell me a joke')) {
        // Make call to chat.postMessage using bot's token
        const res = await web.chat.postMessage({ channel: conversationId, text: ':jorn:' });

        // `res` contains information about the posted message
        console.log('Message sent: ', res.ts);
      }
    }
  });

  // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
  slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  });

  // See: https://api.slack.com/methods/chat.postMessage
  // const res = await web.chat.postMessage({ channel: conversationId, text: ':jorn:' });

  // `res` contains information about the posted message
  // console.log('Message sent: ', res.ts);
})();
