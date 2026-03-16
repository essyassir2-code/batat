const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const CHANNEL_ID = "1482849156333830224";

client.once("ready", () => {
  console.log("Bot is online");

  const guild = client.guilds.cache.first();
  const channel = client.channels.cache.get(CHANNEL_ID);

  function sendStats(){

    const members = guild.memberCount;

    const online = guild.members.cache.filter(
      m => m.presence && m.presence.status !== "offline"
    ).size;

    const voice = guild.members.cache.filter(
      m => m.voice.channel
    ).size;

    const bots = guild.members.cache.filter(
      m => m.user.bot
    ).size;

    const boosts = guild.premiumSubscriptionCount;

    const embed = new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(`${guild.name} → Stats`)

    .setDescription(`
👥 **Members:** ${members}
🟢 **Online:** ${online}
🎤 **In Voice:** ${voice}
🤖 **Bots:** ${bots}
🚀 **Boosts:** ${boosts}
`)

    .setFooter({ text: "Stay Active & Enjoy Your Time" })
    .setTimestamp();

    channel.send({ embeds: [embed] });

  }

  sendStats();

  setInterval(sendStats, 60000);

});

client.on("messageCreate", async (message) => {

  if(message.author.bot) return;

  if(message.content === "!donate"){

    const embed = new EmbedBuilder()

    .setAuthor({
      name: "PrimeManager",
      iconURL: client.user.displayAvatarURL()
    })

    .setTitle("💎 Server Donations")

    .setDescription(`
✨ **Premium Roles**
Get your premium role.

✨ **Premium Rooms**
Claim your private voice room.

💳 Supported methods:
• PayPal
• Bank Transfer
• BTC
`)

    .setImage("https://media.tenor.com/m6oAJbC4YfAAAAAC/gojo.gif")

    .setColor("Purple")

    .setFooter({
      text: "PrimeManager • Donations"
    });

    message.channel.send({ embeds:[embed] });

  }

});

client.login(process.env.TOKEN);
