let productoCarne = document.getElementsByClassName("productoCarne")
  if (localStorage.getItem("productoSeleccionado") == null) {
    let error = `<h1> No se pudo cargar la página correctamente por favor
        vuelve a intentarlo </h1>`
    productoCarne[0].innerHTML = error;
  }


const URL = "https://genmx-viandamarket-back-production.up.railway.app/api/cortes/"
const obternerUsuarios = async () => {
    const resp = await fetch(URL, {
        method: 'GET',
        headers: new Headers({'Content-type': 'application/json'}),
        mode: 'cors'
    })
    if (!resp.ok) return console.log('La peticion fue rechazada')
    return await resp.json();
}


const URLcalidad = "https://genmx-viandamarket-back-production.up.railway.app/api/calidad/"
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDYXJvIzEzMTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NDQ2NDc4NywiZXhwIjoxNjg1Njc0Mzg3fQ.8AS2m1E_VRYGlpNKlR_qt6sLd2HYt5HTD4QlFYFkeOQ'
const obtenerCalidad = async () => {
    const resp = await fetch(URLcalidad, {
        method: 'GET',
        headers: new Headers({'Content-type': 'application/json', 'authorization': `Bearer: ${token}`}),
        mode: 'cors'
    })
    if (!resp.ok) return console.log('La peticion fue rechazada')
    return await resp.json();
}


const pintarcorte = async () => {
  const producto = await obternerUsuarios()
  console.log(producto);

  
  const calidad = await obtenerCalidad()
  console.log(calidad);


  if (localStorage.getItem("productoSeleccionado") != null) {
    console.log(producto.find(id => id.id == (parseInt(localStorage.getItem("productoSeleccionado")))));
    let selProd = producto.find(id => id.id == (parseInt(localStorage.getItem("productoSeleccionado"))));
    selProd = `
                 <div class="imagenContenedor">
                 <img src=${selProd.imagen} alt="" class="imagen" width="2vw">
                 </div>
                 <div class="productoTexto">
                     <h1 class="corte">${selProd.nombre}</h1>
                     <h2 class="marca">${calidad[selProd.idcalidades-1].marca}</h2>
                     <h3 class="calidad">${calidad[selProd.idcalidades-1].calidad}</h3>
                     <h3 class="origen">${calidad[selProd.idcalidades-1].pais}</h3>
                     <h4 class="existencia" style="color:rgb(20, 179, 20)">En existencia</h4>
                     <div class="dropdown">
                         <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                           Seleccionar
                         </button>
                         <ul class="dropdown-menu">
                           <li><a class="dropdown-item" href="#"></a></li>
                           <li><a class="dropdown-item" href="#"></a></li>
                           <li><a class="dropdown-item" href="#"></a></li>
                         </ul>
                       </div>
                       <div class="precio">
                       <h2 class="marca" style="color:rgba(184, 28, 0, 1)">$${selProd.precio}</h2>
                                       
                       </div>
                       <p class="descripcion"> <h3>Descripción del corte:</h3> <span> ${selProd.descripcion_corte} </span><br>
                       <h3>Descripción de la marca:</h3>
                       <span>${calidad[selProd.idcalidades-1].descripcion_marca}</span>
                       </p>
                 </div>`;
    productoCarne[0].insertAdjacentHTML("beforeend", selProd);
  }
}
//window  // <button type="button" class="btnCompra">Añadir al carrito</button>   
window.addEventListener("load", function (event) {
  pintarcorte();
  

});
