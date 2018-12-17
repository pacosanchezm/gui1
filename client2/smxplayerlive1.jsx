import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css3";

import axios from "axios";
import ReactPlayer from "react-player";

//-----------------------------------------------------

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",

      Resultado: [],

      ChartData1: {},

      ChartColores: [
        { Cat: "Enviar", Color: "Grey" },
        { Cat: "Enviado", Color: "Blue" },
        { Cat: "Entregado", Color: "darkgreen" },
        { Cat: "Descartado", Color: "darkRed" },
        { Cat: "Leido", Color: "GoldenRod" },
        { Cat: "Rechazado", Color: "Red" }
      ]
    };
  } // ------------------------- Constructor

  componentWillMount() {
    //  this.getdatoschart1();
  }

  onPlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  ref = player => {
    this.player = player;
  };

  async getdatoschart1(date) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query mailstatus($Campana: Int) {
            IndMailStatusX(Campana: $Campana) {
              Cat
              Cantidad
            }
          }
          `,

        variables: {
          Campana: 3
        }
      }
    });

    let resultado = axdatachart.data.data.IndMailStatusX;

    this.setState({ Resultado: resultado });

    let Labels = [];

    // this.setState({ ChartData1: ChartData3(resultado, this.state.ChartColores, Labels) })
  }

  render() {
    return (
      <div>
    koko
        <ReactPlayer
          ref={this.ref}
          className="react-player"
          url={"https://vimeo.com/" + "200565292"}
          // muted={this.state.muted}
          width="100%"
          height="100%"
        />
 
      </div>
    );
  }
}
