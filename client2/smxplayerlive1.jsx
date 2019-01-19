import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";
import ReactPlayer from "react-player";

//-----------------------------------------------------

//let EsPregunta;

var EsPregunta = new EventSource( "https://smxai.net/livecanales/pregunta", { withCredentials: true } );


let Micolor = true;

const LoadingSpinner = () => (
  <div>
    <cssx.h3> No Hay Pregunta activa</cssx.h3>
  </div>
);

const Listado1 = props => {
  try {
    const { children } = props;

    const MiTitulo = (
      <div>
        <cssx.h3>{props.Registros.Descripcion}</cssx.h3>
      </div>
    );

    const Renglon1 = props => {
      let BgColor;
      if (props.RenglonColor === false) {
        BgColor = "White";
      }
      if (props.RenglonColor === true) {
        BgColor = "WhiteSmoke";
      }

      return (
        <ThemeProvider theme={props.Theme}>
          <div>
            <cssfibo.Boton1
              css={{ width: "144px" }}
              class="noatiende"
              color={props.Row.Color}
              onClick={() => {
                console.log("click" + props.Row.Id);
                props.This.RespuestaC(
                  props.FbId,
                  props.Row.IdPregunta,
                  props.Row.Id
                );
              }}
            >
              {props.Row.Descripcion}
            </cssfibo.Boton1>
          </div>
        </ThemeProvider>
      );
    };

    let MiMapa = props.Registros.Opciones.map(row => {
      return (
        <div>
          <Renglon1
            RenglonColor={Micolor}
            Row={row}
            Theme={theme3.renglon}
            This={props.This}
            FbId={props.FbId}
          />

          {(() => {
            Micolor = !Micolor;
          })()}
        </div>
      );
    });

    return (
      <div>
        {MiTitulo}
        {MiMapa}
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",
      Mood: 0,

      Nombre: "Paquito",
      Origen: "Celaya",
      Genero: "Hombre",
      Edad: 42,
      Weight: 2,
      Mensaje: "",

      Resultado: [],

      Pregunta: [{ Descripcion: "No Hay Pregunta Activa", Opciones: [] }],

      Estrellas: {
        e1: "SlateGrey",
        e2: "SlateGrey",
        e3: "SlateGrey",
        e4: "SlateGrey",
        e5: "SlateGrey"
      },

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

  componentDidMount() {
    EsPregunta.onmessage = e => {
      console.log(JSON.parse(e.data));
      this.setState({ Pregunta: JSON.parse(e.data) });
   };
  }

  QueryChanged(event) {
    this.setState({ Mensaje: event.target.value });
  }

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

  async setmood(mood) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation MoodC($Reg: MoodInput) {
            MoodC(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            IdSesion: 1,
            FbId: this.props.usr,
            Mood: mood,
            Weight: 1,
            Obv: "Gui"
          }
        }
      }
    });

    let resultado = axdatachart.data.data.MoodC;

    let MiEstrella = {};

    if (mood >= 1) { MiEstrella.e1 = "Gold" } else { MiEstrella.e1 = "SlateGrey" }
    if (mood >= 2) { MiEstrella.e2 = "Gold" } else { MiEstrella.e2 = "SlateGrey" }
    if (mood >= 3) { MiEstrella.e3 = "Gold" } else { MiEstrella.e3 = "SlateGrey" }
    if (mood >= 4) { MiEstrella.e4 = "Gold" } else { MiEstrella.e4 = "SlateGrey" }
    if (mood >= 5) { MiEstrella.e5 = "Gold" } else { MiEstrella.e5 = "SlateGrey" }

    this.setState({ Estrellas: MiEstrella });
  }

  async sendmensaje(texto) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation LiveMensajeC($Reg: LiveMensajeInput) {
            LiveMensajeC(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            IdSesion: 1,
            FbId: 5589,
            Status: "Activo",
            Nombre: this.state.Nombre,
            Origen: this.state.Origen,
            Genero: this.state.Genero,
            Edad: this.state.Edad,
            Mensaje: texto,
            Weight: this.state.Weight,
            Obv: ""
          }
        }
      }
    });

    let resultado = axdatachart.data.data.LiveMensajeC;

    //this.setState({ Mood: mood });
  }

  RespuestaC = async (FbId, IdPregunta, RespuestaId) => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation RespuestaC($Reg: LiveRespuestaInput) {
          RespuestaC(Reg: $Reg)
          }
        `,

        variables: {
          Reg: {
            IdPregunta: IdPregunta,
            FbId: FbId,
            Respuesta: RespuestaId,
            Abierta: "",
            Obv: ""
          }
        }
      }
    });

    let resultado = axdatachart.data.data.RespuestaC;

    //this.setState({ Mood: mood });
  };

  //--------------------------------------------------------------------

  render() {
    return (
      <div>
        Juan Solo - Mis 301
        <ReactPlayer
          ref={this.ref}
          className="react-player"
          url={"https://vimeo.com/" + "200565292"}
          // muted={this.state.muted}
          width="100%"
          height="233px"
        />
        {/*

    */}
        <cssfibo.Box css={{ width: "233px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(1);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: this.state.Estrellas.e1,
              width: "34px",
              height: "34px",
              margin: "3px"
            }}
          >
            1
          </cssfibo.Boton2>

          <cssfibo.Boton2
            onClick={() => {
              this.setmood(2);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: this.state.Estrellas.e2,
              width: "34px",
              height: "34px",
              margin: "3px"
            }}
          >
            2
          </cssfibo.Boton2>

          <cssfibo.Boton2
            onClick={() => {
              this.setmood(3);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: this.state.Estrellas.e3,
              width: "34px",
              height: "34px",
              margin: "3px"
            }}
          >
            3
          </cssfibo.Boton2>

          <cssfibo.Boton2
            onClick={() => {
              this.setmood(4);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: this.state.Estrellas.e4,
              width: "34px",
              height: "34px",
              margin: "3px"
            }}
          >
            4
          </cssfibo.Boton2>

          <cssfibo.Boton2
            onClick={() => {
              this.setmood(5);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: this.state.Estrellas.e5,
              width: "34px",
              height: "34px",
              margin: "3px"
            }}
          >
            5
          </cssfibo.Boton2>
        </cssfibo.Box>
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
        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <Listado1
                Theme={theme3.encabezado}
                Registros={this.state.Pregunta[0]}
                FbId={this.props.page}
                This={this}
              />
            </div>
          </ThemeProvider>
        </cssfibo.MyFlex3>
      </div>
    );
  }
}
