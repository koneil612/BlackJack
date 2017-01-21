//***************************************************************************
// TDD portion
// You will implement the rest of these exercises using Test-Driven Development.
//
// Card Constructor
// Create a constructor Card. A card object will have 2 properties:
// point - the point value of the card: a number between 1 and 13.
// suit - the suit of the card: one of diamonds, clubs, hearts and spades.
//***************************************************************************

// setiing up the cards:
function Card(point, suit) {
    this.point = point;
    this.suit =  suit;
}

// getting the photos of the cards (the acutal images from the url)
Card.prototype.getCardImageUrl = function() {
    var p = this.point;

    switch (this.point) {
        case 11: p = 'jack';
        break;
        case 12: p = 'queen';
        break;
        case 13: p = 'king';
        break;
        case 1: p = 'ace';
    }
    return 'images/' + p +'_of_' + this.suit +'.png';
};

// constructing the hand you are dealt
function Hand(cards) {
    this.cards = [];
}

// this is saying to add a card. and you will return a new card (suit and points included)
Hand.prototype.addCard = function(Card) {
    this.cards.push(Card);
};

// this is adding your points up
Hand.prototype.getPoints = function() {
    return this.cards.reduce(function(a,b) {
        return a+b.point;
    }, 0);
};

// getting the deck
function Deck() {
  this.deck = [];
  this.count = 52;
  var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
  for (var i = 1; i <= 13; i++){
    for (var j =0; j <= 3; j++) {
      this.deck.push(new Card(i, suits[j]));
    }}


Deck.prototype.draw = function(Card) {
    this.deck.pop();

};


Deck.prototype.shuffle = function() {
   var currentIndex = this.deck.length;
   while (currentIndex !== 0) {
   var randomIndex = Math.floor(Math.random() * this.deck.length);
   currentIndex -= 1;
   var tempValue = this.deck[currentIndex];
       this.deck[currentIndex] = this.deck[randomIndex];
       this.deck[randomIndex] = tempValue;
   }
  };

Deck.prototype.numCardsLeft = function() {
    return this.deck.length;
};

}
var myDeck = new Deck();
myDeck.shuffle();
myDeck.draw();
myDeck.draw();
myDeck.draw();
myDeck.numCardsLeft();
console.log(myDeck.numCardsLeft());
