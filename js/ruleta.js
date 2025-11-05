let numeroSeleccionado = null;

const btnSeleccionar = document.getElementById('btn-seleccionar');
const btnGirar = document.getElementById('btn-girar');
const numeroMostrado = document.getElementById('numero-seleccionado');
const resultado = document.getElementById('resultado-ruleta');
const ruletaImg = document.getElementById('ruleta');
const tapete = document.getElementById('numeros-tapete');

const duracionGiro = 5000; // duración en ms
const vueltasCompletas = 6; // vueltas completas por tirada

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

  // Elegir número ganador
  const numeroGanador = Math.floor(Math.random() * 37);

  // Cada número ocupa un ángulo de 360 / 37 grados
  const anguloPorNumero = 360 / 37;

  // Calcular rotación final para el número ganador (siempre con las mismas vueltas)
  const rotacionFinal = vueltasCompletas * 360 + numeroGanador * anguloPorNumero;

  // Aplicar animación con velocidad constante
  ruletaImg.style.transition = `transform ${duracionGiro / 1000}s cubic-bezier(0.33, 1, 0.68, 1)`;
  ruletaImg.style.transform = `rotate(${rotacionFinal}deg)`;

  // Después de girar, reiniciamos la rotación para la próxima tirada
  setTimeout(() => {
    // Quitar transición temporalmente para "reiniciar" sin animación
    ruletaImg.style.transition = 'none';
    // Ajustar rotación al número ganador real (mod 360)
    ruletaImg.style.transform = `rotate(${numeroGanador * anguloPorNumero}deg)`;
    // Forzar reflow para aplicar la transición la próxima vez
    void ruletaImg.offsetWidth;

    // Mostrar resultado
    resultado.textContent =
      numeroGanador === numeroSeleccionado
        ? `🎉 ¡Has ganado! Salió el ${numeroGanador}.`
        : `Ha salido el ${numeroGanador}. Inténtalo de nuevo.`;
  }, duracionGiro + 200); // un poco más que la duración del giro
});
