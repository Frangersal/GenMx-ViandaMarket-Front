const headerQuick = document.querySelector(".headerQuick")
fetch ("./header.html")
.then(res =>res.text())
.then (data=>{
    headerQuick.insertAdjacentHTML("beforebegin",data);

  });   
      






