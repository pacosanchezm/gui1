import React from "react";
import axios from "axios";
import moment from "moment";

import styled from "styled-components";
import { Heading, Button, Text } from "rebass";
import { Flex, Box } from "@rebass/grid";
import "@babel/polyfill";

//---------------------------------------------------------------

const Container = props => (
  <Box
    {...props}
    mx="auto"
    css={{
      maxWidth: "987px"
    }}
  />
);

const Input = styled.input`
  font-size: 1em;
  text-align: left;
`;

//--------------------------------------------------------------

export default class Usuario extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      botonguardar: "Grey",
      botonmandar: "Grey",

      Migrar: true,

      Mandar: true,

      obv: "",
      status: [{ value: "", label: "" }],

      statusi: "",

      seguimiento: "",

      segundos: 2,
      limite: 30,
      idmandar: 1
    };

    // this.Pull = this.Pullmails.bind(this)
  } // ------------------------- Constructor

  Pullmails = async (campana, limit) => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `

              query mails ($campana: Int, $Limit: Int)
              {
                mails(campana: $campana, Limit: $Limit) {
                  MensajeId
                  MailDestino
                  Status
                  Nombre
                  Genero
                }
              }

            `,

          variables: {
            campana: campana,
            Limit: limit
          }
        }
      });

      return axdata.data.data.mails;
    } catch (e) {
      console.error(e);
    }
  };

  Generalista = (Campana, Limit, Segundos, Puller) => {
    try {
      const delay = seconds =>
        new Promise(resolve => setTimeout(resolve, seconds * 1000));

      return {
        [Symbol.asyncIterator]: async function*() {
          while (true) {
            let pageData = await Puller(Campana, Limit);

            for (const registro of pageData) {
              await delay(Segundos);
              yield registro;
            }
          }
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  Mapa = pasos =>
    async function*(Lista) {
      for await (const registro of Lista) {
        yield pasos(registro);
      }
    };

  Recorrer = async Iterador => {
    for await (const registro of Iterador) {
      console.log("value = " + JSON.stringify(registro));
      // this.mandarmail2(value)
    }
  };

  Iterar = () => {
    console.log("mandando...");
    let Segundos = this.state.segundos;
    let Limite = this.state.limite;

    let Lista = this.Generalista(1, Limite, Segundos, this.Pullmails);

    let Ruta = this.Mapa(paso => ({
      Id: paso.MensajeId,
      Destino: paso.MailDestino,
      Nombre: paso.Nombre,
      Genero: paso.Genero,
      Status: paso.Status
    }));

    let Iterador = Ruta(Lista);

    this.Recorrer(Iterador);
  };

  render() {
    return (
      <div>
        <Container>
          <Box bg="White">
            <Button bg="green" onClick={() => this.Iterar()}>
              Iterador1
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}
