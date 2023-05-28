let contentCart =  JSON.parse(localStorage.getItem("carrito")) ||[]; 
let shoppingCart = [];

//Para mostrar los productos en el carrito de compras, 
const ubicacionCarritoDeCompras = document.getElementById("ubicacionCarritoDeCompras");
const precioTotal = document.querySelector("#precioTotal");
let precioTotalAcumulado = 0;



var productos = localStorage.getItem('carrito');
 
console.log("hola");
if (productos) { 
  var jsonArray = JSON.parse(productos); 
  for (var i = 0; i < jsonArray.length; i++) {
    var productosObject = jsonArray[i]; 
    console.log(productosObject.id);
    console.log(productosObject.imagen);
    console.log(productosObject.marca);
    console.log(productosObject.nombre);
    console.log(productosObject.precio);
    
    ubicacionCarritoDeCompras.innerHTML+=`
    <!-- Row para cada articulo del carrito -->
      <div class=" row align-items-center articulo">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <img src="${productosObject.imagen}" class="img-thumbnail imgCheckout" alt="...">
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <h4>${productosObject.nombre} - ${productosObject.marca}</h4>
        </div> 
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 precio">$${productosObject.precio.toLocaleString()}</div>

        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 eliminar">
            <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${productosObject.id})">x</button>
        </div>
      </div> 
        `;
        
    precioTotalAcumulado += +productosObject.precio;
    precioTotal.innerHTML = "$"+precioTotalAcumulado.toLocaleString(); 
  }
} else {
  console.log('No se encontró el array en el localStorage.');
}

function eliminarDelCarrito(id) {
  // Buscar el objeto con el ID proporcionado en el carrito
  const index = contentCart.findIndex(item => item.id === id);

  if (index !== -1) {
    // Eliminar el objeto del carrito
    contentCart.splice(index, 1);
    // Actualizar el Local Storage con el carrito modificado
    localStorage.setItem("carrito", JSON.stringify(contentCart));

    // Volver a cargar la página para reflejar los cambios en el carrito
    location.reload();
  }
}
