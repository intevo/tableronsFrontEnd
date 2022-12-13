//OBTENER
function saveData() {
           
    const numeroContrato = document.getElementById("numeroContrato")
    const valorContrato = document.getElementById("valorContrato")
    const fechaIncioContrato = document.getElementById("fechaIncioContrato")
    const fechaFinalizacionContrato = document.getElementById("fechaFinalizacionContrato")
    const prorroga = document.getElementById("prorroga")

    if (numeroContrato.value.length <= 0) {
        alert("Debe poner un valor en el campo número de contrato");
        return;
    }
    if (valorContrato.value.length <= 0) {
        alert("Debe poner un valor en el campo valor de contrato");
        return;
    }

    const API_URL = 'http://localhost:8080/contrato/insert';
    const createInvoice = () => {

        let primero = document.getElementById('valorContrato');
        let valorContrato = primero.value.replace('.', '');
    
        const contrato = {
            numeroContrato: numeroContrato.value,
            fechaIncioContrato: fechaIncioContrato.value,
            fechaFinalizacionContrato: fechaFinalizacionContrato.value,
            valorContrato: parseInt(valorContrato),
            prorroga: prorroga.checked == true ? 1 : 0
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(contrato),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res = res.json())
            .then(response => {
                console.log(response)
            }).catch(err => console.error(err))

    }
        alert("Registro Creado Exitosamente")    
    location. reload();
    createInvoice();
}

//LISTAR
function cargarJSON() {
    const API_URL = 'http://localhost:8080/contrato';
    let intItem = [];
    fetch(API_URL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            let html = '';
            data.forEach(function (API_URL) {
                html += `
                       <li>${valorContrato} ${numeroContrato} ${fechaIncioContrato} ${fechaFinalizacionContrato} ${prorroga}</li>
                   `;
            })
            document.getElementById('prorroga').innerHTML = html;
        })

}

//Validación Check

function validaCheckbox() {
    const checkboxProroga = document.getElementById('prorroga');
    if (checkboxProroga.checked == true)
        alert('Esta a punto de generar una prorroga en este contrato');
}

//IMPRIMIR
const bodyDoc = document.body;
        bodyDoc.onload = getContrato();

        function getContrato() {
            const API_URL = 'http://localhost:8080/contrato';
            let intItem = [];

            const getAllInvoice = () => {
                fetch(API_URL)
                    .then(res => res.json())
                    .then(json => {
                        intRes = json;
                        console.log(json);
                        renderResult(intRes);
                    })
            }

            getAllInvoice();

            const intList = document.querySelector('#datosContrato');

            const renderResult = (intItem) => {
                let listHTML = `
             <tr>
              <th scope="col"><center>ID Contrato</center></th>
              <th scope="col"><center>Número de Contrato</center></th>
              <th scope="col"><center>fecha de Incio Contrato</center></th>
              <th scope="col"><center>fecha de Finalizacion Contrato</center></th>
              <th scope="col"><center>Valor Contrato</center></th>
              <th scope="col"><center>Estado</center></th>
              <th scope="col" colspan="2"><center>Opciones</center></th>
            </tr>
            `
                intItem.forEach(intItem => {        
                    const numerovalorContrato = intItem.valorContrato;
                    const formatoMexico = (number) => {
                        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                        const rep = '$1,';
                        return number.toString().replace(exp,rep);
                    }
                    let stringProrroga = '';
                    if (intItem.prorroga == 1) stringProrroga = `
                    <span class="badge bg-success">Prorroga</span>
                    `;
                    else stringProrroga = '';
                    listHTML += `
            <tr>
              <td align="center">${intItem.idContrato}</td>
              <td align="center">${intItem.numeroContrato}</td>
              <td align="center">${intItem.fechaIncioContrato}</td>
              <td align="center">${intItem.fechaFinalizacionContrato}</td>
              <td align="center">${formatoMexico(numerovalorContrato)}</td>
              <td align="center">${stringProrroga}</td>
              <td><button type="button" class="btn btn-info" id="btn-edit"><img src="https://cdn-icons-png.flaticon.com/512/126/126794.png" width="20px" heigth="20px"></button></td>
              <td><button type="button" class="btn btn-danger" id="btn-delete"><img src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png" width="20px" heigth="20px"></button></td>
            </tr>
              `

                })
                intList.innerHTML = listHTML;
            }
        }

        var fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        var ano = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia;
        if (mes < 10)
            mes = '0' + mes
        document.getElementById('fechaIncioContrato').value = ano + "-" + mes + "-" + dia;

        var fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();
        var ano = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia;
        if (mes < 10)
            mes = '0' + mes
        document.getElementById('fechaFinalizacionContrato').value = ano + "-" + mes + "-" + dia;


function solonumeros(e){

    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    numeros="0123456789";
    especiales="8-37-38-46-13";
    teclado_especial=false;


    for (var i in especiales){
        if (key==especiales[i]){
            teclado_especial=true;
        }
    }

    if (numeros.indexOf(teclado)==-1 && !teclado_especial){
        return false;
        }
    }

// Funcion de decimales cuando se digitan

var separador = document.getElementById('valorContrato');

separador.addEventListener('keyup', (e) => {
    var entrada = e.target.value.split('.').join('');
    entrada = entrada.split('').reverse();
    
    var salida = [];
    var aux = '';
    
    var paginador = Math.ceil(entrada.length / 3);
    
    for(let i = 0; i < paginador; i++) {
        for(let j = 0; j < 3; j++) {
            "123 4"
            if(entrada[j + (i*3)] != undefined) {
                aux += entrada[j + (i*3)];
            }
        }
        salida.push(aux);
        aux = '';
       
        e.target.value = salida.join('.').split("").reverse().join('');
    }
    
}, false);