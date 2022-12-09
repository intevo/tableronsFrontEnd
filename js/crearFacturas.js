function saveData() {
    const API_URL = 'http://localhost:8080/factura';

    if (idFactura.value.length <= 0) {
      alert("Debe poner un valor en el campo de factura");
      return;
    } else {
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

        let busqueda = parseInt(document.getElementById('idFactura').value);

        let existe = false;
        intRes.forEach(element => {
          if (element.idFactura == busqueda) existe = true, console.log(element.idFactura), console.log(busqueda)
        });

        if (existe) {
          window.alert("ERROR: Id de Factura ya esta registrado");
        } else {
          const createInvoice = () => {
            const formData = new FormData(document.querySelector('#invoiceData'));
            const factura = {
              idFactura: formData.get('idFactura').trim(),
              fechaRegistro: formData.get('fechaRegistro'),
              fechaEntrega: formData.get('fechaEntrega'),
              facturaTotal: formData.get('facturaTotal'),
              descripcionServicios: document.getElementById('descripcionServicios').value,
              observacionFactura: formData.get('observacionFactura').trim(),
              valorToral: 0,
            }

            fetch(API_URL, {
              method: 'POST',
              body: JSON.stringify(factura),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(res = res.json())
              .then(response => {
                console.log(response)
              }).catch(error => console.log(error))
          }
          alert("Factura Creada Exitosamente");
          location.reload();
          createInvoice();
        }
      }
      getAllInvoice();
    }
  }
  window.onload = function () {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10)
      dia = '0' + dia;
    if (mes < 10)
      mes = '0' + mes
    document.getElementById('fechaActual').value = ano + "-" + mes + "-" + dia;

    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();
    if (dia < 10)
      dia = '0' + dia;
    if (mes < 10)
      mes = '0' + mes
    document.getElementById('fechaEntrega').value = ano + "-" + mes + "-" + dia;
  }

  fetch('http://localhost:8080/otros')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("descripcionServicios");
        data.forEach(element => {
            var option = document.createElement("option");
            var descripcionServiciosText = document.createTextNode(element.descripServicios);
            option.appendChild(descripcionServiciosText);
            option.value=element.descripServicios;
            select.appendChild(option);
        });
    });

  //
    
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

  //

  var separador = document.getElementById('facturaTotal');

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
