import { API_URL } from "./config.js";

let cuerpoRows = document.getElementById("row");
const URL = `${API_URL}/api/cortes/`
const obternerUsuarios = async () => {
    const resp = await fetch(URL, {
        method: 'GET',
        headers: new Headers({'Content-type': 'application/json'}),
        mode: 'cors'
    })
    if (!resp.ok) return console.log('La peticion fue rechazada')
    return await resp.json();
}


const URLcalidad = `${API_URL}/api/calidad/`
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




// Aqui ingresamos los usiar
const pintarUsuarios = async () => {
    const producto = await obternerUsuarios()
    // console.log(producto);

    const calidad = await obtenerCalidad()
    // console.log(calidad);


    
    
    //  producto = JSON.parse(usuarios);
// function foreachProductos(producto) {
    producto.forEach((r, index) => {
      let priorityAttrs = index === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
      let row =
        `
        
                <div class="vianda-card-wrapper mb-5" >
                <div class="card premium-card">
                  <img src="${r.imagen}" class="card-img-top" alt="Foto de ${r.nombre} marca ${calidad[r.idcalidades-1].marca}" crossorigin="anonymous" ${priorityAttrs}>
                  <div class="card-body">
                    <p class="card-1 mb-2">${r.nombre}</p>
                    <p class="card-2 mb-1">${calidad[r.idcalidades-1].marca}</p>
                    <p class="card-2 mb-1">${calidad[r.idcalidades-1].pais}</p>
                    <p class="card-2 mb-1">${calidad[r.idcalidades-1].calidad}</p>
                        <button id="btnProducto_${r.id}" type="button" class="btnProducto btn-primary" onclick="location.href='./ProductoIndividual.html'">Más info</button>
                    </div>
                </div>
            </div>`
        ;
      cuerpoRows.insertAdjacentHTML("beforeend", row);
    });//producto.forEach
    //?Esto srive para mandar la seleccion a la pagina de producto invidual
    //==========================================================
    let botones = document.getElementsByClassName("btnProducto");
    // console.log(botones.length);
    

    for (let index = 0; index < botones.length; index++) {
      botones[index].addEventListener("click", function (event) {
        console.log("click" + event.target.id);
        console.log(event.target.id.split("_")[1]);
        localStorage.setItem("productoSeleccionado", event.target.id.split("_")[1]);
      });//for que revisa el click del boton
    }//for que evalua botone

// }//foreachProductos 

}

console.log();

window.addEventListener("load", function (event) {
  pintarUsuarios();
  


  // if (localStorage.getItem("producto") == null) {
  //   localStorage.setItem("producto", JSON.stringify(productos));
  //   foreachProductos(producto)
  // }
  // foreachProductos(producto);
});

        //?Esto srive para mandar la seleccion a la pagina de producto invidual
//         //==========================================================



