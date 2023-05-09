const btnEditarDireccion = document.getElementById("btnAgregar");
const formularioDireccion = document.querySelector(".fondoform");

function toggleForm() {
  formularioDireccion.classList.toggle("hide");
}

btnEditarDireccion.addEventListener("click", toggleForm);