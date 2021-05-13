const altura = () => {
  var altura = document.getElementById("altura").value;
  
  var tiempoDeVuelo = (5 + (25 + 19.62 * altura) ** 0.5) / 9.81;
  var velocidadGlobo = (1800 + 3924 * (tiempoDeVuelo) - 3531.6 * (tiempoDeVuelo)) / 360;
  var velocidadSacoFinal = 5 + 9.81 * tiempoDeVuelo;

  var axisX = [];
  var axisY = [];

  
  for (let i = tiempoDeVuelo; i >= 0; i -= 0.25) {
    let velocidadSaco = 5 + 9.81 * i;
    axisX.push(i.toFixed(4));
    console.log(velocidadSaco);
    axisY.push(velocidadSaco.toFixed(4));
  }

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

  var results = document.getElementById("results");
  results.innerHTML = `<ul><li>El tiempo que tarda el saco en golpear el suelo es: ${tiempoDeVuelo.toFixed(4)} s.</li><br><li>La velocidad del globo cuando el saco golpea el suelo es: ${velocidadGlobo.toFixed(4)} m/s.</li><br><li>La velocidad del saco al impactar contra el suelo es: ${velocidadSacoFinal.toFixed(4)} m/s.</li></ul>`

  const myChart = new Chart("myChart", {
    type: "line",
    data: data
  });
}

