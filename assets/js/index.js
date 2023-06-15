let cuerpoRows = document.getElementById("card");

const URL = "/api/cortes/";
const URLcalidad = "/api/calidad/";
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDYXJvIzEzMTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NDQ2NDc4NywiZXhwIjoxNjg1Njc0Mzg3fQ.8AS2m1E_VRYGlpNKlR_qt6sLd2HYt5HTD4QlFYFkeOQ';

const obtenerProductos = async () => {
  const resp = await fetch(URL, {
    method: 'GET',
    headers: new Headers({'Content-type': 'application/json'}),
    mode: 'cors'
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
    headers: new Headers({'Content-type': 'application/json', 'authorization': `Bearer ${token}`}),
    mode: 'cors'
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

  productos.slice(0, 5).forEach(producto => {
    const { id, nombre, idcalidades, imagen } = producto;
    const { marca, pais, calidad } = calidad[idcalidades - 1];

    const card = `
      <div class="slider-card">
        <div class="card" style="border: none;">
          <img src="${imagen}" class="card-img-top">
          <div class="card-body" style="text-align: left;">
            <h4 class="card-1">${nombre}</h4>
            <h6 class="card-2">${marca}</h6>
            <h6 class="card-2">${pais}</h6>
            <h6 class="card-2">${calidad}</h6>
            <button id="btnProducto_${id}" type="button" class="btnProducto text-center" style="background-color: #2A2E3A; color: white;">Ver producto</button>
          </div>
        </div>
      </div>`;

    cuerpoRows.insertAdjacentHTML("beforeend", card);
  });

  // ...
}

window.addEventListener("load", function (event) {
  pintarProductos();
});
