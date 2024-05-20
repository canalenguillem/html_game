const player = document.getElementById('player');
const fallingObject = document.getElementById('fallingObject');
const gameContainer = document.getElementById('gameContainer');
let playerPosition = 175; // Posición inicial centrada del jugador
let fallingObjectPosition = 0; // Posición inicial del objeto que cae
let fallingObjectLeft = Math.random() * 370; // Posición horizontal inicial aleatoria del objeto que cae
let lastTime = 0; // Última marca de tiempo
const fallSpeed = 200; // Velocidad de caída en píxeles por segundo

// Posicionar el objeto que cae al azar horizontalmente
fallingObject.style.left = fallingObjectLeft + 'px';

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 10; // Mueve el jugador a la izquierda
    }
    if (event.key === 'ArrowRight' && playerPosition < 350) { // 400 (ancho del contenedor) - 50 (ancho del jugador) = 350
        playerPosition += 10; // Mueve el jugador a la derecha
    }
    player.style.left = playerPosition + 'px';
});

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const fallingObjectRect = fallingObject.getBoundingClientRect();
    const gameContainerRect = gameContainer.getBoundingClientRect();

    return !(playerRect.top > fallingObjectRect.bottom ||
             playerRect.bottom < fallingObjectRect.top ||
             playerRect.left > fallingObjectRect.right ||
             playerRect.right < fallingObjectRect.left);
}

function dropObject(timestamp) {
    if (!lastTime) {
        lastTime = timestamp;
    }
    const deltaTime = (timestamp - lastTime) / 1000; // Convertir a segundos
    lastTime = timestamp;

    fallingObjectPosition += fallSpeed * deltaTime; // Actualizar la posición del objeto que cae

    fallingObject.style.top = fallingObjectPosition + 'px';

    if (checkCollision()) {
        alert('¡Colisión detectada!'); // Manejar la colisión
        fallingObjectPosition = 0; // Reinicia la posición vertical
        fallingObjectLeft = Math.random() * 370; // Nueva posición horizontal aleatoria
        fallingObject.style.left = fallingObjectLeft + 'px';
    }

    // Reposicionar el objeto cuando llegue al fondo
    if (fallingObjectPosition > 600) { // 600 es la altura del contenedor del juego
        fallingObjectPosition = 0; // Reinicia la posición vertical
        fallingObjectLeft = Math.random() * 370; // Nueva posición horizontal aleatoria
        fallingObject.style.left = fallingObjectLeft + 'px';
    }

    requestAnimationFrame(dropObject); // Vuelve a llamar a la función para la próxima animación
}

requestAnimationFrame(dropObject); // Inicia la animación
