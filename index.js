import { Telegraf } from "telegraf";
import { config } from "./config.js";
import { getWeather } from "./weather.js";
import { getCat } from "./cat.js";
import { showMenu, closeMenu } from "./menu.js";

const bot = new Telegraf(config.telegramToken, {});

bot.start((ctx) =>
  ctx.reply('Добро пожаловать в бот. Для начала напишите "меню"')
);

bot.on("message", async (ctx) => {
  const chatId = ctx.chat.id;

  if (ctx.message.text == "меню") {
    showMenu(bot, chatId);
  } else if (ctx.message.location) {
    let weather = await getWeather(ctx);
    ctx.reply(weather);
  } else if (ctx.message.text == "Получить мем кота") {
    let cat = await getCat();
    ctx.reply(cat);
  } else {
    closeMenu(bot, chatId);
  }
});

bot.launch();
