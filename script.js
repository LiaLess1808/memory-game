const tds = document.querySelector('.themes-dropdown-selection');
const tc = document.querySelector('.theme-carousel');
const themeCards = document.querySelectorAll('.theme-card');

// Ao clicar no TDS, movê-lo para trás do TC
tds.addEventListener('click', () => {
    tds.classList.add('hidden');
    setTimeout(() => {
        tds.style.zIndex = "0"; // Permitir interação com TC
    }, 600); // Tempo da animação
});

// Ao clicar em qualquer theme-card, trazer o TDS de volta para frente
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        tds.style.zIndex = "2"; 
        tds.classList.remove('hidden');
    });
});

const carousel = document.querySelector('.theme-list');
const arrowButtons = document.querySelectorAll('.theme-carousel i');
const firstCardWidth = carousel.querySelector('.theme-card').offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

arrowButtons.forEach(button => {
    button.addEventListener('click', () => {
        carousel.scrollLeft += button.id === 'prev' ? -firstCardWidth : firstCardWidth;
    })
})
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX); // Adjust the scroll position based on the mouse movement
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - (2 *carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

let images = [];
let matchedPairs = 0;
let totalPairs = 0;
let gameActive = false; // Track if game is active

document.getElementById("difficulty").addEventListener("input", function() {
    let value = parseInt(this.value);
    let difficultyLevel = value === 1 ? "Easy" : value === 2 ? "Medium" : "Hard";
    this.style.background = value === 1 ? "#72FF00" : value === 2 ? "#FFC107" : "#EA1C24";
    document.getElementById("difficulty-level").innerText = difficultyLevel;
});

let currentTheme = "image-ben10"; // Tema padrão

// Detecta clique nos theme-cards e troca o tema
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        currentTheme = card.getAttribute("data-theme"); // Obtém o novo tema
        updateTheme(currentTheme);

        gameActive = false;
        console.log(gameActive);
        if(!gameActive){
            document.getElementById("game-message").innerText = "Click 'Start Game' to begin!";
            document.getElementById("game-message").style.display = "block"; // Torna a mensagem visível

        }
        
    });
});

// Atualiza o tabuleiro com o novo tema
function updateTheme(theme) {
    let difficulty = parseInt(document.getElementById("difficulty").value);
    totalPairs = difficulty === 1 ? 8 : difficulty === 2 ? 10 : 12;
    
    images = [];
    matchedPairs = 0;
    gameActive = false;

    if(!gameActive){
        document.getElementById("game-message").innerText = "Click 'Start Game' to begin!";
    }
    for (let i = 0; i < totalPairs; i++) {
        let imgSrc = `${theme}/pair${i + 1}.jpg`; // Caminho das imagens baseado no tema
        images.push({ src: imgSrc }, { src: imgSrc });
    }

    shuffleAndCreateBoard(images);
    updateCardFront(theme); // Atualiza a frente das cartas
    updateSliderThumb(theme); // Atualiza o thumb do slider
}

// Atualiza o .card-front para usar o background do tema escolhido
function updateCardFront(theme) {
    const cards = document.querySelectorAll('.card-front');
    cards.forEach(card => {
        card.style.backgroundImage = `url('${theme}/background.jpg')`;
    });
}

// Atualiza o #difficulty::-webkit-slider-thumb com o background do tema
function updateSliderThumb(theme) {
    const style = document.createElement("style");
    style.innerHTML = `
        #difficulty::-webkit-slider-thumb {
            background: url('${theme}/background.jpg') center/cover no-repeat;
        }
    `;
    document.head.appendChild(style);
}
// Modifiquei esta função para usar o `currentTheme` dinamicamente
function initializeBoard(difficulty) {
    updateTheme(currentTheme); // Garante que o tema correto seja carregado
}

function shuffleAndCreateBoard(images) {
    images.sort(() => 0.5 - Math.random());
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    
    const rows = 4;
    const columns = Math.ceil(images.length / rows);
    board.style.gridTemplateColumns = `repeat(${columns}, 125px)`;

    images.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${item.src}"></div>
            </div>
        `;
        card.onclick = () => flipCard(card);
        board.appendChild(card);
    });
}

let flippedCards = [];
function flipCard(card) {
    if (!gameActive) return; // Prevent flipping before game starts
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);
    }
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1200);
    }
}

function checkMatch() {
    if (flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
        flippedCards.forEach(card => card.classList.remove("flipped"));
    } else {
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            // Aplica o blur no game-board
            document.getElementById('game-board').classList.add('blur');
            
            // Exibe a mensagem de vitória e faz ela pulsar
            const gameMessage = document.getElementById('game-message');
            gameMessage.textContent = "You won!";
            gameMessage.classList.add('show');
            gameMessage.style.display = "block"; 
        }
    }
    flippedCards = [];
}

function startGame() {
    
    let difficulty = parseInt(document.getElementById("difficulty").value);
    initializeBoard(difficulty);
    gameActive = true; // Allow interactions
    document.getElementById("game-message").style.display = "none";
    document.getElementById('game-board').classList.remove('blur');
}

function restartLevel() {
    initializeBoard(parseInt(document.getElementById("difficulty").value));
    gameActive = true; // Allow interactions after restart
    document.getElementById("game-message").style.display = "none";
    document.getElementById('game-board').classList.remove('blur');
}

// Load default board, but disable interaction
window.onload = function () {
    document.getElementById("difficulty").value = 1;
    document.getElementById("difficulty-level").innerText = "Easy";
    initializeBoard(1); // Load default board (but locked)
};
