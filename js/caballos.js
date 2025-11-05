// caballos.js

document.addEventListener('DOMContentLoaded', () => {
  const pista = document.querySelector('.carrera-pista');
  const apuestasBox = document.querySelector('.carrera-apuestas p');
  const gananciasBox = document.querySelector('.carrera-ganancias p');
  const btnRepetir = document.querySelector('.carrera-columna:first-child .btn-carrera');
  const btnSeleccionar = document.querySelector('.carrera-columna:last-child .btn-carrera');

  const numCaballos = 5;
  const caballos = [];
  let apuesta = 0;
  let caballoElegido = null;

  // Crear elementos de caballos en la pista
  function crearCaballos() {
    pista.innerHTML = '';
    for (let i = 0; i < numCaballos; i++) {
      const div = document.createElement('div');
      div.className = 'caballo';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.backgroundColor = '#c9a23f';
      div.style.borderRadius = '50%';
      div.style.margin = '5px';
      div.style.position = 'relative';
      div.style.left = '0px';
      div.style.transition = 'left 0.2s linear';
      div.textContent = i + 1;
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';
      div.style.fontWeight = 'bold';
      caballos.push(div);
      pista.appendChild(div);
    }
  }

  crearCaballos();

  // Seleccionar caballo
  btnSeleccionar.addEventListener('click', () => {
    caballoElegido = prompt(`Selecciona un caballo (1-${numCaballos})`);
    caballoElegido = parseInt(caballoElegido);
    if (!caballoElegido || caballoElegido < 1 || caballoElegido > numCaballos) {
      alert('Número de caballo inválido.');
      caballoElegido = null;
      return;
    }
    apuesta = prompt('Introduce tu apuesta $');
    apuesta = parseFloat(apuesta);
    if (!apuesta || apuesta <= 0) {
      alert('Apuesta inválida.');
      apuesta = 0;
      return;
    }
    apuestasBox.textContent = `Has apostado $${apuesta} al caballo ${caballoElegido}`;
  });

  // Función para iniciar carrera
  btnRepetir.addEventListener('click', () => {
    if (!caballoElegido || !apuesta) {
      alert('Selecciona un caballo y apuesta antes de empezar.');
      return;
    }

    // Reset pista
    caballos.forEach(c => c.style.left = '0px');

    let interval = setInterval(() => {
      let fin = false;
      caballos.forEach(c => {
        // Avanza aleatoriamente entre 1 y 10 px
        const avance = Math.floor(Math.random() * 10) + 1;
        c.style.left = (parseInt(c.style.left) + avance) + 'px';

        // Revisar si alguno llegó al final
        const max = pista.clientWidth - c.clientWidth - 10;
        if (parseInt(c.style.left) >= max) {
          fin = true;
        }
      });

      if (fin) {
        clearInterval(interval);

        // Determinar ganador
        let maxLeft = -1;
        let ganador = -1;
        caballos.forEach((c, idx) => {
          const pos = parseInt(c.style.left);
          if (pos > maxLeft) {
            maxLeft = pos;
            ganador = idx + 1;
          }
        });

        if (ganador === caballoElegido) {
          const ganancias = apuesta * 2; // paga 2:1
          gananciasBox.textContent = `$${ganancias}`;
          alert(`¡Felicidades! Ganó tu caballo ${ganador}. Has ganado $${ganancias}.`);
        } else {
          gananciasBox.textContent = `$0`;
          alert(`Ha ganado el caballo ${ganador}. Has perdido $${apuesta}.`);
        }
      }
    }, 200);
  });
});
