import { Message, User, Collection, TextBasedChannel } from 'discord.js'
import { once } from 'events'

type Props = {
  channel: TextBasedChannel
  target: User
  time?: number
  deleteAfter?: boolean
}

export const collectOneMessage = async ({
  channel,
  target,
  time = 300000,
  deleteAfter = true
}: Props) => {
  const collector = channel.createMessageCollector({
    filter: ({ author, content }) => (console.log(content), author.id === target.id && content.length > 0),
    max: 1,
    time: time
  })

  console.log(collector)

  collector.on('collect', console.log)

  collector.on('ignore', a => { console.log(a) })

  const [collected, reason] = await once(collector, 'end') as [Collection<string, Message>, string]

  const lastMessage = collected.last()
  
  if (reason !== 'limit' || !lastMessage) throw new Error('User did not respond.')

  if (deleteAfter && lastMessage.deletable) lastMessage.delete()

  return lastMessage
}