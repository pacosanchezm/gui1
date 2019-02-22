import React from "react";

import axios from "axios";

import moment from "moment";

import styled from "styled-components";
import { Heading, Button, Text } from "rebass";
import { Flex, Box } from "@rebass/grid";
import "@babel/polyfill";

import Dropbox from "react-select";

import { Bar } from "react-chartjs-2";

//------------------------------------------------------------------

var EsEvento = new EventSource("https://smxai.net/livecanales/eventomz", {
  withCredentials: true
});

const Container = props => (
  <Box
    {...props}
    mx="auto"
    css={{
      maxWidth: "987px"
    }}
  />
);

// const Encabezado = props => {
//   try {
//
//     const Seccion1 = () => {
//       return (
//         <div>
//
//         </div>
//       );
//     };
//
//     return Seccion1()
//
//   } catch (e) { console.error(e) }
// };
//

//------------------------------------------------------------------

let ChartData4 = MiArray => {
  try {
    let MiColumnas1 = MiArray.map(row => row.X);

    let result = () => {
      let MiStatus = "Status";

      return [
        {
          stack: 0,
          label: MiStatus,
          data: MiArray.map(row => row.Cantidad),
          borderWidth: 1,
          backgroundColor: MiArray.map(row => {
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
          })
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

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      DropEventos: { value: 99, label: "Evento" },
      DropEventosOpt: [],

      Resultado: [{ Descripcion: "Encuesta" }],
      ChartData: {}
    };
  } // ------------------------- Constructor

  componentWillMount = () => {
    //  this.getdata()
    this.getopts();
    this.getdatoschart(this.state.DropEventos.value);
  };

  componentDidMount = () => {
    EsEvento.onmessage = e => {
      this.getdatoschart(this.state.DropEventos.value);
    };
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
    this.setState({ ChartData: ChartData4(resultado) });
  };

  //--------------------------------------------------------------------

  render() {
    return (
      <div>
        {/*

      <Flex>
        <Box width={1/2} px={2}>
          Half width
        </Box>
        <Box width={1/2} px={2}>
          Half width
        </Box>
      </Flex>


*/}

        <Container>
          <Box bg="SlateGrey">
            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[4]}
              fontWeight="bold"
              color="White"
              p={20}
            >
              Seguimiento de Invitaciones
            </Text>
          </Box>

          <Box bg="WhiteSmoke">
            <Dropbox
              name="DropPage"
              value={this.state.DropEventos}
              options={this.state.DropEventosOpt}
              onChange={this.DropEventoChange.bind(this)}
            />
          </Box>

          <Box bg="White">
            <ChartBar1
              title={"Seguimiento de Invitaciones"}
              chartdata={this.state.ChartData}
            />
          </Box>
        </Container>
      </div>
    );
  }
}
