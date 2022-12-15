validarLogin = () => {
    let usuario = document.getElementById('login').value;
    let pass = document.getElementById('password').value;
    // validar los campos
    // codigo de validacion
    // 
    if(usuario.trim().length === 0 && pass.trim().length === 0){
      swal("ERROR", "Campos Vacios", "info")
    }else{ 

    const API_URL = 'http://localhost:8080/registro';
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(json => {
        let data = json;
        accion = false;
        data.forEach(e => {
          if(e.email == usuario && e.pass != pass){
            swal("ERROR", "Datos Incorrectos", "error");
          }
          if(e.email != usuario && e.pass == pass){
            swal("ERROR", "Datos Incorrectos", "error");
          }
          if(e.email != usuario && e.pass != pass){
            swal("ERROR", "Usuario no Registrado", "warning");
          }
          if (e.email == usuario && e.pass == pass) {              
            swal("Acceso Correcto", "", "success").then((value) => {
              window.location.href = 'grafica.html';
            });
          }
        });
        // ansRes = json;
        // renderResult(ansRes);
      })

    }

  }