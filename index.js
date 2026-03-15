const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

const SERVER_ID = "1480969773029527706";
const MEMBERS_CHANNEL = "1482839238008377698";
const ONLINE_CHANNEL = "1482839257113690163";
const BOTS_CHANNEL = "1482839314567266457";

client.once("ready", () => {
  console.log("Server stats bot online");

  updateStats();

  setInterval(updateStats, 60000);
});

function updateStats() {

  const guild = client.guilds.cache.get(SERVER_ID);

  if (!guild) return;

  const members = guild.memberCount;

  const online = guild.members.cache.filter(
    m => m.presence && m.presence.status !== "offline"
  ).size;

  const bots = guild.members.cache.filter(m => m.user.bot).size;

  guild.channels.cache.get(MEMBERS_CHANNEL)
  ?.setName(`👥 Members: ${members}`);

  guild.channels.cache.get(ONLINE_CHANNEL)
  ?.setName(`🟢 Online: ${online}`);

  guild.channels.cache.get(BOTS_CHANNEL)
  ?.setName(`🤖 Bots: ${bots}`);

}

client.login(process.env.MTQ4MjgzOTk0NjczNjY5NzQ4OA.GhMxvW.PiRhYLzqNvqPa5aTfCU2bx6iuOWSjV3vPGU_LE);
