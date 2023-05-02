import {addUser} from "./peticionesRegistroUsuario.js";

const inputRegister = document.querySelectorAll(".register");
let isComplete = [false, false, false, false, false];
/**
 *   0 input.form-control.register Nombre
 *   1 input.form-control.register Apellidos
 *   2 input.form-control.register Email
 *   3 input.form-control.register Contraseña
 *   4 input.form-control.register Confirmar
 *   5 button#btnAgregar.btn.btn-primary.btn-lg.btn-block.form-dash.register
 *   6 button#btnClear.btn.btn-secondary.btn-lg.btn-block.form-dash.register
 *   7 divalert Toast
 */

const regexName = /^[a-zA-Záéíóúñ][a-záéíóúñ]{1,}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,2}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,1}$/,
    regexLastNames = /^[a-zA-Záéíóúñ][a-záéíóúñ]{1,}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,2}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,1}$/,
    regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,20}$/u;

/***
 * la contraseña tenga al menos 8 caracteres y no más de 20 caracteres, y debe contener al menos un dígito,
 * una letra minúscula, una letra mayúscula y un carácter especial que no sea un signo de dos puntos.
 */
const isInvalid = (num, msj) => {
    isComplete[num] = false;
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2" style="background-color:#fbf0da;" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body" style="color:#73510d;">
            <i class="bi bi-exclamation-circle-fill" style="color:black;"></i>
              ${msj}
            </div>
        <button type="button" class="btn-close btn-close-black me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    `;
    inputRegister[7].innerHTML += alert;
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
};
const isValid = (num) => {
    isComplete[num] = true;
};
const saveUser = () => {
    let newUser = {
        "id": (new Date().valueOf()),
        "nombre": `${inputRegister[0].value}`,
        "apellidos": `${inputRegister[1].value}`,
        "email": `${(inputRegister[2].value).toLowerCase()}`,
        "contrasena": `${inputRegister[4].value}`
    };
    addUser(newUser);
}
inputRegister[5].addEventListener("click", (e) => {
    e.preventDefault();
    inputRegister[7].innerHTML = "";
    (regexName.exec(inputRegister[0].value.trim())) ? isValid(0) : isInvalid(0, `Nombre inválido, por favor vuelva a intentarlo.`);
    (regexLastNames.exec(inputRegister[1].value.trim())) ? isValid(1) : isInvalid(1, `Apellidos inválidos, por favor vuelva a intentarlo.`);
    (regexEmail.exec(inputRegister[2].value.trim())) ? isValid(2) : isInvalid(2, `Correo Electrónico, inválido, por favor vuelva a intentarlo.`);
    (regexPassword.exec(inputRegister[3].value.trim())) ? isValid(3) : isInvalid(3, `Contraseña, inválido, por favor vuelva a intentarlo.`);
    (inputRegister[3].value.trim() === inputRegister[4].value.trim()) ? isValid(4) : isInvalid(4, `Contraseña, No coincide por favor vuelva a intentarlo.`);

    let isActive = false;
    for (const temp of isComplete) {
        if (temp) {
            isActive = true;
        } else {
            isActive = false
            break;
        }
    }
    console.log(isActive);
    (isActive === true) ? saveUser() : '';

})
inputRegister[6].addEventListener("click", () => {
    for (let i = 0; i <= 5; i++) {
        inputRegister[i].value = "";
    }
})