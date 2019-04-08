const { createEventAdapter } = require('@slack/events-api');
const port = process.env.PORT || 3000;

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  waitForResponse: true
});

// https://api.slack.com/events/message.im
slackEvents.on('message', (event, respond) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  respond(':jorn:');
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
