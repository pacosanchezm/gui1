import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";
import ReactPlayer from "react-player";


import Dropbox from "react-select";


//------------------------------------------------------------------

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


  componentDidMount() {}

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
            Mensaje: Mensaje
          }
        }
      }
    });

  }


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


  //--------------------------------------------------------------------

  render() {
    return (
      <div>
        Mensajes a Suscripciones
        {/* */}


        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>

          <cssfibo.MyFlexR1>

            <cssfibo.Box1
              css={{
                width: 400,
                backgroundColor: 'slategrey',
                height: 55
              }}>

              <Dropbox
                name="dropEstado"
                value={this.state.DropPage}
                options={this.state.DropPageOpt}
                onChange={this.DropPageChange.bind(this)}
              />

            </cssfibo.Box1>

          </cssfibo.MyFlexR1>

        </cssfibo.MyFlex3>



        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>

          <cssfibo.MyFlexR1>

            <cssfibo.Box1
              css={{
                width: 400,
                backgroundColor: 'slategrey',
                height: 55
              }}
            >
              <Dropbox
                name="dropEstado"
                value={this.state.DropFeed}
                options={this.state.DropFeedOpt}
                onChange={this.DropFeedChange.bind(this)}
              />
            </cssfibo.Box1>

          </cssfibo.MyFlexR1>

        </cssfibo.MyFlex3>



        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3input css={{ width: "400px" }}>
                  <cssx.input3
                    css={{ width: "400px", height: 34 }}
                    theme={theme3.forma}
                    name="Nombre"
                    value={this.state.Mensaje}
                    onChange={this.QueryChanged.bind(this)}
                    key="N1"
                  />
                </cssx.box3input>


                <cssfibo.Boton1
                  class="noatiende"
                  color={"grey"}
                  onClick={() => {
                    this.sendmensaje(this.state.Mensaje);
                  }}
                >
                  Enviar
                </cssfibo.Boton1>
              </cssfibo.MyFlexR1>
            </div>
          </ThemeProvider>
        </cssfibo.MyFlex3>


        <br />
        <br />
        <br />
        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3input css={{ width: "400px" }}>
                  <cssx.input3
                    css={{ width: "400px", height: 34 }}
                    theme={theme3.forma}
                    name="Nombre"
                    value={this.state.Mensaje2}
                    onChange={this.QueryChanged2.bind(this)}
                    key="N1"
                  />
                </cssx.box3input>

                <cssfibo.Boton1
                  class="noatiende"
                  color={"grey"}
                  onClick={() => {
                    this.sendmensaje(this.state.Mensaje2);
                  }}
                >
                  Enviar
                </cssfibo.Boton1>

              </cssfibo.MyFlexR1>
            </div>
          </ThemeProvider>
        </cssfibo.MyFlex3>
        <br />
        <br />
        <br />
        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3input css={{ width: "400px" }}>
                  <cssx.input3
                    css={{ width: "400px", height: 34 }}
                    theme={theme3.forma}
                    name="Nombre"
                    value={this.state.Mensaje3}
                    onChange={this.QueryChanged3.bind(this)}
                    key="N1"
                  />
                </cssx.box3input>

                <cssfibo.Boton1
                  class="noatiende"
                  color={"grey"}
                  onClick={() => {
                    this.sendmensaje(this.state.Mensaje3);
                  }}
                >
                  Enviar
                </cssfibo.Boton1>
              </cssfibo.MyFlexR1>
            </div>
          </ThemeProvider>
        </cssfibo.MyFlex3>
      </div>
    );
  }
}
