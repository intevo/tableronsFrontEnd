
// FETCH PARA TRAER Y MOSTRAR INFORMACÓN 
const bodyDoc = document.body;
const ANS = [];
bodyDoc.onload = getAns();

function getAns() {
    const API_URL = 'http://localhost:8080/ans';
    let ansItem = [];
    const getAllAns = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(json => {
                ansRes = json;
                renderResult(ansRes);
            })
    }
    getAllAns();
    const ansList = document.querySelector('#ansList');
    const renderResult = (ansItem) => {
        let listHTML = `
              <tr>
                <th align="center">ID ANS</center></th>
                <th scope="col"><center>ANS</center></center></th>
                <th scope="col"><center>Porcentaje</center></th>
                <th scope="col"><center>Valor Factura</center></th>
                <th scope="col"><center>Valor Descuento</center></th>
                <th scope="col"><center>Valor Total</center></th>
                <th scope="col"><center>Factura</center></th>
                <th scope="col"><center>Observaciones</center></th>
                <th scope="col"><center>Nota Credito</center></th>
                <th scope="col"><center>Valor Nota Credito</center></th>
                <th scope="col" colspan="2"><center>Opciones</center></th>
              </tr>
              
        `;
        ansItem.forEach(ansItem => {
            const numeroValorfactura = ansItem.valorFactura;
            const numeroPorcentaje = ansItem.porcentaje;
            const numerovalorDescuento = ansItem.valorDescuento;
            const numerovalorTotal = ansItem.valorTotal;
            const numerovalorNotacredito = ansItem.valorNotacredito;
            const formatoMexico = (number) => {
                const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                const rep = '$1,';
                return number.toString().replace(exp, rep);
            }
            let stringestadoNotacredito = '';
            if (ansItem.notaCredito == 1) stringestadoNotacredito = `
                    <span class="badge bg-success">Activo</span>
                    `;
            else stringestadoNotacredito = `
                    <span class="badge bg-danger">Inactivo</span>`;
            listHTML += `
          <tr>
                <td align="center">${ansItem.idAns}</td>
                <td align="center">${ansItem.descripcion}</td>
                <td align="center">${formatoMexico(numeroPorcentaje)}</td>
                <td align="center">${formatoMexico(numeroValorfactura)}</td>
                <td align="center">${formatoMexico(numerovalorDescuento)}</td>
                <td align="center">${formatoMexico(numerovalorTotal)}</td>
                <td align="center">${ansItem.factura}</td>
                <td align="center">${ansItem.observacionAns}</td>
                <td align="center">${stringestadoNotacredito}</td>
                <td align="center">${formatoMexico(numerovalorNotacredito)}</td>
                <td><button type="button" class="btn btn-info"><img src="https://cdn-icons-png.flaticon.com/512/126/126794.png" width="20px" heigth="20px"></button></td>
                <td><button type="button" class="btn btn-danger"><img src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png" width="20px" heigth="20px"></button></td>
          </tr>
          `
        })
        ansList.innerHTML = listHTML;
    }
}

// FETCH ENVIO DE INFORMACIÓN AL JSON API REST
function saveData() {
    const API_URL = 'http://localhost:8080/ans';
    if (descripcion.value.length <= 0) {
        alert("Debe poner un valor en el campo de Nombre Ans");
        return;
    }
    if (porcentaje.value.length <= 0) {
        alert("Debe poner un valor en el campo de Porcentaje");
        return;
    }
    if (porcentaje.value < 0 || porcentaje.value > 100) {
        alert("Error, Porcentaje no valido");
        return;
    }
    if (valorFactura.value.length <= 0) {
        alert("Debe poner un valor en el campo de Precio valor Facturado");
        return;
    }
    if (valorDescuento.value.length <= 0) {
        alert("Debe poner un valor en el campo de Valor Descuento");
        return;
    }
    if (factura.value.length <= 0) {
        alert("Debe elegir un valor en el campo de Factura");
        return;
    }


//---------//

    const createInvoice = () => {
        const formData = new FormData(document.querySelector('#ansForm'));
        const notaCredito = document.getElementById("notaCredito");

        let primero = document.getElementById('valorFactura');
        let valorFactura = primero.value.replace('.', '');
        let segundo = document.getElementById('valorDescuento');
        let valorDescuento = segundo.value.replace('.', '');
        let tercero = document.getElementById('valorNotacredito');
        let valorNotacredito = tercero.value.replace('.', '');

        const ans = {
            descripcion: document.getElementById('descripcion').value,
            porcentaje: formData.get('porcentaje'),
            valorFactura: valorFactura,
            valorDescuento: valorDescuento,
            valorTotal: formData.get('valorTotal'),
            factura: document.getElementById('factura').value,
            observacionAns: formData.get('observacionAns').trim(),
            notaCredito: notaCredito.checked == true ? 1 : 0,
            valorTotal: formData.get('valorTotal'),
            valorNotacredito: valorNotacredito
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(ans),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
            }).catch(error => console.log(error))
    }
    alert('ans creado')
    location.reload();
    createInvoice();

}

function validaCheckboxnotaCredito() {
    const checkboxnotaCredito = document.getElementById('notaCredito');
    if (checkboxnotaCredito.checked == true)
        alert('Esta a punto de generar una Nota Credito');
}

// FETCH ACTULAIZACIÓN CAMPO VALORTOTAL TABLA FACTURA
bodyDoc.onload = getValor();

function getValor() {
    const total = document.querySelector('#tbodyTotales');
    fetch('http://localhost:8080/ans')
        .then(res => res.json())
        .then(json => {
            renderResult(json)
        })

    const renderResult = (arrayData) => {
        let facturas = [];
        let listHTML = "";
        let printJson = [];
        arrayData.forEach(e => {
            if (!facturas.includes(e.factura)) facturas.push(e.factura)
        })

        facturas.forEach(e => {

            let factura = e;
            let acomulado = 0;
            arrayData.forEach(element => {
                console.log("Prueba" + element);
                if (element.factura == factura) acomulado = acomulado + parseInt(element.valorTotal)
            })


            let elemento = {
                idFactura: factura,
                fechaRegistro: "2022-11-30",
                fechaEntrega: "2022-11-30",
                valorTotal: acomulado
            }
            printJson.push(elemento);
        })

        printJson.forEach(e => {
            const numerovacomulado = e.valorTotal;
            const valorTotal = (number) => {
                const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                const rep = '$1,';
                return number.toString().replace(exp, rep);
            }
            listHTML += `
                <tr>
                <td>${e.idFactura}</td>
                <td>${valorTotal(numerovacomulado)}</td>
                </tr>
            `;
            fetch('http://localhost:8080/factura/' + e.idFactura, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    res.valorTotal = e.valorTotal;
                    functionUpdate(res)
                })
        })

        const functionUpdate = (object) => {
            fetch('http://localhost:8080/factura/update', {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(response => {
                    console.log('Test')
                    console.log(response)
                }).catch(error => console.log(error))
        }
        total.innerHTML = listHTML;
    }
}

// FETCH PARA HACER DATALIST DE DESCRIPCIÓN
fetch('http://localhost:8080/categoria')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("descripcion");
        data.forEach(element => {
            var option = document.createElement("option");
            var ansText = document.createTextNode(element.nombreCategoria);
            option.appendChild(ansText);
            option.value = element.nombreCategoria;
            select.appendChild(option);
        });
    });

// FETCH PARA HACER DATALIST DE IDFACTURA
fetch('http://localhost:8080/factura')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("factura");
        data.forEach(element => {
            var option = document.createElement("option");
            var facturaText = document.createTextNode(element.idFactura);
            option.appendChild(facturaText);
            option.value = element.idFactura;
            select.appendChild(option);
        });
    });

// 
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

// DECIMALES PARA VALOR NOTA CREDITO

const decimalConvert = (e) => {
    var entrada = e.target.value.split('.').join('');
    entrada = entrada.split('').reverse();

    var salida = [];
    var aux = '';

    var paginador = Math.ceil(entrada.length / 3);

    for (let i = 0; i < paginador; i++) {
        for (let j = 0; j < 3; j++) {
            if (entrada[j + (i * 3)] != undefined) {
                aux += entrada[j + (i * 3)];
            }
        }
        salida.push(aux);
        aux = '';

        e.target.value = salida.join('.').split("").reverse().join('');
    }
}

// DECIMALES PARA PORCENTAJE
function comaPorcentaje(e) {

    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key);
    numeros = "0123456789.";
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


