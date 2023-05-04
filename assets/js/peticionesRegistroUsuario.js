export const addUser = (newUser) => {
    let existingObjet = JSON.parse(localStorage.getItem("Users"));
  
    if (existingObjet == null) {
      existingObjet = [];
    }
  
    existingObjet.push(newUser);
    localStorage.setItem("Users", JSON.stringify(existingObjet));
  };
  