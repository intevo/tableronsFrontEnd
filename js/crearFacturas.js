// FUNCION DE DATOS Y VALIDACIONES
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

//------------------------------------------------------------------------------------//
// LISTA DE DESCRIPCION DE SERVICIOS

fetch('http://localhost:8080/otros')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById("descripcionServicios");
    data.forEach(element => {
      var option = document.createElement("option");
      var descripcionServiciosText = document.createTextNode(element.descripServicios);
      option.appendChild(descripcionServiciosText);
      option.value = element.descripServicios;
      select.appendChild(option);
    });
  });

//------------------------------------------------------------------------------------//
// FUNCION QUE NOS PERMITE BLOQUEAR TECLAS ALFABETICAS

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

//------------------------------------------------------------------------------------//
//SEPARADOR DE MILES 

var separador = document.getElementById('facturaTotal');

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

//------------------------------------------------------------------------------------//
//IMPRIMIR DATOS
const bodyDoc = document.body;
bodyDoc.onload = getFactura();

function getFactura() {
  const API_URL = 'http://localhost:8080/factura';
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

  const intList = document.querySelector('#invoiceList');

  const renderResult = (intItem) => {
    let listHTML = `
         <tr>
          <th scope="col"><center>ID Factura</center></th>
          <th scope="col"><center>Fecha Entrega</center></th>
          <th scope="col"><center>Fecha Registro</center></th>
          <th scope="col"><center>Factura Total</center></th>
          <th scope="col"><center>Descripcion de Servicios</center></th>
          <th scope="col"><center>Observaciones</center></th>
          <th scope="col"><center>Valor Total</center></th>
          <th scope="col" colspan="2"><center>Opciones</center></th>
        </tr>
`;
    intItem.forEach(intItem => {
      const numerovalorTotal = intItem.valorTotal;
      //const numerofacturaTotal = intItem.facturaTotal;
      const formato = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        return number.toString().replace(exp,rep);
      }
      listHTML += `
  <tr facturaId = ${intItem.idFactura}>
          <td align="center">${intItem.idFactura}</td>
          <td align="center">${intItem.fechaEntrega}</td>
          <td align="center">${intItem.fechaRegistro}</td>
          <td align="center">${intItem.facturaTotal}</td>
          <td align="center">${intItem.descripcionServicios}</td>
          <td align="center">${intItem.observacionFactura}</td>
          <td align="center">${formato(numerovalorTotal)}</td>
          <td><button type="button" class="btn btn-info" id="btn-edit"><img src="https://cdn-icons-png.flaticon.com/512/126/126794.png" width="20px" heigth="20px"></button></td>
          <td><button type="button" class="btn btn-danger" id="btn-delete"><img src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png" width="20px" heigth="20px"></button></td>
  </tr>
  `
    })
    intList.innerHTML = listHTML;
  }
  var fecha = new Date();
  var mes = fecha.getMonth() + 1;
  var dia = fecha.getDate();
  var ano = fecha.getFullYear();
  if (dia < 10)
    dia = '0' + dia;
  if (mes < 10)
    mes = '0' + mes
  document.getElementById('fechaRegistro').value = ano + "-" + mes + "-" + dia;

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

//------------------------------------------------------------------------------------//
// RELLENAR DATOS DE FORMULARIO FACTURA

const rellenarfactura = () => {
  $(document).on('click', '#btn-edit', function () {
    if (confirm('¿Seguro de Editar?')) {
      let btnEdit = $(this)[0].parentElement.parentElement;
      let id = $(btnEdit).attr('facturaId');

      $('#crear').hide();
      $('#editar').show();

      $.ajax({
          url: 'http://localhost:8080/factura/' + id,
          type: 'GET',
          dataType: 'json',
          success: (res) => {
              $('#idFactura').val(res.idFactura);
              $('#fechaEntrega').val(res.fechaEntrega);
              $('#fechaRegistro').val(res.fechaRegistro);
              $('#facturaTotal').val(res.facturaTotal);
              $('#descripcionServicios').val(res.descripcionServicios);
              $('#observacionFactura').val(res.observacionFactura);
              // let check = document.getElementById('notaCredito')
              // res.notaCredito == 1 ? check.checked = true : check.checked = false
              // $('#valorNotacredito').val(res.valorNotacredito);
              //document.getElementById('numFactura').value = res.numFactura;
          }
      })
    }
  })
}

//------------------------------------------------------------------------------------//
// BOTON EDITAR

const editFactura = () => {

  $('#editar').on('click', function ($event) {
    
      let id = $('#idFactura').val();
      console.log("Pasando por aqui " + id)
      $('#crear').css('display', 'none');
      $('#editar').css('display', 'block');


      const factura = {

        idFactura: id,
        idFactura: $('#idFactura').val(),
        fechaEntrega: $('#fechaEntrega').val(),
        fechaRegistro: $('#fechaRegistro').val(),
        facturaTotal: $('#facturaTotal').val(),
        descripcionServicios: $('#descripcionServicios').val(),
        observacionFactura: $('#observacionFactura').val(),      
      }

      $.ajax({
          url: 'http://localhost:8080/factura/' + id,
          contentType: 'application/json',
          type: 'PUT',
          data: JSON.stringify(factura),
          dataType: 'json',
          success: (res) => {
              alert("Factura Editada");
              $('#editar').css('display', 'none');
              $('#crear').css('display', 'block');

              reset();
              getFactura();
          }

      })
  })

}

const reset = () => {
  $('#idFactura').val('');
  $('#fechaRegistro').val('');
  $('#fechaEntrega').val('');
  $('#facturaTotal').val('');
  $('#descripcionServicios').val('');
  $('#observacionFactura').val('');
}

//------------------------------------------------------------------------------------//
// BOTON ELIMINAR

const deletefactura = () => {
  $(document).on('click', '#btn-delete', function () {

      if (confirm('¿Seguro de Eliminar')) {
          let btnDelete = $(this)[0].parentElement.parentElement;
          let id = $(btnDelete).attr('facturaId');
          console.log(id);
          $.ajax({
              url: 'http://localhost:8080/factura/' + id,
              type: 'DELETE',
              dataType: 'json',
              success: (res) => {
                  $('#messages').html('Factura Eliminada').css('display', 'block');
              }

          })
          alert("Factura Eliminada");
          location.reload();
      }
  })
}

editFactura();
rellenarfactura();
deletefactura();
