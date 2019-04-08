// var { RtmClient, CLIENT_EVENTS } = require('@slack/client');
const { RTMClient } = require('@slack/rtm-api');
const rtm = new RTMClient(process.env.SLACK_TOKEN);
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const responses = {
  barf: `Douglas had to poop. His butt was all stinky because he had to poop so badly. There was a gross woman named Rebecca who was sunbathing all naked, and she was fat. Douglas walked up to her and said, "I need to poop." "Okay," Rebecca replied, "I like poop." Douglas squatted down over the fat sunbathing lady and went poop.`
};

// var rtm = new RtmClient();
rtm.on('message', async (event) => {
  console.log({ event });

  const { text } = event;

  const matchingResponse = responses[text.trim()];

  if (matchingResponse) {
    await rtm.sendTyping(event.channel);
    await (new Promise((resolve) => setTimeout(resolve, 3000)));

    // Send a message (clears typing indicator)
    const reply = await rtm.sendMessage(matchingResponse, event.channel);

    console.log('Message sent successfully', reply.ts);
  }
});

(async () => {
  // Connect to Slack
  await rtm.start();

  // console.log({ self, team });
})();

const http = require('http');
http.createServer(function () {
}).listen(process.env.PORT || 5000);
