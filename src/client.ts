import { Client, IntentsBitField, ActivityType, OAuth2Scopes, PermissionsBitField } from 'discord.js'
import { executers } from './commands/utils/list'

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
  ]
})

client.on('ready', (readyClient) => {
  console.log('Pronto para servir a Agência Espacial Displanet')

  readyClient.user.setActivity({
    type: ActivityType.Watching,
    name: 'Agência Espacial Displanet'
  })

  if (process.argv.includes('--invite')) {
    const generatedInvite = readyClient.generateInvite({
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      permissions: [PermissionsBitField.Flags.Administrator]
    })

    console.log(generatedInvite)
  }
})

client.on('interactionCreate', executers)
client.login(process.env.TOKEN)