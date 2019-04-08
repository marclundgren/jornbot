const SLACK_TOKEN = 'xoxp-3508645082-84627622245-507552104784-ce4cfb2d46acbf08dcf0bcf5f25951ad'
// const SLACK_TOKEN = 'xoxb-3508645082-594903406134-koiyK7cfOSpiB59yCrHRUKuF' // JORN
const { WebClient } = require('@slack/web-api')
const web = new WebClient(SLACK_TOKEN)
// The current date
const currentTime = new Date().toTimeString()

const main = function() {

  // Use the `auth.test` method to find information about the installing user
  return web.auth.test().then(({ user_id }) => {
    // Use the `chat.postMessage` method to send a message from this app
    return web.chat.postMessage({
      channel: user_id,
      text: `The current time is ${currentTime}`,
    }).then(() => {
      console.log('Message posted!')
    })
  })
}

main()
