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
              fechaRegistro: formData.get('fechaRegistro').trim(),
              fechaEntrega: formData.get('fechaEntrega').trim(),
              facturaTotal: formData.get('facturaTotal').trim(),
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

  fetch('http://localhost:8080/categoria')
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