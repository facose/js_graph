const altura = () => {
  // Obtencion de altura y velocidad inicial desde el formulario
  var altura = parseInt(document.getElementById("altura").value);
  var velocidad = parseInt(document.getElementById("velocidad").value);
  
  // Declaracion de variables
  var tiempoDeVuelo = (velocidad + (velocidad ** 2 + 19.62 * altura) ** 0.5) / 9.81;
  var fuerzaGlobo = 400 * 9.81;
  var velocidadGlobo = (360 * velocidad + fuerzaGlobo * (tiempoDeVuelo) - 3531.6 * (tiempoDeVuelo)) / 360;
  var velocidadSacoFinal = velocidad + 9.81 * tiempoDeVuelo;

  // Declaracion de colecciones de datos para los axis de los graficos
  var axisX = [];
  var axisY = [];
  var axisYGlobo = [];

  // Ciclo para graficos, popula las colecciones de datos con resultados en momentos parciales. Tiempo fraccionado en cuartos. 

  for (let i = tiempoDeVuelo; i >= 0; i -= 0.25) {
    let velocidadSaco = velocidad + 9.81 * i;
    let velocidadGlobo = (360 * velocidad + fuerzaGlobo * (i) - 3531.6 * (i)) / 360;
    axisX.push(i.toFixed(4));
    // console.log(velocidadSaco);
    axisY.push(velocidadSaco.toFixed(4));
    axisYGlobo.push(velocidadGlobo.toFixed(4))
  }


  // informacion de graficos renderizado en HTML
  const labels = axisX.reverse();
  const data = {
    labels: labels,
    datasets: [{
      label: 'Velocidad Saco vrs Tiempo',
      data: axisY.reverse(),
      fill: false,
      borderColor: '#0d6efd',
      tension: 0.1
    }]
  };

  const secondData = {
    labels: labels,
    datasets: [{
      label: 'Velocidad Globo vrs Tiempo',
      data: axisYGlobo.reverse(),
      fill: false,
      borderColor: '#FF0000',
      tension: 0.1
    }]
  };

  // Informacion de formulas y resultados renderizado en cuadro de resultados HTML
  var results = document.getElementById("results");
  results.innerHTML = `<p class="results-text">El paso número uno consiste en calcular el tiempo que toma la bolsa de arena en golpear el suelo y la fórmula es:<br>t = (V<sub>0</sub> + (V<sub>0</sub><sup>2</sup> + 2g * h)<sup>0.5</sup>) / g<br><strong>Resultado: ${tiempoDeVuelo.toFixed(4)} s</strong></p><p>El paso número dos consiste en calcular la fuerza de empuje del globo, con el tiempo anteriormente calculado y la fórmula es:<br>400 * (V<sub>0</sub>)<sub>1</sub> + T(t) – 400gt = 400 * (V<sub>0</sub>)<sub>2</sub><br><strong>Resultado: ${fuerzaGlobo} N</strong></p><p>El paso número tres, consiste en calcular la velocidad del globo cuando la bolsa de arena es arrojada. La calculamos con el tiempo que toma la bolsa de arena en golpear el suelo y la masa del globo, menos la masa de la bolsa de arena, tomando en cuenta la fuerza de empuje anteriormente calculada. La fórmula es:<br>360 * (V<sub>0</sub>)<sub>1</sub> + T(t) – 360gt = 360 * (V<sub>0</sub>)<sub>2</sub><br><strong>Resultado: ${velocidadGlobo.toFixed(4)} m/s</strong></p><p>El cuarto paso consiste en calcular la velocidad final de la bolsa de arena al golpear el suelo. Y la fórmula es: V<sub>f</sub> = V<sub>0</sub> + g * t<br><strong>Resultado: ${velocidadSacoFinal.toFixed(4)} m/s</strong></p>`

  const myChart = new Chart("myChart", {
    type: "line",
    data: data
  });

  const mySecondChart = new Chart("mySecondChart", {
    type: "line",
    data: secondData
  });
}

