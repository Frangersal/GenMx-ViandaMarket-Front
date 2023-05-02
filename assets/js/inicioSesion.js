let usuarios = [
    {
        "mail":"Pepe@gmail.com",
        "password":"gr3at@3wdsG"
    },
    {
        "mail":"Ana@gmail.com",
        "password":"gr4at@3wdsG"
    },
    {
        "mail":"Luis@gmail.com",
        "password":"gr5at@3wdsG"
    },

];

window.addEventListener("load",function(event){
    if (localStorage.getItem("Users")!=null){
        Users = JSON.parse(localStorage.getItem("Users"))
    }
    localStorage.setItem("Users", JSON.stringify(Users));

});



let isComplete = [false, false];
let mail = document.getElementById("correoFormulario"); 
let passwo = document.getElementById("contraFormulario");
let alerta = document.getElementById("divAlert")
let btnAgregar = document.getElementById("btnAgregar")

// ? Expresiones Regulares
const regexmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regexpasswo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,20}$/;



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
    (regexmail.exec(mail.value)) ? valid(0): invalid(0, `Lo sentimos, escribiste mal el correo`);
    (regexpasswo.exec(passwo.value)) ? valid(1): invalid(1, `Lo sentimos escribiste mal la contraseña.`);
    
    let usuarioExistente = false;
    let passwExiste = false;
    let coincidencia = true;
    for(let i=0; i<=((JSON.parse(localStorage.getItem("Users", Users))).length); i++){
       
       try{
        if(((usuarioExistente==true || JSON.parse(localStorage.getItem("Users", Users)))[i].email)==mail.value){
           usuarioExistente = true;
        //    console.log(usuarioExistente);
        //    console.log(((JSON.parse(localStorage.getItem("usuarios", usuarios)))[i].mail)==mail.value)   
                if(((JSON.parse(localStorage.getItem("Users", Users)))[i].contrasena)==passwo.value){
                    // console.log(((JSON.parse(localStorage.getItem("Users", Users)))[i].contrasena)===passwo.value);
                    passwExiste= true
                    coincidencia=true;
                }else{
                    coincidencia=false;
                    break;
                }
            }
    }catch (error){
        console.log("mensaje de erro " + error.message);

                 }//trycatch
                 
        }// for usuarioExistente


        console.log(passwExiste);


        if(usuarioExistente==false){
            let alert = `   
            <div class="toast align-items-center text-white border-0 mb-2" style="background-color:#fbf0da;" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" style="color:#73510d;">
            <i class="bi bi-exclamation-circle-fill"></i>
            El correo no existe.
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
        };


        if(coincidencia==false){
            let alert = `   
            <div class="toast align-items-center text-white border-0 mb-2" style="background-color:#fbf0da;" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" style="color:#73510d;">
            <i class="bi bi-exclamation-circle-fill"></i>
            Lo sentimos la contraseña no coincide con el correo.
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
        };



    
    // console.log(localStorage.getItem("usuarios", typeof(JSON.stringify(usuarios[1].nombre))));
    // console.log(((JSON.parse(localStorage.getItem("usuarios", usuarios)))[0].nombre)==nombre.value);
    // console.log((JSON.parse(localStorage.getItem("usuarios", usuarios))).length);


    let isActive = false;

    for (const boolean of isComplete) {
        if (boolean && usuarioExistente==true && passwExiste==true) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? (exitoToast()) : ' ';

});



