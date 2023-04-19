let jsonRapido=
    [
        {id: 1,
        corte: "Ribeye",
        marca:"Kagura",
        calidad:"A5",
        origen:"Japon",
        gramos:"XXXX",
        precio:5750,
        image:"https://www.edualimentaria.com/images/carnes/carnes-derivados-cecinas.jpg",
        descripcion:"El preferido de muchos por su gran sabor y suavidad. El Rib-Eye es un corte que abarca la parte superior de la costilla y la carne incluida en ambos lados de la misma."
    }];

    let producto = document.getElementsByClassName("producto");


    window.addEventListener("load", function (event){
            
        jsonRapido.forEach(e => {


                let card =   `
                <div class="imagenContenedor">
                <img src="${e.image}" alt="" class="imagen">
                </div>
                <div class="productoTexto">
                    <h1>${e.corte}</h1>
                    <h2>${e.marca}</h2>
                    <h3>${e.calidad}</h3>
                    <h3>${e.origen}</h3>
                    <h4 style="color:rgb(20, 179, 20)">Existencia</h4>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Seleccionar
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="#">Aquí</a></li>
                          <li><a class="dropdown-item" href="#">Va</a></li>
                          <li><a class="dropdown-item" href="#">Inventario</a></li>
                        </ul>
                      </div>
                      <div class="precio">
                      <h2 style="color:rgba(184, 28, 0, 1)">$${e.precio}</h2>
                      <button type="button" class="btnCompra">Agregar al carrito</button>
                    
                      </div>
                      <p>${e.descripcion}</p>
    
                </div>`;
            
                    producto[0].insertAdjacentHTML("beforeend", card);


            });


    });