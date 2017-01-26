function Card(point, suit) {
    function getCardImageUrl(){
        var p = point;
        switch (point) {
            case 11: p = 'jack';
            break;
            case 12: p = 'queen';
            break;
            case 13: p = 'king';
            break;
            case 1: p = 'ace';
        }
        return 'static/img/' + p +'_of_' + suit +'.png';
    }
    function getValue(){
        if(point > 10)  {
            return 10;
        } else if (isAce()){
            return 11;
        } else {
            return point;
        }
    }
    function isAce() {
        return point==1;
    }
    return {"getCardImageUrl": getCardImageUrl, "getValue": getValue, "isAce":isAce};
}

function Deck(){
    var deck = [];
    // var cards = [];
    var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    for (var i = 1; i <= 13; i++){
        for (var j =0; j <= 3; j++) {
            deck.push(Card(i, suits[j]));}}

    var currentIndex = deck.length;
    function shuffle() {
        while (currentIndex !== 0) {
            var randomIndex = Math.floor(Math.random() * deck.length);
            currentIndex -= 1;
            var tempValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = tempValue;}
        }
    shuffle();
    function numCardsLeft() {
            return deck.length;
        }
    function draw(){
        return deck.pop();
    }
    return {"draw":draw, "numCardsLeft": numCardsLeft};
}

function Hand(player) {
    var cards = [];
    var numAces = 0;

    function addCard(card){
        if(card.isAce()){
            numAces++;
        }
        cards.push(card);

        $("#" + player + "-hand").append("<img src='" + card.getCardImageUrl() + "' />");

        $("#" + player + "-points").text(getPoints());
    }

    function getPoints() {
        var sum = 0;
        for (var i = 0;i <cards.length; i++) {
            var card = cards[i];
            sum += card.getValue();
        }
        //if I'm over 21 and i have aces:
        aceIndex = 1;
        while (aceIndex <= numAces) {
            if (sum > 21) {
                sum = sum - 10;
            }
            aceIndex++;
        }
        return sum;
    }

    return {"addCard":addCard, "getPoints":getPoints};
}



function PlayGame() {
    var myDeck = Deck();
    var playerHand = Hand("player");
    var dealerHand = Hand("dealer");
    $('#dealer-hand').empty();
    $('#player-hand').empty();
    // playerhand.cards=[];
    // dealerhand.cards=[];
    $('#player-points').text("");
    $('#dealer-points').text("");

    function deal(){
        playerHand.addCard(myDeck.draw());
        dealerHand.addCard(myDeck.draw());
        playerHand.addCard(myDeck.draw());
            if(playerHand.getPoints() == 21) {
                $("#player-points").text("Blackjack! Player Wins");
                gameOver();
            }
        dealerHand.addCard(myDeck.draw());
        if (dealerHand.getPoints() == 21) {
            $("#dealer-points").text("Blackjack! Player Wins");
            gameOver();
        }
        dealerPoints = dealerHand.getPoints();
        playerPoints = playerHand.getPoints();
        $('#player-points').text("");
        $('#dealer-points').text("");
        $('#dealer-points').append(dealerPoints);
        $('#player-points').append(playerPoints);
        $("#deal-button").prop("disabled", true);
        $("#hit-button").prop("disabled", false);
        $("#stand-button").prop("disabled", false);
    }

    function hit() {
        playerHand.addCard(myDeck.draw());
        if (playerHand.getPoints() >21) {
            $("#player-points").text("Player busts!");
            gameOver();
        }
    }

    function stand() {
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
        while (dealerHand.getPoints() < 17) {
            dealerHand.addCard(myDeck.draw());
        }
        if (dealerHand.getPoints() > 21) {
            $("#player-points").text("Dealer busts! Player Wins!");
        } else if (dealerHand.getPoints() > playerHand.getPoints()) {
            $("#player-points").text("Dealer wins!");
        } else if (dealerHand.getPoints() == playerHand.getPoints()) {
            $("#player-points").text("Push!");
        } else {
            $("#player-points").text("Player Wins!");
        }
        gameOver();
    }

    function gameOver(){
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
        $("#deal-button").prop("disabled", false);
    }

    return {"hit":hit, "stand": stand, "deal":deal};
}


$("document").ready(function(){
    var game;
    $("#hit-button").prop("disabled", true);
    $("#stand-button").prop("disabled", true);

// deal-button
    $('#deal-button').click(function() {
        game = PlayGame();
        game.deal();
    });
// hit-button
    $('#hit-button').click(function() {
    game.hit();
    });
// stand-button
    $('#stand-button').click(function() {
        game.stand();
    });

});
