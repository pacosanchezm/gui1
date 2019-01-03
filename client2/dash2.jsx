import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css3";

import axios from "axios";

import { Bar, Pie } from "react-chartjs-2";

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
      let MiFiltro = Labels.filter(label => label.value == Categoria);

      if (MiFiltro.length != 0) {
        return MiFiltro[0].label;
      } else {
        return Categoria;
      }
    };

    let MiColumnas1 = MiArray.map(row => {
      let MiColumna2 = MiLabel(row.Cat, Labels);

      return MiColumna2;
    });

    let result = () => {
      let MiStatus = "Status";

      let MiColor = (Categoria, Colores) => {
        let MiFiltro = Colores.filter(color => color.Cat == Categoria);

        if (MiFiltro.length != 0) {
          return MiFiltro[0].Color;
        } else {
          return "#808080	";
        }
      };

      return [
        {
          stack: 0,
          label: MiStatus,

          data: MiArray.map(row => row.Cantidad),
          borderWidth: 1,
          backgroundColor: MiArray.map(row => MiColor(row.Cat, ChartColores))
        }
      ];
    };

    return {
      labels: MiColumnas1,
      datasets: result()
    };
  } catch (e) {
    console.error(e);
  }
};

let ChartBar1 = props => {
  return (
    <div>
      <Bar
        data={props.chartdata}
        redraw={props.redraw || false}
        options={{
          legend: {
            display: false,
            labels: {
              fontColor: "rgb(255, 99, 132)"
            }
          },

          title: {
            display: true,
            text: `${props.title}`,
            fontsize: 21
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

let ChartPie1 = props => {
  return (
    <div>
      <Pie
        data={props.chartdata}
        redraw={props.redraw || false}
        options={{
          legend: { display: false },

          title: {
            display: true,
            text: `${props.title}`,
            fontsize: 21
          }
        }}
      />
    </div>
  );
};

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

        { Cat: "En la Noche", Color: "Blue" },

        { Cat: "En la Mañana", Color: "Gold" },
        { Cat: "En la tarde", Color: "Orange" }
      ]
    };
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatoschart2();
  }

  getdatoschart2 = async date => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
query LiveRespuestaX($IdPregunta: Int) {
  LiveRespuestaX(IdPregunta: $IdPregunta) {
    X
    Cat
    Cantidad
  }
}
          `,

        variables: {
          IdPregunta: 2
        }
      }
    });

    let resultado = axdatachart.data.data.LiveRespuestaX;

    this.setState({ Resultado: resultado });

    let Labels = [];

    this.setState({
      ChartData1: ChartData3(resultado, this.state.ChartColores, Labels)
    });
  };

  getdatoschart1 = async date => {
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

    this.setState({
      ChartData1: ChartData3(resultado, this.state.ChartColores, Labels)
    });
  };

  render() {
    return (
      <div>
        <ChartPie1 title={"Respuestas"} chartdata={this.state.ChartData1} />
      </div>
    );
  }
}
