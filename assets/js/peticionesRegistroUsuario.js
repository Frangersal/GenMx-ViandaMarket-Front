export const addUser = (newUser) => {
    if (localStorage.getItem("Users") == null) {
        localStorage.setItem("Users", `[]`);
        let emptyArray = JSON.parse(localStorage.getItem("Users"));
        emptyArray.push(newUser);
        console.log(emptyArray)
        localStorage.setItem("Users", JSON.stringify(emptyArray));

    }


    let existingObjet = JSON.parse(localStorage.getItem("Users"));
    existingObjet.push(newUser);
    localStorage.setItem("Users", JSON.stringify(existingObjet));
}