function saveData() {

    // Ontenemos los valores de los campos de contraseñas 
    pass = document.getElementById('pass');
    pass1 = document.getElementById('pass1');

    // Verificamos si las constraseñas no coinciden 


    if (nombres.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Nombre", "info");
        return;
    }
    if (telefono.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Telefono", "info");
        return;
    }
    if (email.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Email", "info");
        return;
    }
    if (proyecto.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Proyecto", "info");
        return;
    }
    if (cargo.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Cargo", "info");
        return;
    }
    if (pass.value.length <= 0) {
        swal("ERROR", "Debe ingresar un valor en el campo de Contraseña", "info");
        return;
    }
    if (pass.value != pass1.value) {
        swal("ERROR","Contraseña no Coinciden", "error");
        const form = document.getElementById("dataRegistro");
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        })
    }

    else {
        const API_URL = 'http://localhost:8080/registro';
        const createInvoice = () => {
            const formData = new FormData(document.querySelector('#dataRegistro'));

            const registro = {
                nombres: formData.get('nombres').trim(),
                telefono: formData.get('telefono').trim(),
                email: formData.get('email').trim(),
                proyecto: formData.get('proyecto').trim(),
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
                .then(res = res.json())
                .then(response => {
                    console.log(response)
                })
        }
        /*swal("Registro Exitoso","","success").then((value) => {
            location.reload();
        })*/
        alert("Registro Exitoso");
        createInvoice();
    }
}