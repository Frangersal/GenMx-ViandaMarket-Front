const usersURL = "https://api.jsonbin.io/v3/b/6446cb749d312622a3515aee",
    API_KEY = "$2b$10$sBgqD9T7nME8NYjRJa82LOegYsIU1feKpZYTOhFIpqBPeN.VEurse";


// export let addUser = async (newUser) => {
//     try {
//         const response = await fetch(usersURL, {
//             headers: {
//                 "X-Master-Key": API_KEY
//             }
//         });
//
//         if (!response.ok) {
//             throw new Error("Network response was not ok.");
//         }
//
//         const existingData = await response.json();
//         console.log(existingData);
//
//         // Agregar un nuevo objeto a la lista de objetos en "record"
//         const newObject = newUser;
//
//         existingData.record.record.push(newObject);
//
//         // Enviar una solicitud PUT para actualizar los datos JSON en el servidor
//         const putResponse = await fetch(usersURL, {
//             method: "POST", headers: {
//                 "Content-Type": "application/json", "X-Master-Key": API_KEY, "X-Bin-Versioning": "false"
//             }, body: JSON.stringify(existingData)
//         });
//
//         if (!putResponse.ok) {
//             throw new Error("Network response was not ok.");
//         }
//
//         const updatedData = await putResponse.json();
//         console.log('updatedData' + updatedData);
//     } catch (error) {
//         console.error("Error:", error);
//     }
//     return `Usuario Agregado`;
// }
export const addUser = async (newUser) => {
    const BIN_ID = '6446cb749d312622a3515aee';
    const API_KEY = '$2b$10$sBgqD9T7nME8NYjRJa82LOegYsIU1feKpZYTOhFIpqBPeN.VEurse';

    try {
        // Obtener los datos existentes
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const existingData = await response.json();

        // Verificar si existingData.record.User es un array
        if (Array.isArray(existingData.record.User)) {
            // Agregar el nuevo usuario al array User
            const newUserRecord = {
                User: [...existingData.record.User, newUser]
            };

            // Actualizar el archivo JSONBin con los datos nuevos
            const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(newUserRecord)
            });

            const updateData = await updateResponse.json();
            console.log(updateData);
        } else {
            console.error('Error: existingData.record.User is not an array.');
        }
    } catch (error) {
        console.error(error);
    }
};