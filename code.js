let total = [];
let misFig = [];
let paquetes = 0;
let totalPaquetes = 0;
let newArr = [];
class Figurita {
  constructor(fig) {
    this.fig = fig;
    this.rep = 0;
  }
}
function cargarFigurita() {
  for (let i = 0; i < 638; i++) {
    total.push(i);
  }
}

function abrirSobre() {
  for (let i = 0; i < 5; i++) {
    misFig.push(Math.floor(Math.random() * 638));
  }
  paquetes++;
}

function probar() {
  cargarFigurita();
  let test3 = total.reduce((a, c) => a + misFig.includes(c), 0) == total.length
  while (!test3) {
    test3 = total.reduce((a, c) => a + misFig.includes(c), 0) == total.length
    abrirSobre();
  }
  totalPaquetes += paquetes;
}

function reset() {
  total = [];
  misFig = [];
  paquetes = 0;
}

function probarX(n) {
  for (let i = 0; i < n; i++) {
    probar();
  }
  let promedio = totalPaquetes / n;
  console.log(promedio)
  totalPaquetes = 0;

}
let fig = {}




