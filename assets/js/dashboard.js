import { productos } from "./productos.json.js";
let formDash = document.querySelectorAll('.form-dash');

    formDash.forEach(element => {
        console.log(element);
        
    }); 

//* Trae cada elemento de que coincida con formDash
// position 0:Nombre //No vacio, no numeros, minimo 3 letras
// position 1:Marca //No vacio,  minimo 3 letras
// position 2:Calidad//No vacio,  minimo 3 letras
// position 3:Origen//No vacio,  no numeros, minimo 3 letras
// position 4:Gramos// Numero, NO lleve letras, si decimales, mayor 0, sin caracteres especiales
//position 5: precio//numeros, sin caracteres especiales
//position 6: Foto// sugerencia: tiene que ser un archivo jpg, png, pdf
//position 7: Descripcion//No vacio,  minimo 3 letras
//position 8: divalert
//position 9: btnAgregar
//position 10: btnClear
let isComplete = [false, false, false, false, false, false, false,false];
let btnClear = document.getElementById("btnClear");
//* isComplete: declara la variable como boleana al inicio para regresar un true o false si esta bien el regax o no.

// ? Expresiones Regulares
const regexNombre = /^[a-zA-Z_-]{3,20}$/,
    regexMarca = /^[a-zA-Z0-9_-]{3,20}$/,
    regexCalidad = /^[a-zA-Z0-9_-]{3,20}$/,
    regexOrigen = /^[a-zA-Z0-9_-]{3,20}$/,
    regexGramos =/^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexPrecio =/^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexFoto = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    regexDescripcion = /^[a-zA-Z0-9_-]{3,20}$/;


    // ? Functions
function addProductos() {
    console.log(productos);
    let addProductos = {
        "corte" : `${formDash[0].value}`,
        "marca" : `${formDash[1].value}`,
        "calidad" : `${formDash[2].value}`,
        "origen" :  `${formDash[3].value}`,
        "gramos" :  parseInt(formDash[4].value),
        "precio" :  `${formDash[5].value}`,
        "imagen" :  `${formDash[6].value}`,
        "descripcion" : `${formDash[7].value}`
        };


productos.push (addProductos);
console.log(productos);
};




const invalid = (num, msj) => {
    isComplete[num] = false;
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2" style="background-color:#fbf0da;" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" style="color:#73510d;">
    <i class="bi bi-exclamation-circle-fill"></i>
      ${msj}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
    `
    formDash[8].innerHTML += alert;
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}

const valid = (num) => {
    isComplete[num] = true;
}

// ? Listeners
formDash[9].addEventListener('click', (e) => {
    e.preventDefault();
    formDash[8].innerHTML = "";
    (regexNombre.exec(formDash[0].value.trim())) ? valid(0): invalid(0, `Nombre inválido, por favor vuelva a intentarlo.`);
    (regexMarca.exec(formDash[1].value.trim())) ? valid(1): invalid(1, `Marca, inválido, por favor vuelva a intentarlo.`);
    (regexCalidad.exec(formDash[2].value.trim())) ? valid(2): invalid(2, `Calidad inválido, por favor vuelva a intentarlo.`);
    (regexOrigen.exec(formDash[3].value.trim())) ? valid(3): invalid(3, `Origen inválido, por favor vuelva a intentarlo.`);
    (regexGramos.exec(formDash[4].value.trim())) ? valid(4): invalid(4, `Gramos, inválido, por favor vuelva a intentarlo.`);
    (regexPrecio.exec(formDash[5].value.trim())) ? valid(5): invalid(5, `Precio inválido, por favor vuelva a intentarlo.`);
    (regexFoto.exec(formDash[6].value.trim())) ? valid(6): invalid(6, `Foto inválido.`);
    (regexDescripcion.exec(formDash[7].value.trim())) ? valid(7): invalid(7, `Descripcion inválido, por favor vuelva a intentarlo.`);


     let isActive = false;

     for (const boolean of isComplete) {
        if (boolean) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? addProductos(): ' ';

});

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    formDash.forEach(element => {
        if (element.id =="btnAgregar"){
            
        }else {
            element.value = "";
        }
        
    });
   

}); //btnClear


console.log(productos);



