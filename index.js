const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

const CLIENT_ID = "1482838946736697488";
const GUILD_ID = "1480969773029527706";

const commands = [
  new SlashCommandBuilder()
    .setName("send")
    .setDescription("send announcement")
    .addStringOption(option =>
      option.setName("text")
        .setDescription("write your announcement")
        .setRequired(true)
    )
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("registering command...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("command registered");
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log("Bot is online");
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "send") {

    const text = interaction.options.getString("text");

    await interaction.reply({ content: "✅ announcement sent", ephemeral: true });

    interaction.channel.send(text);

  }

});

client.login(TOKEN);
