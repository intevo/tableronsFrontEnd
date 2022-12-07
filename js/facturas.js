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
        </tr>
`;
    intItem.forEach(intItem => {
      const numerovalorTotal = intItem.valorTotal;
      const numerofacturaTotal = intItem.facturaTotal;
      const formatoMexico = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        return number.toString().replace(exp,rep);
    }
      listHTML += `
  <tr>
          <td align="center">${intItem.idFactura}</td>
          <td align="center">${intItem.fechaEntrega}</td>
          <td align="center">${intItem.fechaRegistro}</td>
          <td align="center">${formatoMexico(numerofacturaTotal)}</td>
          <td align="center">${intItem.descripcionServicios}</td>
          <td align="center">${intItem.observacionFactura}</td>
          <td align="center">${formatoMexico(numerovalorTotal)}</td>
  </tr>
  `
    })
    intList.innerHTML = listHTML;
  }
}