const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🍍', '🥥'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

function startGame() {
    generateCards();
    shuffleCards();
    displayCards();
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

function generateCards() {
    for (let i = 0; i < symbols.length; i++) {
        cards.push({ id: i, symbol: symbols[i], flipped: false, matched: false });
        cards.push({ id: i + symbols.length, symbol: symbols[i], flipped: false, matched: false });
    }
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function displayCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.matched) {
            cardElement.textContent = card.symbol;
        } else {
            cardElement.textContent = '';
        }
        cardElement.addEventListener('click', () => flipCard(card.id));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(cardId) {
    if (!canFlip) return;
    const card = cards[cardId];
    if (card.flipped || card.matched) return;
    
    card.flipped = true;
    flippedCards.push(card);

    updateBoard();

    if (flippedCards.length === 2) {
        canFlip = false;
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.symbol === card2.symbol) {
        card1.matched = true;
        card2.matched = true;
        matchedPairs++;
        if (matchedPairs === symbols.length) {
            setTimeout(showEndPage, 500);
        }
    } else {
        card1.flipped = false;
        card2.flipped = false;
    }
    flippedCards = [];
    canFlip = true;
    updateBoard();
}

function updateBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.flipped || card.matched) {
            cardElement.textContent = card.symbol;
        }
        if (card.matched) {
            cardElement.style.backgroundColor = '#00b09b';
        }
        gameBoard.appendChild(cardElement);
    });
}

function restartGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    canFlip = true;
    generateCards();
    shuffleCards();
    updateBoard();
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

function showEndPage() {
    document.getElementById('game-page').style.display = 'none';
    document.getElementById('end-page').style.display = 'block';
}

function showLinks() {
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('links').style.display = 'block';
}
