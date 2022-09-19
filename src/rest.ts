import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { builders } from './commands/utils/list'

export const loadGlobal = async (rest: REST, builders: any[]) => {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: builders }
  )
  console.log('Successfully LOADED GLOBAL commands')
}

export const reloadGlobal = async (rest: REST, builders: any[]) => {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: [] }
  )

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: builders }
  )

  console.log('Successfully RELOADED GLOBAL commands')
}

export const unloadGlobal = async (rest: REST) => {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: [] }
  )

  console.log('Successfully UNLOADED GLOBAL commands')
}

async function initializeCommands() {
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!)

  if (process.argv.includes('--load-global')) await loadGlobal(rest, builders)

  if (process.argv.includes('--reload-global')) await reloadGlobal(rest, builders)

  if (process.argv.includes('--unload-global')) await unloadGlobal(rest)

}

initializeCommands()