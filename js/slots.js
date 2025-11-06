// ===== CONFIGURACIÓN =====
const simbolos = ["🍒", "🍋", "🍉", "⭐", "🔔", "7️⃣"];

let apuestaActual = 10;
let gananciasTotales = 0;

const reelElements = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

const apuestaDisplay = document.getElementById("slot-apuesta");
const gananciasDisplay = document.getElementById("slot-ganancias");
const apuestaSelector = document.getElementById("apuesta-selector");
const botonGirar = document.getElementById("slot-spin");
const botonRepetir = document.getElementById("slot-repetir");

// ===== ACTUALIZAR APUESTA =====
apuestaSelector.addEventListener("change", () => {
  apuestaActual = parseInt(apuestaSelector.value);
  apuestaDisplay.textContent = apuestaActual;
});

// ===== FUNCIÓN DE GIRO REALISTA =====
function girarReel(reel, tiempoGiro) {
  return new Promise((resolve) => {
    reel.classList.remove("ganador");

    let vueltas = 0;
    const velocidadInicial = 50; 
    const velocidadMax = 150;    
    let velocidad = velocidadInicial;

    const animacion = setInterval(() => {
      reel.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
      vueltas++;

      if (vueltas % 10 === 0 && velocidad < velocidadMax) {
        velocidad += 10; 
        clearInterval(animacion);
        girarReelLento();
      }

      function girarReelLento() {
        const anim2 = setInterval(() => {
          reel.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
          vueltas++;

          if (vueltas >= tiempoGiro) {
            clearInterval(anim2);
            const resultadoFinal = simbolos[Math.floor(Math.random() * simbolos.length)];
            reel.textContent = resultadoFinal;
            resolve(resultadoFinal);
          }
        }, velocidad);
      }

    }, velocidad);
  });
}

// ===== GIRO PRINCIPAL =====
async function girar() {
  botonGirar.disabled = true;
  botonRepetir.disabled = true;

  const resultados = await Promise.all([
    girarReel(reelElements[0], 30),
    girarReel(reelElements[1], 45),
    girarReel(reelElements[2], 60)
  ]);

  comprobarGanancia(resultados);

  botonGirar.disabled = false;
  botonRepetir.disabled = false;
}

// ===== COMPROBAR GANANCIA =====
function comprobarGanancia(resultados) {
  const [a, b, c] = resultados;
  let ganancia = 0;

  // TABLA DE PAGOS
  if (a === b && b === c) {
    switch (a) {
      case "7️⃣": ganancia = apuestaActual * 50; break;
      case "🔔": ganancia = apuestaActual * 20; break;
      case "⭐": ganancia = apuestaActual * 15; break;
      case "🍉": ganancia = apuestaActual * 10; break;
      case "🍋": ganancia = apuestaActual * 7; break;
      case "🍒": ganancia = apuestaActual * 5; break;
    }
    reelElements.forEach(r => r.classList.add("ganador"));
  } 
  else if (a === b || b === c || a === c) {
    // Pareja
    ganancia = apuestaActual * 2;
  }

  gananciasTotales += ganancia;
  gananciasDisplay.textContent = gananciasTotales;
}

// ===== EVENTOS =====
botonGirar.addEventListener("click", girar);
botonRepetir.addEventListener("click", girar);
