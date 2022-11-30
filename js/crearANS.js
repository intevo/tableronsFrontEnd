
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
                <th align="center">ANS</center></th>
                <th scope="col"><center>Porcentaje</center></th>
                <th scope="col"><center>Valor Factura</center></th>
                <th scope="col"><center>Valor Descuento</center></th>
                <th scope="col"><center>Valor Total</center></th>
                <th scope="col"><center>Factura</center></th>
              </tr>
              
        `;
        ansItem.forEach(ansItem => {
            listHTML += `
          <tr>
                <td align="center">${ansItem.idAns}</td>
                <td align="center">${ansItem.descripcion}</td>
                <td align="center">${ansItem.porcentaje}</td>
                <td align="center">${ansItem.valorFactura}</td>
                <td align="center">${ansItem.valorDescuento}</td>
                <td align="center">${ansItem.valorTotal}</td>
                <td align="center">${ansItem.factura}</td>
          </tr>
          `
        })
        ansList.innerHTML = listHTML;
    }
}

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
    const createInvoice = () => {
        const formData = new FormData(document.querySelector('#ansForm'));
        const ans = {
            descripcion: formData.get('descripcion'),
            porcentaje: formData.get('porcentaje'),
            valorFactura: formData.get('valorFactura'),
            valorDescuento: formData.get('valorDescuento'),
            valorTotal: formData.get('valorTotal'),
            factura: document.getElementById('factura').value,
        }

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(ans),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res = res.json())
            .then(response => {
                console.log(response)   
            }).catch(error => console.log(error))
    }

    createInvoice();

}

bodyDoc.onload = getValor();

function getValor() {


    const total = document.querySelector('#tbodyTotales');
    fetch('http://localhost:8080/ans')
    .then(res => res.json())
    .then(json => {
        renderResult(json)
    })

    const renderResult = (arrayData) =>{
        let facturas = [];
        let listHTML = "";
        let printJson = [];
        arrayData.forEach(e =>{
            if(!facturas.includes(e.factura)) facturas.push(e.factura)
        })

        facturas.forEach(e =>{
            let factura = e;            
            let acomulado = 0;
            arrayData.forEach(element => {
                console.log("Prueba" + element);
                if(element.factura == factura) acomulado = acomulado + parseInt(element.valorTotal)
            })
            

            let elemento = {
                // factura: factura.toString(),
                // acomulado: acomulado.toString()
                idFactura: factura,
                fechaRegistro:"2022-11-30",
                fechaEntrega: "2022-11-30",
                valorTotal: acomulado
            }
            printJson.push(elemento);
            debugger;
        })

        printJson.forEach(e =>{
            listHTML += `
                <tr>
                <td>${e.idFactura}</td>
                <td>${e.valorTotal}</td>
                </tr>
            `;
            fetch('http://localhost:8080/factura/update', {
                method: 'POST',
                body: JSON.stringify(e),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(response => {
                    console.log('Test')
                    console.log(response)
                }).catch(error => console.log(error))
            // fetch('http://localhost:8080/factura/'+e.factura, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then(res = res.json())
            // .then(res =>{
            //     console.log(res)
            // })
            
        })
        total.innerHTML = listHTML;
    }
}

fetch('http://localhost:8080/factura')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("factura");
        data.forEach(element => {
            var option = document.createElement("option");
            var facturaText = document.createTextNode(element.idFactura);
            option.appendChild(facturaText);
            option.value=element.idFactura;
            select.appendChild(option);
        });
    });

    
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

/*function Guardar() {
    const API_URL = 'http://localhost:8080/factura';
    let intRes = null;
    const getAllInvoice = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(json => {
                intRes = json;
                // console.log(json);
                renderResult(intRes);
            })
    }

    const renderResult = (intRes) => {
        let busqueda = parseInt(document.getElementById('factura').value);
        let existe = false;
        intRes.forEach(element => {
            if (element.idFactura == busqueda) existe = true, console.log(element.idFactura), console.log(busqueda)
        });
        if (existe) {
            alert("ERROR: Id de Factura ya esta registrado");
        }
    }
    getAllInvoice();
*/
