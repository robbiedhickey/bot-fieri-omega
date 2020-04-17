const Discord = require("discord.js");
const repl = require("repl");
const fs = require("fs");

const { prefix, token } = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();

// personal greetings?
const fieriFriends = {
  "464988700435021825": "Hi Robbie.",
  "355177890045755395": "Oh hi, Mark.",
  "331815686362103809": "Hi Matthew."
};

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
  console.log("setting command name", command.name);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  console.log(`received message from ${msg.author.username}: ${msg.content}`);

  if (!client.commands.has(commandName)) {
    console.log("command not found: ", commandName);
    return;
  }

  const command = client.commands.get(commandName);

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});

process.on("unhandledRejection", error => console.error("Uncaught Promise Rejection", error));

client.login(token);

// handle debug logging
client.on("debug", console.log);

// start repl and add function to speak in general chat
// 694632129036025942 : general
let context = repl.start("> ").context;
context.client = client;
context.say = function (msg) {
  client.channels.cache.get("694632129036025942").send(msg);
};
