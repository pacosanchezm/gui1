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

var EsFeedMensaje = new EventSource(
  "https://smxai.net/livecanales/feedmensaje",
  { withCredentials: true }
);

//---------------------------------------------------------------

export default class Usuario extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      botonguardar: "Grey",
      botonmandar: "Grey",

      boton3: "Orange",

      Migrar: true,

      Mandar: true,

      obv: "",
      status: [{ value: "", label: "" }],

      statusi: "",

      seguimiento: "",

      segundos: 3,
      limite: 50,
      idmandar: 1
    };

    // this.Pull = this.Pullmails.bind(this)
  } // ------------------------- Constructor

  componentDidMount = () => {
    EsFeedMensaje.onmessage = e => {
      console.log(JSON.parse(e.data));
      this.setState({ boton3: "green" });
    };
  };

  delay = seconds =>
    new Promise(resolve => setTimeout(resolve, seconds * 1000));

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

  //-----------------------------------------------------------------------------------------------

  Pullsus = async (Feed, Page, Limit, Offset) => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query Suscriptions ($Query: SusPageInput){
              Suscriptions{
                Suscritos (Query: $Query) {
                  Id, FbId, Status, Bill, Obv, Nombre
                }
              }
            }
          `,
          variables: {
            Query: {
              Feed: Feed,
              Page: Page,
              Limit: Limit,
              Offset: Offset
            }
          }
        }
      });

      return axdata.data.data.Suscriptions.Suscritos;
    } catch (e) {
      console.error(e);
    }
  };

  Generalista2 = (Feed, Page, Limit, Puller) => {
    try {
      return {
        [Symbol.asyncIterator]: async function*() {
          let pageIndex = 0;
          while (true) {
            let pageData = await Puller(Feed, Page, Limit, pageIndex * Limit);

            yield pageData;

            pageIndex = pageIndex + 1;
          }
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  Mapa2 = () =>
    async function*(Lista) {
      for await (const registro of Lista) {
        yield registro;
      }
    };

  Recorrer2 = (Segundos, Limit) => async Iterador => {
    for await (const registro of Iterador) {
      console.log("value = " + JSON.stringify(registro));

      // this.mandarmail2(value)

      console.log("Registros: " + registro.length);
      if (registro.length < Limit) {
        break;
      }

      await this.delay(Segundos);
    }
  };

  Iterar2 = () => {
    console.log("mandando...");
    let Segundos = this.state.segundos;
    let Limite = this.state.limite;

    let Iterable = this.Generalista2(1, 473465412680744, Limite, this.Pullsus);

    let Iterador = this.Mapa2()(Iterable);

    this.Recorrer2(Segundos, Limite)(Iterador);
  };

  //-----------------------------------------------------------------------------------

  SendMensaje = async Reg => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            mutation FeedMensaje($Reg: FeedMensaje) {
              SuscriptionsM {FeedMensaje(Reg: $Reg)}
            }
          `,
          variables: {
            Reg: Reg
          }
        }
      });

      return axdata.data.data.SuscriptionsM.FeedMensaje;
    } catch (e) {
      console.error(e);
    }
  };

  Iterar3 = async () => {
    let Reg = {
      Tipo: 1,
      Page: 1670865973219070,
      FeedId: 3,
      Mensaje: "La Fiera juega este domingo Vs Pumas en C.U.",
      Limit: 40,
      Segundos: 2
    };

    let Enviado = await this.SendMensaje(Reg);

    if (Enviado === 1) {
      await this.setState({ boton3: "slategrey" });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Box bg="White" p={34}>
            <Button bg="green" onClick={() => this.Iterar()}>
              Iterador 1
            </Button>
          </Box>

          <Box bg="White" p={34}>
            <Button bg="blue" onClick={() => this.Iterar2()}>
              Iterador 2
            </Button>
          </Box>

          <Box bg="White" p={34}>
            <Button
              bg={this.state.boton3}
              onClick={() => this.Iterar3()}
              variant="outline"
            >
              Iterador 3
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}
