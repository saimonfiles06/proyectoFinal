let numeroSeleccionado = null;

const btnSeleccionar = document.getElementById('btn-seleccionar');
const btnGirar = document.getElementById('btn-girar');
const numeroInput = document.getElementById('numero-ruleta');
const numeroMostrado = document.getElementById('numero-seleccionado');
const resultado = document.getElementById('resultado-ruleta');
const ruletaImg = document.getElementById('ruleta');

// Guardar el número seleccionado
btnSeleccionar.addEventListener('click', () => {
  const val = parseInt(numeroInput.value);
  if (val >= 0 && val <= 36) {
    numeroSeleccionado = val;
    numeroMostrado.textContent = `Número seleccionado: ${numeroSeleccionado}`;
    resultado.textContent = '';
  } else {
    alert('Introduce un número válido entre 0 y 36');
  }
});

// Función para girar la ruleta con aceleración y deceleración
btnGirar.addEventListener('click', () => {
  if (numeroSeleccionado === null) {
    alert('Selecciona primero un número');
    return;
  }

  // Número ganador aleatorio
  const numeroResultado = Math.floor(Math.random() * 37); // 0-36

  // Calcular rotación final en sentido horario
  const girosCompletos = 8 + Math.random() * 4; // 8-12 giros completos
  const anguloFinal = (numeroResultado / 37) * 360;
  const rotacionTotal = girosCompletos * 360 + anguloFinal;

  // Animación usando keyframes con aceleración inicial y deceleración
  ruletaImg.style.transition = 'none';
  ruletaImg.style.transform = 'rotate(0deg)';

  requestAnimationFrame(() => {
    ruletaImg.style.transition = 'transform 5s cubic-bezier(0.55, 0, 0.1, 1)'; // aceleración al inicio y deceleración al final
    ruletaImg.style.transform = `rotate(${rotacionTotal}deg)`;
  });

  // Mostrar resultado después de la animación
  setTimeout(() => {
    resultado.textContent = numeroResultado === numeroSeleccionado 
      ? `¡Ha salido el ${numeroResultado}! ¡Has ganado!` 
      : `Ha salido el ${numeroResultado}, has perdido.`;
  }, 5100); // Un poquito más que la duración de la animación
});
