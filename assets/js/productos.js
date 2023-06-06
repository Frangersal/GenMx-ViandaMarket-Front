let cuerpoRows = document.getElementById("row");
const URL = "/api/cortes/"
const obternerUsuarios = async () => {
    const resp = await fetch(URL, {
        method: 'GET',
        headers: new Headers({'Content-type': 'application/json'}),
        mode: 'cors'
    })
    if (!resp.ok) return console.log('La peticion fue rechazada')
    return await resp.json();
}


const URLcalidad = "/api/calidad/"
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
    console.log(producto);

    const calidad = await obtenerCalidad()
    console.log(calidad);


    
    
    //  producto = JSON.parse(usuarios);
// function foreachProductos(producto) {
    producto.forEach(r => {
      let row =
        `
        
                <div class="col-6 col-xl-4 col-xxl-4 col-lg-4" >
                <div class="card" style="border: none;">
                  <img src="${r.imagen}" class="card-img-top">
                  <div class="card-body" style="text-align: left;">
                    <h4 class="card-1">${r.nombre}</h4>
                    <h6 class="card-2">${calidad[r.idcalidades-1].marca}</h6>
                    <h6 class="card-2">${calidad[r.idcalidades-1].pais}</h6>
                    <h6 class="card-2">${calidad[r.idcalidades-1].calidad}</h6>
                        <a href="./ProductoIndividual.html">
                        <button  id="btnProducto_${r.id} "type="button" class="btnProducto text-center" style="background-color: #2A2E3A; color: white;">Ver producto</button> </a>
                    </div>
                </div>
            </div>`
        ;
      cuerpoRows.insertAdjacentHTML("beforeend", row);
    });//producto.forEach
    //?Esto srive para mandar la seleccion a la pagina de producto invidual
    //==========================================================
    let botones = document.getElementsByClassName("btnProducto");
    console.log(botones.length);
    

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



