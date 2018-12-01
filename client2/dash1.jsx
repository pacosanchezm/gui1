import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css3";

import axios from "axios";

import { Bar } from "react-chartjs-2";

import _ from "lodash";
import chain from "lodash/chain";
import find from "lodash/find";
import get from "lodash/get";
import map from "lodash/map";
import groupBy from "lodash/groupBy";

// -----------------------------------------


let ChartData3 = (MiArray, ChartColores, Labels) => {
  try {

    let MiLabel = (Categoria, Labels) => {
      let MiFiltro = Labels.filter((label) => label.value == Categoria)

      if (MiFiltro.length != 0) { return MiFiltro[0].label }
      else { return Categoria }

    }

    let MiColumnas1 = MiArray.map(row => {

    let MiColumna2 = MiLabel(row.Cat, Labels)

      return MiColumna2

    });


    let result = () => {

      let MiStatus = 'Status'

      let MiColor = (Categoria, Colores) => {
        let MiFiltro = Colores.filter((color) => color.Cat == Categoria)

        if (MiFiltro.length != 0) { return MiFiltro[0].Color }
        else { return '#808080	' }

      }

      return (
        [{
            stack: 0,
            label: MiStatus,

            data: MiArray.map(row => row.Cantidad),
            borderWidth: 1,
            backgroundColor: MiArray.map(row => MiColor(row.Cat, ChartColores)),
        }]
      )
        
    }

    return ({
      labels: MiColumnas1,
      datasets: result(),
    })

  } catch (e) { console.error(e) }
}
































let ChartBar1 = (props) => {

  return (

    <div>

      <Bar
        data={props.chartdata}
        redraw={props.redraw || false}

        options={{
          title: {
            display: true,
            text: `${props.title}`,
            fontsize: 21,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />

    </div>

  );
}























export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",

      Resultado: [],

      ChartData1: {},


      ChartColores: [
        { Cat: "Enviar", Color: "Grey" }, 
        { Cat: "Enviado", Color: "Blue" }, 
        { Cat: "Entregado", Color: "darkgreen" },
        { Cat: "Descartado", Color: "darkRed" },
        { Cat: "Leido", Color: "GoldenRod" },
        { Cat: "Rechazado", Color: "Red" },

      ]
    };
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatoschart1();
  }

  async getdatoschart1(date) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query mailstatus($Campana: Int) {
            IndMailStatusX(Campana: $Campana) {
              Cat
              Cantidad
            }
          }
          `,

        variables: {
          Campana: 3
        }
      }
    });

    let resultado = axdatachart.data.data.IndMailStatusX;

    this.setState({ Resultado: resultado });

    let Labels = [];

    this.setState({ ChartData1: ChartData3(resultado, this.state.ChartColores, Labels) })
  }

  render() {
    return <div>
    
      <ChartBar1
        title={'Campaña'}
        chartdata={this.state.ChartData1}
      />
    
    
    </div>;
  }
}
