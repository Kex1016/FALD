require("dotenv").config();
const requireText = require("require-text");
const discord = require("discord.js");
const Sequelize = require('sequelize');
const client = new discord.Client();
const Canvas = require('canvas');
const flatten = require("array-flatten");
const fs = require("fs");
import commands from "./commands";
import { getAnnouncementEmbed, getFromNextDays, query } from "./util";
const { Harusame } = require('harusame');

const commandPrefix = process.env.COMMAND_PREFIX || "!";
const dataFile = "./data.json";
let data = {};

const listenmoe = new Harusame()
  .on('error', (name, error) => console.error(`Websocket Name: ${name}`, error))
  .on('close', (name, reason) => console.log(`Websocket Name: ${name}, Close Data: ${reason}`))
  .on('open', (name) => console.log(`Websocket Name: ${name} is now open.`))
  .on('ready', (name) => console.log(`Websocket Name: ${name} is now ready`))
  .on('songUpdate', (name, data) => console.log(`Current song: `, data.songName));

client.on("ready", () => {
  // https://listen.moe/opus

  const radioChannel = client.channels.get("506811812122198016");
  const radioAnnounce = client.channels.get('617444677494505475');

  if (!radioChannel) return console.error("The channel does not exist!");
  radioChannel.join().then(connection => {
    // Yay, it worked!
    const dispatcher = connection.play('https://listen.moe/fallback');

    dispatcher.on('start', () => {
      console.log('Listen.MOE is now playing!');
    });

    dispatcher.on('finish', () => {
      console.log('Listen.MOE has finished playing, starting over.');
      connection.play('https://listen.moe/fallback');
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);

    listenmoe.on('songUpdate', (name, data) => {
      var cover = data.songCover, sname = data.songName, artist = data.songArtist, album = data.songAlbum;

      const embed = new discord.MessageEmbed()
        .setColor('#8c8a8b')
        .setAuthor('Radio', 'https://i.fiery.me/FzyYh.jpg', 'https://listen.moe')
        .setTitle('Currently playing song:')
        .addField(artist, sname, true)
        .addField('Album', album, true)
        .setImage(cover)
        .setTimestamp()
        .setFooter(`Asuka v2 by Kex#2320 - Powered by ${name}`, client.user.avatarURL({ dynamic: true }));

      radioAnnounce.send(embed);
      fs.writeFileSync('./song.json', JSON.stringify(data));
    });
    console.log(`Successfully connected to ${radioChannel.name}.`);
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });

  console.log(listenmoe.config);
  console.log(listenmoe.song);
  listenmoe.connect('JPOP');
  listenmoe.destroy('KPOP');

  console.log(`\n\nLogged in as ${client.user.tag}`);
});

client.on('error', console.error);

var message = 0;

client.on("message", msg => {
  message++;

  if (!msg.guild)
    return;

  if (msg.author.bot)
    return;

  const msgContent = msg.content.split(" ");

  if (msgContent[0].startsWith(commandPrefix)) {
    const command = commands[msgContent[0].substr(commandPrefix.length)];
    if (command) {
      const serverData = data[msg.guild.id] || {};
      const promise = command.handle(msg, msgContent.slice(1), serverData);
      if (promise) {
        promise.then(ret => {
          if (ret) {
            data[msg.guild.id] = ret;
            fs.writeFileSync(dataFile, JSON.stringify(data));
          }
        });
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);

export default {
  commandPrefix,
  commands,
  client
}
