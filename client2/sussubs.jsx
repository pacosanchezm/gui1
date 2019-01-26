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

import Dropbox from "react-select";

// ------------------------------------------------------------


// ------------------------------------------------------------

let Micolor = true;

const Encabezado = props => {
  try {

    const Seccion1 = () => {
      return (
        <div>
          <ThemeProvider theme={props.Theme}>
            <div>
              <cssfibo.MyFlex1
                css={{ backgroundColor: props.Theme.backgroundcolor }}>

                <cssfibo.Box1
                  css={{
                    width: 144,
                    backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                  }}>

                  <cssfibo.h1
                    text="Subscripciones"
                    size="18"
                    color="White"
                    weight="Bold"
                    style="Normal"
                  />

                </cssfibo.Box1>


                <cssfibo.Box1
                  css={{
                    width: 333,
                    backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                  }}>

                  <cssfibo.h1
                    text={props.this.state.Datos[0].Nombre + ' ' + props.this.state.Datos[0].Apellidos}
                    size="14"
                    color="White"
                    weight="Normal"
                    style="Normal"
                  />

                </cssfibo.Box1>

              </cssfibo.MyFlex1>


              <cssfibo.MyFlex1
                css={{ backgroundColor: props.Theme.backgroundcolor }}>


                <cssfibo.Box1
                  css={{
                      width: 244,
                      backgroundColor: props.Theme.backgroundcolor,
                      height: 34
                    }}>

                  <Dropbox
                    name="dropEstado"
                    value={props.this.state.DropStart}
                    options={props.this.state.Dropoptions}
                    onChange={props.this.logChange.bind(this)}
                  />
                </cssfibo.Box1>


                <cssfibo.Boton1
                  class="noatiende"
                  color={"green"}
                  onClick={() => { props.this.SusC() }}>

                  Agregar

                </cssfibo.Boton1>


              </cssfibo.MyFlex1>



              <cssfibo.MyFlex1
                css={{ backgroundColor: props.Theme.backgroundcolor }}>

                <cssx.box3label css={{ width: "144px" }}>
                  <cssx.h3>Suscripcion</cssx.h3>
                </cssx.box3label>


                <cssx.box3label css={{ width: "55px" }}>
                  <cssx.h3>Status</cssx.h3>
                </cssx.box3label>


                <cssx.box3label css={{ width: "144px" }}>
                  <cssx.h3>Obv</cssx.h3>
                </cssx.box3label>


              </cssfibo.MyFlex1>

            </div>
          </ThemeProvider>
        </div>
      );
    };

    return Seccion1()

  } catch (e) { console.error(e) }
};



const Listado1 = props => {
  try {
    const Renglon1 = props => {
      let BgColor;
      if (props.RenglonColor === false) { BgColor = "White" }
      if (props.RenglonColor === true) { BgColor = "WhiteSmoke" }

      return (
        <ThemeProvider theme={props.Theme}>
          <div>
            <cssfibo.MyFlex1 css={{ backgroundColor: BgColor }}>


              <cssx.box3label css={{ width: "123px", paddingRight: 11 }}>
                <cssx.h3>{props.Row.FeedTitulo}</cssx.h3>
              </cssx.box3label>


              <cssx.box3label css={{ width: "55px" }}>
                <cssx.h3>{props.Row.Status}</cssx.h3>
              </cssx.box3label>


              <cssx.box3label css={{ width: "233px" }}>
                <cssx.h3>{props.Row.Obv}</cssx.h3>
              </cssx.box3label>



              <cssfibo.Boton1
                class="noatiende"
                color={"Red"}
                onClick={() => { props.this.SusD(props.Row.Id) }}>

                Borrar

              </cssfibo.Boton1>



            </cssfibo.MyFlex1>
          </div>
        </ThemeProvider>
      );
    };

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
          {(() => { Micolor = !Micolor })()}
        </div>
      );
    });

    return <div>{MiMapa}</div>;
  } catch (e) { console.error(e) }
};

const LoadingSpinner = () => (
  <div>
    <cssx.h3> Cargando...</cssx.h3>
  </div>
);

//--------------------------------------------------------------




// Component --------------------------------------------------------------

export default class Lista extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orden: "Id",

      loading: false,


      Datos: [
        {
          Nombre: "",
          Apellidos: "",
          Profile_pic: "",
          FbId: "",
          Page: "",
        }
      ],


      Registros: [
        {
          Id: "",
          Status: "",
          IdPage: "",
          FbId: "",
          IdFeed: "",
          FeedTitulo: "",
          Obv: "",
        }
      ],


      DropStart: [{ value: 0, label: "Feed" }],

      Dropoptions: []


    };
  } // ------------------------- Constructor

  componentWillMount = () => {
    try {
      this.getdatos()
      this.getregs()
      this.getopts()

    } catch (e) { console.error(e) }
  }



  logChange = async val => {
    try {
      this.setState({ DropStart: val });
    } catch (e) { console.error(e) }
  }


  getdatos = async () => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            query UsuarioFbId($Query: UsuarioFbId) {
              UsuarioFbId(Query: $Query){
		            FbId, Nombre, Apellidos, Profile_pic, Page
              }
            }
          `,
          variables: {
            Query: {
              FbId: this.props.usr,
            }
          }
        }
      })

      this.setState({ Datos: axdata.data.data.UsuarioFbId })

    } catch (e) { console.error(e) }
  }


  getregs = async () => {
    try {

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            query UsuarioSus($Query: QryUsuario) {
              UsuarioSus(Query: $Query){
                Id, FbId, IdPage, IdFeed, FeedTitulo, Status, Obv
              }
            }
          `,
          variables: {
            Query: {
              FbId: this.props.usr,
            }
          }
        }
      });

      this.setState({ Registros: axdata.data.data.UsuarioSus })

    } catch (e) { console.error(e) }
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

      this.setState({ Dropoptions: axdata.data.data.Feeds.map(v => {
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



  SusC = async () => {
    try {
      await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            mutation SusC($Reg: SuscripcionInput) {
              SusC(Reg: $Reg)
            }
          `,
          variables: {
            Reg: {
              IdPage: this.state.Datos[0].Page,
              IdFeed: this.state.DropStart.value,
              FbId: this.state.Datos[0].FbId,
            }
          }
        }
      });

      this.getregs()
    } catch (e) { console.error(e) }
  };



  SusD = async (Id) => {
    try {
      await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            mutation SusD($Reg: SuscripcionInput) {
              SusD(Reg: $Reg)
            }
          `,
          variables: {
            Reg: {
              Id: Id,
            }
          }
        }
      });

      this.getregs()
    } catch (e) { console.error(e) }
  };


  cerrar = () => {
    WebviewControls.close();
  };



  // Render ------------------------------------------------------------------------

  render() {
    const { Registros, loading } = this.state;

    return (
      <div>
        <cssfibo.MyFlex3 css={{ gridArea: "header" }}>

          <Encabezado Theme={theme3.encabezado} this={this}>
            {({ Seccion1 }) => <div>{Seccion1}</div>}
          </Encabezado>

        </cssfibo.MyFlex3>


        <cssfibo.MyFlex3 css={{ gridArea: "contenido" }}>

          <ThemeProvider theme={theme3.forma}>
            <div>
              {loading ? (
                <LoadingSpinner />
              ) : (
                  <Listado1
                    key={1}
                    Theme={theme3.encabezado}
                    Registros={Registros}
                    this={this}
                  />
                )}
            </div>
          </ThemeProvider>

        </cssfibo.MyFlex3>
      </div>
    );
  }


  // ---------------------------------------------------------------- Render
}
