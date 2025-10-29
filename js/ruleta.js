let numeroSeleccionado = null;

// Selección de número
document.querySelectorAll('.numero-ruleta').forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar clase de todos
    document.querySelectorAll('.numero-ruleta').forEach(b => b.classList.remove('btn-success'));
    // Marcar el seleccionado
    btn.classList.add('btn-success');
    numeroSeleccionado = parseInt(btn.dataset.num);
  });
});

// Botón "Seleccionar nº"
document.getElementById('btn-seleccionar-num').addEventListener('click', () => {
  if (numeroSeleccionado !== null) {
    alert(`Número seleccionado: ${numeroSeleccionado}`);
  } else {
    alert('Selecciona un número primero.');
  }
});

// Botón "Girar Ruleta"
document.getElementById('btn-girar-ruleta').addEventListener('click', () => {
  if (numeroSeleccionado === null) {
    alert('Selecciona un número antes de girar la ruleta.');
    return;
  }

  // Generamos un número aleatorio 0-36
  const numeroGanador = Math.floor(Math.random() * 37);

  // Mostramos el resultado
  const resultadoText = numeroGanador === numeroSeleccionado
    ? `¡Has ganado! La bola cayó en ${numeroGanador}.`
    : `Has perdido. La bola cayó en ${numeroGanador}.`;
  
  document.getElementById('resultado-ruleta').textContent = resultadoText;

  // (Opcional) animar la ruleta girando con CSS
  const ruletaImg = document.getElementById('ruleta-img');
  ruletaImg.style.transition = 'transform 2s ease-out';
  ruletaImg.style.transform = `rotate(${Math.random()*720 + 720}deg)`;
});
