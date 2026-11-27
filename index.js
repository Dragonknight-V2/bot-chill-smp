const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const CONFIG = {
  host: '5.9.41.143',
  port: 30172,
  username: 'BotChill',
  version: '1.20.4'
};

app.get('/', (req, res) => res.send('Bot dang hoat dong!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot(CONFIG);

  bot.on('spawn', () => {
    console.log('Bot da vao server!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Mat ket noi, dang vao lai...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Loi:', err.message));
}

createBot();
