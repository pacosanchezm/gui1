import React from "react";
import axios from "axios";

import * as css from "../css/css5";
import { ThemeProvider } from "styled-components";
import theme from "../css/themes";

import moment from "moment";
import Dropbox from "react-select";
import { Bar } from "react-chartjs-2";

//import styled from "styled-components";
//import { Heading, Button, Text } from "rebass";
//import { Flex, Box } from "@rebass/grid";
//import "@babel/polyfill";

//------------------------------------------------------------------

//var EsEvento = new EventSource("https://smxai.net/livecanales/eventomz", {
//  withCredentials: true
//});

const Encabezado = props => {
  try {
    return (
      <css.Box bg={props.bg || "SlateGrey"}>
        <css.Titulo color={props.color || "white"}>{props.texto}</css.Titulo>
      </css.Box>
    );
  } catch (e) {
    console.error(e);
  }
};

//------------------------------------------------------------------

let ChartDataGenera = MiArray => {
  try {
    let MiColumnas1 = MiArray.map(row => row.X);

    let MiColor = MiArray.map(row => {
      let color = "slategrey";

      switch (row.X) {
        case "Confirmado":
          color = "green";
          break;
        case "NoAsistira":
          color = "orange";
          break;
      }
      return color;
    });

    let MiDataSet = () => {
      let MiStatus = "Status";

      return [
        {
          stack: 0,
          label: MiStatus,
          data: MiArray.map(row => row.Cantidad),
          borderWidth: 1,
          backgroundColor: MiColor
        }
      ];
    };

    return {
      labels: MiColumnas1,
      datasets: MiDataSet()
    };
  } catch (e) {
    console.error(e);
  }
};

//----------------------------------------------------------

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
            text: props.title,
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

          events: ["click"],

          onClick: props.onClick2



        }}
        ref={props.onClick}
        getElementsAtEvent={(elems) => {
          console.log(elems);
        }}

      />
    </div>
  );
};

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      DropEventos: { value: 99, label: "Evento" },
      DropEventosOpt: [],
      Resultado: [{ Descripcion: "Leon", value: 1 }],
      ChartData: {},
      Cat: "",
      Input1: "",
      TextArea1: "",
      Switch1: false
    };
  } // ------------------------- Constructor

  componentWillMount = () => {
    this.getopts();
    this.getdatoschart(this.state.DropEventos.value);
  };

  componentDidMount = () => {
    // EsEvento.onmessage = e => {
    //   this.getdatoschart(this.state.DropEventos.value);
    // };
  };

  componentWillReceiveProps = someprop => {
    this.getdatoschart(this.state.DropEventos.value);
  };

  DropEventoChange = async val => {
    await this.setState({ DropEventos: val });
    this.getdatoschart(this.state.DropEventos.value);
  };

  getopts = async () => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query Eventosmz{
              Eventosmz{
                Eventosmz{Id, Titulo}
              }
            }
          `
        }
      });

      this.setState({
        DropEventosOpt: axdata.data.data.Eventosmz.Eventosmz.map(v => {
          return {
            value: v.Id,
            label: v.Titulo
          };
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  getdatoschart = async Id => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query:
          `
          query EventosInd{
            Eventosmz{
              ResumenEventos(Id:` +
          Id +
          `){
                Cat
                X
                Cantidad
              }
            }
          }
      `
        // variables: {
        //   IdPregunta: IdPregunta
        // }
      }
    });

    let resultado = axdatachart.data.data.Eventosmz.ResumenEventos;
    this.setState({ Resultado: resultado });
    this.setState({ ChartData: ChartDataGenera(resultado) });
  };

  ChartFunction = e => {
    var myChart = e.chartInstance;

    console.log(e)

    myChart.canvas.onclick = function(event) {
      var firstPoint = myChart.getElementAtEvent(event)[0];
      if (firstPoint) {
        var label = myChart.data.labels[firstPoint._index];
        var value =
          myChart.data.datasets[firstPoint._datasetIndex].data[
            firstPoint._index
          ];
      }
      console.log(label + ": " + value);
     // this.setState({ Cat: label });
    };
  };




  ChartFunction2 = e => {
    

  console.log(e)


  };








  //--------------------------------------------------------------------

  render() {
    return (
      <div>
        <ThemeProvider theme={theme.theme5}>
          <css.Container>
            <Encabezado
              texto="Seguimiento de Invitaciones"
              bg="slategrey"
              color="white"
            />

            <css.Box bg="WhiteSmoke">
              <Dropbox
                name="DropPage"
                value={this.state.DropEventos}
                options={this.state.DropEventosOpt}
                onChange={this.DropEventoChange}
              />
            </css.Box>




            <css.Box bg="White">
              <ChartBar1
                title={"Seguimiento de Invitaciones"}
                chartdata={this.state.ChartData}
                onClick={this.ChartFunction}
                onClick2={this.ChartFunction2}

              />
            </css.Box>

            {/*


            <css.Box bg="White">
              <css.Text color="slategrey">
                Opcion1
                <css.Checkbox />
              </css.Text>
            </css.Box>

            <css.Divider border={2} borderColor={"lightgrey"} />

            <css.Box bg="White">
              <css.Label bg="transparent" p={2} width={6}>
                Test
                <css.Input
                  pr={2}
                  key="3"
                  value={this.state.Input1}
                  onChange={e => this.setState({ Input1: e.target.value })}
                />
              </css.Label>

              <css.Progress borderRadius={5} value={2 / 5} mb={4} />

              <css.Slider value={75} />
            </css.Box>

            <css.Box bg="White" p={3}>
              <css.Switch
                checked={this.state.Switch1}
                onClick={e => this.setState({ Switch1: !this.state.Switch1 })}
              />
            </css.Box>

            <css.Box bg="White" p={3}>
              <css.Textarea
                rows={3}
                disabled={false}
                value={this.state.TextArea1}
                onChange={e => this.setState({ TextArea1: e.target.value })}
              />
            </css.Box>

            <css.Button variant="primary" />
            <css.Button variant="outline" />

        */}


          </css.Container>
        </ThemeProvider>
      </div>
    );
  }
}
