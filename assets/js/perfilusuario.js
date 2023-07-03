let sessionId = JSON.parse(localStorage.getItem("SessionId")).acessToken
let userId = JSON.parse(localStorage.getItem("SessionId")).idUsuario
const userInfo = document.getElementById("userInfo");
const nombre =document.getElementById("nombre");
const apellido =document.getElementById("apellido");
const correo = document.getElementById("email");
//const telefono = document.getElementById("telefono");
const  domicilio = document.getElementById("direccion");
const edad = document.getElementById("edad");
let contra = document.getElementById("password");
let editarPerfil = document.getElementById("editarPerfil");
const nombreModal =document.getElementById("nombreModal");
const apellidoModal =document.getElementById("apellidoModal");
let cerrarSesion = document.getElementById("cerrarSesion");
//let telefonoModal = document.getElementById("telefonoModal");
let edadModal = document.getElementById("edadModal");
let direccionModal = document.getElementById("direccionModal");
let btnCambiosPerfil = document.getElementById("btnCambiosPerfil");
let divAlert = document.getElementById("divAlert");
let cambioPass = document.getElementById("cambioPass");
let newCambioPass = document.getElementById("newCambioPass");
let newCambioPass2 = document. getElementById("newCambioPass2");
let btnCambioPass = document.getElementById("btnCambioPass");
let divAlertPass = document.getElementById("divAlertPass");


  //? Funcion para mostrar password

  let eyeicon1 = document.getElementById("eyeicon1");
  let eyeicon2 = document.getElementById("eyeicon2");
  let eyeicon3 = document.getElementById("eyeicon3");
  let campoPass= document.getElementById("cambioPass");
  let campoPass2= document.getElementById("newCambioPass");
  let campoPass3= document.getElementById("newCambioPass2");
  
  eyeicon1.onclick = function(){
      if(campoPass.type == "password"){
        campoPass.type = "text";
          eyeicon1.className="bi bi-eye-fill"
      }else{
          eyeicon1.className="bi bi-eye-slash-fill"
          campoPass.type="password";
      }
  }

  eyeicon2.onclick = function(){
    if(campoPass2.type == "password"){
      campoPass2.type = "text";
        eyeicon2.className="bi bi-eye-fill"
    }else{
        eyeicon2.className="bi bi-eye-slash-fill"
        campoPass2.type="password";
    }
}

eyeicon3.onclick = function(){
  if(campoPass3.type == "password"){
    campoPass3.type = "text";
      eyeicon3.className="bi bi-eye-fill"
  }else{
      eyeicon3.className="bi bi-eye-slash-fill"
      campoPass3.type="password";
  }
}



//? Regex de cambio de contrasena***************************************************************************************************


let isComplete = [false, false, false,false];
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])([^\s]){8,20}$/;


const isValid = (num) => {
  isComplete[num] = true;

};

const isInvalid = (num, msj) => {
  isComplete[num] = false;
  let alert = `   
  <div class="toast align-items-center text-white border-0 mb-2 bg-danger role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
          <div class="toast-body" style="color:#73510d;">
          <i class="bi bi-exclamation-circle-fill" style="color:white;"></i>
            ${msj}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
      </div>
  </div>
  `;
  divAlertPass.innerHTML += alert;
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show())
};



function passSucess() {
  let alert = `   
  <div class="toast align-items-center text-white border-0 mb-2 bg-success" role="alert" aria-live="assertive" aria-atomic="true">
<div class="d-flex">
  <div class="toast-body" style="color:white;">
  <i class="bi bi-exclamation-circle-fill"></i>
   Contreseña cambiada exitosamente.
  </div>
  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
</div>
</div>
  `
  divAlertPass.innerHTML += alert;
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show())
  setTimeout(function () {
    window.location.href = "./perfilusuario.html";
}, 1000);

};




//   //? Cambiar contrasena****************************************************************************************************************
const cambioContrasena = () =>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "contrasena": `${cambioPass.value}`,
    "newContrasena": `${newCambioPass.value}`
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  // const cambioContrasena = () =>{
    fetch(`/api/login/${userId}`, requestOptions)
  
    .then(response => response.text())
    .then(result = (respuesta) =>{
    console.log(respuesta)
    if (respuesta === ""){
      let alert = `   
  <div class="toast align-items-center text-white border-0 mb-2 bg-danger role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
          <div class="toast-body" style="color:#73510d;">
          <i class="bi bi-exclamation-circle-fill" style="color:white;"></i>
           No se pudo nimodo.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" style="font-size: small;"></button>
      </div>
  </div>
  `;
  divAlertPass.innerHTML += alert;
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
  })
  toastList.forEach(toast => toast.show())
      
    }else{
      passSucess(); 
    }
  })
    .catch(error => console.log('error', error));
 
 }




btnCambioPass.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(newCambioPass.value);
  divAlertPass.innerHTML = "";
  (regexPassword.exec(cambioPass.value.trim())) ? isValid(0) : isInvalid(0,`Contraseña, inválido, por favor vuelva a intentarlo.`);
  (regexPassword.exec(newCambioPass.value.trim())) ? isValid(1) : isInvalid(1,`La nueva contraseña es inválido, por favor vuelva a intentarlo.`);
  (cambioPass.value.trim() !== newCambioPass.value.trim()) ? isValid(2) : isInvalid( 2,`Lo sentimos la nueva contrasña debe de ser diferente a la nueva contraseña.`);
  (newCambioPass.value.trim() === newCambioPass2.value.trim()) ? isValid(3) : isInvalid( 3,`Las contraseñas no coincide por favor vuelva a intentarlo.`);

  console.log(isComplete);

  let isActive = false;
  for (const temp of isComplete) {
      if (temp) {
          isActive = true;
      } else {
          isActive = false
          break;
      }
  }
  if (isActive === true ){
    cambioContrasena();
   
  }
});

 //? Funcion para cerrar sesion**************************************************************

 cerrarSesion.addEventListener("click", (e)=>{
  localStorage.removeItem("SessionId")
 });

//? Pintar informacion de usuario en el perfil
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer: ${sessionId}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 fetch("/api/usuarios/", requestOptions)
  .then(response => response.json())
  .then(users =>showUser(users))
  .catch(error => console.log('error', error));


  const showUser = (users)=>{
    const userSession = users.find(user => user.id == userId);
    // console.log(userSession);
    //Perfil
    nombre.placeholder= `${userSession.nombres}`
   apellido.placeholder= `${userSession.apellidos}`
    correo.placeholder= `${userSession.correo}`
    //telefono.placeholder= `${userSession.telefono}`
    edad.placeholder= `${userSession.edad}`
    domicilio.placeholder= `${userSession.domicilio}`
   //Modal
    nombreModal.placeholder= `${userSession.nombres}`
    apellidoModal.placeholder= `${userSession.apellidos}`
    //telefonoModal.placeholder= `${userSession.telefono}`
    edadModal.value= `${userSession.edad}`
    direccionModal.value= `${userSession.domicilio}`

  

    let e =
    `<h4 class="txt-blanco">${userSession.nombres} ${userSession.apellidos}</h4>
    <p class=" mb-1 txt-blanco">Correo electrónico: ${userSession.correo} </p>
    <p class="  mb-1 txt-blanco">Teléfono: 555-1234</p>`;

    userInfo.innerHTML = e
  }



  //? Modificar perfil de usuario***********************************************************

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer: ${sessionId}`);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  redirect: 'follow'
};

  btnCambiosPerfil.addEventListener("click", (e)=>{
    fetch(`/api/usuarios/${userId}?edad=${edadModal.value}&domicilio=${direccionModal.value}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  //? Alerta de Confirmacion
  divAlert.innerHTML = `
      <div class="toast align-items-center text-white border-0 mb-2  bg-success" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
              <div class="toast-body" style="color:white;">
                  <i class="bi bi-exclamation-circle-fill"></i>
                  Tus cambios han sido guardados
              </div>
          </div>
      </div>
  `;

  console.log(direccionModal.value)

  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
  })

  toastList.forEach(toast => toast.show())

  setTimeout(function () {
      window.location.href = "./perfilusuario.html";
  }, 1000);
   
  })

//&telefono=33333333
  

// Obtiene la dirección de enlace (URL) de la página actual
var direccionEnlace = window.location.href;

// Crea un objeto URLSearchParams con la URL
var parametrosURL = new URLSearchParams(direccionEnlace);

// Comprueba si el parámetro "?success" está presente en la URL
if (parametrosURL.has('success')) {
  // El parámetro "?success" está presente
  var resultHeading = document.getElementById("historialCompras");
  resultHeading.innerText = 'La URL contiene el parámetro "?success"';

  // Desplaza la página hasta el elemento resultHeading
  resultHeading.scrollIntoView({ behavior: 'smooth' });
} 
