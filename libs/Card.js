export { Card }

class Card {
  constructor(color, type, value) {
    this.color = color
    this.type = type
    this.value = value
  }

  isEqual(card) {
    return ((this.color == card.color) &&(this.type == card.type) &&(this.value == card.value));
  }

  checkIfCardBeatsOtherCard(type, value) {
    var toReturn = false
    switch (this.type) {
      case 'fire':
        if (type == 'snow') {
          toReturn = true
        } else {
          toReturn = checkForValue(type, value)
        }
        break;

      case 'snow':
        if (type == 'water') {
          toReturn = true
        } else {
          toReturn = checkForValue(type, value)
        }
        break;

      case 'water':
        if (type == 'fire') {
          toReturn = true
        } else {
          toReturn = checkForValue(type, value)
        }
        break;
    }
    return toReturn
  }

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

  toString(){
    return `${c.color} ${c.type} ${c.value}`
  }
}

// ______
//|      |    _______
//| . .  | < /  what \
// ______    \_______/