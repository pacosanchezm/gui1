/* ----------  External Libraries  ---------- */

import React from "react";
import WebviewControls from "../messenger-api-helpers/webview-controls";

import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from "../css/fibo1";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";

import axios from "axios";
import moment from "moment";

// ------------------------------------------------------------

// ------------------------------------------------------------

let Micolor = true

const Encabezado = props => {
  try {
    const { children } = props;

    const Seccion1 = () => {
      return (
        <div>
          <ThemeProvider theme={props.Theme}>
            <div>
              <cssfibo.MyFlex1 css={{ backgroundColor: props.Theme.backgroundcolor }}>

                <cssfibo.Box1
                css={{
                    width: 377,
                    backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                  }}
              >
                  <cssfibo.h1
                  text="Mensajes"
                  size="18"
                  color="White"
                  weight="Bold"
                  style="Normal"
                />
                </cssfibo.Box1>

              </cssfibo.MyFlex1>


              <cssfibo.MyFlex1 css={{ backgroundColor: props.Theme.backgroundcolor }}>

                <cssx.box3label css={{ width: "89px" }}>
                  <cssx.h3>Nombre</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{ width: "123px" }}>
                  <cssx.h3>Origen</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{ width: "233px" }}>
                  <cssx.h3>Mensaje</cssx.h3>
                </cssx.box3label>

              </cssfibo.MyFlex1>
            </div>
          </ThemeProvider>
        </div>
      )
    }

    return children({Seccion1: Seccion1()})

  } catch (e) {console.error(e)}
}


const Listado1 = props => {
  try {
    const Renglon1 = props => {
      let BgColor;
      if (props.RenglonColor === false) {BgColor = "White"}
      if (props.RenglonColor === true) {BgColor = "WhiteSmoke"}

      if (props.Row.Status === "Live") { BgColor = "#ffd6d6" }
      if (props.Row.Status === "Listo") { BgColor = "#c6ecd6" }

      return (
        <ThemeProvider theme={props.Theme}>
          <div>
            <cssfibo.MyFlex1 css={{ backgroundColor: BgColor }}>

              <cssx.box3label css={{ width: "89px" }}>
                <cssx.h3>{props.Row.Nombre}</cssx.h3>
              </cssx.box3label>

              <cssx.box3label css={{ width: "89px" }}>
                <cssx.h3>{props.Row.Origen}</cssx.h3>
              </cssx.box3label>

              <cssx.box3label css={{ width: "233px", paddingRight: 21 }}>
                <cssx.h3>{props.Row.Mensaje}</cssx.h3>
              </cssx.box3label>



              <cssfibo.Boton1
              class="noatiende"
              color={"Red"}
              onClick={() => {
                props.this.StatusU(props.Row.Id, 'Live')
               }}
             >
                Live
              </cssfibo.Boton1>


              <cssfibo.Boton1
              class="noatiende"
              color={"SeaGreen"}
              onClick={() => {props.this.StatusU(props.Row.Id, 'Listo')}}
             >
                Listo
              </cssfibo.Boton1>


              <cssfibo.Boton1
              class="noatiende"
              color={"SlateGrey"}
              onClick={() => {
                props.this.StatusU(props.Row.Id, 'Oculto')
               }}
             >
                Ocultar
              </cssfibo.Boton1>


            </cssfibo.MyFlex1>
          </div>
        </ThemeProvider>
      )
    }

    let MiMapa = props.Registros.map(row => {
      return (
        <div>
          <Renglon1
            key={row.Id}
            RenglonColor={Micolor}
            Row={row}
            Theme={theme3.renglon}
            this={props.this}
          />
          {(() => {Micolor = !Micolor})()}
        </div>
      )
    })

    return <div>{MiMapa}</div>

  } catch (e) {console.error(e)}
}


const LoadingSpinner = () => (
  <div>
    <cssx.h3> Cargando...</cssx.h3>
  </div>
)


//--------------------------------------------------------------

// Component --------------------------------------------------------------

export default class Lista extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      orden: "Id",

      loading: false,

      Registros: [
        {
          Id: "",
          Status: "",
          Mensaje: "",
          Nombre: "",
          Origen: "",
          Genero: "",
          Edad: ""
        }
      ]
    }
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatos()
  }

  getdatos = async () => {
    try {
    //  this.setState({ loading: true });
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            query LiveMensajes($Query: LiveMensajeInput) {
              LiveMensajes(Query: $Query) {
                Id, Status, Mensaje, Nombre, Origen, Genero, Edad
              }
            }
          `,
          variables: {
            Query: {
         //     Status: "Live"
            }
          }
        }
      })

      let data = axdata.data.data.LiveMensajes
      this.setState({ Registros: data })
      this.setState({ loading: false })

    } catch (e) {console.error(e)}
  }


  StatusU = async (Id, Status) => {
    try {
      await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            mutation LiveMensajeU($Reg: LiveMensajeInput) {
              LiveMensajeU(Reg: $Reg)
            }
          `,
          variables: {
            Reg: {
              Id: Id,
              Status: Status
            }
          }
        }
      })

      this.getdatos()

    } catch (e) {console.error(e)}
  }


  cerrar = () => {
    WebviewControls.close()
  }

  // Render ------------------------------------------------------------------------

    render() {
      const { Registros, loading } = this.state

      return (
        <div>
          <cssfibo.MyFlex3 css={{ gridArea: "header" }}>
            <Encabezado Theme={theme3.encabezado} this={this}>
              {({Seccion1}) => (<div>{Seccion1}</div>)}
            </Encabezado>
          </cssfibo.MyFlex3>

          <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>
            <ThemeProvider theme={theme3.forma}>
              <div>
                {loading ? (<LoadingSpinner />) :
                (<Listado1
                  Key={1}
                  Theme={theme3.encabezado}
                  Registros={Registros}
                  this={this}
                />)}
              </div>
            </ThemeProvider>
          </cssfibo.MyFlex3>
        </div>
      )
    }

  // ---------------------------------------------------------------- Render
}
