const reels = ["🍒", "🍋", "🍉", "🍇", "⭐"];
const slotReels = document.getElementById("slot-reels");
const slotGanancias = document.getElementById("slot-ganancias");
const slotApuesta = document.getElementById("slot-apuesta");

let apuesta = 10;
let ganancias = 0;

document.getElementById("slot-spin").addEventListener("click", () => {
  const resultado = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * reels.length);
    resultado.push(reels[randomIndex]);
  }

  slotReels.textContent = resultado.join(" ");

  // Resultado simple: si los 3 símbolos son iguales, ganas el triple de la apuesta
  if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
    ganancias = apuesta * 3;
  } else {
    ganancias = 0;
  }

  slotGanancias.textContent = ganancias;
});

document.getElementById("slot-repetir").addEventListener("click", () => {
  slotReels.textContent = reels.slice(0, 3).join(" ");
  slotGanancias.textContent = "0";
});
