import {
  TextBasedChannel,
  Interaction,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
  ChannelType,
  TextChannel
} from 'discord.js'

import { collectOneMessage } from '../experimental/collectors/collectOneMessage'

export const builder = (): RESTPostAPIApplicationCommandsJSONBody => new SlashCommandBuilder()
  .setName('fale')
  .setDescription('Me faça enviar uma mensagem de texto')
  .addChannelOption(builder => builder
    .setName('canal')
    .setDescription('Canal onde a mensagem será enviada')
    .addChannelTypes(ChannelType.GuildText)
    .setRequired(false)
  )
  .toJSON()

export const executer = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== builder().name) return

  await interaction.reply({
    content: 'Envie o conteúdo da mensagem a ser enviada no canal!',
    ephemeral: true
  })

  const message = await collectOneMessage({
    channel: interaction.channel as TextBasedChannel,
    target: interaction.user,
    deleteAfter: true
  })

  const channel = interaction.options.getChannel('canal', false) || message.channel

  if (channel instanceof TextChannel) {
    channel.send(message.content)
  }
}