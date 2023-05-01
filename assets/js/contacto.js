let contact = document.querySelectorAll('.contact');
// * 0:input#name.form-control.contact
// * 1:input#email.form-control.contact
// * 2:input#phone.form-control.contact
// * 3:textarea#msj.form-control.contact
// * 4:input#btnContact.btn.btn-primary.contact
// * 5:divalert
let isComplete = [false, false, false, false];
// ? Expresiones Regulares
const regexPhone = /^(?:(?:\+|00)52)?\s*\(?(?:(?:(?:1|2|3|4|5|6|7|8|9)\d{1,2})|800)\)?\s*\d{3}[\s-]?\d{4}$/,
    regexName = /^[a-zA-Záéíóúñ][a-záéíóúñ]{1,}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,2}(?:\s+[a-zA-Záéíóúñ][a-záéíóúñ]{1,}){0,1}$/,
    regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regexMsj = /^(?!(.*\b(?:viagra|cialis|levitra|porn|xxx|sex|gambling|casino|roulette|poker|loan|debt|bitcoin|payday|mortgage|forex|trading|invest|investment|earn money|make money|work from home|online job|opportunity|scam|spam|advertisements)\b.*)$)(?!(.*\b(?:maldito|hijo de puta|puto|chinga tu madre|pendejo|culero|cabrón|pinche|pendeja|joto|maricón|imbecil|estupido|idiota|tarado|cagado|verga|tonto)\b.*)$).+$/;

// ? Functions
const invalid = (num, msj) => {
    isComplete[num] = false;
    let alert = `   
    <div class="toast align-items-center text-white border-0 mb-2" style="background-color:#fbf0da;" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class="toast-body" style="color:#73510d;">
    <i class="bi bi-exclamation-circle-fill"></i>
      ${msj}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
    `
    contact[5].innerHTML += alert;
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}

const valid = (num) => {
    isComplete[num] = true;
}
const sendEmail = () => {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "johnangelmx@outlook.com",
        Password: "A2AF056C0EB34FF3FFD899209B3144A249C0",
        To: "johnangelmx@outlook.com",
        From: "johnangelmx@outlook.com",
        Subject: "Atencion a Cliente desde Contacto Vianda",
        Body: `Nombre del Cliente: ${contact[0].value.trim()} <br> Cliente con numero: ${contact[2].value.trim()}<br>Con Email: ${contact[1].value.trim()}<br>Mensaje: ${contact[3].value.trim()}`
    }).then(message => {
        let alert = `<div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
                Mensaje enviado con éxito ${message}
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>`
        contact[5].innerHTML += alert;
        const toastElList = [].slice.call(document.querySelectorAll('.toast'))
        const toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())

        contact[0].value = '';
        contact[1].value = '';
        contact[2].value = '';
        contact[3].value = '';
        isComplete = [false, false, false, false];
    });

}

// ? Listeners
contact[4].addEventListener('click', (e) => {
    e.preventDefault();
    contact[5].innerHTML = "";
    (regexName.exec(contact[0].value.trim())) ? valid(0): invalid(0, `Nombre inválido, por favor vuelva a intentarlo.`);
    (regexEmail.exec(contact[1].value.trim())) ? valid(1): invalid(1, `Correo Electrónico, inválido, por favor vuelva a intentarlo.`);
    (regexPhone.exec(contact[2].value.trim())) ? valid(2): invalid(2, `Teléfono inválido, por favor vuelva a intentarlo.`);
    (regexMsj.exec(contact[3].value.trim())) ? valid(3): invalid(3, `Mensaje inválido, por favor vuelva a intentarlo.`);

    let isActive = false;

    for (const boolean of isComplete) {
        if (boolean) {
            isActive = true
        } else {
            isActive = false
            break;
        }
    }
    (isActive === true) ? sendEmail(): ' ';

})

//Footer responsive ocultar por defecto menu desplegable en resoluciones por debajo de 500
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