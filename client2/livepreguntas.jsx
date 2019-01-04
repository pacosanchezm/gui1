import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";

import Dash2 from "./dash2";

//-------------------------------

const MiDash = props => (
  <div>
    <Dash2 IdPregunta={props.PreguntaActiva} />
  </div>
);

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",

      PreguntaActiva: 1
    };
  } // ------------------------- Constructor

  componentWillMount() {}

  setpregunta = async Pregunta => {
    var axdata = await axios({
      url: "https://smxai.net/liveplayer1/channel/sysInfo/p1?preg=" + Pregunta,
      method: "get"
    });

    let resultado = axdata.data;
    console.log("resultado: " + resultado);

    this.setState({ PreguntaActiva: Pregunta });
  };

  refresh() {}

  render() {
    return (
      <div>
        Juan Solo - Mis 30
        {/*

    */}
        <cssfibo.Box css={{ width: "233px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setpregunta(1);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            1.- Que estilo te gusta más?
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.Box css={{ width: "233px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setpregunta(2);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            2.- A qué hora prefieres ver a Juan?
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setpregunta(3);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            3
          </cssfibo.Boton2>
        </cssfibo.Box>
        <br />
        <br />
        <br />
        <br />
        <MiDash
          PreguntaActiva={this.state.PreguntaActiva}
          Refresh={this.refresh()}
        />
      </div>
    );
  }
}
