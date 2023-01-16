import {
  Game,
  Util,
  GameList
}
  from './libs/Game.js'

import {
  Wasteof2Auth
}
  from 'wasteof-client'

const username = 'card-jitsu'
const client = new Wasteof2Auth(username, process.env['PASSWORD'])

var activeGames = new GameList()
client.login().then(function() {
  console.log('logged in as @' + username)
  client.listen(function(msgData, notUsed) {
    console.log(msgData)
    const data = msgData.data
    const type = msgData.type
    switch (type) {
      case 'chat message':
        const msg = data.content.toLowerCase()
        //console.log(msg)
        const prefix = '@' + username + ' '
        if (msg.startsWith(prefix)) {
          let args = msg.slice(prefix.length).split(' ')
          const command = args.shift()
          console.log('gah', args, command)
          var trackString = data.from.id
          if (trackString == '631e5a5737a6aba9065fb139') return;
          var game = activeGames.getUserGame(trackString)
          switch (command) {
            case 'start':
            case 'play':
            case 'cs':
            case 'card-jitsu':
            case 'jitsu':
            case 'card jitsu':
            case 'cardjitsu':
              if (game == null) {
                game = activeGames.push(new Game(trackString))
                client.chatMessage(`<p>game started!<p><p>your hand consists of ${game.playerHand.handToString()}, and you have 20 seconds to choose one. use @card-jitsu card [color] [type] [value] to play a card.</p>`)
              } else {
                client.chatMessage(`you've already started a game!`)
              }
              break;

            case 'cards':
            case 'hand':
              if (game !== null) {
                client.chatMessage(`your hand consists of ${game.playerHand.handToString()}`)
              } else {
                client.chatMessage(`start a game first!`)
              }
              break;

            case 'card':
              if (game !== null) {
                console.log(args.length)
                if (args.length < 3) {
                  client.chatMessage(`you need to specify a color, type, and value to play a card!`)
                } else {
                  console.log(game.playerHand)
                  if (game.p1Turn(args[0], args[1], parseInt(args[2]), function(success, pC, c) {
                    if (success == true) {
                      game.plaWinningCards.push(pC)
                      client.chatMessage(`your ${pC.color} ${pC.type} card of value ${pC.value} beat the opponent's ${c.color} ${c.type} card of value ${c.value}`)
                    } else if (success == false) {
                      game.oppWinningCards.push(pC)
                      client.chatMessage(`your ${pC.color} ${pC.type} card of value ${pC.value} lost against the opponent's ${c.color} ${c.type} card of value ${c.value}`)
                    } else {
                      client.chatMessage(`you and the opponent's cards ended up in a draw`)
                    }
                  }) == 'failed') {
                    client.chatMessage(`that card isn't in your hand!`)
                  } else {
                    client.chatMessage(`now pick a new card from your hand, which consists of ${game.playerHand.handToString()}`)
                  }
                }
              } else {
                client.chatMessage(`start a game first!`)
              }
              break;

            case 'debug':
              if (game !== null) {
                console.log(Util.cardArrayToString(game.playerPlayedCards))
                console.log(`[${[].toString()}]`)
                client.chatMessage(`<p><strong>CARD JITSU DEBUG INFO</strong></p><p><code>playerHand</code>: ${game.playerHand.handToStringDebug()}</p><p><code>plaWinningCards</code>: ${Util.cardArrayToString(game.plaWinningCards)}</p><p><code>opponentHand</code>: ${game.opponentHand.handToStringDebug()}</p><p><code>oppWinningCards</code>: ${Util.cardArrayToString(game.oppWinningCards)}</p>`)
              }
          }

        } else if (msg == `@${username}`) {
          client.chatMessage('<p>you can mention me all you want, but if you want to start a game, use the <code>@card-jitsu play</code> command.</p>')
        }
        break;
    }
  })
})

//const game = new Game()
