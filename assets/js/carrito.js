// INICIO DE SESION UNICO - VERIFICAR SI LA INFORMACION DE LOGIN FUE GUARDADA
const verifySession = () => {
    const data = JSON.parse(localStorage.getItem('SessionId'));
    if (!data) {
        toastr.remove(); // Eliminar todos los mensajes de Toastr visibles y ocultos
        toastr.error("Se requiere iniciar sesión para poder comprar. Sera redirigido en segundos."); // Mostrar el nuevo mensaje de éxito
        setTimeout(() => {
            window.location.href = "./../../iniciosesion.html"
        }, 4000)
    }
    return data;
};

let contentCart = JSON.parse(localStorage.getItem("carrito")) || [];
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
        console.log(productosObject.idProducto);
        console.log(productosObject.imagen);
        console.log(productosObject.marca);
        console.log(productosObject.nombre);
        console.log(productosObject.precio);
        console.log(productosObject.gramaje);
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
            <li class="li-gramos"><strong>${productosObject.gramaje}</strong> gramos </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-6 box-center">
      <div class="number-input">
        <button onclick="changeQuantity(${productosObject.idProducto}, 'decrement')" class="minus"></button>
        <input class="quantity" min="1" max="50" name="quantity" value="1" type="number" id="quantity-${productosObject.idProducto}" onchange="updateTotalPrice(${productosObject.id})">
        <button onclick="changeQuantity(${productosObject.idProducto}, 'increment')" class="plus"></button>
      </div>
      <button class="btn btn-sm btn-delete" onclick="eliminarDelCarrito(${productosObject.idProducto}); updateTotalPrice(${productosObject.idProducto})"><i class="fas fa-trash"></i></button>
    </div>
    <div class="col col-md-2 box-center">
      <h4 id="precio-${productosObject.idProducto}">Subtotal: $${(productosObject.precio * 1).toLocaleString()}</h4>
    </div>
  </div>`;

        precioTotalAcumulado += +productosObject.precio;
        precioTotal.innerHTML = "$" + precioTotalAcumulado.toLocaleString();
    }
} else {
    console.log('No se encontró el array en el localStorage.');
}

function changeQuantity(idProducto, operation) {
    let quantityElement = document.getElementById(`quantity-${idProducto}`);
    let quantity = parseInt(quantityElement.value);

    if (operation === 'increment') {
        quantity++;
    } else if (operation === 'decrement') {
        if (quantity > 1) {
            quantity--;
        }
    }

    quantityElement.value = quantity;
    updateTotalPrice(idProducto);
}
function updateTotalPrice(idProducto) {
    let quantityElement = document.getElementById(`quantity-${idProducto}`);
    let precioElement = document.getElementById(`precio-${idProducto}`);
    let producto = jsonArray.find(item => item.idProducto === idProducto);
    let precio = +producto.precio;
    let gramaje = producto.gramaje;
    let quantity = +quantityElement.value;
    let totalPrice = precio * quantity;

    precioElement.innerHTML = `Subtotal: $${totalPrice.toLocaleString()}`;

    // Actualizar el precio total
    precioTotalAcumulado = 0;
    for (let i = 0; i < jsonArray.length; i++) {
        let producto = jsonArray[i];
        let quantity = +document.getElementById(`quantity-${producto.idProducto}`).value;
        precioTotalAcumulado += producto.precio * quantity;
    }
    precioTotal.innerHTML = "$" + precioTotalAcumulado.toLocaleString();
}


function eliminarDelCarrito(idProducto) {
    // Buscar el objeto con el ID proporcionado en el carrito
    const index = contentCart.findIndex(item => item.idProducto === idProducto);

    if (index !== -1) {
        // Eliminar el objeto del carrito
        contentCart.splice(index, 1);
        // Actualizar el Local Storage con el carrito modificado
        localStorage.setItem("carrito", JSON.stringify(contentCart));

        // Volver a cargar la página para reflejar los cambios en el carrito
        location.reload();
    }
}

let btnPagarPedido = document.getElementById(`btnPagarPedido`);
btnPagarPedido.addEventListener(`click`, async function (e) {
    e.preventDefault();

    // Eliminar pasarelaProductos del localStorage si existe
    if (localStorage.getItem('pasarelaProductos')) {
        localStorage.removeItem('pasarelaProductos');
    }
    let pasarelaProductos = JSON.parse(localStorage.getItem('pasarelaProductos')) || []; // Recuperar el valor actual del localStorage o iniciar un array vacío si no existe

    // Iterar sobre los productos en el carrito y agregarlos a pasarelaProductos
    for (let i = 0; i < jsonArray.length; i++) {
        let producto = jsonArray[i];
        let productoNombre = producto.nombre;
        let productoPrecio = producto.precio;
        let productoGramaje = producto.gramaje;
        let productoCantidad = document.getElementById("quantity-" + producto.idProducto).value;
        let productoToPasarelaPago = {
            nombre: `${productoNombre}`,
            precio: productoPrecio,
            cantidad: parseInt(productoCantidad),
            id_usuarios: verifySession().idUsuario
        }
        pasarelaProductos.push(productoToPasarelaPago);
    }
    console.log(pasarelaProductos)
    try {
        // Enviar pasarelaProductos al backend utilizando una solicitud HTTP
        const response = await fetch('/api/pasarela-pagos/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer: ${verifySession().acessToken}`,

            },
            body: JSON.stringify(pasarelaProductos)
        })
        if (response.ok) {
            // const responseData = await response.text();
            // window.location.href = responseData;
            const responseData = await response.text();
            const {urlPago, sessionPedidosId} = extractDataFromResponse(responseData);

            // Guardar sessionPedidosId en el localStorage
            localStorage.setItem('sessionPedidosId', sessionPedidosId);

            console.log(urlPago);
            const fullUrlPago = 'h' + urlPago;
            window.location.href = fullUrlPago;
        }
    } catch (e) {
        console.log(e.message)
    }
});

function extractDataFromResponse(responseData) {
    const urlStartIndex = responseData.indexOf("urlPago=") + 9;
    const urlEndIndex = responseData.indexOf(", sessionPedidosId=");
    const sessionPedidosIdStartIndex = responseData.indexOf("sessionPedidosId=") + 10;
    const sessionPedidosIdEndIndex = responseData.indexOf("}");

    const urlPago = responseData.substring(urlStartIndex, urlEndIndex);
    const sessionPedidosId = responseData.substring(sessionPedidosIdStartIndex, sessionPedidosIdEndIndex);

    return {urlPago, sessionPedidosId};
}

window.addEventListener("load", () => {
    verifySession();
})