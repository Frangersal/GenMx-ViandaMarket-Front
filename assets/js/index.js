let cuerpoRows = document.getElementById("slider-container");

const URL = "http://localhost:8080/api/cortes/";
const URLcalidad = "http://localhost:8080/api/calidad/";

const obtenerProductos = async () => {
  const resp = await fetch(URL, {
    method: 'GET',
    headers: new Headers({'Content-type': 'application/json'}),
    // mode: 'cors'
  });

  if (!resp.ok) {
    console.log('La petición fue rechazada');
    return [];
  }

  return await resp.json();
}

const obtenerCalidad = async () => {
  const resp = await fetch(URLcalidad, {
    method: 'GET',
    headers: new Headers({'Content-type': 'application/json'}),
  });

  if (!resp.ok) {
    console.log('La petición fue rechazada');
    return [];
  }

  return await resp.json();
}

const pintarProductos = async () => {
  const productos = await obtenerProductos();
  const calidad = await obtenerCalidad();

  cuerpoRows.innerHTML = ""; // Limpiar contenido existente en el div

  for (let i = 0; i < 5; i++) {
    const producto = productos[i];
    const calidadProducto = calidad[producto.idcalidades - 1];

    const card = `
    <div class="slider-track">
      <div class="slider-card">
        <div class="card" style="border: none;">
          <img src="${producto.imagen}" class="card-img-top">
          <div class="card-body" style="text-align: left;">
            <h4 class="card-1">${producto.nombre}</h4>
            <h6 class="card-2">${calidadProducto.marca}</h6>
            <h6 class="card-2">${calidadProducto.pais}</h6>
            <button id="btnProducto_${producto.id}" type="button" class="btnProducto text-center" style="background-color: #2A2E3A; color: white;">Ver producto</button>
          </div>
        </div>
      </div>
      </div>
      
      `;
    
    cuerpoRows.insertAdjacentHTML("beforeend", card);
  }

  const botones = document.getElementsByClassName("btnProducto");

  for (let index = 0; index < botones.length; index++) {
    botones[index].addEventListener("click", function (event) {
      console.log("click" + event.target.id);
      console.log(event.target.id.split("_")[1]);
      localStorage.setItem("productoSeleccionado", event.target.id.split("_")[1]);
    });
  }
}

window.addEventListener("load", async (event) => {
  await pintarProductos();
});
