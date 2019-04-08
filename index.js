var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var rtm = new RtmClient(process.env.SLACK_TOKEN);
rtm.start();

let channel;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
    if (c.is_member && c.name === 'jorn') {
      channel = c.id;
    }
  }

  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);

  rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
    rtm.sendMessage('@here What is this place?', channel);
  });
});
