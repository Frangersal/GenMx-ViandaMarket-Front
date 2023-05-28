
  const footer = document.querySelector(".footer");
  fetch("./footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
    });


const encabezado = document.querySelectorAll("footerCel");
const opciones = document.getElementsByClassName("colapsadoFooter");


for(let i=0; i < encabezado.length; i++){
    encabezado[i].addEventListener("click", () =>{
      opciones[i].classList.toggle(".colapsadoFooter-open");

})
};


