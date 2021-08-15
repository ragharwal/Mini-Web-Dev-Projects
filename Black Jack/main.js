let game = {
    'you': {'scoreSpan': '#your-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'J': 10,'Q': 10,'A': [1,10]},
};
const YOU = game['you']
const DEALER = game['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click', hit);
document.querySelector('#stand').addEventListener('click', stand);
document.querySelector('#deal').addEventListener('click', deal);

function hit() {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}
function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return game['cards'][randomIndex];
}
function showCard(card, activePlayer) {
    if (activePlayer['score']<=21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function deal() {
    let winner = computeWinner();
    showResult(winner);
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i<yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (i=0; i<dealerImages.length; i++) {
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-result').textContent = 0; 
    document.querySelector('#your-result').style.color = '#ffffff';
    document.querySelector('#dealer-result').textContent = 0; 
    document.querySelector('#dealer-result').style.color = '#ffffff';
}
function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + game['cardsMap'][card][1] <= 21) {
            activePlayer['score'] +=game['cardsMap'][card][1];
        } else {
            activePlayer['score'] +=game['cardsMap'][card][0];
        }

    } else {
    activePlayer['score'] += game['cardsMap'][card];
    }
}
function showScore(activePlayer) { 
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function stand() {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
}
function computeWinner() {
    let winner;
    if(YOU['score']<=21) {
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)) {
            console.log('You Won!');
            winner = YOU;
        } else if (YOU['score']<DEALER['score']) {
            console.log('You Lost!');
        } else if (YOU['score'] === DEALER['score']) {
            console.log('You Drew!');
        }
    } else if (YOU['score']>21 && DEALER['score']<=21) {
        console.log('You Lost!');
        winner = DEALER;
    } else if (YOU['score']>21 && DEALER['score']>21) {
        console.log('You Drew!');
    }
    console.log('Winner is: ', winner);
    return winner;
}
function showResult(winner) {
    let message, messageColor;
    if (winner ==YOU) {
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        message = 'You Lost!';
        messageColor  = 'red';
        lossSound.play();
    } else {
        message = 'You Drew!';
        messageColor = 'black';
    }
    document.querySelector('#blackjack-result').textContent = message;
    // document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}