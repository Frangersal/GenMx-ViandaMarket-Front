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


