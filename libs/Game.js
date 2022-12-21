export { Game };
import { Hand } from "./Hand.js";
import { Card } from "./Card.js";

class Game {
  // game instance
  constructor() {
    const handMax = 5;
    this.playerHand = new Hand(handMax);
    this.opponentHand = new Hand(handMax);
    console.log(this.playerHand, this.opponentHand);

    this.opponentPlayedCards = [];
    this.playerPlayedCards = [];
  }

  p1Turn(color, type, value, oppPlayCallback) {
    const c = new Card(color, type, value);
    console.log(c);
    const contains = this.playerHand.handContains(c.color, c.type, c.value);
    console.log(contains);
    if (contains[0] == true) {
      this.playerHand.hand.splice(contains[1]);
      this.playerPlayedCards.push(c);
      console.log(
        `p1 played a ${c.color} ${c.type} card with value ${c.value}`
      );
      this.playerHand.pushNewCard();
      return this.p2Turn(c, oppPlayCallback);
    } else {
      console.log('failed!! hahahahahah')
      return "failed";
    }
  }

  p2Turn(playerCard, playCallback) {
    const c =
      this.opponentHand.hand[
      Math.floor(Math.random() * (this.opponentHand.hand.length - 1))
      ];
    console.log(c);
    this.opponentHand.hand.splice(this.opponentHand.hand.indexOf(c));
    this.opponentPlayedCards.push(c);
    this.opponentHand.pushNewCard();
    console.log(`p2 played a ${c.color} ${c.type} card with value ${c.value}`);
    playCallback(playerCard.checkIfCardBeatsOtherCard(c.type, c.value), playerCard, c)
    return "played";
  }
}
