// FUNCION DE DATOS Y VALIDACIONES
function saveData() {
  const API_URL = 'http://localhost:8080/factura';

  if (idFactura.value.length <= 0) {
    alert("Debe poner un valor en el campo de factura");
    return;
  } if (facturaTotal.value.length <= 0) {
    alert("Debe poner un valor en el campo de Valor Facturado");
    return;
  }if (valorDescuento.value.length <= 0) {
    alert("Debe poner un valor en el campo de Valor Descuento");
    return;
   }if (valorTotalFacturado.value.length <= 0) {
    alert("Debe poner un valor en el campo de valor Total Facturado (Mensual)");
    return;
  } if (observacionFactura.value.length <= 0) {
    alert("Debe poner un valor en el campo de Observaciones");
    return;
  } if (contrato.value.length <= 0) {
      alert("Debe crear un contrato para poder generar una Factura");
      return;
  }
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
          let prorroga = 0;
          if(document.getElementById("prorroga") != null){
           prorroga = document.getElementById("prorroga");
          }

          const primero = document.getElementById('facturaTotal');
          let valorFactura = primero.value.replaceAll('.', '');
          let facturaTotalFinal = parseInt(valorFactura);
          const segundo = document.getElementById('valorDescuento');
          let valorDescuento = segundo.value.replaceAll('.', '');
          let valorDescuentoFinal = parseInt(valorDescuento);
          const tercero = document.getElementById('valorTotalFacturado');
          let valorNotacredito = tercero.value.replaceAll('.', '');
          let valorTotalFacturadoFinal = parseInt(valorNotacredito);

          const factura = {
            idFactura: formData.get('idFactura').trim(),
            fechaRegistro: formData.get('fechaRegistro'),
            fechaEntrega: formData.get('fechaEntrega'),
            facturaTotal: facturaTotalFinal,
            valorDescuento: valorDescuentoFinal,
            valorTotalFacturado: valorTotalFacturadoFinal,
            descripcionServicios: document.getElementById('descripcionServicios').value,
            observacionFactura: formData.get('observacionFactura').trim(),
            contrato: formData.get('contrato'),
            prorroga: prorroga.checked == true ? 1 : 0,
            valorToral: 0
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
// DECIMALES PARA VALOR NOTA CREDITO
formatMoney = (e) =>{
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
}
//------------------------------------------------------------------------------------//
//ELIMINAR PUNTOS PARA RELLENAR
  getFormatMoney = (target) =>{
    var entrada = target.value.split('.').join('');
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

        target.value = salida.join('.').split("").reverse().join('');
    }
  }
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
         <tr style="background-color: rgb(105,50,183) !important;">
          <th style="Color: white;" scope="col"><center>ID Factura</center></th>
          <th style="Color: white;" scope="col"><center>Fecha Entrega</center></th>
          <th style="Color: white;" scope="col"><center>Fecha Registro</center></th>
          <th style="Color: white;" scope="col"><center>Valor Facturado</center></th>
          <th style="Color: white;" scope="col"><center>Valor descuento</center></th>
          <th style="Color: white;" scope="col"><center>Descripcion de Servicios</center></th>
          <th style="Color: white;" scope="col"><center>Centro de Costos</center></th>
          <th style="Color: white;" scope="col"><center>Observaciones</center></th>
          <th style="Color: white;" scope="col"><center>Valor Total</center></th>
          <th style="Color: white;" scope="col"><center>Prorroga</center></th>
          <th style="Color: white;" scope="col" colspan="2"><center>Opciones</center></th>
        </tr>
`;
    intItem.forEach(intItem => {
      let stringProrroga = '';
          if (intItem.prorroga == 1) stringProrroga = `
                    <span class="badge bg-success">Activo</span>
                    `;
          else stringProrroga = '<span class="badge bg-danger">Inactivo</span>';
      
      const numerovalorTotal = intItem.valorTotal;
      const numerofacturaTotal = intItem.facturaTotal;
      const numerovalorDescuento = intItem.valorDescuento;
      // const numerovalorTotalFacturado = intItem.valorTotalFacturado;
      
      const formato = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        return number.toString().replace(exp, rep);
      }
      listHTML += `
      <tbody id="geeks">
        <tr facturaId = ${intItem.idFactura}>
                <td align="center">${intItem.idFactura}</td>
                <td align="center">${intItem.fechaEntrega}</td>
                <td align="center">${intItem.fechaRegistro}</td>
                <td align="center">${formato(numerofacturaTotal)}</td>
                <td align="center">${formato(numerovalorDescuento)}</td>
                <td align="center">${intItem.descripcionServicios}</td>
                <td align="center">${intItem.contrato}</td>
                <td align="center">${intItem.observacionFactura}</td>
                <td align="center">${formato(numerovalorTotal)}</td>
                <td align="center">${stringProrroga}</td>
                <td><button type="button" class="btn btn-info" id="btn-edit"><img src="https://cdn-icons-png.flaticon.com/512/126/126794.png" width="20px" heigth="20px"></button></td>
                <td><button type="button" class="btn btn-danger" id="btn-delete"><img src="https://cdn-icons-png.flaticon.com/512/3221/3221803.png" width="20px" heigth="20px"></button></td>
        </tr>
      </tbody>`
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
      document.getElementById('idFactura').disabled=true;

      $.ajax({
        url: 'http://localhost:8080/factura/' + id,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
          $('#idFactura').val(res.idFactura);
          $('#fechaEntrega').val(res.fechaEntrega);
          $('#fechaRegistro').val(res.fechaRegistro);
          $('#facturaTotal').val(res.facturaTotal);
          getFormatMoney(document.getElementById('facturaTotal'));
          $('#valorDescuento').val(res.valorDescuento);
          getFormatMoney(document.getElementById('valorDescuento'));
          $('#valorTotalFacturado').val(res.valorTotalFacturado);
          getFormatMoney(document.getElementById('valorTotalFacturado'));
          $('#descripcionServicios').val(res.descripcionServicios);
          $('#contrato').val(res.contrato);
          $('#observacionFactura').val(res.observacionFactura);
          let check = document.getElementById('prorroga')
          res.prorroga == 1 ? check.checked = true : check.checked = false
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

    let inputCheck = document.getElementById('prorroga')
    let check = inputCheck.checked == true ? 1 : 0;

    const primero = document.getElementById('facturaTotal');
    let valorFactura = primero.value.replaceAll('.', '');
    let facturaTotalFinal = parseInt(valorFactura);
    const segundo = document.getElementById('valorDescuento');
    let valorDescuento = segundo.value.replaceAll('.', '');
    let valorDescuentoFinal = parseInt(valorDescuento);
    const tercero = document.getElementById('valorTotalFacturado');
    let valorNotacredito = tercero.value.replaceAll('.', '');
    let valorTotalFacturadoFinal = parseInt(valorNotacredito);
          
    const factura = {

      idFactura: id,
      idFactura: $('#idFactura').val(),
      fechaEntrega: $('#fechaEntrega').val(),
      fechaRegistro: $('#fechaRegistro').val(),
      facturaTotal: facturaTotalFinal,
      valorDescuento: valorDescuentoFinal,
      valorTotalFacturado: valorTotalFacturadoFinal,
      descripcionServicios: $('#descripcionServicios').val(),
      contrato: $('#contrato').val(),
      observacionFactura: $('#observacionFactura').val(),
      prorroga: check,
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
        document.getElementById('idFactura').disabled=false;
        reset();
        getFactura();
      }
    })
    
  })

}

// const reset = () => {
//   $('#idFactura').val('');
//   $('#fechaRegistro').val('');
//   $('#fechaEntrega').val('');
//   $('#facturaTotal').val('');
//   $('#descripcionServicios').val('');
//   $('#observacionFactura').val('');
// }

//------------------------------------------------------------------------------------//
// BOTON ELIMINAR

const deletefactura = () => {
  $(document).on('click', '#btn-delete', function () {

    if (confirm('¿Seguro de Eliminar? / Se borraran los Ans utilizado en esta factura')) {
      let btnDelete = $(this)[0].parentElement.parentElement;
      let id = $(btnDelete).attr('facturaId');
      console.log(id);
      $.ajax({
        url: 'http://localhost:8080/factura/delete/' + id,
        type: 'GET',
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
//------------------------------------------------------------------------------------//
// FETCH PARA HACER DATALIST DE CONTRATO
fetch('http://localhost:8080/contrato')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById("contrato");
        data.forEach(element => {
            var option = document.createElement("option");
            var ansText = document.createTextNode(element.idContrato);
            option.appendChild(ansText);
            option.value = element.idContrato;
            select.appendChild(option);
        });
    });
//------------------------------------------------------------------------------------//
// RECUADROS DE DATOS PARA FILTRAR BUSQUEDA.
$(document).ready(function() {
  $("#gfgs").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#geeks tr").filter(function() {
        $(this).toggle($(this).text()
        .toLowerCase().indexOf(value) > -1)
      });
   });
});
 //------------------------------------------------------------------------------------//
 // VALIDADOR CHECK.
function validaCheckboxnotaCredito() {
  const checkboxnotaCredito = document.getElementById('prorroga');
  if (checkboxnotaCredito.checked == true)
    alert('Esta a punto de generar una Prorroga');
}
//------------------------------------------------------------------------------------//