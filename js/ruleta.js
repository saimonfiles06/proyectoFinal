// ruleta.js
document.addEventListener('DOMContentLoaded', () => {
  const numerosTapete = document.getElementById('numeros-tapete');
  const numeroSeleccionadoEl = document.getElementById('numero-seleccionado');
  const resultadoRuletaEl = document.getElementById('resultado-ruleta');
  const btnSeleccionar = document.getElementById('btn-seleccionar');
  const btnGirar = document.getElementById('btn-girar');
  const ruletaImg = document.getElementById('ruleta');

  let numeroSeleccionado = null;

  // Generar números 0-36 en el tapete
  for (let i = 0; i <= 36; i++) {
    const celda = document.createElement('div');
    celda.className = 'numero-celda';
    if (i === 0) celda.classList.add('zero');
    celda.textContent = i;
    celda.addEventListener('click', () => {
      document.querySelectorAll('.numero-celda').forEach(n => n.classList.remove('seleccionado'));
      celda.classList.add('seleccionado');
      numeroSeleccionado = i;
      numeroSeleccionadoEl.textContent = `Número seleccionado: ${numeroSeleccionado}`;
    });
    numerosTapete.appendChild(celda);
  }

  // Botones
  btnSeleccionar.addEventListener('click', () => {
    if (numeroSeleccionado !== null) {
      alert(`Número ${numeroSeleccionado} seleccionado.`);
    } else {
      alert('Selecciona un número primero.');
    }
  });

  btnGirar.addEventListener('click', () => {
    const ganador = Math.floor(Math.random() * 37);
    resultadoRuletaEl.textContent = `Número ganador: ${ganador}`;
  });
});
