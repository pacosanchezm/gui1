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
                css={{ backgroundColor: props.Theme.backgroundcolor }}
              >
                <cssfibo.Box1
                  css={{
                    width: 89,
                    backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                  }}
                >
                  <cssfibo.h1
                    text="Usuarioss"
                    size="18"
                    color="White"
                    weight="Bold"
                    style="Normal"
                  />
                </cssfibo.Box1>

                <cssfibo.Box1
                  css={{
                    width: 244,
                    backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                  }}
                >
                  <Dropbox
                    name="dropEstado"
                    value={props.this.state.DropStart}
                    options={props.this.state.Dropoptions}
                    onChange={props.this.logChange.bind(this)}
                  />
                </cssfibo.Box1>
              </cssfibo.MyFlex1>

              <cssfibo.MyFlexR1>
                <cssx.box3input css={{ width: "244px" }}>
                  <cssx.input3
                    css={{ width: "244px" }}
                    theme={theme3.forma}
                    name="Nombre"
                    value={props.this.state.Filtro1}
                    onChange={props.this.QueryChanged3.bind(props.this)}
                    key="N1"
                  />
                </cssx.box3input>

                <cssfibo.Boton1
                  class="noatiende"
                  color={"Blue"}
                  onClick={() => {
                    props.this.getdatos();
                  }}
                >
                  Buscar
                </cssfibo.Boton1>
              </cssfibo.MyFlexR1>

              <cssfibo.MyFlex1
                css={{ backgroundColor: props.Theme.backgroundcolor }}
              >
                <cssx.box3label css={{ width: "65px" }}>
                  <cssx.h3 />
                </cssx.box3label>

                <cssx.box3label css={{ width: "55px" }}>
                  <cssx.h3>Id</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{ width: "100px" }}>
                  <cssx.h3>Nombre</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{ width: "89px" }}>
                  <cssx.h3>Apellidos</cssx.h3>
                </cssx.box3label>
              </cssfibo.MyFlex1>
            </div>
          </ThemeProvider>
        </div>
      );
    };

    return Seccion1();
  } catch (e) {
    console.error(e);
  }
};

const Listado1 = props => {
  try {
    const Renglon1 = props => {
      let BgColor;
      if (props.RenglonColor === false) {
        BgColor = "White";
      }
      if (props.RenglonColor === true) {
        BgColor = "WhiteSmoke";
      }

      let miurl =
        "https://smxai.net/suspanel?feed=0&secc=3&opt=2&usr=" + props.Row.FbId;

      return (
        <ThemeProvider theme={props.Theme}>
          <div>
            <cssfibo.MyFlex1 css={{ backgroundColor: BgColor }}>
              <cssx.box3label css={{ width: "55px", paddingRight: 0 }}>
                <cssx.foto1
                  src={props.Row.Profile_pic}
                  css={{ width: "34px", paddingRight: 21 }}
                />
              </cssx.box3label>

              <cssx.box3label css={{ width: "34px", paddingRight: 21 }}>
                <cssx.h3>{props.Row.Id}</cssx.h3>
              </cssx.box3label>

              <cssx.box3label css={{ width: "89px" }}>
                <cssx.h3>{props.Row.Nombre}</cssx.h3>
              </cssx.box3label>

              <cssx.box3label css={{ width: "89px" }}>
                <cssx.h3>{props.Row.Apellidos}</cssx.h3>
              </cssx.box3label>

              <cssx.a4
                {...props}
                text={"ir"}
                url={miurl}
                target="_blank"
                width={34}
              />
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
          {(() => {
            Micolor = !Micolor;
          })()}
        </div>
      );
    });

    return <div>{MiMapa}</div>;
  } catch (e) {
    console.error(e);
  }
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

      Registros: [
        {
          Id: "",
          Status: "",
          Nombre: "",
          Apellidos: "",
          Profile_pic: "",
          Genero: "",
          Page: "",
          FbId: ""
        }
      ],

      DropStart: [{ value: 0, label: "Página" }],

      Dropoptions: [
        { value: 1559949734304354, label: "YosoyCDMX" },
        { value: 473465412680744, label: "YosoyLeón" },
        { value: 608866805951764, label: "YosoyMonterrey" },
        { value: 615428365299641, label: "YosoyGuadalajara" },
        { value: 326130311097631, label: "YosoyQueretaro" },
        { value: 179694742435753, label: "YosoyTijuana" }
      ],

      Filtro1: "Nombre"
    };
  } // ------------------------- Constructor

  componentWillMount = () => {
    try {
      this.getdatos();
    } catch (e) {
      console.error(e);
    }
  };

  logChange = async val => {
    try {
      await this.setState({ DropStart: val });
      //await (this.setState({ Pagina: 1 }))
      this.getdatos();
    } catch (e) {
      console.error(e);
    }
  };

  getdatos = async () => {
    try {
      this.setState({ loading: true });
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub",
        method: "post",
        data: {
          query: `
            query UsuariosPage($Query: Regusuarios) {
            UsuariosPage(Query: $Query){
              Id, Status, Nombre, Apellidos, Profile_pic, Genero, Page, FbId
            }
          }
          `,
          variables: {
            Query: {
              Page: this.state.DropStart.value,
              Nombre: this.state.Filtro1,
              Limit: 25
            }
          }
        }
      });

      let data = axdata.data.data.UsuariosPage;
      this.setState({ Registros: data });
      this.setState({ loading: false });
    } catch (e) {
      console.error(e);
    }
  };

  cerrar = () => {
    WebviewControls.close();
  };

  QueryChanged3(event) {
    this.setState({ Filtro1: event.target.value });
  }

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
