import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css3";

import axios from "axios";

import { Bar, Pie } from "react-chartjs-2";


// -----------------------------------------


let ChartData4 = (MiArray) => {
  try {

    let MiColumnas1 = MiArray.map(row => row.Descripcion);

    let result = () => {
      let MiStatus = "Status";

      return [
        {
          stack: 0,
          label: MiStatus,
          data: MiArray.map(row => row.Respuestas),
          borderWidth: 1,
          backgroundColor: MiArray.map(row => row.Color)
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
      Resultado2: [{Descripcion:"Encuesta"}],
      ChartData2: {},

    };
  } // ------------------------- Constructor


  componentWillMount() {
    this.getdatoschart3();
  }


  getdatoschart3 = async date => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
        query LivePreguntaId($IdPregunta: Int) {
          LivePreguntaId(IdPregunta: $IdPregunta) {
           Id
          Tipo
          Descripcion
          Obv
          Icon
          Opciones {
            Id
            IdPregunta
            Orden
            Status
            Icon
            Color
            Descripcion
            Valor
            Obv
            Respuestas
            }

          }
          }
      `,

        variables: {
          IdPregunta: 2
        }
      }
    });

    let resultado2 = axdatachart.data.data.LivePreguntaId;
    this.setState({ Resultado2: resultado2 });
    this.setState({ChartData2: ChartData4(resultado2[0].Opciones)});
  };

  render() {
    return (
      <div>
        <ChartPie1 title={this.state.Resultado2[0].Descripcion} chartdata={this.state.ChartData2} />
      </div>
    );
  }
}
