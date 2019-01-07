import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
//import * as cssx from "../css/css3";

import axios from "axios";
import moment from "moment";

import { Line } from "react-chartjs-2";

// ---------------------------------------------------------------------

let ChartLine1 = props => {
  return (
    <div>
      <Line
        data={props.chartdata}
        redraw={true}
        options={{
          responsive: true,
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
          },
          animation: {
            duration: 0 // general animation time
          },

          hover: {
            mode: "nearest",
            intersect: true
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
        labels: [],
        datasets: [
          {
            stack: 0,
            label: "label",
            data: [],
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
    //  this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillMount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.getmoodA();
  }

  componentWillReceiveProps(someprop) {
    //this.getdatoschart3(someprop.IdPregunta);
  }

  getmoodA = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query MoodA1($TimeFrom: Float, $TimeTo: Float) {
            MoodA1(TimeFrom: $TimeFrom, TimeTo: $TimeTo) {
		          Average
              Count
            }
          }
      `,
        variables: {
          TimeFrom: 1546700400000,
          TimeTo: moment().format("x")
        }
      }
    });

    let resultado = axdatachart.data.data.MoodA1;
    console.log("moodA: " + JSON.stringify(resultado));

    this.moodAdd(resultado);
  };

  moodAdd = Reg => {
    let MiChartData = this.state.ChartData2;

    MiChartData.datasets[0].data.splice(
      MiChartData.datasets[0].data.length + 1,
      0,
      Reg[0].Average
    );
    MiChartData.labels.splice(
      MiChartData.labels.length + 1,
      0,
      moment().format("HH:mm:ss")
    );

    this.setState({ ChartData2: MiChartData });

    this.setState({ state: this.state });
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
