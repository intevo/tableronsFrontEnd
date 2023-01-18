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
        <th style="Color: white;" scope="col"><center>Valor Total Facturado (Mensual)</center></th>
        <th style="Color: white;" scope="col"><center>Descripcion de Servicios</center></th>
        <th style="Color: white;" scope="col"><center>Centro de Costos</center></th>
        <th style="Color: white;" scope="col"><center>Observaciones</center></th>
        <th style="Color: white;" scope="col"><center>Valor Total</center></th>
        <th style="Color: white;" scope="col"><center>Prorroga</center></th>
      </tr>`;
    let acumulador = 0;
    let facturado = 0;
    intItem.forEach(intItem => {
      console.log(intItem)
      const numerovalorTotal = intItem.valorTotal;
      let numerofacturaTotal = intItem.facturaTotal;
      let numerovalorDescuento = intItem.valorDescuento;
      let numerovalorTotalFacturado = intItem.valorTotalFacturado;

      let stringProrroga = '';
      if (intItem.prorroga == 1) stringProrroga = `
                    <span class="badge bg-success">Activo</span>
                    `;
      else stringProrroga = '<span class="badge bg-danger">Inactivo</span>';

      acumulador = acumulador + parseInt(intItem.valorTotal)
      // let valorFactura = numerofacturaTotal.replaceAll('.', '');    
      // facturado = facturado + parseInt(valorFactura)


      listHTML += `
        <tr>      
          <td align="center">${intItem.idFactura}</td>
          <td align="center">${intItem.fechaEntrega}</td>
          <td align="center">${intItem.fechaRegistro}</td>
          <td align="center">${formato(numerofacturaTotal)}</td>
          <td align="center">${formato(numerovalorDescuento)}</td>
          <td align="center">${formato(numerovalorTotalFacturado)}</td>
          <td align="center">${intItem.descripcionServicios}</td>
          <td align="center">${intItem.contrato}</td>
          <td align="center">${intItem.observacionFactura}</td>
          <td align="center">${formato(numerovalorTotal)}</td>
          <td align="center">${stringProrroga}</td>
        </tr>`;
    })
    document.getElementById("valorFacturado").innerHTML = "FACTURADO: " + formato(facturado);
    intList.innerHTML = listHTML;
    document.getElementById("valorAcumulado").innerHTML = "ACUMULADO: " + formato(acumulador);
    intList.innerHTML = listHTML;
  }
}

const formato = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  return number.toString().replace(exp, rep);
}
