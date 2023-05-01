import {
    productos
}from "./productos.json.js";







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
let isComplete = [false, false, false, false, false, false, false];
let corte = document.getElementById("Nombre");
let marca = document.getElementById("Brand");
let calidad = document.getElementById("Quality");
let origen = document.getElementById("Origin");
let gramos = document.getElementById("Gramos");
let precio = document.getElementById("Price");
let foto = document.getElementById("Photo");
let descri = document.getElementById("descripcion");
let alerta = document.getElementById("divAlert");
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
//* isComplete: declara la variable como boleana al inicio para regresar un true o false si esta bien el regax o no.

// ? Expresiones Regulares
const regexNombre = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/,
    regexMarca = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/,
    regexCalidad = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/,
    regexOrigen = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/,
    regexGramos = /^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexPrecio = /^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexFoto = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    regexDescripcion = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/;


// ? Functions
function addProductos() {
    console.log(productos);

    let addProductos = {
        "id":`0001`,
        "corte": `${corte.value}`,
        "marca": `${marca.value}`,
        "calidad": `${calidad.value}`,
        "origen": `${origen.value}`,
        "gramos": parseInt(gramos.value),
        "precio": parseInt(precio.value),
        "imagen": `${foto.value}`,
        "descripcionCorte": `${descri.value}`,
        "descripcionMarca":`descripcionsobremarca`
    };


    productos.push(addProductos);
    console.log(productos);
    localStorage.setItem("producto",JSON.stringify(productos));

    formDash.forEach(element => {
        if (element.id == "btnAgregar") {

        } else {
            element.value = "";
        }

    });




};

function exitoToast() {
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2" style="background-color:rgba(62, 175, 62, 0.496);" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" style="color:#232222;">
    <i class="bi bi-exclamation-circle-fill"></i>
      Producto subido exitosamente
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
    `
    alerta.innerHTML += alert;
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
    
}




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
    alerta.innerHTML += alert;
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
btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    alerta.innerHTML = "";
    (regexNombre.exec(corte.value.trim())) ? valid(0): invalid(0, `Nombre inválido, por favor vuelva a intentarlo.`);
    (regexMarca.exec(marca.value.trim())) ? valid(1): invalid(1, `Marca, inválido, por favor vuelva a intentarlo.`);
    (regexCalidad.exec(calidad.value.trim())) ? valid(2): invalid(2, `Calidad inválido, por favor vuelva a intentarlo.`);
    (regexOrigen.exec(origen.value.trim())) ? valid(3): invalid(3, `Origen inválido, por favor vuelva a intentarlo.`);
    (regexGramos.exec(gramos.value.trim())) ? valid(4): invalid(4, `Gramos, inválido, por favor vuelva a intentarlo.`);
    (regexPrecio.exec(precio.value.trim())) ? valid(5): invalid(5, `Precio inválido, por favor vuelva a intentarlo.`);
    (regexFoto.exec(foto.value.trim())) ? valid(6): invalid(6, `Foto inválido.`);
    (regexDescripcion.exec(descri.value.trim())) ? valid(6): invalid(6, `Descripcion inválido, por favor vuelva a intentarlo.`);


    let isActive = false;

    for (const boolean of isComplete) {
        if (boolean) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? (addProductos(), exitoToast()) : ' ';

});

btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    formDash.forEach(element => {
        if (element.id == "btnAgregar") {

        } else {
            element.value = "";
        }

    });


}); //btnClear


console.log(productos);

let producto =[];
window.addEventListener("load",function(event){
    if (localStorage.getItem("producto")!=null){
        producto = JSON.parse(localStorage.getItem("prodcuto"))
    };
});




// ? boton para cargar imagenes en cloudinary
// *****************JAVASCRIPT*********************
// const cloudName = '"TU_NOMBRE_DE_CLOUDINARY";
// const unsignedUploadPreset = "TU_PRESET_SIN_FIRMAR";
// const fileInput = document.getElementById('fileInput');
// const uploadBtn = document.getElementById('uploadBtn');

// uploadBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', unsignedUploadPreset);
//     formData.append('cloud_name', cloudName);

// ? boton para cargar imagenes en cloudinary
// *****************JAVASCRIPT*********************
// const cloudName = '"TU_NOMBRE_DE_CLOUDINARY";
// const unsignedUploadPreset = "TU_PRESET_SIN_FIRMAR";
// const fileInput = document.getElementById('fileInput');
// const uploadBtn = document.getElementById('uploadBtn');

// uploadBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', unsignedUploadPreset);
//     formData.append('cloud_name', cloudName);

//     fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
// });
// *****************HTML*********************
// 
//      <form>
//          <input type="file" id="fileInput">
//          <button type="submit" id="uploadBtn">Subir imagen</button>
//       </form> */
// *****************Notas*********************
// Nota: Asegúrate de reemplazar "TU_NOMBRE_DE_CLOUDINARY" y "TU_PRESET_SIN_FIRMAR" con tus propios valores. 
// Para crear un preset firmado, debes ir al panel de control de Cloudinary, seleccionar la pestaña "Settings" y luego "Upload". 
// En la sección de "Upload presets", puedes crear un nuevo preset y seleccionar la opción "Unsigned" para que no requiera autenticación.