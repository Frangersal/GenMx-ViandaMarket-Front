function loadFooter() {
  const footer = document.querySelector(".footer");
  fetch("./footer.html")
    .then(res => res.text())
    .then(data => {
      footer.innerHTML = data;
    });
}

loadFooter();

window.addEventListener('resize', function () {
  if (window.innerWidth < 767) {
      document.getElementById('productos').classList.remove('show');
     
  }
});

window.addEventListener('resize', function () {
  if (window.innerWidth < 767) {
      document.getElementById('acerca').classList.remove('show');
   
  }
});
window.addEventListener('resize', function () {
  if (window.innerWidth < 767) {
      document.getElementById('contacto').classList.remove('show');
   
  }
});

