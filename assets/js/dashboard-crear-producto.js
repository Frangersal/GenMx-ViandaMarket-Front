const saveProd = () => {

    let addProductos = {
        "nombre": `${nombre.value}`,
        "precio": `${precio.value}`,
        "descripcion_corte": `${descri.value}`,
        "disponibilidad": true,
        "cantidad_disponible": `${canti.value}`,
        "idcalidades":`${idcali.value}`,
        "imagen": `${foto.value}`

    };
    

//     "nombre": "Ribeye",
//         "precio": 3520.0,
//         "descripcion_corte": "Corte nacional con marmoleo bueno",
//         "disponibilidad": true,
//         "cantidad_disponible": 3.0,
//         "idcalidades":7,
//         "imagen": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dw.com%2Fes%2Fverificaci%25C3%25B3n-qu%25C3%25A9-tan-perjudicial-para-el-clima-es-el-consumo-de-carne%2Fa-63568454&psig=AOvVaw0HGOsHIy7KxdBXlztl2Lx9&ust=1684563172704000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCI-P3cgP8CFQAAAAAdAAAAABAE"
//   }


    // saveProd(addProductos);  setTimeout();
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDYXJvIzEzMTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NDQ2NDc4NywiZXhwIjoxNjg1Njc0Mzg3fQ.8AS2m1E_VRYGlpNKlR_qt6sLd2HYt5HTD4QlFYFkeOQ"
    fetch("/api/cortes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer: " + token
        },
        body: JSON.stringify(addProductos)
    })
    .then(response => {
        if (response.ok) {
            exitoToast();
        } else {
            throw new Error("Error al crear el usuario.");
        }
    })
    .catch(error => {
        console.error(error);
        isInvalid(5, "Error al crear el usuario. Por favor, inténtalo nuevamente.");
    });
}







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
let nombre = document.getElementById("Nombre");
let precio = document.getElementById("Precio");
let descri = document.getElementById("descri");
let canti = document.getElementById("canti");
let idcali = document.getElementById("idcali"); 
let idgramos = document.getElementById("idgramos"); 
let foto = document.getElementById("Photo");
let alerta = document.getElementById("divAlert");
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let formDash = document.querySelectorAll(".form-dash");

//* isComplete: declara la variable como boleana al inicio para regresar un true o false si esta bien el regax o no.

// ? Expresiones Regulares
const regexNombre = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/,
    regexPrecio = /^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexcantiDisponible = /^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexidCalidades = /^(\$)?(?=[1-9]\d*)([0-9]+(\.[0-9]+)?)/,
    regexFoto = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    // regexDescripcion = /^[a-záéíóúA-ZÁÉÍÓÚ0-9_-]{3,}$/;
    // console.log(productos);
    // console.log(producto);

// ? Functions
// function addProductos() {
//     console.log(productos);

//     let addProductos = {
//         "nombre": `${nombre.value}`,
//         "precio": `${precio.value}`,
//         "descripcion_corte": `${descri.value}`,
//         "disponibilidad": '1',
//         "cantidad_disponible": `${canti.value}`,
//         "idcalidades":`${idcali.value}`,
//         "idgramos": `${idgramos.value}`,
//         "imagen": `${foto.value}`,

//     };


    // producto.push(addProductos);
    // console.log(addProductos);
    // localStorage.setItem("producto",JSON.stringify(producto));

//     formDash.forEach(element => {
//         if (element.id == "btnAgregar") {

//         } else {
//             element.value = "";
//         }

//     });




// };
// function clear() {
//     formDash.forEach(element => {
//     if (element.id == "btnAgregar") {
//     } else {
//         element.value = "";
//     }

// });
// };




function exitoToast() {
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2 bg-success"   role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" style="color:white;">
    <i class="bi bi-exclamation-circle-fill"></i>
      Producto subido exitosamente!
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
  </div>
</div>
    `
    alerta.innerHTML += alert;
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())


};
    



const invalid = (num, msj) => {
    isComplete[num] = false;
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2 bg-danger "   role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" style="color:#fff;">
    <i class="bi bi-exclamation-circle-fill"></i>
    ${msj}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
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
    (regexNombre.exec(nombre.value.trim())) ? valid(0): invalid(0, `Nombre inválido, por favor vuelva a intentarlo.`);
    (regexPrecio.exec(precio.value.trim())) ? valid(1): invalid(1, `Nombre inválido, por favor vuelva a intentarlo.`);
    (descri.value.trim()) ? valid(2): invalid(2, `Marca, inválido, por favor vuelva a intentarlo.`);
    (regexcantiDisponible.exec(canti.value.trim())) ? valid(3): invalid(3, `Calidad inválido, por favor vuelva a intentarlo.`);
    (regexidCalidades.exec(idcali.value.trim())) ? valid(4): invalid(4, `Origen inválido, por favor vuelva a intentarlo.`);
    (idgramos.value.trim()) ? valid(5): invalid(5, `Marca, inválido, por favor vuelva a intentarlo.`);
    (regexFoto.exec(foto.value.trim())) ? valid(6): invalid(6, `Foto inválido.`);
    // (regexDescripcion.exec(descri.value.trim())) ? valid(6): invalid(6, `Descripcion inválido, por favor vuelva a intentarlo.`);


    let isActive = false;

    for (const boolean of isComplete) {
        if (boolean) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? (saveProd()) : (clear());

        formDash.forEach(element => {
            if (element.id == "btnAgregar") {
    
            } else {
                element.value = "";
            }
    
        });
    
    
    

});//btn agregar

btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    formDash.forEach(element => {
        if (element.id == "btnAgregar") {

        } else {
            element.value = "";
        }

    });


}); //btnClear


// console.log(productos);


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