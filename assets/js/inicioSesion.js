let usuarios = [
    {
        "nombre":"Pepe",
        "password":"gr3at@3wdsG"
    },
    {
        "nombre":"Ana",
        "password":"gr4at@3wdsG"
    },
    {
        "nombre":"Luis",
        "password":"gr5at@3wdsG"
    },

];

window.addEventListener("load",function(event){
    if (localStorage.getItem("usuarios")!=null){
        usuarios = JSON.parse(localStorage.getItem("usuarios"))
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

});



let isComplete = [false, false];
let nombre = document.getElementById("correoFormulario"); 
let contra = document.getElementById("contraFormulario");
let alerta = document.getElementById("divAlert")
let btnAgregar = document.getElementById("btnAgregar")

// ? Expresiones Regulares
const regexNombre = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    regexContra = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,20}$/;



function exitoToast() {
    alerta.innerHTML = `
        <div class="toast align-items-center text-white border-0 mb-2" style="background-color:rgba(62, 175, 62, 0.496);" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body" style="color:#232222;">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    Inicio exitoso
                </div>
            </div>
        </div>
    `;

    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })

    toastList.forEach(toast => toast.show())

    setTimeout(function() {
        window.location.href = "./index.html";
    }, 2000);
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
    <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
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
    (regexNombre.exec(nombre.value)) ? valid(0): invalid(0, `El correo electrónico es incorrecto o no existe, por favor vuelva a intentarlo.`);
    (regexContra.exec(contra.value)) ? valid(1): invalid(1, `Contraseña incorrecta, por favor vuelva a intentarlo.`);
    
        

    let isActive = false;

    for (const boolean of isComplete) {
        if (boolean) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? (exitoToast()) : ' ';

});



