const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const CHANNEL_ID = "1482849156333830224"; // حط ID ديال القناة

client.once("ready", async () => {

  console.log("Stats bot online");

  const guild = client.guilds.cache.first();
  const channel = client.channels.cache.get(CHANNEL_ID);

  function sendStats() {

    const members = guild.memberCount;

    const online = guild.members.cache.filter(
      m => m.presence && m.presence.status !== "offline"
    ).size;

    const inVoice = guild.members.cache.filter(
      m => m.voice.channel
    ).size;

    const bots = guild.members.cache.filter(
      m => m.user.bot
    ).size;

    const boosts = guild.premiumSubscriptionCount;

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle(`${guild.name} ➜ Stats`)
      .setDescription(`
👥 **Members Count:** ${members}
🟢 **Online Members:** ${online}
🎧 **Members in Voice:** ${inVoice}
🤖 **Bots Count:** ${bots}
💎 **Server Boosts:** ${boosts}
      `)
      .setFooter({ text: "Server Stats" })
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }

  sendStats();

  setInterval(sendStats, 600000); // كل 10 دقائق
});

client.login(process.env.TOKEN);
