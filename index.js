const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const CONFIG = {
  host: 'chill-smp.funserver.top', // Sửa thành IP server của bạn
  port: 25716,                              // Cổng server của bạn
  username: 'bot-chill-',                    // Tên con bot
  version: false
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

