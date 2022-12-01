window.onload = function () {
  fetch("http://localhost:8080/factura")
    .then((response) => response.json())
    .then((data) => {
      const PRESUSPUESTOTOTAL = 8444800000;
      const tbody = document.getElementById("tbody");
      var valorTotal = 0;
      var valorGrafica = 0; 
      data.forEach((element) => {
        // {idFactura: 44444, fechaRegistro: '2022-09-09', fechaEntrega: '2022-08-09', valorTotal: 987000000}
        valorTotal += element.valorTotal;
        var porcentaje = (valorTotal / PRESUSPUESTOTOTAL) * 100 
        const date = new Date(element.fechaRegistro + "T10:20:30Z");
        const monthNames = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];

        console.log(monthNames[date.getMonth()]);

        var tr = document.createElement("tr");

        var td = document.createElement("td");
        td.setAttribute("style", "text-align: center;");
        var facturadoText = document.createTextNode(
          `Facturado a ${monthNames[date.getMonth()]}`
        );
        td.appendChild(facturadoText);
        tr.appendChild(td);

        var td = document.createElement("td");
        td.setAttribute("style", "text-align: center;");
        var valorTotalText = document.createTextNode(valorTotal);
        td.appendChild(valorTotalText);
        tr.appendChild(td);

        var td = document.createElement("td");
        td.setAttribute("style", "text-align: center;");
        var porcentajeText = document.createTextNode(porcentaje.toFixed(2));
        td.appendChild(porcentajeText);
        tr.appendChild(td);
        
        tbody.appendChild(tr);

      });

      const points = data.map((element) => {
        valorGrafica += element.valorTotal;
        const date = new Date(element.fechaRegistro + "T10:20:30Z");
        const obj = {x: date, y: valorGrafica}
        return obj
      })
      console.log(points)

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Facturación Intevo",
        },
        axisX: {
          title: "Nombre Entrega",
          valueFormatString: "DD MMM",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          title: "Valor Entrega",
          includeZero: true,
          crosshair: {
            enabled: true,
          },
        },
        toolTip: {
          shared: true,
        },
        legend: {
          cursor: "pointer",
          verticalAlign: "bottom",
          horizontalAlign: "left",
          dockInsidePlotArea: true,
          itemclick: toogleDataSeries,
        },
        data: [
          {
            type: "line",
            showInLegend: true,
            name: "Facturado",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#874bd7",
            dataPoints: points
          },
          {},
        ],
      });
      chart.render();

      function toogleDataSeries(e) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }
    });
}

