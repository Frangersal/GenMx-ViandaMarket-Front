
  const footer = document.querySelector(".footer");
  fetch("./footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
    });





window.addEventListener('resize', function () {
if (window.innerWidth < 800) {
  document.getElementById('#productos');
 
}
});

window.addEventListener('resize', function () {
if (window.innerWidth < 767) {
  document.getElementById('#acerca');

}
});
window.addEventListener('resize', function () {
if (window.innerWidth < 767) {
  document.getElementById('#contacto');

}
});
const secciones = document.querySelectorAll("tituloCel");
const encabezado = document.querySelectorAll("footerCel");
const listaProdFooter = document.getElementById("#listaProdFooter");
const opciones = document.getElementsByClassName("colapsadoFooter");


for(let i=0; i < encabezado.length; i++){
    encabezado[i].addEventListener("click", () =>{
      opciones[i].classList.toggle(".colapsadoFooter-open");

})
};


