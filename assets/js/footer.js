
  const footer = document.querySelector(".footer");
  fetch("./footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
      const currentYearItem = document.getElementById("current-year");
      if (currentYearItem) {
        currentYearItem.textContent = new Date().getFullYear();
      }
    });

const encabezado = document.querySelectorAll(".footerCel");
const opciones = document.getElementsByClassName("colapsadoFooter");

for(let i=0; i < encabezado.length; i++){
    encabezado[i].addEventListener("click", () =>{
      opciones[i].classList.toggle(".colapsadoFooter-open");
})
};
