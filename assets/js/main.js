let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product, .products-container .product-g').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('marca') || product.getAttribute('marca2');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('marca2');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});

var slider = document.querySelector(".slider-track"); //este lo quita
var cards = slider.querySelectorAll(".slider-card");
var cardWidth = cards[0].offsetWidth;
var prevBtn = document.querySelector(".slider-arrow-left");
var nextBtn = document.querySelector(".slider-arrow-right");
var position = 0;
var limit = Math.abs((cards.length * cardWidth) - slider.offsetWidth);

nextBtn.addEventListener("click", function() {
  if (position > -limit) {
    position -= cardWidth;
    slider.style.transform = `translateX(${position}px)`;
  }
});

prevBtn.addEventListener("click", function() {
  if (position < 0) {
    position += cardWidth;
    slider.style.transform = `translateX(${position}px)`;
  }
});
// Obtener la cantidad de tarjetas y el ancho de cada una
var numCards = cards.length;
var cardWidth = cards[0].offsetWidth;

// Desactivar el botón de "siguiente" al llegar a la última tarjeta
if (position <= -(numCards - 1) * cardWidth) {
  nextBtn.disabled = true;
}

