const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartBtn = document.querySelector('.restart');

let loopId = null;
let isGameOver = false;

const jump = () => {
  if (isGameOver) return;
  if (mario.classList.contains('jump')) return;

  mario.classList.add('jump');
  setTimeout(() => mario.classList.remove('jump'), 500);
};

const startLoop = () => {
  loopId = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      gameOver(pipePosition, marioPosition);
    }
  }, 10);
};

const gameOver = (pipePosition, marioPosition) => {
  isGameOver = true;

  // congela o cano
  pipe.style.animation = 'none';
  pipe.style.left = `${pipePosition}px`;

  // congela o mario
  mario.style.animation = 'none';
  mario.style.bottom = `${marioPosition}px`;

  // troca sprite
  mario.src = './images/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';

  // para o loop
  clearInterval(loopId);

  // mostra botão
  restartBtn.classList.remove('hidden');
};

const resetGame = () => {
  isGameOver = false;

  // volta sprite e estilos do mario
  mario.src = './images/mario.gif';
  mario.style.width = '120px';
  mario.style.marginLeft = '0';
  mario.style.bottom = '0px';
  mario.style.animation = '';

  // volta cano e animação
  pipe.style.left = '100%';
  pipe.style.animation = 'pipe-animation 2s infinite linear';

  // esconde botão
  restartBtn.classList.add('hidden');

  // reinicia loop
  clearInterval(loopId);
  startLoop();
};

// Controles
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') jump();
  if (e.code === 'Enter' && isGameOver) resetGame(); // Enter reinicia
});

document.addEventListener('touchstart', jump);
document.addEventListener('click', (e) => {
  // evita que o clique no botão também tente pular
  if (e.target.classList.contains('restart')) return;
  jump();
});

restartBtn.addEventListener('click', resetGame);

// start
startLoop();
