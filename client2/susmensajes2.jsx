import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";

// import glamorous, { ThemeProvider } from "glamorous";
// import { css } from "glamor";
// import { theme1, theme3 } from "../css/themes";
// import * as cssx from "../css/css2";
// import * as cssfibo from "../css/fibo1";

import styled from 'styled-components';
import { Heading, Button, Text } from 'rebass'
import { Flex, Box } from '@rebass/grid'
import "@babel/polyfill";

import Checkbox from "../css/Checkbox";




import axios from "axios";

import Dropbox from "react-select";


//------------------------------------------------------------------


const Container = props =>
  <Box
    {...props}
    mx='auto'
    css={{
      maxWidth: '987px'
    }}
  />


const Input = styled.input`
  font-size: 1em;
  text-align: left;

`;



//------------------------------------------------------------------



var EsFeedMensaje = new EventSource("https://smxai.net/livecanales/feedmensaje", { withCredentials: true });



export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",
      Mood: 0,

      Autor: "Nelli",
      Origen: "Celaya",

      Mensaje: "",
      Mensaje2: "",
      Mensaje3: "",

      Limit: 47,

      Segundos: 1,

      botonEnviar: "green",

      Resultado: [],

      DropPage: [{ value: 0, label: "Página" }],

      DropPageOpt: [
        { value: 1559949734304354, label: "YosoyCDMX" },
        { value: 473465412680744, label: "YosoyLeón" },
        { value: 608866805951764, label: "YosoyMonterrey" },
        { value: 615428365299641, label: "YosoyGuadalajara" },
        { value: 326130311097631, label: "YosoyQueretaro" },
        { value: 179694742435753, label: "YosoyTijuana" },
        { value: 1670865973219070, label: "Nelli" },
      ],

      DropFeed: [{ value: 0, label: "Feed" }],

      DropFeedOpt: [],






    };
  } // ------------------------- Constructor

  componentWillMount() {
    this.getopts()
  }


  componentDidMount() {


    EsFeedMensaje.onmessage = e => {

      console.log(JSON.parse(e.data));
      this.setState({ botonEnviar: 'green' });

    }




  }

  QueryChanged(event) {
    this.setState({ Mensaje: event.target.value });
  }

  QueryChanged2(event) {
    this.setState({ Mensaje2: event.target.value });
  }

  QueryChanged3(event) {
    this.setState({ Mensaje3: event.target.value });
  }


  DropPageChange = async val => {
    try {
      await this.setState({ DropPage: val });
    } catch (e) { console.error(e) }
  };


  DropFeedChange = async val => {
    await this.setState({ DropFeed: val });
  };





  getopts = async () => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            query Feeds {
              Feeds{Id, Titulo}
            }
          `,
        }
      });

      this.setState({
        DropFeedOpt: axdata.data.data.Feeds.map(v => {
          return (
            {
              value: v.Id,
              label: v.Titulo
            }
          )
        })
      })

    } catch (e) { console.error(e) }
  };







  async sendmensaje(Mensaje) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation FeedMensaje($Reg: FeedMensaje) {
            FeedMensaje(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            Tipo: 1,
            Page: this.state.DropPage.value,
            Persona: "",
            FeedId: this.state.DropFeed.value,
            Mensaje: Mensaje,
            Limit: 40,
            Offset: 0,
          }
        }
      }
    });
  }




  async sendmensaje2(Mensaje) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation FeedMensaje($Reg: FeedMensaje) {
            FeedMensaje(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            Tipo: 1,
            Page: this.state.DropPage.value,
            Persona: "",
            FeedId: this.state.DropFeed.value,
            Mensaje: Mensaje,
            Limit: 40,
            Offset: 40,
          }
        }
      }
    });
  }


  async sendmensaje3(Mensaje) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation FeedMensaje($Reg: FeedMensaje) {
            FeedMensaje(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            Tipo: 1,
            Page: this.state.DropPage.value,
            Persona: "",
            FeedId: this.state.DropFeed.value,
            Mensaje: Mensaje,
            Limit: 40,
            Offset: 80,
          }
        }
      }
    });
  }


  SendMensajeT = async (Mensaje) => {
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
            Reg: {
              Tipo: 1,
              Page: this.state.DropPage.value,
              FeedId: this.state.DropFeed.value,
              Mensaje: Mensaje,
              Limit: this.state.Limit,
              Segundos: this.state.Segundos,
            }
          }
        }
      });


      this.setState({ botonEnviar: 'orange' });


      return 1

    } catch (e) {
      console.error(e);
    }
  };




  //--------------------------------------------------------------------

  render() {
    return (
      <div>


        {/*


        */}




        <Container>


          <Box bg='SlateGrey'>

            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize={[4]}
              fontWeight='bold'
              color='White'
              p={20}
            >
              Mensajes a Suscriptores
            </Text>

          </Box>


          <Box bg='SlateGrey'>

            <Dropbox
              name="DropPag"
              value={this.state.DropPage}
              options={this.state.DropPageOpt}
              onChange={this.DropPageChange.bind(this)}
            />

          </Box>

          <Box bg='SlateGrey' css={{ height: 21 }}/>


          <Box bg='SlateGrey'>

            <Dropbox
              name="dropEstado"
              value={this.state.DropFeed}
              options={this.state.DropFeedOpt}
              onChange={this.DropFeedChange.bind(this)}
            />

          </Box>


          <Box bg='White' css={{ height: 55 }}/>


          <Box bg='White'>

            <Input
              css={{ width: "610px", height: 34 }}
              name="Mensaje"
              value={this.state.Mensaje}
              onChange={this.QueryChanged.bind(this)}
              key="N1"
            />

            <Button
              bg={this.state.botonEnviar}
              onClick={() => {this.SendMensajeT(this.state.Mensaje);}}
            >
              Enviar
            </Button>


          </Box>


          <Box bg='White' css={{ height: 55 }}/>


          <Box bg='White'>

            <Input
              css={{ width: "610px", height: 34 }}
              name="Mensaje2"
              value={this.state.Mensaje2}
              onChange={this.QueryChanged2.bind(this)}
              key="N1"
            />

            <Button
              bg={this.state.botonEnviar}
              onClick={() => {this.SendMensajeT(this.state.Mensaje2);}}
            >
              Enviar
            </Button>


          </Box>


          <Box bg='White' css={{ height: 55 }}/>


          <Box bg='White'>

            <Input
              css={{ width: "610px", height: 34 }}
              name="Mensaje3"
              value={this.state.Mensaje3}
              onChange={this.QueryChanged3.bind(this)}
              key="N1"
            />

            <Button
              bg={this.state.botonEnviar}
              onClick={() => {this.SendMensajeT(this.state.Mensaje3);}}
            >
              Enviar
            </Button>

          </Box>




        {/*

          <Text
            fontSize={[ 3, 4, 5 ]}
            fontWeight='bold'
            color='magenta'>


            Text


            <Checkbox defaultChecked />

          </Text>





        */}





        </Container>




      </div>
    );
  }
}
