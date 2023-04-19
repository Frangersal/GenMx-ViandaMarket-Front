let jsonRapido=[
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
        "rate": 3.9,
        "count": 120
        }
        },
        {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
        "rate": 4.1,
        "count": 259
        }
        }
    ];

    let producto = document.getElementsByClassName("producto");


    window.addEventListener("load", function (event){
            
        jsonRapido.forEach(e => {


                let card =   `
                <div class="imagenContenedor">
                <img src="${e.image}" alt="" class="imagen">
                </div>
                <div class="productoTexto">
                    <h1>${e.title}</h1>
                    <h2>Marca</h2>
                    <h3>Calidad</h3>
                    <h3>Origen</h3>
                    <h4 style="color:rgb(20, 179, 20)">Existencia</h4>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Seleccionar
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">Action</a></li>
                          <li><a class="dropdown-item" href="#">Another action</a></li>
                          <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </div>
                      <div class="precio">
                      <h2 style="color:rgba(184, 28, 0, 1)">Precio por kilo</h2>
                      <button type="button" class="btnCompra">Agregar al carrito</button>
                    
                      </div>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Id, autem ipsa. Architecto beatae, 
                        sit id aspernatur mollitia sapiente delectus. Cum.</p>
    
                </div>`;
            
                    producto[0].insertAdjacentHTML("beforeend", card);


            });


    });