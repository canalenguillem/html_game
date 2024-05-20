const player = document.getElementById('player');
let playerPosition = 175; // Posición inicial centrada

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 10; // Mueve el jugador a la izquierda
    }
    if (event.key === 'ArrowRight' && playerPosition < 350) { // 400 (ancho del contenedor) - 50 (ancho del jugador) = 350
        playerPosition += 10; // Mueve el jugador a la derecha
    }
    player.style.left = playerPosition + 'px';
});
