import React, { useState, useEffect, useContext, createContext } from "react";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

import { CSSTransition, SwitchTransition } from "react-transition-group";

// import "../src/styles.css";

import Dropbox from "react-select";
import DropboxCss from "../css/css5/select";

import Registros from "./pagos2regs";
import Detalle from "./pagos2det";
import Comandas from "./pagos2coms";


import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

let App;

// -----------------------------------------------------------------------------

let Images = {
  logo1: {
    src: "https://smxai.net/jukevox/logo.jpg"
  }
};

let MiDetalle = {
  Id: ["0"],
  Codigo: [""],
  Fecha: [""],
  Telefono: [""],
  Nombre: [""],
  Apellido: [""],
  TipoEntrega: [""],
  Confirmado: [""],

  Sucursal: [""],
  Cliente: [""],
  Cuenta: [""],
  Monto: [""],
  Obv: [""]
};

let MisRegistros = [
  {
    Id: ["0"],
    Codigo: [""],
    Fecha: [""],
    Telefono: [""],
    Nombre: [""],

    Sucursal: [""],
    Cliente: [""],
    Cuenta: [""],
    Monto: [""],
    Obv: [""]
  }
];

let MisComandas = [
  {
    "Id": "",
    "Fecha": "",
    "Nombre": "",
    "ProductosTitulo": "",
    "ProductosFoto": "",
    "ExtrasDetTitulo": "",
    "ConsumosObv": null,
    "ConsumosExtrasCompletado": "",
    "ConsumosExtrasId": ""
  },
];








const StateContextM = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxLoadingDet = createContext(false);

const CtxFiltroFecha = createContext(new Date());


const CtxImages = createContext(Images);
const CtxTipoAnim = createContext(1);

const CtxRegistros = createContext(MisRegistros);
const CtxComandas = createContext(MisComandas);


const CtxSucursales = createContext([]);
const CtxSucursal = createContext({value: 999, label: ""});

const CtxPedido = createContext(1);
const CtxDetalle = createContext(MiDetalle);
const CtxEditado = createContext(false);
const CtxLink = createContext("https://smxai.net/JukeVox?id=");
const CtxLink2 = createContext("https://smxai.net/JukeVox?id=");

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    LoadingDet: useState(useContext(CtxLoadingDet)),

    FiltroFecha: useState(useContext(CtxFiltroFecha)),

    Images: useState(useContext(CtxImages)),
    Registros: useState(useContext(CtxRegistros)),
    Detalle: useState(useContext(CtxDetalle)),
    Comandas: useState(useContext(CtxComandas)),


    TipoAnim: useState(useContext(CtxTipoAnim)),
    Sucursal: useState(useContext(CtxSucursal)),
    Sucursales: useState(useContext(CtxSucursales)),
    Pedido: useState(useContext(CtxPedido)),
    Editado: useState(useContext(CtxEditado)),
    Link: useState(useContext(CtxLink)),
    Link2: useState(useContext(CtxLink2)),

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  // let xTheme = useState(useContext(CtxTheme))
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContextM.Provider>
  );
};

// ------------------------------------------------------------------

const useData = function() {
  const [Registros, setRegistros] = useContext(StateContextM).Registros;
  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [LoadingDet, setLoadingDet] = useContext(StateContextM).LoadingDet;

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;
  const [Editado, setEditado] = useContext(StateContextM).Editado;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [Sucursales, setSucursales] = useContext(StateContextM).Sucursales;

  const [FiltroFecha, setFiltroFecha] = useContext(StateContextM).FiltroFecha



  const [Comandas, setComandas] = useContext(StateContextM).Comandas;


    //let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
    let graphqlserver = "https://smxai.net/graphqleai2"

  const getRegistrosMain = async function(props) {
    setLoading(true);
    var axdata = await axios({
      //url: "https://8t8jt.sse.codesandbox.io/gql",
      url: "https://smxai.net/graphqleai2",
      method: "post",
      data: {
        query: `
            query pedidos ($Query: PedidoInput){
              Pedidos{
                Consultas{
                  PedidoCom(Query: $Query){
                    Id,
                    Codigo,
                    Dia,
                    Mes,
                    Ano,
                    Sucursal,
                    Cliente,
                    Telefono,
                    Nombre,
                    Apellido,
                    Comanda,
                    Cuenta,
                    Fecha,
                    TipoEntrega,
                    Monto,
                    Pagado,
                    Confirmado,
                    Atendido,
                    Enviado,
                    Entregado,
                    Usuario,
                    Obv
                  }
                }
              }
            }
          `,
        variables: {
          Query: {
            Sucursal: Sucursal.value,
            Ano: Number(moment(FiltroFecha).format("YYYY")),
            Mes: Number(moment(FiltroFecha).format("MM")),
            Dia: Number(moment(FiltroFecha).format("DD")),
          }
        }
      }
    });
    await setRegistros(axdata.data.data.Pedidos.Consultas.PedidoCom);
    setLoading(false);
  };

  const upCliente = async function(props) {
    // await setLoadingDet(true);

    var axdata = await axios({
      //url: "https://8t8jt.sse.codesandbox.io/gql",
      url: "https://smxai.net/graphqleai2",
      method: "post",
      data: {
        query: `
          mutation upCliente ($Query: ClienteBono ) {
            PedidosM {
              Registro {
                UpdateCliente (Query: $Query) 
              }
            }
          }
         `,
        variables: {
          Query: {
            Id: Detalle.Cliente,
            Telefono: Detalle.Telefono,
            Nombre: Detalle.Nombre,
            ApellidoPat: Detalle.Apellido
          }
        }
      }
    });

    let axdataRes = axdata.data.data.PedidosM.Registro.UpdateCliente;
    console.log(axdataRes);
    if (axdataRes === 1) {
      console.log("Updated:" + axdataRes);
    }
  };

  const getResumen = async function(Consumo) {
    var axdata = await axios({
      url: graphqlserver,
      method: "post",
      data: {
        query: `
        query PedidoResumen($Query: PedidoInput){
          Pedidos {
            Consultas {
              PedidoResumen(Query: $Query){
                Id
                Fecha
                Nombre
                ProductosTitulo
                ProductosFoto
                ExtrasDetTitulo
                ConsumosObv
                ConsumosExtrasCompletado
                ConsumosExtrasId
              }
            }
          }
        }           
         `,
        variables: {
          Query: {
            "Sucursal": Sucursal.value,
            "ConsumosExtrasCantidad": 1
          }
        }
      }
    });

    let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumen;

    if (axdataRes) {
      setComandas(axdataRes);
    } else {}
  }

















  return {
    getRegistros: async function(props) {
      getRegistrosMain();
    },

    getDetalle: async props => {
      await setLoadingDet(true);

      await setDetalle(MiDetalle);

      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
              query pedidos ($Query: PedidoInput){
                Pedidos{
                  Consultas{
                    PedidoCom(Query: $Query){
                      Id,
                      Codigo,
                      Dia,
                      Mes,
                      Ano,
                      Sucursal,
                      Cliente,
                      Telefono,
                      Nombre,
                      Apellido,
                      Comanda,
                      Cuenta,
                      Fecha,
                      TipoEntrega,
                      Monto,
                      Pagado,
                      Confirmado,
                      Atendido,
                      Enviado,
                      Entregado,
                      Usuario,
                      Obv
                    }
                  }
                }
              }
            `,
          variables: {
            Query: { Id: Pedido }
          }
        }
      });
      await setDetalle(axdata.data.data.Pedidos.Consultas.PedidoCom[0]);
      setLoadingDet(false);
    },



    upDetalle: async props => {
      await setLoadingDet(true);
      console.log(Detalle);

      // console.log("voy a actualizar:" + Detalle.Cliente);
      var axdata = await axios({
        // url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            mutation upPedido ($Query: PedidoInput ) {
              PedidosM {
                Registro {
                  UpdatePedido (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Id: Detalle.Id,
              Cliente: Detalle.Cliente,
              Cuenta: Detalle.Cuenta,
              Monto: Number(Detalle.Monto),
              Obv: Detalle.Obv
            }
          }
        }
      });

      if (axdata.data) {
        console.log("Guardado");
        await upCliente();
        setEditado(false);
        getRegistrosMain();
      }

      setLoadingDet(false);
    },

    addRegistro: async function(props) {
      await setLoadingDet(true);

      var axdata = await axios({
        // url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            mutation AddPedido ($Query: PedidoInput ) {
              PedidosM {
                Registro {
                  InsertPedido (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Sucursal: Sucursal.value
            }
          }
        }
      });

      if (axdata.data.data.PedidosM.Registro.InsertPedido) {
        console.log(
          "Agregado:" + axdata.data.data.PedidosM.Registro.InsertPedido
        );
        setPedido(axdata.data.data.PedidosM.Registro.InsertPedido);
        navigate("/det");
        getRegistrosMain();
      }

      setLoadingDet(false);
    },

    pullCliente: async function(props) {
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            mutation PullCliente ($Query: ClienteInput ) {
              PedidosM {
                Pull {
                  Cliente (Query: $Query)  {
                    Id
                    Nombre
                    ApellidoPat
                  }
                }
              }
            }
           `,
          variables: {
            Query: {
              Telefono: Detalle.Telefono
            }
          }
        }
      });

      let axdataRes = axdata.data.data.PedidosM.Pull.Cliente;
      console.log(axdataRes);
      if (axdataRes) {
        console.log("Pulled:" + axdataRes.Id);

        await setDetalle({
          ...Detalle,
          Cliente: axdataRes.Id,
          Nombre: axdataRes.Nombre,
          Apellido: axdataRes.ApellidoPat
        });

        setEditado(true);
      }
    },

    getSucursales: async function(props) {
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            query Sucursales ($Sucursal: SucursalInput) {
              Pedidos {
                Consultas {
                  Sucursales (Query: $Sucursal) {
                    Id
                    Descripcion
                  }
                }
              }
            }
            `,
          variables: {
            Sucursal: { Empresa: 2 }
          }
        }
      });
      await setSucursales(
        axdata.data.data.Pedidos.Consultas.Sucursales.map(v => {
          return {
            value: v.Id,
            label: v.Descripcion
          };
        })
      );
    },

    sendSms: async function(props) {
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            mutation sendsms ($Query: PedidoInput ) {
              PedidosM {
                Envios {
                  Sms (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Telefono: Detalle.Telefono,
              Nombre: Detalle.Nombre,
              Codigo: Detalle.Codigo,
              Sucursal: Detalle.Sucursal
            }
          }
        }
      });

      let axdataRes = axdata.data.data.PedidosM.Envios.Sms;
      console.log(axdataRes);
      if (axdataRes) {
        console.log("Mandado:" + axdataRes);
        return 1;
      } else {
        return 0;
      }
    },

    sendSms2: async function(props) {
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
            mutation sendsms ($Query: PedidoInput ) {
              PedidosM {
                Envios {
                  Sms2 (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Telefono: Detalle.Telefono,
              Nombre: Detalle.Nombre,
              Codigo: Detalle.Codigo,
              Sucursal: Detalle.Sucursal
            }
          }
        }
      });

      let axdataRes = axdata.data.data.PedidosM.Envios.Sms2;
      console.log(axdataRes);
      if (axdataRes) {
        console.log("Mandado:" + axdataRes);
        return 1;
      } else {
        return 0;
      }
    },



    ConsumosExtras: function() {
      return {

        getResumen : async function(Consumo) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query PedidoResumen($Query: PedidoInput){
                Pedidos {
                  Consultas {
                    PedidoResumen(Query: $Query){
                      Id
                      Fecha
                      Nombre
                      ProductosTitulo
                      ProductosFoto
                      ExtrasDetTitulo
                      ConsumosObv
                      ConsumosExtrasCompletado
                      ConsumosExtrasId
                    }
                  }
                }
              }           
               `,
              variables: {
                Query: {
                  "Sucursal": Sucursal.value,
                  "ConsumosExtrasCantidad": 1
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumen;
      
          if (axdataRes) {
            setComandas(axdataRes);
          } else {}
        },



      

        UpdateCompletado : async function(Id, Completado) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumosExtra ($Query: ConsumoExtraInput) {
                  ConsumosExtrasM {
                    Registro {
                      UpdateCompletado (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Id,
                  Completado: Completado
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtrasM.Registro.UpdateCompletado;
      
          if (axdataRes) {

            getResumen()

          } else {}
        },


      };
    }, // ------- ConsumosExtras






    // getDetalle: props => Movimientos.filter(v => v.Folio === DetFolio),

    // getSaldo: Movimientos.reduce((a, b) => a + Number(b.Puntos), 0)
  };
};

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const [Images] = useContext(StateContextM).Images;
  const { getSucursales, getRegistros, getDetalle, addRegistro, ConsumosExtras } = useData();

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [Sucursales] = useContext(StateContextM).Sucursales;


  const [FiltroFecha, setFiltroFecha] = useContext(StateContextM).FiltroFecha




  


  useEffect(() => {
    //getSucursales(props);
    console.log(props.usr)
    if(props.usr===20){setSucursal({value: 20, label: "Chuy Saldivar"})}
    if(props.usr===21){setSucursal({value: 21, label: "Armando Lza"})}
    if(props.usr===24){setSucursal({value: 24, label: "Luis Soto"})}
    if(props.usr===26){setSucursal({value: 26, label: "Antropia"})}
    if(props.usr===29){setSucursal({value: 29, label: "Prodemo"})}

    //setSucursal({value: 21, label: "Armando Lza"})





    getRegistros(props);
    ConsumosExtras().getResumen()
    navigate("/");
  }, []);

  useEffect(() => {
    getRegistros(props);
    ConsumosExtras().getResumen()

  }, [Sucursal, FiltroFecha]);

  useEffect(() => {
    getDetalle(props);
  }, [Pedido]);

  try {
    return (
      <div>
        <Flex sx={{ height: "55px", mb: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Image sx={{ height: "55px" }} src={Images.logo1.src} />
          </Box>



          <Box sx={{ width: "30%" }}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              variant="inline"
              clearable
              //disableFuture
              //label="Basic example"
              value={FiltroFecha}
              onChange={setFiltroFecha}
            />
          </MuiPickersUtilsProvider>
        </Box>




          <Box sx={{ width: "50%" }}>
            <Dropbox
              styles={DropboxCss.filtro1}
              name="DropPaginas"
              value={{
                value: Sucursal.value,
                label: Sucursal.label
              }}
              options={Sucursales}
              onChange={e => {
                setSucursal({ value: e.value, label: e.label });
              }}
            />
          </Box>
        </Flex>

        <Flex sx={{ height: "34px", mb: 3, width: "100%" }}>
          <Box
            sx={{
              p: 3,
              bg: "#ffcc00",
              fontWeight: "normal",
              fontSize: 4,
              color: "text",
              fontFamily: "body",
              width: "20%"
            }}
          >
            {/* {props.texto} */}
          </Box>


          <Box sx={{ width: "30%" }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={async() => {
                //await useDataMx.Pedidos().add(props)
                navigate("/")
              }}
            >
              Pedidos
            </Button>
          </Box>



          <Box sx={{ width: "30%" }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={async() => {
                //await useDataMx.Pedidos().add(props)
                navigate("/coms")
              }}
            >
              Comandas
            </Button>
          </Box>













          <Box sx={{ width: "30%" }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={() => {
                addRegistro();
              }}
            >
              Nuevo Pedido
            </Button>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getRegistros, getDetalle, ConsumosExtras } = useData();

  try {
    return (
      <div>
        <Flex>
          <Box
            sx={{
              p: 3,
              bg: "gray",
              fontWeight: "normal",
              fontSize: 3,
              color: "#FFFFFF",
              fontFamily: "body",
              width: "100%"
            }}
          >
            <Box sx={{ width: "14%" }}>
              <Button
                width={1}
                bg={"gray"}
                Disabled={false}
                onClick={() => {
                  getRegistros(props);
                  getDetalle(props);
                  ConsumosExtras().getResumen()
                }}
              >
                Actualizar
              </Button>
            </Box>
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2}>
              ** Si tienes dudas manda un Whatsapp al: 4772740011
            </Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Router = props => {
  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [LoadingDet] = useContext(StateContextM).Loading;

  const [TipoAnim, setTipoAnim] = useContext(StateContextM).TipoAnim;

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;




  const [Editado, setEditado] = useContext(StateContextM).Editado;
  const [Link] = useContext(StateContextM).Link;
  const [Link2] = useContext(StateContextM).Link2;


  const [Registros] = useContext(StateContextM).Registros;
  const [Comandas, setComandas] = useContext(StateContextM).Comandas;


  const {
    getRegistros,
    getDetalle,
    upDetalle,
    pullCliente,
    sendSms,
    sendSms2,
    ConsumosExtras
  } = useData();

  const usr = props.usr;

  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;

  const Detalles = Detalle;

  const routeResult = useRoutes(
    routes({
      Pedido,
      setPedido,
      Registros,
      usr,
      navigate,
      Detalles,
      setDetalle,
      upDetalle,
      Loading,
      LoadingDet,
      Theme,
      TipoAnim,
      setTipoAnim,
      getRegistros,
      Editado,
      setEditado,
      Link,
      Link2,
      pullCliente,
      sendSms,
      sendSms2,
      ConsumosExtras,
      Comandas,
      Sucursal,
    })
  );

  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  let FadeTransition = props => {
    if (TipoAnim === 1) {
      return (
        <CSSTransition
          {...props}
          classNames={{
            enter: "fade-enter",
            enterActive: "fade-enter-active",
            exit: "fade-exit"
          }}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
        />
      );
    } else {
      return (
        <CSSTransition
          {...props}
          classNames={{
            enter: "fade-enter2",
            enterActive: "fade-enter-active",
            exit: "fade-exit2"
          }}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
        />
      );
    }
  };

  try {
    return (
      <div>


        <Box sx={{ width: "100%" }}>{routeResult}</Box>



        {/* <Detalle
        Theme={Theme}
        navigate={navigate}
        Detalles={Detalles}
        setDetalle={setDetalle}
        setTipoAnim={setTipoAnim}
        LoadingDet={LoadingDet}
        upDetalle={upDetalle}
        Editado={Editado}
        setEditado={setEditado}
        Link={Link}
        pullCliente={pullCliente}
        sendSms={sendSms}
      /> */}










      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// ----------------------------------------

const routes = props => {
  return {
    "/": () => (
      <Registros
        Theme={props.Theme}
        navigate={props.navigate}
        setTipoAnim={props.setTipoAnim}
        Loading={props.Loading}
        setPedido={props.setPedido}
        Registros={props.Registros}
      />
    ),
    "/det": () => (
      <Detalle
        Theme={props.Theme}
        navigate={props.navigate}
        Detalles={props.Detalles}
        setDetalle={props.setDetalle}
        setTipoAnim={props.setTipoAnim}
        LoadingDet={props.LoadingDet}
        upDetalle={props.upDetalle}
        Editado={props.Editado}
        setEditado={props.setEditado}
        Link={props.Link}
        Link2={props.Link2}
        pullCliente={props.pullCliente}
        sendSms={props.sendSms}
        sendSms2={props.sendSms2}

      />
    ),

    "/coms": () => (
      <Comandas
        Theme={props.Theme}
        navigate={props.navigate}
        Comandas={props.Comandas}
        // setTipoAnim={props.setTipoAnim}
        // Loading={props.Loading}
        // setLoadingDet={props.setLoadingDet}

        // setPedido={props.setPedido}
        // Registros={props.Registros}
        usedata={props.ConsumosExtras}
        Sucursal={props.Sucursal}

      />
    ),










  };
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  // useRedirect("/", "/movs");
  return (
    <ContextProvider>
      <Flex
        sx={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256
        }}
      >
        <header sx={{width: "100%"}}>
          <Encabezado {...props} texto="Pedidos Pago sin Contacto" />
        </header>

        <main sx={{width: "100%",flex: "1 1 auto"}}>
          <Router {...props} sx={{ width: "100%" }} />
          
        </main>

        <footer sx={{width: "100%"}}>
          <div
            sx={{
              display: "block",
              padding: "10px",
              height: "60px",
              width: "100%"
            }}
          />

          <div
            style={{
              backgroundColor: "white",
              fontSize: "20px",
              color: "white",
              borderTop: "1px solid #E7E7E7",
              textAlign: "left",
              padding: "0px",
              position: "fixed",
              left: "0",
              bottom: "0",
              height: "80px",
              width: "100%"
            }}
          >
            <Pie {...props} />
          </div>
        </footer>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
