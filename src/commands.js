require("dotenv").config();
const requireText = require("require-text");
import { getAnnouncementEmbed, getFromNextDays, query } from "./util";
import main from "./main";
const Canvas = require('canvas');
const Discord = require('discord.js');
const alIdRegex = /anilist\.co\/anime\/(.\d*)/;
const malIdRegex = /myanimelist\.net\/anime\/(.\d*)/;
var fs = require('fs');
const ytdl = require('ytdl-core');
const editJsonFile = require("edit-json-file");

export default {
  'np': {
    description: "Shows what the bot is currently playing.",
    handle(message, args, data) {
      var file = JSON.parse(fs.readFileSync('song.json', 'utf8'));

      var cover = file.songCover, sname = file.songName, artist = file.songArtist, album = file.songAlbum;

      const embed = new Discord.MessageEmbed()
        .setColor('#8c8a8b')
        .setAuthor('Radio', 'https://i.fiery.me/FzyYh.jpg', 'https://listen.moe')
        .setTitle('Currently playing song:')
        .addField(artist, sname, true)
        .addField('Album', album, true)
        .setImage(cover)
        .setTimestamp()
        .setFooter(`Asuka v2 by Kex#2320 - Powered by Listen.MOE JP`, main.client.user.avatarURL({ dynamic: true }));

      return message.channel.send(embed);
    }
  },
  '8ball': {
    description: "Ask the 8ball.",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('8Ball');

      embed.setAuthor('8ball', 'https://i.fiery.me/eQBfT.png');
      embed.setDescription(`${neko.response}, <@${message.member.id}>`);
      embed.setImage(neko.url);

      return message.channel.send({ embed });
    }
  },
  'smug': {
    description: "Smug = win.",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('smug');


      embed.setDescription(`<@${message.member.id}>: *looks smugly*`);
      embed.setImage(neko.url);

      return message.channel.send({ embed });
    }
  },
  'baka': {
    description: "For when someone is a baka.",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('baka');

      embed.setImage(neko.url);

      if (message.mentions.users) {
        var text = ""
        message.mentions.users.forEach(user => {
          const member = message.guild.member(user);
          if (member) {
            text += `, <@${member.id}>`
          }
        });
        embed.setDescription(`You are a baka${text}!`);
        return message.channel.send({ embed })
      }

      embed.setDescription(`<@${message.member.id}> is a baka! For some reason...`);
      return message.channel.send({ embed });
    }
  },
  'slap': {
    description: "For when someone is a baka.",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('slap');

      embed.setImage(neko.url);
      var mentions = message.mentions.users;
      if (mentions.size > 0) {
        var text = "";
        var first = false;
        if (mentions.size === 2) {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += ` and <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> slaps ${text}!`);
          return message.channel.send({ embed });
        } else if (mentions.size > 2) {
          var last = mentions.size;
          var i = 1;
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            } else if (i === last) {
              text += ` and <@${user.id}>`
            } else {
              text += `, <@${user.id}>`
            }
            i++;
          });
          embed.setDescription(`<@${message.member.id}> slaps ${text}!`);
          return message.channel.send({ embed });
        } else {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += `, <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> slaps ${text}!`);
          return message.channel.send({ embed });
        }
      }

      embed.setDescription(`<@${message.member.id}> slaps himself for some reason...`);
      return message.channel.send({ embed });
    }
  },
  'hug': {
    description: "For when someone needs a hug.",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('hug');

      embed.setImage(neko.url);
      var mentions = message.mentions.users;
      if (mentions.size > 0) {
        var text = "";
        var first = false;
        if (mentions.size === 2) {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += ` and <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> hugs ${text}!`);
          return message.channel.send({ embed });
        } else if (mentions.size > 2) {
          var last = mentions.size;
          var i = 1;
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            } else if (i === last) {
              text += ` and <@${user.id}>`
            } else {
              text += `, <@${user.id}>`
            }
            i++;
          });
          embed.setDescription(`<@${message.member.id}> hugs ${text}!`);
          return message.channel.send({ embed });
        } else {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += `, <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> hugs ${text}!`);
          return message.channel.send({ embed });
        }
      }

      embed.setDescription(`<@${message.member.id}> hugs himself. Yoshi yoshi.`);
      return message.channel.send({ embed });
    }
  },
  'kiss': {
    description: "😳",
    async handle(message, args, data) {
      var { embed, neko } = await NekoGet('kiss');

      embed.setImage(neko.url);
      var mentions = message.mentions.users;
      if (mentions.size > 0) {
        var text = "";
        var first = false;
        if (mentions.size === 2) {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += ` and <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> kisses ${text}!`);
          return message.channel.send({ embed });
        } else if (mentions.size > 2) {
          var last = mentions.size;
          var i = 1;
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            } else if (i === last) {
              text += ` and <@${user.id}>`
            } else {
              text += `, <@${user.id}>`
            }
            i++;
          });
          embed.setDescription(`<@${message.member.id}> kisses ${text}!`);
          return message.channel.send({ embed });
        } else {
          mentions.forEach(user => {
            if (!first) {
              first = true;
              text += `<@${user.id}>`;
            }
            else {
              text += `, <@${user.id}>`;
            }
          });
          embed.setDescription(`<@${message.member.id}> kisses ${text}!`);
          return message.channel.send({ embed });
        }
      }

      embed.setDescription(`<@${message.member.id}> kisses himself. 😳`);
      return message.channel.send({ embed });
    }
  },
  'owo': {
    description: "owoifies stuff",
    async handle(message, args, data) {
      var text = ""
      args.forEach(element => {
        text += `${element} `;
      });
      var { embed, neko } = await NekoGet('OwOify', text);
      message.channel.send(neko.owo);
    }
  },
  spoiler: {
    description: "Makes you a spoiler channel.",
    async handle(message, args, data) {
      var server = message.guild;
      var name = args.join('-');
      var search = args.join('-').toLowerCase();
      if (!args) return message.channel.send("You didn't provide a name for the spoiler channel!");
      var spoiler = await server.createChannel(name, "text");
      var spoilerboard = server.channels.find(c => c.name == "spoilerboard" && c.type == "text");
      var general = server.channels.find(c => c.name == "general" && c.type == "text");

      let category = server.channels.find(c => c.name == "Spoiler" && c.type == "category"),
        channel = await server.channels.find(c => c.name === search);

      if (category && channel) await channel.setParent(category.id);
      else console.error(`One of the channels is missing:\nCategory: ${!!category}\nChannel: ${!!channel}`);

      spoilerboard.send("--------\n" + "Topic: <#" + spoiler.id + ">" + "\nID: " + spoiler.id);
      message.channel.send("**Successfully created spoiler channel** <#" + spoiler.id + ">");
      general.send("New spoiler channel: <#" + spoiler.id + ">");

      const canvas = Canvas.createCanvas(800, 300);
      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage('./src/data/spoiler.png');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      // Select the font size and type from one of the natively available fonts
      ctx.font = '35px sans-serif';
      // Select the style that will be used to fill the text in
      ctx.fillStyle = '#ffffff';
      // Actually fill the text with a solid color
      ctx.fillText(args.join(' '), 95, canvas.height / 1.85);

      // Pick up the pen
      ctx.beginPath();
      // Start the arc to form a circle
      ctx.arc(662, 150, 100, 0, Math.PI * 2, true);
      // Put the pen down
      ctx.closePath();
      // Clip off the region you drew on
      ctx.clip();

      const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
      ctx.drawImage(avatar, 548, 35, 220, 220);

      const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

      await spoiler.send(attachment);
      spoiler.send(`Welcome to your spoiler channel, <@!${message.author.id}>!\nPlease only post spoilers regarding **${name}** here.\n**To close this channel, type \`a!close\` in here.**`);
    }
  },
  close: {
    description: "Closes the spoiler channel you send this command in.",
    async handle(message, args, data) {
      var server = message.guild;
      var channelID = message.channel.id;
      var spoilerboard = server.channels.find(c => c.name == "spoilerboard" && c.type == "text");
      var general = server.channels.find(c => c.name == "general" && c.type == "text");
      var testBool = false;

      await spoilerboard.messages().then(messages => {
        messages.filter(msg => {
          if (msg.content.includes(channelID)) {
            msg.edit(`--------\nDeleted: ${message.channel.name}`);
            testBool = true;
          }
        });
      });
      if (testBool === true) {
        message.channel.delete();
        general.send("Spoiler channel deleted with ID: " + channelID + `\n*(Named \`${message.channel.name}\`)*`);
      }
      else {
        message.channel.send("This is not a spoiler channel.");
      }
    }
  },
  'pasta': {
    description: "... cancer.\n`pasta add <name>` to add pasta\n`pasta <paste name>` to view pasta",
    handle(message, args, data) {
      var name = "";

      if (args[0] === 'add') {
        var obj = JSON.parse(fs.readFileSync('./pastes.json', 'utf8'));
        if (args[1]) {
          if (obj[args[1]]) {
            message.channel.send(`**This pasta (\`${args[1]}\`) already exists!**\n**Do you want to overwrite it?**`)
              .then((msg) => {
                msg.react('👍').then(() => msg.react('👎'));
                const filter = (reaction, user) => {
                  return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '👍') {
                      var text = "";
                      if (args.length > 2) {
                        for (let i = 2; i < args.length; i++) {
                          const element = args[i];
                          text += `${element} `
                        }
                        if (text === obj[args[1]].text) {
                          msg.edit(`This pasta (\`${args[1]}\`) already has this text dumdum`);
                        }
                        msg.edit(`**Modified \`${args[1]}\` pasta.**`);
                        msg.reactions.removeAll();
                        obj[args[1]].text = text;
                        fs.writeFileSync('./pastes.json', JSON.stringify(obj));
                      } else {
                        msg.edit("You didn't provide anything to edit the pasta with!");
                        msg.reactions.removeAll();
                      }
                    } else {
                      msg.edit('**Edit cancelled.**');
                      msg.reactions.removeAll();
                    }
                  })
                  .catch(collected => {
                    msg.edit('You didn\'t react in time.');
                  });
              });

          }
          else {
            if (args.length > 2) {
              var text = "";
              for (let i = 2; i < args.length; i++) {
                const element = args[i];
                text += `${element} `
              }
              let file = editJsonFile('./pastes.json');

              file.set(`${args[1]}.text`, text);
              file.save();

              message.channel.send(`**Pasta \`${args[1]}\` added!**`);
            } else {
              message.channel.send('You didn\'t provide the pasta\'s text.');
            }
          }
        }
      } else {
        var obj = JSON.parse(fs.readFileSync('./pastes.json', { encoding: 'utf-8' }));
        message.channel.send(obj[args[0]].text);
      }
    }
  },
  emiya: {
    description: "don't ask.",
    handle(message) {
      message.channel.send(`「あったか寄せ鍋」 (Attaka Yosenabe)
      “Hot, Hot Hot Pot”
      
      For our final installment of Emiya-kun, we can’t exactly repeat Toshikoshi Soba, as nice as it would be, so Shirou is going one step ahead by making Hot Pot. A wonderful brothy soup in its own right, Hot Pot is the perfect Winter dish with a flavorful broth, well-seasoned seafood, and a plethora of vegetables and toppings to warm your soul. It’s hard not to get as excited as Saber and the rest of them when a hearty, robust soup awaits. Even better is that Shirou used the remaining broth to make Zosui, a simple rice dish that goes wonderfully with the Winter season as a warm and filling meal.
      
      The main attraction of the episode, however, is seeing everybody come together. For their final dinner together, Shirou is cooking Hot Pot for Saber, Taiga, Sakura, and Rider. It was a great way of getting the primary group side-by-side for the last episode and showed us why it’s so charming to see them all gather for a fulfilling and peaceful dinner with each other. It was awesome to see Rider again as she enjoyed the warmth the house provided, but Saber definitely stole the show with how much she loved the food and how willing she was to eat more, including the mandarin oranges that Taiga brought over by the boxload. It’s sad to see the end of this monthly anime, but it ended on a positive note with how much Saber had come to value not just the delicious food that Emiya cooked for her, but also the companionship of their closest friends as they all basked in the delight of Shirou’s cooking together.`)
    }
  },
  nepu: {
    description: "NEPU!!!",
    handle(message) {
      message.channel.send(`https://i.fiery.me/BzkJp.gif`);
    }
  },
  help: {
    description: "Prints out all available commands with a short description.",
    handle(message, args, data) {
      const embed = {
        title: "List of commands",
        author: {
          name: main.client.user.username,
          url: "https://anilist.co",
          icon_url: main.client.user.avatarURL({ dynamic: true })
        },
        color: 4044018,
        description: "Commands must be prefixed by `" + main.commandPrefix + "`",
        footer: {
          text: "FALD v2.0 by Kex#2320"
        },
        fields: []
      };

      Object.entries(main.commands).forEach((k, v) => embed.fields.push({ name: k[0], value: k[1].description, inline: true }));

      message.channel.send({ embed });
    }
  }
};

function checkModifyPermission(message) {
  switch (process.env.PERMISSION_TYPE) {
    case "CHANNEL_MANAGER":
      return message.channel.permissionsFor(message.author).has("MANAGE_CHANNELS");
    case "SERVER_OWNER":
      return message.author.id === message.guild.ownerID;
    default:
      return true;
  }
}

function getPermissionString() {
  switch (process.env.PERMISSION_TYPE) {
    case "CHANNEL_MANAGER":
      return "Requires the Channel Manager permission.";
    case "SERVER_OWNER":
      return "May only be used by the server owner.";
    default:
      return null;
  }
}

async function NekoGet(type, text) {
  const client = require('nekos.life');
  const { sfw } = await new client();
  if (type === "OwOify") {
    var neko = await sfw[type]({ text: text });
  } else { var neko = await sfw[type](); }

  var embed = await new Discord.MessageEmbed()
    .setColor('#8956f7')
    .setFooter("FALD v2.0 by Kex#2320", main.client.user.avatarURL({ dynamic: true }))
    .setTimestamp();
  return {
    embed: embed,
    neko: neko,
  };
}