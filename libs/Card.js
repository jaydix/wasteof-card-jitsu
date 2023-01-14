export { Card }

class Card {
  // the card class, used everywhere throughout the game
  // contains some game logic
  constructor(color, type, value) {
    this.color = color
    this.type = type
    this.value = value
  }

  // checks if two cards are equal to each other (same color, type, and value)
  isEqual(card) {
    return ((this.color == card.color) &&(this.type == card.type) &&(this.value == card.value));
  }

  // name is self explanatory
  // i feel like this could be coded better
  checkIfCardBeatsOtherCard(type, value) {
    var toReturn = false
    switch (this.type) {
      case 'fire':
        if (type == 'snow') {
          toReturn = true
        } else {
          toReturn = this.checkForValue(type, value)
        }
        break;

      case 'snow':
        if (type == 'water') {
          toReturn = true
        } else {
          toReturn = this.checkForValue(type, value)
        }
        break;

      case 'water':
        if (type == 'fire') {
          toReturn = true
        } else {
          toReturn = this.checkForValue(type, value)
        }
        break;
    }
    return toReturn
  }

  // checks if the values beat each other if the types dont already beat them
  checkForValue(type, value) {
    if (type == this.type) {
      if (this.value > value) {
        return true
      } else if (this.value == value) {
        return 'draw'
      } else {
        return false
      }
    }
  }

  // self explanatory
  toString(){
    return `${this.color} ${this.type} ${this.value}`
  }
}

// ______
//|      |    _______
//| . .  | < /  what \
// ______    \_______/