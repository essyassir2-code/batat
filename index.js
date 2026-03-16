const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { REST, Routes } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
  .setName("send")
  .setDescription("Send announcement")
  .addStringOption(option =>
    option.setName("text")
    .setDescription("write your announcement")
    .setRequired(true)
  )
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  await rest.put(
    Routes.applicationCommands("1482839946736697488"),
    { body: commands }
  );
})();

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "send") {

    const text = interaction.options.getString("text");

    const embed = new EmbedBuilder()
    .setDescription(text)
    .setColor("Purple");

    await interaction.reply({ content: "تم ارسال الاعلان", ephemeral: true });

    interaction.channel.send({ embeds:[embed] });

  }

});

client.login(process.env.TOKEN);
