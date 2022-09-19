import {
  EmbedBuilder,
  Interaction,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from 'discord.js'

export const builder = (): RESTPostAPIApplicationCommandsJSONBody => new SlashCommandBuilder()
  .setName('embed')
  .setDescription('Envie uma mensagem como Embed')
  .addChannelOption(builder => builder
    .setName('canal')
    .setDescription('Canal onde a embed será enviada')
    .setRequired(false)
  )
  .addStringOption(builder => builder
    .setName('cor')
    .setDescription('Cor em Hexadecimal sem #')
    .setRequired(false)
  )
  .addStringOption(builder => builder
    .setName('título')
    .setDescription('Título da Embed')
    .setRequired(false)
  )
  .addStringOption(builder => builder
    .setName('footer-texto')
    .setDescription('Texto do Footer')
    .setRequired(false)
  )
  .toJSON()

export const executer = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== builder().name) return

  const channelInput = interaction.options.getChannel('canal', false) || interaction.channel
  const colorInput = interaction.options.getString('cor', false) || '303136'
  const titleInput = interaction.options.getString('título', false)
  const footerTextInput = interaction.options.getString('footer-texto', false)

  const channel = channelInput ? await interaction.guild?.channels.fetch(channelInput.id) : null

  if (!channel?.isTextBased()) return interaction.reply({
    content: 'Não foi possível encontrar o canal ou ele não é de texto, por favor tente novamente.'
  })

  interaction.reply({
    content: 'Agora envie a mensagem da descrição para ser copiada.',
    ephemeral: true
  })

  const collector = interaction.channel!.createMessageCollector({
    filter: ({ author }) => author.id === interaction.user.id,
    time: 300000,
    max: 1,
  })

  collector.on('collect', message => {
    const embed = new EmbedBuilder()
      .setDescription(message.content)
      .setColor(`#${colorInput}`)

    if (titleInput) embed.setTitle(titleInput)
    if (footerTextInput) embed.setFooter({ text: footerTextInput })

    message.delete()

    channel.send({
      embeds: [embed]
    })
  })

}