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
    console.log(productosObject.cantidad);

    ubicacionCarritoDeCompras.innerHTML += `
    <!-- Row para cada articulo del carrito -->
    <div class="row">
      <div class="col-sm-12 col-md-4 box-center">
        <div class="row">
          <div class="col-6">
            <img src="${productosObject.imagen}" class="productoImg" alt="Foto de un producto ${productosObject.nombre} de la marca ">
          </div>
          <div class="col-6">
            <ul>
              <li class="li-producto">${productosObject.nombre} </li>
              <li class="li-marca">${productosObject.marca}</li>
              <li class="li-gramos"><strong>Gramos</strong> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-6 box-center">
        <div class="number-input">
          <button onclick="changeQuantity(${productosObject.id}, 'decrement')" class="minus"></button>
          <input class="quantity" min="1" max="50" name="quantity" value="1" type="number" id="quantity-${productosObject.id}" onchange="updateTotalPrice(${productosObject.id})">
          <button onclick="changeQuantity(${productosObject.id}, 'increment')" class="plus"></button>
        </div>
        <button class="btn btn-sm btn-delete" onclick="eliminarDelCarrito(${productosObject.id}); updateTotalPrice(${productosObject.id})"><i class="fas fa-trash"></i></button>
      </div>
      <div class="col col-md-2 box-center">
        <h4 id="precio-${productosObject.id}">Subtotal: $${(productosObject.precio * 1).toLocaleString()}</h4>
      </div>
    </div>`;

    precioTotalAcumulado += +productosObject.precio;
    precioTotal.innerHTML = "$" + precioTotalAcumulado.toLocaleString();
  }
} else {
  console.log('No se encontró el array en el localStorage.');
}

function changeQuantity(id, operation) {
  var quantityElement = document.getElementById(`quantity-${id}`);
  var quantity = parseInt(quantityElement.value);

  if (operation === 'increment') {
    quantity++;
  } else if (operation === 'decrement') {
    if (quantity > 1) {
      quantity--;
    }
  }

  quantityElement.value = quantity;
  updateTotalPrice(id);
}

// Resto del código anterior...

function updateTotalPrice(id) {
  var quantityElement = document.getElementById(`quantity-${id}`);
  var precioElement = document.getElementById(`precio-${id}`);
  var producto = jsonArray.find(item => item.id === id);
  var precio = +producto.precio;
  var quantity = +quantityElement.value;
  var totalPrice = precio * quantity;

  precioElement.innerHTML = `Subtotal: $${totalPrice.toLocaleString()}`;

  // Actualizar el precio total
  precioTotalAcumulado = 0;
  for (var i = 0; i < jsonArray.length; i++) {
    var producto = jsonArray[i];
    var quantity = +document.getElementById(`quantity-${producto.id}`).value;
    precioTotalAcumulado += producto.precio * quantity;
  }
  precioTotal.innerHTML = "$" + precioTotalAcumulado.toLocaleString();
}

// Resto del código sin cambios...




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
