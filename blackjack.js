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
    return 'static/img/' + p +'_of_' + this.suit +'.png';
};

// constructing the hand you are dealt
function Hand(cards) {
    this.cards = [];
    this.numAces=0;
}

// this is saying to add a card. and you will return a new card (suit and points included)
Hand.prototype.addCard = function(card) {
    this.cards.push(card);
    if(card.point==1){
        this.numAces++;
    }
};


// this is adding your points up
Hand.prototype.getPoints = function(card) {
    var sum = 0;
    var numAces  = this.numAces;
    this.cards.forEach(function(card){
        if(card.point >10)  {
            sum +=10;
        } else if (card.point == 1){
            sum +=11;
        } else {
            sum +=card.point;
            while(sum>21 && numAces>0){
                sum-=10;
            }
        }
    });
        return sum;
};
// getting the deck
function Deck() {
  this.deck = [];
  this.count = this.deck.length;
  var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
  for (var i = 1; i <= 13; i++){
    for (var j =0; j <= 3; j++) {
      this.deck.push(new Card(i, suits[j]));
    }}

Deck.prototype.draw = function(hand) {
    var card = this.deck.pop();
    hand.addCard(card);
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
var playerhand = new Hand();
var dealerhand = new Hand();

function clearBoard(){
    $('#dealer-hand').empty();
    $('#player-hand').empty();
    playerhand.cards=[];
    dealerhand.cards=[];
    $('#player-points').empty();
    $('#dealer-points').empty();
}


//Board Game Stuff: **********
 // Play Game function -set to have running on deal button

function playgame() {
//make sure the deck is at 52 cards
if (myDeck.numCardsLeft !== 52) {
    myDeck = new Deck();
}

// shuffle cards
myDeck.shuffle();

// deal cards
myDeck.draw(playerhand); myDeck.draw(playerhand);
myDeck.draw(dealerhand); myDeck.draw(dealerhand);
dealerhand.cards.forEach(function(card){
    $('#dealer-hand').append('<img src="'+card.getCardImageUrl()+'" />');
});
playerhand.cards.forEach(function(card){
    $('#player-hand').append('<img src="'+card.getCardImageUrl()+'" />');
});


// count card value
dealerPoints = dealerhand.getPoints();
playerPoints = playerhand.getPoints();
$('#dealer-points').append(dealerPoints);
$('#player-points').append(playerPoints);
if (playerPoints == 21) {
    $('#player-points').html("BlackJack! You Win!");
} else if (dealerPoints == 21) {
    $('#dealer-points').html("BlackJack! You Lose!");
} else if (dealerPoints && playerPoints == 21)
    $('#player-points').html("Draw");

}
// dealerhand.getpoints();

function hit() {
$('#player-hand').empty();
$('#player-points').empty();
$('#dealer-points').empty();

myDeck.draw(playerhand);
playerhand.cards.forEach(function(card){
    $('#player-hand').append('<img src="'+card.getCardImageUrl()+'" />');
});

// count card value
dealerPoints = dealerhand.getPoints();
playerPoints = playerhand.getPoints();
$('#dealer-points').append(dealerPoints);
$('#player-points').append(playerPoints);
if (playerPoints > 21) {
    $('#player-points').html("Bust! You Lose!");
}
if (playerPoints == 21 && dealerPoints > 21) {
    $('#player-points').html("You Win!");
}
}


function stand() {
$('#dealer-hand').empty();
$('#player-points').empty();
$('#dealer-points').empty();


// count card value
dealerPoints = dealerhand.getPoints();
playerPoints = playerhand.getPoints();
$('#dealer-points').append(dealerPoints);
$('#player-points').append(playerPoints);

    while (dealerPoints< 17) {
        $('#dealer-hand').empty();
        myDeck.draw(dealerhand);
        dealerhand.cards.forEach(function(card){
            $('#dealer-hand').append('<img src="'+card.getCardImageUrl()+'" />');
            $('#dealer-points').empty();
        dealerPoints = dealerhand.getPoints();
        $('#dealer-points').append(dealerPoints);

    });
    }
    if (dealerPoints > 21 || dealerPoints < playerPoints) {
            $('#dealer-points').empty();
            dealerPoints = dealerhand.getPoints();
            $('#dealer-points').append(dealerPoints);
            $('#player-points').html("You Win!");
    }
    else if (dealerPoints > playerPoints || dealerPoints == 21) {
            $('#dealer-points').empty();
            dealerPoints = dealerhand.getPoints();
            $('#dealer-points').append(dealerPoints);
            $('#player-points').html("Dealer Wins!");
        }
    else  if (playerpoints == dealerpoints){
            $('#dealer-points').empty();
            dealerPoints = dealerhand.getPoints();
            $('#dealer-points').append(dealerPoints);
            $('#player-points').html("Draw Try Again!");
    }
}

$("document").ready(function(){
// deal-button
    $('#deal-button').click(function() {
        clearBoard();
        playgame();
    });
// hit-button
    $('#hit-button').click(function() {
        hit();
    });
// stand-button
    $('#stand-button').click(function() {
        stand();
    });


});
