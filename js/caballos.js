// caballos.js

document.addEventListener('DOMContentLoaded', () => {
  const pista = document.querySelector('.carrera-pista');
  const apuestasBox = document.querySelector('.carrera-apuestas p');
  const gananciasBox = document.querySelector('.carrera-ganancias p');
  const btnSeleccionar = document.querySelector('.carrera-columna:last-child .btn-carrera');
  const btnEmpezar = document.createElement('button');
  btnEmpezar.textContent = '🏁 Empezar Carrera';
  btnEmpezar.className = 'btn-carrera mt-3';
  document.querySelector('.carrera-columna:nth-child(2)').appendChild(btnEmpezar);

  const numCaballos = 5;
  const caballos = [];
  let apuesta = 0;
  let caballoElegido = null;

  // Crear caballos en la pista
  function crearCaballos() {
    pista.innerHTML = '';
    caballos.length = 0;
    for (let i = 0; i < numCaballos; i++) {
      const div = document.createElement('div');
      div.className = 'caballo';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.backgroundColor = `hsl(${i * 60}, 70%, 50%)`;
      div.style.borderRadius = '50%';
      div.style.margin = '5px';
      div.style.position = 'absolute';
      div.style.left = '0px';
      div.style.top = `${i * 60}px`; // separación vertical
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';
      div.style.fontWeight = 'bold';
      div.style.transition = 'left 0.2s linear';
      div.textContent = i + 1;
      caballos.push(div);
      pista.appendChild(div);
    }
  }

  crearCaballos();

  // Selección de caballo y apuesta
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

  // Función para iniciar la carrera
  btnEmpezar.addEventListener('click', () => {
    if (!caballoElegido || !apuesta) {
      alert('Selecciona un caballo y apuesta antes de empezar.');
      return;
    }

    // Reset carrera
    caballos.forEach(c => c.style.left = '0px');

    const pistaWidth = pista.clientWidth - 60; // ancho máximo de recorrido

    const interval = setInterval(() => {
      let fin = false;
      caballos.forEach(c => {
        const avance = Math.floor(Math.random() * 10) + 1; // Velocidad aleatoria para cada caballo
        c.style.left = Math.min(parseInt(c.style.left) + avance, pistaWidth) + 'px';
        if (parseInt(c.style.left) >= pistaWidth) fin = true;
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
          const ganancias = apuesta * 2;
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
