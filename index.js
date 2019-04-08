// var { RtmClient, CLIENT_EVENTS } = require('@slack/client');
const { RTMClient } = require('@slack/rtm-api');
const rtm = new RTMClient(process.env.SLACK_TOKEN);
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

// var rtm = new RtmClient();
rtm.on('message', async (event) => {
  console.log({ event });

  await rtm.sendTyping(event.channel);
  await (new Promise((resolve) => setTimeout(resolve, 3000)));

  // Send a message (clears typing indicator)
  const reply = await rtm.sendMessage(`Welcome to #jorn, <@${event.user}>`, event.channel);

  console.log('Message sent successfully', reply.ts);
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();

  console.log({ self, team });
})();
