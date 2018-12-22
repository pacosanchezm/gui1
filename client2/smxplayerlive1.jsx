import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";
import ReactPlayer from "react-player";

import openSocket from "socket.io-client";

//-----------------------------------------------------

// const socket = openSocket("//smxai.net");

var socket = openSocket({transports: ['polling'],
secure: true});


let Micolor = true;






let PreguntaActiva = [
  {
    Id: 2,
    Tipo: 2,
    Descripcion: "A qué hora prefieres ver a Juan?",
    Obv: "en otra sesión como esta",
    Icon: null,
    Opciones: []
  }
];



socket.on('pregunta', (data) => {
  console.log('pregunta recibidaa: ' + JSON.stringify(data))
  PreguntaActiva = data
});

const LoadingSpinner = () => (
  <div>
    <cssx.h3> No Hay Pregunta activa</cssx.h3>
  </div>
);










const Listado1 = (props) => {

  try {

    const { children } = props




    const MiEncabezado = (props) => {

      return (


        <ThemeProvider theme={props.Theme}>
          <div>


          Encabezado


          </div>
        </ThemeProvider>
      )


    }










    const Renglon1 = (props) => {

      let BgColor
      if (props.RenglonColor === false) { BgColor = 'White' }
      if (props.RenglonColor === true) { BgColor = 'WhiteSmoke' }

      return (

        <ThemeProvider theme={props.Theme}>
          <div>

            <cssfibo.MyFlex1 css={{ backgroundColor: BgColor }}>

              <cssx.box3label css={{ width: '110px' }}>
                <cssx.h3 css={{ fontSize: 8 }}>{props.Row.Orden}</cssx.h3>
              </cssx.box3label>


              <cssx.box3label css={{ width: '144px' }}>
                <cssx.h3>{props.Row.Descripcion}</cssx.h3>
              </cssx.box3label>



            </cssfibo.MyFlex1>

          </div>
        </ThemeProvider>

      )

    }


    let MiMapa = props.Registros.Opciones.map((row) => {

      return (

        <div>

          <Renglon1
            RenglonColor={Micolor}
            Row={row}
            Theme={theme3.renglon}
          >

          </Renglon1>

          {(() => {

            Micolor = !Micolor;


          })()}

        </div>

      )
    })

    return (
      <div>
        {MiEncabezado}
        {MiMapa}
      </div>
    )



  } catch (e) {
    console.error(e);
  }
}



























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

      Pregunta: PreguntaActiva,


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
            FbId: 5589,
            Mood: mood,
            Weight: 1,
            Obv: "Gui"
          }
        }
      }
    });

    let resultado = axdatachart.data.data.MoodC;

    this.setState({ Mood: mood });
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
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(1);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            1
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(2);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            2
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(3);
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
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(4);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            4
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setmood(5);
            }}
            css={{
              fontSize: 9,
              color: "White",
              backgroundColor: "SlateGray"
            }}
          >
            5
          </cssfibo.Boton2>
        </cssfibo.Box>
        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
          <ThemeProvider theme={theme3.forma}>
            <div>
              <cssfibo.MyFlexR1>
                <cssx.box3input>
                  <cssx.input3
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


        <cssfibo.MyFlex3 css={{ gridArea: 'contenido' }}>

          <ThemeProvider theme={theme3.forma}>

            <div>
     
                <Listado1
                  Theme={theme3.encabezado}
                  Registros={this.state.Pregunta[0]}
              />
              
            </div>

          </ThemeProvider>

        </cssfibo.MyFlex3>






      </div>
    );
  }
}
