// ===== VARIABLES PRINCIPALES =====
let mazo = [];
let puntosJugador = 0;
let puntosDealer = 0;

let victoriasJugador = 0;
let victoriasDealer = 0;
let empates = 0;

const btnRepartir = document.getElementById('btn-repartir');
const btnPedir = document.getElementById('btn-pedir');
const btnPlantarse = document.getElementById('btn-plantarse');
const resultado = document.getElementById('resultado-blackjack');

const cartasJugador = document.getElementById('cartas-jugador');
const cartasDealer = document.getElementById('cartas-dealer');
const puntosJugadorElem = document.getElementById('puntos-jugador');
const puntosDealerElem = document.getElementById('puntos-dealer');

// Marcadores
const marcadorJugador = document.getElementById('score-jugador');
const marcadorDealer = document.getElementById('score-dealer');
const marcadorEmpates = document.getElementById('score-empates');

// ===== FUNCIONES =====
function crearMazo() {
  const palos = ['♠', '♥', '♦', '♣'];
  const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  mazo = [];

  for (let palo of palos) {
    for (let valor of valores) {
      mazo.push({ valor, palo });
    }
  }

  // Mezclar
  mazo.sort(() => Math.random() - 0.5);
}

function valorCarta(carta) {
  if (['J', 'Q', 'K'].includes(carta.valor)) return 10;
  if (carta.valor === 'A') return 11;
  return parseInt(carta.valor);
}

function tieneAs(cartasContenedor) {
  return Array.from(cartasContenedor.children).some(c => c.textContent.includes('A'));
}

function agregarCarta(destino) {
  const carta = mazo.pop();
  const valor = valorCarta(carta);

  const cartaDiv = document.createElement('div');
  cartaDiv.classList.add('carta');
  cartaDiv.textContent = `${carta.valor}${carta.palo}`;

  if (destino === 'jugador') {
    cartasJugador.appendChild(cartaDiv);
    puntosJugador += valor;
    if (puntosJugador > 21 && tieneAs(cartasJugador)) {
      puntosJugador -= 10;
    }
    puntosJugadorElem.textContent = puntosJugador;
  } else {
    cartasDealer.appendChild(cartaDiv);
    puntosDealer += valor;
    if (puntosDealer > 21 && tieneAs(cartasDealer)) {
      puntosDealer -= 10;
    }
    puntosDealerElem.textContent = puntosDealer;
  }
}

function actualizarMarcador(resultadoRonda) {
  if (resultadoRonda === 'jugador') {
    victoriasJugador++;
    marcadorJugador.textContent = victoriasJugador;
    animarMarcador(marcadorJugador, 'verde');
  } else if (resultadoRonda === 'dealer') {
    victoriasDealer++;
    marcadorDealer.textContent = victoriasDealer;
    animarMarcador(marcadorDealer, 'rojo');
  } else if (resultadoRonda === 'empate') {
    empates++;
    marcadorEmpates.textContent = empates;
    animarMarcador(marcadorEmpates, 'dorado');
  }
}

function animarMarcador(elemento, color) {
  elemento.classList.add(`parpadeo-${color}`);
  setTimeout(() => {
    elemento.classList.remove(`parpadeo-${color}`);
  }, 800);
}

function determinarGanador() {
  // Esperar un instante si el dealer acaba de robar
  setTimeout(() => {
    if (puntosJugador > 21) {
      resultado.textContent = 'Te pasaste de 21. Gana el dealer.';
      actualizarMarcador('dealer');
    } else if (puntosDealer > 21) {
      resultado.textContent = 'El dealer se pasó. ¡Ganas tú!';
      actualizarMarcador('jugador');
    } else if (puntosJugador > puntosDealer) {
      resultado.textContent = '¡Ganas tú!';
      actualizarMarcador('jugador');
    } else if (puntosJugador < puntosDealer) {
      resultado.textContent = 'Gana el dealer.';
      actualizarMarcador('dealer');
    } else {
      resultado.textContent = 'Empate.';
      actualizarMarcador('empate');
    }
  }, 300);
}

// ===== EVENTOS =====
btnRepartir.addEventListener('click', () => {
  crearMazo();
  cartasJugador.innerHTML = '';
  cartasDealer.innerHTML = '';
  resultado.textContent = '';

  puntosJugador = 0;
  puntosDealer = 0;

  puntosJugadorElem.textContent = 0;
  puntosDealerElem.textContent = 0;

  agregarCarta('jugador');
  agregarCarta('dealer');
  agregarCarta('jugador');
});

btnPedir.addEventListener('click', () => {
  if (puntosJugador < 21) {
    agregarCarta('jugador');
  }
  if (puntosJugador >= 21) {
    determinarGanador();
  }
});

btnPlantarse.addEventListener('click', () => {
  while (puntosDealer < 17) {
    agregarCarta('dealer');
  }
  determinarGanador();
});
