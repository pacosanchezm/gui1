import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from "../css/fibo1";

import axios from "axios";

import openSocket from "socket.io-client";

//-------------------------------

const socket = openSocket("//smxai.net");

socket.on("pregunta", data => {
  console.log("pregunta recibida:" + JSON.stringify(data));
});

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

      Pregunta: [],

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
    //     EscuchaEncuesta(() => {
    //       socket.on('pregunta', (data) => {
    //         console.log('recibida:' + data)
    //       });
    //     });
  } // ------------------------- Constructor

  componentWillMount() {
    //  this.getdatoschart1();
  }

  async setpreguntasimple(Pregunta) {
    let MiPregunta = [
      {
        Id: 2,
        Tipo: 2,
        Descripcion: "A qué hora prefieres ver a Juan?",
        Obv: "en otra sesión como esta",
        Icon: null,
        Opciones: [
          {
            Id: 3,
            IdPregunta: 2,
            Orden: 1,
            Status: "Activo",
            Icon: null,
            Descripcion: "En la Mañana",
            Valor: 1,
            Obv: null
          },
          {
            Id: 4,
            IdPregunta: 2,
            Orden: 2,
            Status: "Activo",
            Icon: null,
            Descripcion: "En la tarde",
            Valor: 1,
            Obv: null
          },
          {
            Id: 5,
            IdPregunta: 2,
            Orden: 3,
            Status: "Activo",
            Icon: null,
            Descripcion: "En la Noche",
            Valor: 1,
            Obv: null
          }
        ]
      }
    ];

    socket.emit("pregunta", MiPregunta);
  }

  async setpregunta(Pregunta) {
    var axdata = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query LivePreguntaActiva($IdEncuesta: Int) {
  LivePreguntaActiva(IdEncuesta: $IdEncuesta) {
    Id
    Tipo
    Descripcion
    Obv
    Icon
    Opciones {
      Id
      IdPregunta
      Orden
      Status
      Icon
      Descripcion
      Valor
      Obv
    }
  }
}
          `,

        variables: {
          Reg: {
            IdPregunta: 2,
            FbId: 5589,
            Respuesta: 3,
            Abierta: "abierta",
            Obv: "see"
          }
        }
      }
    });

    let resultado = axdata.data.data.MoodC;

    this.setState({ Mood: mood });
  }

  render() {
    return (
      <div>
        Juan Solo - Mis 30
        {/*

    */}
        <cssfibo.Box css={{ width: "34px" }}>
          <cssfibo.Boton2
            onClick={() => {
              this.setpreguntasimple(1);
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
      </div>
    );
  }
}
