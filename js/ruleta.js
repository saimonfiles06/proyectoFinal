let numeroSeleccionado = null;

const btnSeleccionar = document.getElementById('btn-seleccionar');
const btnGirar = document.getElementById('btn-girar');
const numeroMostrado = document.getElementById('numero-seleccionado');
const resultado = document.getElementById('resultado-ruleta');
const ruletaImg = document.getElementById('ruleta');
const tapete = document.getElementById('numeros-tapete');

// ===== GENERAR NÚMEROS DEL TAPETE =====
for (let i = 0; i <= 36; i++) {
  const celda = document.createElement('div');
  celda.textContent = i;
  celda.classList.add('numero-celda');
  if (i === 0) celda.classList.add('zero');

  celda.addEventListener('click', () => {
    document.querySelectorAll('.numero-celda').forEach(c => c.classList.remove('seleccionado'));
    celda.classList.add('seleccionado');
    numeroSeleccionado = i;
  });

  tapete.appendChild(celda);
}

// ===== BOTÓN SELECCIONAR =====
btnSeleccionar.addEventListener('click', () => {
  if (numeroSeleccionado === null) {
    alert('Selecciona un número en el tapete antes de continuar.');
    return;
  }
  numeroMostrado.textContent = `Número seleccionado: ${numeroSeleccionado}`;
  resultado.textContent = '';
});

// ===== BOTÓN GIRAR =====
btnGirar.addEventListener('click', () => {
  if (numeroSeleccionado === null) {
    alert('Primero selecciona un número.');
    return;
  }

  // Girar solo en sentido horario
  const rotacion = 360 * 6 + Math.floor(Math.random() * 360);
  ruletaImg.style.transition = 'transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)';
  ruletaImg.style.transform = `rotate(${rotacion}deg)`;

  setTimeout(() => {
    const numeroGanador = Math.floor(Math.random() * 37);
    resultado.textContent =
      numeroGanador === numeroSeleccionado
        ? `🎉 ¡Has ganado! Salió el ${numeroGanador}.`
        : `Ha salido el ${numeroGanador}. Inténtalo de nuevo.`;
  }, 4200);
});
