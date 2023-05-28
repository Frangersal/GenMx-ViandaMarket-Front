let sessionId = JSON.parse(localStorage.getItem("SessionId")).acessToken
let userId = JSON.parse(localStorage.getItem("SessionId")).idUsuario
const userInfo = document.getElementById("userInfo");
const nombre =document.getElementById("nombre");
const apellido =document.getElementById("apellido");
const correo = document.getElementById("email");
const telefono = document.getElementById("telefono");
const  domicilio = document.getElementById("direccion");
const edad = document.getElementById("edad");
let contra = document.getElementById("password");
let editarPerfil = document.getElementById("editarPerfil");
const nombreModal =document.getElementById("nombreModal");
const apellidoModal =document.getElementById("apellidoModal");
let cerrarSesion = document.getElementById("cerrarSesion");
let telefonoModal = document.getElementById("telefonoModal");
let edadModal = document.getElementById("edadModal");
let direccionModal = document.getElementById("direccionModal");
let btnCambiosPerfil = document.getElementById("btnCambiosPerfil");
let divAlert = document.getElementById("divAlert");

// console.log(sessionId);
// console.log(userId);

  //? Funcion para mostrar password

  let eyeicon1 = document.getElementById("eyeicon1");
  let eyeicon2 = document.getElementById("eyeicon2");
  let campoPass= document.getElementById("cambioPass");
  let campoPass2= document.getElementById("newCambioPass");
  
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


 //? Funcion para cerrar sesion**************************************************************

 cerrarSesion.addEventListener("click", (e)=>{
  localStorage.removeItem("SessionId")
 })

//? Pintar informacion de usuario en el perfil
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer: ${sessionId}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 fetch("https://genmx-viandamarket-back-production.up.railway.app/api/usuarios/", requestOptions)
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
    telefono.placeholder= `${userSession.telefono}`
    edad.placeholder= `${userSession.edad}`
    domicilio.placeholder= `${userSession.domicilio}`
   //Modal
    nombreModal.placeholder= `${userSession.nombres}`
    apellidoModal.placeholder= `${userSession.apellidos}`
    telefonoModal.placeholder= `${userSession.telefono}`
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
    fetch(`https://genmx-viandamarket-back-production.up.railway.app/api/usuarios/${userId}?edad=${edadModal.value}&domicilio=${direccionModal.value}`, requestOptions)
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
  



