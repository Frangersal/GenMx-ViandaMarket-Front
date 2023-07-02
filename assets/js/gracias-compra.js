/**
 * 
 */

 const urlCompleta = window.location.href;
const protocolo = window.location.protocol;
const host = window.location.host;
const pathname = window.location.pathname;
let parametros = window.location.search;

if (parametros != null) {
    //const params = new URLSearchParams(parametros);
    //const token = params.get('token');
    let token = parametros.substring(1); 
    const sessionPedidosId = localStorage.getItem('sessionPedidosId');
    console.log("5 token - "+parametros);
    console.log("5 SPID - "+sessionPedidosId);

    if (sessionPedidosId && token) {
        const data = {
            sessionPedidosId: sessionPedidosId,
            token: token
        };

        // Enviar la solicitud POST a /verificar-pagos
        fetch('/verificar-pagos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Redirigir a http://localhost:8080/index.html después de 6 segundos
                    setTimeout(() => {
                        window.location.href = 'http://localhost:8080/index.html';
                    }, 6000);
                } else {
                    // Recargar la página
					console.log("no fue ok");
					 setTimeout(() => {
                    	//location.reload(); 
                    }, 6000);
					
                }
            })
            .catch(error => {
                console.log(error);
                // Recargar la página en caso de error
                location.reload();
            });
    }
}
