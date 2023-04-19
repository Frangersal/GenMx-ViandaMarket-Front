// import jsonprods from "./../json/productos.json";
// console.log(jsonprods);

import info from "./../json/productos.json" assert { type: "json" };

const { default: info2 } = await import("./../json/productos.json", {
  assert: {
    type: "json",
  },
});
console.log(info2);


//     let promesa = fetch("https://fakestoreapi.com/products", {
//         method: "GET"
//     });
//     jsonprods.then( 
//         (response) => {
//             response.json().then((prods) => {
//                     //crear Cards (prods);
//                     console.log("prods=>json()");
//                     console.log(prods);
//                     foreachProductos(prods);
//                 }//prods
//             )//then json
//             .catch((err) => {
//                 console.error("Error en el formato de la respuesta " + err.message);
//             });//catch json
//         }//response

//     )//Promesa.then
//     .catch((err)=>{
//         console.error("Error en la respuesta " + err.message);
//     });//Promesa.catch
// }


// then cuando sea cierto
// cuando no sea cierto da error


// getProducto();

let promesa = fetch('./../json/productos.json')
    .then(response => response.json())

    .then(obj => console.log(obj))
    .then((prod) => foreachProductos(prod))
    .catch((err) => console.log(err.message))
// function getProducto(){

//.then( (prod)=> foreachProductos(prod)  )
//.catch( (err)=> console.log(err.message) );
// un foreach recorriendo el JSON producto que es un array

//Funcion para recorrer el JSON y mostrarlo en forma de cartas al DOM
function foreachProductos(producto) {
    // Variable que toma el elemento con el ID row
    let cuerpoRows = document.getElementById("row");
    // Mandar array producto a la consola para fines depurativos
    console.log(producto)
    // Manda la el JSON producto al Local Storage en forma de string 
    localStorage.setItem("producto", JSON.stringify(producto));
    // Si producto del Local Storage no es igual a nulo
    if (localStorage.getItem("producto") != null) {
        // la variable producto se iguala a un JSON almacenado almacenado en Local Storage (se hace una conversion de string a JSON) 
        producto = JSON.parse(localStorage.getItem("producto"));
        //Por cada JSON del arreglo producto ejecutar la siguiente funcion
        producto.forEach(r => {
            let row =
                `
            <div class="col-md-4">
                <div class="card carta mt-2 mb-2" id="card" style="width: auto;">
                    <img src="${r.image}" class="card-img-top carta-imagen" id="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title carta-titulo" id="card-title">${r.title}</h5>
                        <b class="carta-categoria" id="card-category">Categoria - ${r.category}</b>
                        <p class="card-text carta-texto" id="card-text">${r.description}</p>
                        <h5 class="card-title" id="card-price">$${r.price}</h5>
                        
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop_${r.id}">
                        Más info
                        </button>
                    </div>
                </div>
            </div>

            <!-- Button trigger modal -->
            
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop_${r.id}" data-bs-backdrop="static" data-bs-keyboard="false" 
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">${r.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    ${r.description}
                    </div>
                    
                    <div class="modal-body">
                    <h5  >$${r.price}</h5> 
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                        
                    </div>
                </div>
                </div>
            </div>

            `;
            cuerpoRows.insertAdjacentHTML("beforeend", row);
        });//producto.forEach
    }//if 
}//foreachProductos 
//foreachProductos(producto);