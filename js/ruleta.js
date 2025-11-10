(function () {
  const wheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  const redSet = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
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
  // ---- TAPETE 6x6
  function crearTapete() {
    tapeteEl.innerHTML = "";

    tapeteEl.style.display = "grid";
    tapeteEl.style.gridTemplateColumns = "repeat(6, 1fr)";
    tapeteEl.style.gap = "8px";

    // Número 0 (span 2)
    const celda0 = document.createElement("div");
    celda0.className = "numero-celda zero";
    celda0.textContent = "0";
    celda0.style.gridColumn = "span 2";
    tapeteEl.appendChild(celda0);

    // Crear números 1-36
    for (let n = 1; n <= 36; n++) {
      const celda = document.createElement("div");
      celda.className = "numero-celda";
      celda.textContent = n;

      // colores ruleta
      if (redSet.has(n)) celda.classList.add("rojo");
      else if (blackSet.has(n)) celda.classList.add("negro");

      tapeteEl.appendChild(celda);
    }

    document.querySelectorAll(".numero-celda").forEach(celda => {
      celda.addEventListener("click", function () {
        // Eliminar selección previa
        document.querySelectorAll(".numero-celda").forEach(c => c.classList.remove("seleccionado"));

        // Marcar seleccionado
        this.classList.add("seleccionado");

        // Guardar número seleccionado
        numeroSeleccionado = Number(this.textContent);
        numeroSeleccionadoEl.textContent = `Número seleccionado: ${numeroSeleccionado}`;
      });
    });
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
