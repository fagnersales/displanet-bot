import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'
import { Interaction } from 'discord.js'

import {
  builder as embedCommandBuilder,
  executer as embedCommandExecuter
} from '../embed'

import {
  builder as sayCommandBuilder,
  executer as sayCommandExecuter
} from '../say'

export const builders: RESTPostAPIApplicationCommandsJSONBody[] = [
  sayCommandBuilder(),
  embedCommandBuilder(),
]

export const executers = async (interaction: Interaction): Promise<any> => {
  if (!interaction.inGuild() && interaction.isChatInputCommand()) {
    return interaction.reply({
      content: 'Você só pode utilizar meus comandos dentro de servidores.'
    })
  }

  const commandExecuters = [
    sayCommandExecuter,
    embedCommandExecuter,
  ]

  for (const commandExecuter of commandExecuters) {
    await commandExecuter(interaction)
  }
}