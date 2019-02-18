import React from "react";

import axios from "axios";

import moment from "moment";

import styled from "styled-components";

import { Heading, Button, Text } from "rebass";
import { Flex, Box } from "@rebass/grid";

import "@babel/polyfill";

//------------------------------------------------------------------

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

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Resultado: [
        {
          Titulo: "",
          Descripcion: "",
          Fecha: "",
          Lugar: "",
          Ciudad: "",
          Estado: "",
          Obv: ""
        }
      ]
    };
  } // ------------------------- Constructor

  componentWillMount = () => {
    this.getdata();
  };

  DropFeedChange = async val => {
    await this.setState({ DropFeed: val });
  };

  getdata = async () => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query Eventomz($Evento: Int){
              Eventosmz{
                Eventosmz(Id:$Evento){
            			Id, Titulo, Descripcion, Fecha, Lugar, Ciudad, Estado, Status, Obv, LocLat, LocLong
                }
              }
            }
          `,
          variables: {
            Evento: this.props.id
          }
        }
      });

      this.setState({ Resultado: axdata.data.data.Eventosmz.Eventosmz });
    } catch (e) {
      console.error(e);
    }
  };

  //--------------------------------------------------------------------

  render() {
    const MiFecha = moment(this.state.Resultado[0].Fecha).toString();

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
              Detalles del Evento
            </Text>
          </Box>

          <Box bg="WhiteSmoke">
            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[2]}
              fontWeight="bold"
              color="SlateGrey"
              p={15}
            >
              {this.state.Resultado[0].Titulo}
            </Text>

            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[1]}
              fontWeight="normal"
              color="SlateGrey"
              p={15}
            >
              {this.state.Resultado[0].Descripcion}
            </Text>

            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[1]}
              fontWeight="normal"
              color="SlateGrey"
              p={15}
            >
              {MiFecha}
            </Text>

            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[2]}
              fontWeight="Bold"
              color="SlateGrey"
              p={15}
            >
              {this.state.Resultado[0].Lugar}
            </Text>
          </Box>
        </Container>
      </div>
    );
  }
}
