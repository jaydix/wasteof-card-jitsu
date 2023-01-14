export { Hand }

import { Card } from './Card.js'
import { Util } from './Game.js'

class Hand {
  // hand class, fancy array
  constructor(handLength) {
    this.hand = []
    this.cardTypes = ['fire', 'snow', 'water']
    this.colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple']
    this.cardMaxVal = 12 // maximum value a card can have

    for (var i = 0; i < handLength; i++) {
      this.pushNewCard()
    }
  }

  // adds a random card to the hand
  // if the card is already in your hand (which is very unlikely),
  // recursively call this function until we get an original card
  // feel like this could be improved
  pushNewCard() {
    var doPush = true
    var c = new Card(this.colors[Math.floor(Math.random() * this.colors.length)], this.cardTypes[Math.floor(Math.random() * this.cardTypes.length)], Math.floor(Math.random() * (this.cardMaxVal - 1)) + 1)
    this.hand.forEach(ca => {
      if (ca.isEqual(c)) {
        pushNewCard()
        doPush = false
      }
    })
    if (doPush) this.hand.push(c)
  }

  // checks if the hand contains a card
  handContains(color, type, value) {
    const cardToCompare = new Card(color, type, value)
    //console.log(this.hand,cardToCompare)
    var i = 0
    var toReturn = [false, 0]
    this.hand.forEach(c => {
      console.log(cardToCompare, c.isEqual(cardToCompare))
      if (c.isEqual(cardToCompare)) toReturn = [true, i];
      else {
        i++;
      }
    });
    return toReturn;
  }

  // used when listing your hand
  handToString() {
    var toReturn = ''
    for (var i = 0; i < this.hand.length; i++) {
      if (i == this.hand.length - 1) toReturn += 'and '
      toReturn += `a ${this.hand[i].color} ${this.hand[i].type} card with a value of ${this.hand[i].value}`
      if (i == this.hand.length - 1) toReturn += '.'
      else toReturn += ', '
    }
    return toReturn
  }

  // too lazy to change all instances of this function so i made it call another one :troll:
  handToStringDebug() {
    return new Util().cardArrayToString(this.hand)
  }
}