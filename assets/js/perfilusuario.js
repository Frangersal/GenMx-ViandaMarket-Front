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
    nombre.placeholder= `${userSession.nombres}`
   apellido.placeholder= `${userSession.apellidos}`
    correo.placeholder= `${userSession.correo}`
    telefono.placeholder= `${userSession.telefono}`
    edad.placeholder= `${userSession.edad}`
    domicilio.placeholder= `${userSession.domicilio}`
    nombreModal.placeholder= `${userSession.nombres}`
    apellidoModal.placeholder= `${userSession.apellidos}`
  

    let e =
    `<h4 class="txt-blanco">${userSession.nombres} ${userSession.apellidos}</h4>
    <p class=" mb-1 txt-blanco">Correo electrónico: ${userSession.correo} </p>
    <p class="  mb-1 txt-blanco">Teléfono: 555-1234</p>`;

    userInfo.innerHTML = e
  }



  



