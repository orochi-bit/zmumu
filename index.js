const { GatewayIntentBits, Client, Collection, Partials, ChannelType } = require("discord.js")
const { AtivarIntents } = require("./Functions/StartIntents");
const { General } = require("./DataBaseJson")
const colors = require("colors")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ],
  partials: [
    Partials.Message,
    Partials.Channel
  ]
});



AtivarIntents()

const config = require("./config.json");
const events = require('./Handler/events')
const slash = require('./Handler/slash');


client.on("guildCreate", async (guild) => {
  try {
    await guild.commands.set(client.slashCommands);
  } catch (error) {
    console.error(`${colors.red(`[LOG]`)} Erro ao add o Slash Command no server ${guild.name}:`, error);
  }
});

slash.run(client)
events.run(client)

client.slashCommands = new Collection();

client.on('guildMemberAdd', async (member, interaction) => {
  const roleMember = member.guild.roles.cache.get(General.get("cargoMember"))

  if (!roleMember) {
    return
  }

  member.roles.add(roleMember)
})

process.on('multipleResolutions', (type, reason, promise) => {
  console.log(`${colors.red(`[LOG] `)}` + type, promise, reason);
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(`${colors.red(`[LOG] `)}` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`${colors.red(`[LOG] `)}` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`${colors.red(`[LOG] `)}` + error, origin);
});

client.on("ready", () => {
  console.clear()
  console.log(`${colors.green("[STATUS]")} ${client.user.username} Acabou de iniciar.`)
  console.log(`${colors.green("[SERVERS]")} Estou em ${client.guilds.cache.size} servidor(s).`)
  console.log(``)
  console.log(`${colors.cyan("[CREDITS]")} @?`)
  console.log(`${colors.cyan("[HELP LINK]")} https://discord.gg/uaWcBMDWck`)
})

client.login(config.token).catch((err) => {
  if(err?.message?.includes("intent")) return console.log(`${colors.red(`[LOG]`)} Ativa as Intents do Bot porra`)
  if(err?.message?.includes("invalid")) return console.log(`${colors.red(`[LOG]`)} Coloca um token valido ou vc esqueceu de tão mongo que você é de salvar o token.json`);
});