document.addEventListener("DOMContentLoaded", () => {
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  const spinButton = document.getElementById("slot-spin");
  const repeatButton = document.getElementById("slot-repetir");
  const apuestaDisplay = document.getElementById("slot-apuesta");
  const gananciasDisplay = document.getElementById("slot-ganancias");
  const apuestaSelector = document.getElementById("apuesta-selector");

  const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🔔", "7️⃣"];
  let apuesta = 10;
  let ganancias = 100; // saldo inicial del jugador

  // Actualiza visualmente la apuesta
  apuestaSelector.addEventListener("change", (e) => {
    apuesta = parseInt(e.target.value);
    apuestaDisplay.textContent = apuesta;
  });

  // Función principal: girar los reels
  const girar = () => {
    if (ganancias < apuesta) {
      alert("No tienes suficiente saldo para apostar esa cantidad.");
      return;
    }

    // Restar la apuesta
    ganancias -= apuesta;
    actualizarGanancias();

    // Simular el giro
    const simbolo1 = symbols[Math.floor(Math.random() * symbols.length)];
    const simbolo2 = symbols[Math.floor(Math.random() * symbols.length)];
    const simbolo3 = symbols[Math.floor(Math.random() * symbols.length)];

    reel1.textContent = simbolo1;
    reel2.textContent = simbolo2;
    reel3.textContent = simbolo3;

    // Limpiar efectos previos
    [reel1, reel2, reel3].forEach(r => r.classList.remove("ganador"));

    // Comprobar si ganó
    if (simbolo1 === simbolo2 && simbolo2 === simbolo3) {
      const premio = apuesta * 5;
      ganancias += premio;
      actualizarGanancias();
      [reel1, reel2, reel3].forEach(r => r.classList.add("ganador"));
    }
  };

  // Repetir la última apuesta
  const repetir = () => {
    girar();
  };

  // Actualizar saldo
  const actualizarGanancias = () => {
    gananciasDisplay.textContent = ganancias;
  };

  // Eventos
  spinButton.addEventListener("click", girar);
  repeatButton.addEventListener("click", repetir);

  // Inicialización
  apuestaDisplay.textContent = apuesta;
  gananciasDisplay.textContent = ganancias;
});
