import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
//import * as cssx from "../css/css3";

import axios from "axios";

import { Bar, Pie, Line } from "react-chartjs-2";

// ---------------------------------------------------------------------

let ChartLine1 = props => {
  return (
    <div>
      <Line
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

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",
      Resultado2: [{ Descripcion: "Mood" }],
      ChartData2: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            stack: 0,
            label: "label",
            data: [3.2, 3.7, 4.3, 3.0, 2.5],
            borderWidth: 4,
            borderColor: "Gold",
            backgroundColor: null,
            fill: false
          }
        ]
      }
    };
  } // ------------------------- Constructor

  componentDidMount() {
    // this.getdatoschart3(this.props.IdPregunta);
    // this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getdatoschart3(this.props.IdPregunta);
  }

  componentWillReceiveProps(someprop) {
    this.getdatoschart3(someprop.IdPregunta);
  }

  getdatoschart3 = async IdPregunta => {
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
          IdPregunta: IdPregunta
        }
      }
    });

    let resultado2 = axdatachart.data.data.LivePreguntaId;
    this.setState({ Resultado2: resultado2 });
    this.setState({ ChartData2: ChartData4(resultado2[0].Opciones) });
  };

  render() {
    return (
      <div>
        <ChartLine1
          title={this.state.Resultado2[0].Descripcion}
          chartdata={this.state.ChartData2}
        />
      </div>
    );
  }
}
