require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/smartestbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/smartestbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`SmartestBot Commands:
/smartestbot-ping - Check bot latency
/smartestbot-help - Show this help`
  });
});

app.command("/smartestbot-calc", async ({ command, ack, respond }) => {
  await ack();

  const numbers = command.text.trim().split("*").map(Number);

  if (numbers.length !== 2 || numbers.some(Number.isNaN)) {
    await respond({
      text: "Please use: /smartestbot-calc 25 * 4"
    });
    return;
  }

  const result = numbers[0] * numbers[1];

  await respond({
    text: `${numbers[0]} × ${numbers[1]} = ${result} 🧮`
  });
});