const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const CONFIG = {
  host: '5.9.41.143',
  port: 30172,
  username: 'BotChill',
  version: '1.20.4'
};

app.get('/', (req, res) => res.send('Bot Chill SMP dang hoat dong 24/7!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot(CONFIG);
  let actionTimer = null;

  bot.on('spawn', () => {
    console.log('Bot da vao server thanh cong!');

    // Tự động tàng hình ngay sau khi vào server 2 giây
    setTimeout(() => {
      bot.chat('/vanish');
    }, 2000);

    // Dọn dẹp bộ đếm cũ nếu có
    if (actionTimer) clearInterval(actionTimer);

    // Thực hiện chuỗi hành động ngẫu nhiên giống người chơi thật mỗi 15-25 giây
    actionTimer = setInterval(() => {
      // 1. Xoay đầu nhìn ngẫu nhiên xung quanh
      const yaw = (Math.random() - 0.5) * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * 0.8;
      bot.look(yaw, pitch, false);

      // 2. Vung tay đánh gió
      bot.swingArm('right');

      // 3. Đi tới 1 bước nhỏ rồi lùi lại đúng vị trí cũ (tránh đi lạc khỏi phòng kín)
      const moveChoice = Math.floor(Math.random() * 3);
      if (moveChoice === 0) {
        bot.setControlState('forward', true);
        setTimeout(() => {
          bot.setControlState('forward', false);
          bot.setControlState('back', true);
          setTimeout(() => bot.setControlState('back', false), 350);
        }, 350);
      } else if (moveChoice === 1) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 400);
      } else {
        bot.setControlState('sneak', true);
        setTimeout(() => bot.setControlState('sneak', false), 800);
      }
    }, 18000);
  });

  bot.on('end', () => {
    console.log('Mat ket noi, dang tu dong vao lai sau 10 giay...');
    if (actionTimer) clearInterval(actionTimer);
    setTimeout(createBot, 10000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot bi kick:', reason);
  });

  bot.on('error', (err) => {
    console.log('Loi ket noi:', err.message);
  });
}

createBot();
