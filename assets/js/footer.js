
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


// ============================================
// Lógica Global de Cookies y Carga de Mapa Segura
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar el Banner de Cookies en el body
    const bannerHTML = `
        <div id="cookieConsentBanner" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background-color: #2A2E3A; color: white; padding: 15px 20px; z-index: 9999; box-shadow: 0 -4px 10px rgba(0,0,0,0.3); font-family: 'Josefin Sans', sans-serif; flex-wrap: wrap; justify-content: center; align-items: center; gap: 15px;">
            <p style="margin: 0; font-size: 1rem; text-align: center; max-width: 800px;">Utilizamos cookies de terceros (como Google Maps) para mejorar tu experiencia interactiva en nuestro sitio. ¿Aceptas su uso?</p>
            <div style="display: flex; gap: 10px;">
                <button id="btnAcceptCookies" class="btn btn-primary" style="background-color: #B81C00; border: none; font-weight: 600;">Sí, aceptar</button>
                <button id="btnDeclineCookies" class="btn btn-outline-light">No, gracias</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", bannerHTML);

    const consentBanner = document.getElementById("cookieConsentBanner");
    const btnAccept = document.getElementById("btnAcceptCookies");
    const btnDecline = document.getElementById("btnDeclineCookies");

    // Función para renderizar el mapa solo si hay consentimiento
    const checkAndLoadMap = () => {
        const consentStatus = localStorage.getItem("vianda_cookie_consent");
        const mapIframe = document.getElementById("googleMap");
        const mapPlaceholder = document.getElementById("mapPlaceholder");

        if (consentStatus === "accepted") {
            // Ocultar banner si existe
            if (consentBanner) consentBanner.style.display = "none";
            // Si estamos en contacto.html, reemplazar placeholder e inyectar srci
            if (mapIframe && mapPlaceholder) {
                mapPlaceholder.classList.remove("d-flex");
                mapPlaceholder.classList.add("d-none");
                mapIframe.src = mapIframe.getAttribute("data-src");
                mapIframe.style.display = "block";
            }
        } else if (!consentStatus) {
            // Si no hay respuesta aún, mostrar el banner
            consentBanner.style.display = "flex";
        } else {
            // Si el estatus es "declined"
            if (consentBanner) consentBanner.style.display = "none";
        }
    };

    // Escuchadores de los botones
    btnAccept.addEventListener("click", () => {
        localStorage.setItem("vianda_cookie_consent", "accepted");
        checkAndLoadMap();
    });

    btnDecline.addEventListener("click", () => {
        localStorage.setItem("vianda_cookie_consent", "declined");
        consentBanner.style.display = "none";
    });

    // Ejecutar verificación inicial
    checkAndLoadMap();
});
