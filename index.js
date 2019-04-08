// var { RtmClient, CLIENT_EVENTS } = require('@slack/client');
const { RTMClient } = require('@slack/rtm-api');
const rtm = new RTMClient(process.env.SLACK_TOKEN);
// var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

const responses = {
  barf: [`Douglas had to poop. His butt was all stinky because he had to poop so badly. There was a gross woman named Rebecca who was sunbathing all naked, and she was fat. Douglas walked up to her and said, "I need to poop." "Okay," Rebecca replied, "I like poop." Douglas squatted down over the fat sunbathing lady and went poop.`],
  jorn: [
    'The almighty Jorn smiles upon thee 😌',
    'Do I make you jorny, baby?',
    'Praise Jorn 🙌🏿',
    'A ✨is Jorn',
    'Jorn is the omnipresent essence of the universe. He birthed all life-force known to man and rules the Kingdom of Vershtëd with an iron fist. He shall banish the Ghouls of Ghalfour back to the Swamp of Mong and reclaim the Triglonian throne from Gorlak the evil warlock of Mount Mortimor. Jorn loves all that accept him into their heart as all other false idols pale in comparison to his might and compassion.',
    '🎶We\'re no strangers to Jorn 🎶 You know the rules and so does Jorn 🎶 A full commitment\'s what Jorn\'s thinking of 🎶  You wouldn\'t get this from any other Jorn 🎶',
    '🎸...and Jorn\'s buying a stairway to heaven... 🎸',
    'Jorn is the way',
    '"Failing organizations are usually over-managed and under-led." -- Jorn',
    'Jorn loves you and wants you to buy AAPL stock. You\'re welcome 👨🏿‍💻',
    'Tell your best friend named Blake about Jorn.',
    '"You miss 100% of the shots you don\'t take" -- Jorn Gretzky',
    '"Everyone must take time to sit and watch the leaves turn." -- Jorn',
    'Witness Anton my child of the Kingom of Vershtëd. Go forth and praise Jorn. Huzzah. Zounds!',
    'I ♥ you',
    'Back to Mong with you Giuseppe!',
    'Giuseppe, the mongrel cries with the fury of a thousand newborn baby girls!',
    'Hold my beer, I\'ve got Swamp Monsters to banish back to Mong'
  ],
  'What is the meaning of life?': [
    ':jorn:'
  ],
  'good jorning': [
    ':jorn: Good Jorning 👋🏾'
  ],
  'What do you think of Giuseppe Jorn?': [
    'Giuseppe has yet to truly accept Jorn. He must be punished and banished back to Ball Park Pizza with the Ghouls of Ghalfour!'
  ],
  'Who is Giuseppe Jorn?': [
    'Dude, Giuseppe is lame. He doesn\'t even think I\'m real. BACK TO MONG YOU BARBARIAN!'
  ],
  'What does Giuseppe smell like Jorn?': [
    'Barf dude, fricken barf.'
  ]
};

// var rtm = new RtmClient();
rtm.on('message', async (event) => {
  console.log({ event });

  const { text } = event;

  const matchingResponseList = responses[text.trim()];

  if (matchingResponseList && matchingResponseList.length) {
    const response = matchingResponseList[Math.floor(Math.random() * matchingResponseList.length)];
    await rtm.sendTyping(event.channel);
    const delay = (response.length * 20) + 3000;

    await (new Promise((resolve) => setTimeout(resolve, delay)));

    // Send a message (clears typing indicator)
    const reply = await rtm.sendMessage(response, event.channel);

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
