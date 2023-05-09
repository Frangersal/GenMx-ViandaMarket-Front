var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [{
            label: 'Ventas',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

//----------------
// Obtener el elemento canvas
var ctx = document.getElementById('myPieChart').getContext('2d');

// Crear los datos para el pie chart
var data = {
  labels: ['Rojo', 'Azul' ],
  datasets: [{
    data: [12, 19],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)', 
    ],
    borderWidth: 1
  }]
};

// Crear el pie chart con la leyenda oculta
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: {
    legend: {
      position: 'right',
      align: 'start'
    }
  }
});

 //----

 var ctx = document.getElementById('myChartLine').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 8],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//---------
var ctx = document.getElementById('myChartBubble').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Productos',
            data: [
                {x: 10, y: 20, r: 15},
                {x: 20, y: 30, r: 25},
                {x: 30, y: 10, r: 10},
                {x: 40, y: 40, r: 20},
                {x: 50, y: 15, r: 30}
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                    beginAtZero: true
                }
            },
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    }
});
