function saveData() {

    // Ontenemos los valores de los campos de contraseñas 
    pass = document.getElementById('pass');
    pass1 = document.getElementById('pass1');
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Verificamos si las constraseñas no coinciden 


    if (nombres.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Nombre", "info");
        return;
    }
    else if (telefono.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Telefono", "info");
        return;
    }

    else if (!validEmail.test(email.value)) {
        swal("ERROR", "Correo No Valido", "info");
        return;
    }

    else if (email.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Email", "info");
        return;
    }
    else if (cargo.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Cargo", "info");
        return;
    }
    else if (pass.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Contraseña", "info");
        return;
    }
    else if (pass.value != pass1.value) {
        swal("ERROR", "Contraseña no Coinciden", "error");
        const form = document.getElementById("dataRegistro");
        
        return
    } else {

        const API_URL = 'http://localhost:8080/registro';

        const formData = new FormData(document.querySelector('#dataRegistro'));

        const registro = {
            nombres: formData.get('nombres').trim(),
            telefono: formData.get('telefono'),
            email: formData.get('email').trim(),
            proyecto: document.getElementById('proyecto').value,
            cargo: formData.get('cargo').trim(),
            pass: formData.get('pass').trim(),
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(registro),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                swal("Registro Exitoso", "", "success").then((value) => {
                    window.location.href = '../index.html';
                  });
                console.log(response)
            })

    }
    twoLowercase(conv);
}

fetch('http://localhost:8080/dataProyectos')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("proyecto");
        data.forEach(element => {
            var option = document.createElement("option");
            var ansText = document.createTextNode(element.descripcionProyectos);
            option.appendChild(ansText);
            option.value = element.descripcionProyectos;
            select.appendChild(option);
        });
    });






