// js/blackjack.js

// Variables del juego
let deck = [];
let jugadorMano = [];
let dealerMano = [];
let juegoActivo = false;

// Marcador
let partidasGanadasJugador = 0;
let partidasGanadasDealer = 0;

// Crear mazo de cartas
function crearMazo() {
  const palos = ['♥', '♦', '♣', '♠'];
  const valores = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const nuevoMazo = [];
  for (let palo of palos) {
    for (let valor of valores) {
      nuevoMazo.push({valor, palo});
    }
  }
  return nuevoMazo.sort(() => Math.random() - 0.5); // barajar
}

// Obtener valor de la carta
function valorCarta(carta) {
  if (['J','Q','K'].includes(carta.valor)) return 10;
  if (carta.valor === 'A') return 11; // As por defecto
  return parseInt(carta.valor);
}

// Calcular puntos de una mano
function calcularPuntos(mano) {
  let total = 0;
  let ases = 0;
  mano.forEach(carta => {
    total += valorCarta(carta);
    if (carta.valor === 'A') ases++;
  });
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }
  return total;
}

// Mostrar cartas en pantalla
function mostrarMano(mano, contenedor) {
  contenedor.innerHTML = '';
  mano.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'card bg-dark text-warning p-2';
    div.style.width = '50px';
    div.style.height = '70px';
    div.innerHTML = `<div>${carta.valor}</div><div>${carta.palo}</div>`;
    contenedor.appendChild(div);
  });
}

// Repartir cartas iniciales
function repartir() {
  deck = crearMazo();
  jugadorMano = [deck.pop(), deck.pop()];
  dealerMano = [deck.pop(), deck.pop()];
  juegoActivo = true;

  actualizarPantalla();
  document.getElementById('resultado-blackjack').textContent = '';
}

// Pedir carta
function pedirCarta() {
  if (!juegoActivo) return;
  jugadorMano.push(deck.pop());
  actualizarPantalla();
  if (calcularPuntos(jugadorMano) > 21) {
    juegoActivo = false;
    document.getElementById('resultado-blackjack').textContent = '¡Te has pasado! Dealer gana.';
    partidasGanadasDealer++;
    actualizarMarcador();
  }
}

// Plantarse
function plantarse() {
  if (!juegoActivo) return;
  juegoActivo = false;

  while (calcularPuntos(dealerMano) < 17) {
    dealerMano.push(deck.pop());
  }

  actualizarPantalla();
  mostrarResultado();
}

// Actualizar pantalla
function actualizarPantalla() {
  mostrarMano(jugadorMano, document.getElementById('cartas-jugador'));
  mostrarMano(dealerMano, document.getElementById('cartas-dealer'));

  document.getElementById('puntos-jugador').textContent = calcularPuntos(jugadorMano);
  document.getElementById('puntos-dealer').textContent = calcularPuntos(dealerMano);
}

// Mostrar resultado final
function mostrarResultado() {
  const puntosJugador = calcularPuntos(jugadorMano);
  const puntosDealer = calcularPuntos(dealerMano);

  let resultado = '';
  if (puntosJugador > 21) {
    resultado = '¡Te has pasado! Dealer gana.';
    partidasGanadasDealer++;
  } else if (puntosDealer > 21) {
    resultado = '¡Dealer se pasó! ¡Tú ganas!';
    partidasGanadasJugador++;
  } else if (puntosJugador > puntosDealer) {
    resultado = '¡Ganaste!';
    partidasGanadasJugador++;
  } else if (puntosJugador < puntosDealer) {
    resultado = 'Dealer gana.';
    partidasGanadasDealer++;
  } else {
    resultado = 'Empate.';
  }

  document.getElementById('resultado-blackjack').textContent = resultado;
  actualizarMarcador();
}

// Actualizar marcador en pantalla
function actualizarMarcador() {
  document.getElementById('marcador-jugador').textContent = partidasGanadasJugador;
  document.getElementById('marcador-dealer').textContent = partidasGanadasDealer;
}

// Eventos de botones
document.getElementById('btn-repartir').addEventListener('click', repartir);
document.getElementById('btn-pedir').addEventListener('click', pedirCarta);
document.getElementById('btn-plantarse').addEventListener('click', plantarse);
