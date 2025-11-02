// === VARIABLES GLOBALES ===
let mazo = [];
let manoJugador = [];
let manoDealer = [];
let juegoTerminado = false;
let scoreJugador = 0;
let scoreDealer = 0;

// === REFERENCIAS A ELEMENTOS ===
const btnRepartir = document.getElementById('btn-repartir');
const btnPedir = document.getElementById('btn-pedir');
const btnPlantarse = document.getElementById('btn-plantarse');
const cartasJugadorElem = document.getElementById('cartas-jugador');
const cartasDealerElem = document.getElementById('cartas-dealer');
const puntosJugadorElem = document.getElementById('puntos-jugador');
const puntosDealerElem = document.getElementById('puntos-dealer');
const resultadoElem = document.getElementById('resultado-blackjack');
const scoreJugadorElem = document.getElementById('score-jugador');
const scoreDealerElem = document.getElementById('score-dealer');

// === FUNCIONES AUXILIARES ===
function crearMazo() {
  const palos = ['♠', '♥', '♦', '♣'];
  const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  mazo = [];

  for (let palo of palos) {
    for (let valor of valores) {
      mazo.push({ valor, palo });
    }
  }

  // Barajar mazo
  mazo.sort(() => Math.random() - 0.5);
}

function valorCarta(carta) {
  if (['J', 'Q', 'K'].includes(carta.valor)) return 10;
  if (carta.valor === 'A') return 11;
  return parseInt(carta.valor);
}

function calcularPuntos(mano) {
  let total = 0;
  let ases = 0;

  for (let carta of mano) {
    total += valorCarta(carta);
    if (carta.valor === 'A') ases++;
  }

  // Ajustar ases si se pasa de 21
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }

  return total;
}

function mostrarManos() {
  cartasJugadorElem.innerHTML = '';
  cartasDealerElem.innerHTML = '';

  manoJugador.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'carta';
    div.textContent = `${carta.valor}${carta.palo}`;
    cartasJugadorElem.appendChild(div);
  });

  manoDealer.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'carta';
    div.textContent = `${carta.valor}${carta.palo}`;
    cartasDealerElem.appendChild(div);
  });

  puntosJugadorElem.textContent = calcularPuntos(manoJugador);
  puntosDealerElem.textContent = calcularPuntos(manoDealer);
}

function finalizarPartida(resultado) {
  juegoTerminado = true;

  if (resultado === 'jugador') {
    scoreJugador++;
    resultadoElem.textContent = '🎉 ¡Has ganado!';
  } else if (resultado === 'dealer') {
    scoreDealer++;
    resultadoElem.textContent = '💀 Has perdido, gana el dealer.';
  } else {
    resultadoElem.textContent = '🤝 Empate.';
  }

  scoreJugadorElem.textContent = scoreJugador;
  scoreDealerElem.textContent = scoreDealer;
}

// === LÓGICA PRINCIPAL ===
btnRepartir.addEventListener('click', () => {
  crearMazo();
  manoJugador = [];
  manoDealer = [];
  juegoTerminado = false;
  resultadoElem.textContent = '';

  // Repartir 2 cartas a cada uno
  manoJugador.push(mazo.pop(), mazo.pop());
  manoDealer.push(mazo.pop(), mazo.pop());

  mostrarManos();

  // Mostrar línea de puntos del dealer
  puntosDealerElem.insertAdjacentHTML('afterend', '<hr class="mt-2 mb-2" style="border-color: #c9a23f;">');

  const puntosJugador = calcularPuntos(manoJugador);
  if (puntosJugador === 21) finalizarPartida('jugador');
});

btnPedir.addEventListener('click', () => {
  if (juegoTerminado) return;

  manoJugador.push(mazo.pop());
  mostrarManos();

  const puntosJugador = calcularPuntos(manoJugador);
  if (puntosJugador > 21) finalizarPartida('dealer');
});

btnPlantarse.addEventListener('click', () => {
  if (juegoTerminado) return;

  // Dealer juega hasta 17 o más
  while (calcularPuntos(manoDealer) < 17) {
    manoDealer.push(mazo.pop());
  }

  mostrarManos();

  const puntosJugador = calcularPuntos(manoJugador);
  const puntosDealer = calcularPuntos(manoDealer);

  if (puntosDealer > 21 || puntosJugador > puntosDealer) finalizarPartida('jugador');
  else if (puntosDealer > puntosJugador) finalizarPartida('dealer');
  else finalizarPartida('empate');
});
  