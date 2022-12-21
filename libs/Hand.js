export { Hand }

import { Card } from './Card.js'

class Hand {
  constructor(handLength) {
    this.hand = []
    this.cardTypes = ['fire', 'snow', 'water']
    this.colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple']
    this.cardMaxVal = 12

    for (var i = 0; i < handLength; i++) {
      this.pushNewCard()
    }
  }

  pushNewCard() {
    this.hand.push(new Card(this.colors[Math.floor(Math.random() * this.colors.length)], this.cardTypes[Math.floor(Math.random() * this.cardTypes.length)], Math.floor(Math.random() * (this.cardMaxVal - 1)) + 1))
  }

  handContains(color, type, value) {
    const cardToCompare = new Card(color, type, value)
    //console.log(this.hand,cardToCompare)
    var i = 0
    var toReturn = [false, 0]
    this.hand.forEach(c => {
      console.log(cardToCompare,c.isEqual(cardToCompare))
      if (c.isEqual(cardToCompare)) toReturn = [true, i];
      else {
        i++;
      }
    });
    return toReturn;
  }

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

  handToStringDebug(){
    var toReturn = '['
    this.hand.forEach(c => {
      toReturn += ` ${c.toString()},`
    })
    return toReturn + ' ]';
  }
}