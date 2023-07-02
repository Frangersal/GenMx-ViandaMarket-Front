const verifySession = () => {
    return JSON.parse(localStorage.getItem('SessionId'));
};

async function verificacionCompra() {

    let parametros = window.location.search;
    if (parametros != null) {
        //const params = new URLSearchParams(parametros);
        //const token = params.get('token');
        let token = parametros.substring(1);
        let sessionPedidosId = localStorage.getItem('sessionPedidosId');
        sessionPedidosId = sessionPedidosId.replace("idosId=", "");

        if (sessionPedidosId && token) {
            const url = `/verificar-pagos?sessionId=${sessionPedidosId}&token=${token}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer: ${verifySession().acessToken}`,
                },
            })
            if (response.ok) {
                setTimeout(function () {
                    // Limpiar un elemento del LocalStorage
                    localStorage.removeItem('carrito');
                    window.location.href = "./../../perfilusuario.html";
                }, 5000);
            } else {
                location.reload();
            }
        }
    }
}

window.addEventListener("load", async () => {
    await verificacionCompra()
})
