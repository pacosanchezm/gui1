import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";
import ReactPlayer from "react-player";

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

      Resultado: [],

    };
  } // ------------------------- Constructor

  componentDidMount() {

  }

  QueryChanged(event) {
    this.setState({ Mensaje: event.target.value });
  }

  componentWillMount() {
    //  this.getdatoschart1();
  }



  async sendmensaje(Mensaje) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation FeedMensaje($FeedId: Int, $Mensaje: String) {
            FeedMensaje(FeedId: $FeedId, Mensaje: $Mensaje)
          }
          `,

        variables: {

          FeedId: 1,
          Mensaje: Mensaje,

        }
      }
    });

    //let resultado = axdatachart.data.data.LiveMensajeC;

  }



  //--------------------------------------------------------------------

  render() {
    return (
      <div>
        Mensajes a Suscripciones

        {/* */}

        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3input css={{ width: "377px" }}>
                  <cssx.input3
                    css={{ width: "377px" }}
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


      </div>
    );
  }
}
