//OBTENER
function saveData() {

    const valorContrato = document.getElementById('valorContrato');
    const numeroContrato = document.getElementById("numeroContrato");
    const fechaIncioContrato = document.getElementById("fechaIncioContrato");
    const fechaFinalizacionContrato = document.getElementById("fechaFinalizacionContrato");
    const prorroga = document.getElementById("prorroga");
    if (numeroContrato.value.length <= 0) {
        alert("Debe poner un valor en el campo número de contrato");
        return;
    }
    if (valorContrato.value.length <= 0) {
        alert("Debe poner un valor en el campo valor de contrato");
        return;
    }
        let valorContrato2 = valorContrato.value.replaceAll('.', '');
        let valorContratoFin = parseInt(valorContrato2)
    const API_URL = 'http://localhost:8080/contrato/insert';
    const createInvoice = () => {
        
        const contrato = {
            numeroContrato: numeroContrato.value,
            fechaIncioContrato: fechaIncioContrato.value,
            fechaFinalizacionContrato: fechaFinalizacionContrato.value,
            valorContrato: valorContratoFin,
            prorroga: prorroga.checked == true ? 1 : 0
        }

        console.log(contrato);

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
    location.reload();
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

//VALIDACIÓN CHECK

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
            const formato = (number) => {
                const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                const rep = '$1.';
                return number.toString().replace(exp, rep);
            }
            let stringProrroga = '';
            if (intItem.prorroga == 1) stringProrroga = `
                    <span class="badge bg-success">Prorroga</span>
                    `;
            else stringProrroga = '<span class="badge bg-secondary">Sin Prorroga</span>';
            listHTML += `
            <tr contratoId = ${intItem.idContrato}>
              <td align="center">${intItem.idContrato}</td>
              <td align="center">${intItem.numeroContrato}</td>
              <td align="center">${intItem.fechaIncioContrato}</td>
              <td align="center">${intItem.fechaFinalizacionContrato}</td>
              <td align="center">${formato(numerovalorContrato)}</td>
              <td align="center">${stringProrroga}</td>
              <td><button type="button" class="btn btn-info" id="btn-edit"><img src="https://cdn-icons-png.flaticon.com/512/126/126794.png" width="20px" heigth="20px"></button></td>
              <td><button type="button" class="btn btn-danger" id="btn-delete"><img src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png" width="20px" heigth="20px"></button></td>
            </tr>
              `

        })
        intList.innerHTML = listHTML;
    }
}

// CONVERTIDOR FORMATO FECHAS

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


// FUNCIÓN INACTIVACIÓN DEL TECALDO
function solonumeros(e) {

    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key);
    numeros = "0123456789";
    especiales = "8-37-38-46-13";
    teclado_especial = false;


    for (var i in especiales) {
        if (key == especiales[i]) {
            teclado_especial = true;
        }
    }

    if (numeros.indexOf(teclado) == -1 && !teclado_especial) {
        return false;
    }
}

// FUNCIÓN DECIMALES/MILES
var separador = document.getElementById('valorContrato');

separador.addEventListener('keyup', (e) => {
    var entrada = e.target.value.split('.').join('');
    entrada = entrada.split('').reverse();

    var salida = [];
    var aux = '';

    var paginador = Math.ceil(entrada.length / 3);

    for (let i = 0; i < paginador; i++) {
        for (let j = 0; j < 3; j++) {
            "123 4"
            if (entrada[j + (i * 3)] != undefined) {
                aux += entrada[j + (i * 3)];
            }
        }
        salida.push(aux);
        aux = '';

        e.target.value = salida.join('.').split("").reverse().join('');
    }

}, false);

//RELLENAR DATOS EN EL FORMULARIO
const rellenarContrato = () => {
    $(document).on('click', '#btn-edit', function () {
        if (confirm('¿Seguro de Editar?')) {
            let btnEdit = $(this)[0].parentElement.parentElement;
            let id = $(btnEdit).attr('contratoId');
            console.log(id);
            $('#crear').hide();
            $('#editar').show();

            $.ajax({
                url: 'http://localhost:8080/contrato/' + id,
                type: 'GET',
                dataType: 'json',
                success: (res) => {
                    $('#numeroContrato').val(res.numeroContrato);
                    $('#fechaIncioContrato').val(res.fechaIncioContrato);
                    $('#fechaFinalizacionContrato').val(res.fechaFinalizacionContrato);
                    $('#valorContrato').val(res.valorContrato);
                    let check = document.getElementById('prorroga')
                    res.notaCredito == 1 ? check.checked = true : check.checked = false
                    document.getElementById('idContrato').value = res.idContrato;
                }
            })
        }
    })
}

//BOTON EDITAR
const editContrato = () => {

    $('#editar').on('click', function ($event) {
        $event.preventDefault();
        let id = $('#idContrato').val();
        console.log("Pasando por aqui " + id)
        $('#agregar').css('display', 'none');
        $('#editar').css('display', 'block');

        let inputCheck = document.getElementById('prorroga')
        let check = inputCheck.checked == true ? 1 : 0;

        const ans = {
            idContrato: id,
            numeroContrato: $('#numeroContrato').val(),
            fechaIncioContrato: $('#fechaIncioContrato').val(),
            fechaFinalizacionContrato: $('#fechaFinalizacionContrato').val(),
            valorContrato: $('#valorContrato').val(),
            prorroga: check,

        }

        $.ajax({
            url: 'http://localhost:8080/contrato/' + id,
            contentType: 'application/json',
            type: 'PUT',
            data: JSON.stringify(ans),
            dataType: 'json',
            success: (res) => {
                alert("Contrato Editado");
                $('#editar').css('display', 'none');
                $('#crear').css('display', 'block');

                reset();
                getContrato();
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
            }

        })
    })

}

const reset = () => {
    $('#numeroContrato').val('');
    $('#fechaIncioContrato').val('');
    $('#fechaFinalizacionContrato').val('');
    $('#valorContrato').val('');
}

//BOTON ELIMINAR
const deleteContrato = () => {
    $(document).on('click', '#btn-delete', function () {

        if (confirm('¿Seguro de Eliminar')) {
            let btnDelete = $(this)[0].parentElement.parentElement;
            let id = $(btnDelete).attr('contratoId');
            console.log(id);
            $.ajax({
                url: 'http://localhost:8080/contrato/' + id,
                type: 'DELETE',
                dataType: 'json',
            })
            alert("Contrato Eliminado");
            location.reload();
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
        }
    })
}

rellenarContrato();
editContrato();
deleteContrato();