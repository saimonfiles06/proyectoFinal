// === ruleta.js ===
(function () {
  const wheelNumbers = [
    0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26
  ];

  const redSet = new Set([32,19,21,25,17,34,27,36,30,23,5,16,1,14,9,18,7,12,3]);
  const blackSet = new Set(wheelNumbers.filter(n => n !== 0 && !redSet.has(n)));

  const ruletaEl = document.getElementById('ruleta');
  const tapeteEl = document.getElementById('numeros-tapete');
  const btnSeleccionar = document.getElementById('btn-seleccionar');
  const btnGirar = document.getElementById('btn-girar');
  const numeroSeleccionadoEl = document.getElementById('numero-seleccionado');
  const resultadoEl = document.getElementById('resultado-ruleta');

  const sectors = wheelNumbers.length;
  const sectorAngle = 360 / sectors;

  let currentRotation = 0;
  let spinning = false;
  let numeroSeleccionado = null;

  // ===== Generar tapete =====
  function crearTapete() {
    tapeteEl.innerHTML = '';
    for (let n = 0; n <= 36; n++) {
      const celda = document.createElement('div');
      celda.classList.add('numero-celda');
      if (n === 0) celda.classList.add('zero');
      celda.textContent = n;

      celda.addEventListener('click', () => {
        // marcar seleccionado
        document.querySelectorAll('.numero-celda').forEach(c => c.classList.remove('seleccionado'));
        celda.classList.add('seleccionado');
        numeroSeleccionado = n;
        numeroSeleccionadoEl.textContent = `Número seleccionado: ${n}`;
      });

      tapeteEl.appendChild(celda);
    }
  }

  crearTapete();

  // ===== Girar ruleta =====
  function spinToIndex(index, spins = 6, ms = 4000) {
    const targetSectorCenter = index * sectorAngle + sectorAngle / 2;
    const finalRotation = spins * 360 + (360 - targetSectorCenter);

    currentRotation += finalRotation;
    ruletaEl.style.transition = `transform ${ms}ms linear`;
    ruletaEl.style.transform = `rotate(${currentRotation}deg)`;

    return ms;
  }

  // ===== Evento girar ruleta =====
  btnGirar.addEventListener('click', async () => {
    if (spinning) return;
    spinning = true;

    // escoger número ganador aleatorio
    const randIndex = Math.floor(Math.random() * sectors);

    // girar ruleta
    const ms = spinToIndex(randIndex);

    // esperar fin animación
    await new Promise(res => setTimeout(res, ms));

    const winningNumber = wheelNumbers[randIndex];
    resultadoEl.textContent = `Número ganador: ${winningNumber}`;

    // marcar en tapete
    document.querySelectorAll('.numero-celda').forEach(c => c.classList.remove('seleccionado'));
    const ganadorCelda = Array.from(tapeteEl.children).find(c => Number(c.textContent) === winningNumber);
    if (ganadorCelda) ganadorCelda.classList.add('seleccionado');

    spinning = false;
  });
})();
