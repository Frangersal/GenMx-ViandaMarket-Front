
  if(localStorage.getItem("SessionId")!= null){
    window.location.assign("./perfilusuario.html");
  }


  //? Funcion para mostrar password

let eyeicon = document.getElementById("eyeicon");
let campoPass= document.getElementById("contraFormulario");

eyeicon.onclick = function(){
    if(campoPass.type == "password"){
        campoPass.type = "text";
        eyeicon.className="bi bi-eye-fill"
    }else{
        eyeicon.className="bi bi-eye-slash-fill"
        campoPass.type="password";
    }
}

//? DOM variables ⬇
let isComplete = [false, false];
let mail = document.getElementById("correoFormulario");
let passwo = document.getElementById("contraFormulario");
let alerta = document.getElementById("divAlert")
let btnAgregar = document.getElementById("btnAgregar")
// const URL = "https://genmx-viandamarket-back-production.up.railway.app"

let rulespassword = `
<li>Tener al menos un dígito.</li>
<li>Tener al menos una letra minúscula.</li>
<li>Tener al menos una letra mayúscula.</li>
<li>Tener al menos un número.</li>
<li>Tener entre 8 y 20 caracteres.</li>
<li>No contener espacios en blanco.</li>
`;
// ? Expresiones Regulares ⬇
const regexmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regexpasswo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^\s]){8,20}$/;


//? Alerta de Confirmacion
function exitoToast() {
    mail.value = '';
    passwo.value = '';
    alerta.innerHTML = `
        <div class="toast align-items-center text-white border-0 mb-2  bg-success" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body" style="color:white;">
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

    setTimeout(function () {
        window.location.href = "index.html";
    }, 1000);
}


const invalid = (num, msj) => {
    isComplete[num] = false;
    let alert = `
    <div class="toast align-items-center text-white border-0 mb-2 bg-danger  role="alert" aria-live="assertive" aria-atomic="true">
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

const errorServer = async () => {
    let alert = `
            <div class="toast align-items-center text-white border-0 mb-2 bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" style="color:#fff;">
            <i class="bi bi-exclamation-circle-fill"></i>
            Lo sentimos el correo o la contraseña no se encuentran registrados.
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

// ? Listeners
btnAgregar.addEventListener('click', async (e) => {
    e.preventDefault();
    alerta.innerHTML = "";
    (regexmail.exec(mail.value)) ? valid(0) : invalid(0, `Lo sentimos, escribiste mal el correo`);
    (regexpasswo.exec(passwo.value)) ? valid(1) : invalid(1, `Lo sentimos escribiste mal la contraseña.<br>Recuerda que debe contener<ul>${rulespassword}</ul>`);

    if (!isComplete[0] || !isComplete[1]) {
        e.stopPropagation();
        return;
    }

    let body = {
        correo: `${mail.value}`,
        contrasena: `${passwo.value}`
    };


    try {
        const resp = await fetch(`/api/login/`, {
            method: 'POST',
            headers: new Headers({'Content-type': 'application/json'}),
            mode: 'cors',
            body: JSON.stringify(body)
        });

        if (resp.ok) {
            const data = await resp.json();
            console.log(data);
            // localStorage.setItem('correo', mail.value);
            // Insertar el resultado en el Local Storage
            localStorage.setItem('SessionId', JSON.stringify(data));

            // Mostrar un mensaje de éxito o realizar otras acciones necesarias
            exitoToast();
        } else {
            await errorServer();
        }
    } catch (error) {
        await errorServer();
    }
})
;

