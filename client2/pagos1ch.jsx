import React, {useState, useEffect, useRef, useContext, createContext, Component} from "react";

import "@babel/polyfill";

// import theme from "../css/themes";
import Theme from "../css/cssui/theme";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Input, Spinner } from "@theme-ui/components";

import axios from "axios";
import moment from "moment";

import Titulo from "../css/css5/titulo";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";

let App;
// ----------------------------------------------------------------


let Images = {
  logo1: {
    src: "https://smxai.net/sf/pagos1.jpg"
  },
  logo2: {
    src: "https://smxai.net/sf/eglogo1.jpeg"
  }
};

const StateContext = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);

const CtxPayStatus = createContext({ Status: "Pagar", Color: "grey" });
const CtxBrand = createContext("pf pf-credit-card");

const CtxPedido = createContext("");
const CtxSucursal = createContext(0);

const CtxNombre = createContext("");
const CtxCuenta = createContext("");
const CtxFecha = createContext("");

const CtxEmail = createContext("");
const CtxMonto = createContext(0);
const CtxServicio = createContext(0);
const CtxImporte = createContext(0);
const CtxObv = createContext("");
const CtxPagado = createContext(0);

const CtxIndica = createContext("Llena  todos los datos");

const CtxDisabled = createContext(false);

const CtxBotonesOp = createContext({
  Boton1: {
    Status: "5%",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 0
  },
  Boton2: {
    Status: "10%",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 0
  },
  Boton3: {
    Status: "15%",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 0
  }
});

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages)),

    PayStatus: useState(useContext(CtxPayStatus)),
    CardBrand: useState(useContext(CtxBrand)),

    Pedido: useState(useContext(CtxPedido)),
    Sucursal: useState(useContext(CtxSucursal)),

    Nombre: useState(useContext(CtxNombre)),
    Cuenta: useState(useContext(CtxCuenta)),
    Fecha: useState(useContext(CtxFecha)),

    Email: useState(useContext(CtxEmail)),
    Monto: useState(useContext(CtxMonto)),
    Servicio: useState(useContext(CtxServicio)),
    Importe: useState(useContext(CtxImporte)),
    Obv: useState(useContext(CtxObv)),

    Pagado: useState(useContext(CtxPagado)),

    Indica: useState(useContext(CtxIndica)),
    Disabled: useState(useContext(CtxDisabled)),

    BotonesOp: useState(useContext(CtxBotonesOp))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  </StateContext.Provider>
);

// ------------------



const handleChange = change => {
  console.log("[change]", change);
};

const defCardBrand = e => {
  if (e === "unknown") {
    return "pf pf-credit-card";
  }
  if (e === "amex") {
    return "pf pf-american-expres";
  }
  return "pf pf-" + e;
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize: fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
          fontFamily: "Arial, Helvetica, sans-serif"
        },
        border: "5px solid red",
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

// ------------------------------------------------------------------

// ------------------------------------------------------------------
const useData = props => {
  const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;

  const [Pedido, setPedido] = useContext(StateContext).Pedido;
  const [Sucursal, setSucursal] = useContext(StateContext).Sucursal;

  const [Nombre, setNombre] = useContext(StateContext).Nombre;
  const [Cuenta, setCuenta] = useContext(StateContext).Cuenta;
  const [Fecha, setFecha] = useContext(StateContext).Fecha;
  const [Monto, setMonto] = useContext(StateContext).Monto;
  const [Servicio, setServicio] = useContext(StateContext).Servicio;
  const [Importe, setImporte] = useContext(StateContext).Importe;
  const [Obv, setObv] = useContext(StateContext).Obv;

  const [Pagado, setPagado] = useContext(StateContext).Pagado;

  const [Loading, setLoading] = useContext(StateContext).Loading;

  //-------------------------

  const getRegistrosMain = async function(props) {
    setLoading(true);
    var axdata = await axios({
      // url: "https://8t8jt.sse.codesandbox.io/gql",
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
                    Sucursal,
                    Cliente,
                    Telefono,
                    Nombre,
                    Apellido,
                    Comanda,
                    Cuenta,
                    Fecha,
                    Monto,
                    Pagado,
                    Obv
                  }
                }
              }
            }
          `,
        variables: {
          Query: { Codigo: props.id }
        }
      }
    });

    let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom[0];
    console.log(axdataRes);
    setPedido(axdataRes.Id);
    setSucursal(axdataRes.Sucursal);

    setNombre(axdataRes.Nombre);
    setCuenta(axdataRes.Cuenta);
    setFecha(axdataRes.Fecha);
    setMonto(axdataRes.Monto);
    setObv(axdataRes.Obv);
    setPagado(axdataRes.Pagado);

    setLoading(false);
  };

  return {
    getRegistros: async function(props) {
      getRegistrosMain(props);
    },

    PayStripe: async (token, id) => {
      console.log("PayStripe: " + JSON.stringify(token));

      var axdata = await axios({
        // url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",

        method: "post",
        data: {
          query: `
          mutation PagoToken ($PayIntent: StripePaymentIntent) {
            PagosM  {
              Registro {
                Pagar (Query: $PayIntent)
              }
            }
          }
        `,
          variables: {
            PayIntent: {
              Id: Number(Pedido),
              Cart: Sucursal,
              Token: 1234,
              SToken: token.token.id,
              Amount: Number(Monto) * 100,
              Descripcion: "Pedido Sushi Factory: " + Pedido,
              Ip: token.token.client_ip,
              Servicio: Number(Servicio),
              Obv: Obv
            }
          }
        }
      });

      console.log("update: " + axdata.data.data.PagosM.Registro.Pagar);
      if (axdata.data.data.PagosM.Registro.Pagar === 1) {
        // setPayStatus({ Status: "Pagado", Color: "green" });
        return 1;
      } else {
        setPayStatus({ Status: "Pago No Procesado", Color: "red" });
        return 0;
      }
    }
    //-------------------------
    //-------------------------
  };
};

// ------------------------------------------------------------------

const EncabezadoImagen = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Images] = useContext(StateContext).Images;

  try {
    return (
      <div>
        <Flex sx={{ height: "144px", mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <Image sx={{ height: "144px" }} src={Images.logo1.src} />
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  const [Monto, setMonto] = useContext(StateContext).Monto;
  const [Servicio, setServicio] = useContext(StateContext).Servicio;
  const [Pagado] = useContext(StateContext).Pagado;

  const { getRegistros } = useData();

  useEffect(() => {
    getRegistros(props);
  }, []);

  try {
    return (
      <Flex>
        {Pagado > 0 ? (
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text>------------</Text>
          </Flex>
        ) : (
          <Box bg={props.bg || "SlateGrey"}>
            <Titulo
              //sx={Estilo.h4s}
              color={"#FFFFFF"}
              fontSize={[4]}
              //p={10}
            >
              {props.texto} $ {Monto + Number(Servicio)}
            </Titulo>
          </Box>
        )}
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Form1 = (...props) => {
  // const [Theme] = useContext(StateContext).Theme;

  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).Loading;

  const [Nombre] = useContext(StateContext).Nombre;
  const [Pedido] = useContext(StateContext).Pedido;

  // const [Email, setEmail] = useContext(StateContext).Email;
  const [Monto] = useContext(StateContext).Monto;
  const [Cuenta] = useContext(StateContext).Cuenta;
  const [Fecha] = useContext(StateContext).Fecha;
  const [Obv] = useContext(StateContext).Obv;
  const [Pagado] = useContext(StateContext).Pagado;

  const [Servicio, setServicio] = useContext(StateContext).Servicio;

  const [BotonesOp, setBotonesOp] = useContext(StateContext).BotonesOp;

  const useChange = (Field, setField) => {
    return {
      name: Field,
      value: Field,
      fontSize: 1,
      color: "#595959",
      bg: "#DCDCDC",
      onChange: e => {
        setField(e.target.value);
      }
    };
  };

  return (
    <Flex
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 123
      }}
    >
      {Loading ? (
        <div>
          <Flex
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 150
            }}
          >
            <Spinner size={50} />
          </Flex>{" "}
        </div>
      ) : (
        <div>
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4}>¡Hola {Nombre}!</Text>
          </Flex>

          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4}>Esta es tu cuenta:</Text>
          </Flex>

          <Box bg="White" css={{ height: 8 }} />

          {/* // ---------- datosTTicket */}

          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4sub}>
              Fecha de Pedido: {moment(Fecha).format("DD MMM HH:MM")}
            </Text>
          </Flex>

          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4sub}>
              Folio de Ticket:: {Cuenta}-{Pedido}
            </Text>
          </Flex>

          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4}>Importe: ${Monto}</Text>
          </Flex>

          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h4s}>{Obv}</Text>
          </Flex>

          <Box bg="White" css={{ height: 21 }} />

          {Pagado > 0 ? (
            <Flex>
              <Box bg="White" css={{ height: 34 }} />
              <Text sx={Estilo.h4}>Ticket Ya Pagado: ${Pagado}</Text>
            </Flex>
          ) : (
            <div>
              <Flex>
                <Box bg="White" css={{ height: 34 }} />
                <Text sx={Estilo.h4s}>
                  ¿Deseas incluir un extra para el repartidor?
                </Text>
              </Flex>

              <Box bg="White" css={{ height: 8 }} />

              <Flex>
                <Box sx={{ width: "35%" }}>
                  <Input
                    {...useChange(Servicio, setServicio)}
                    onChange={e => {
                      setServicio(e.target.value);
                      setBotonesOp({
                        Boton1: {
                          Status: "5%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        },
                        Boton2: {
                          Status: "10%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        },
                        Boton3: {
                          Status: "15%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        }
                      });
                    }}
                  />
                </Box>

                <Button
                  sx={{
                    width: "20%",
                    height: "34px",
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton1.Color}
                  color={BotonesOp.Boton1.Text}
                  onClick={() => {
                    setServicio(Monto * 0.05);
                    setBotonesOp({
                      Boton1: {
                        Status: "5%",
                        Color: "green",
                        Text: "white"
                      },
                      Boton2: {
                        Status: "10%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton3: {
                        Status: "15%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      }
                    });
                  }}
                >
                  5%
                </Button>

                <Button
                  sx={{
                    width: "20%",
                    height: "34px",
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton2.Color}
                  color={BotonesOp.Boton2.Text}
                  onClick={() => {
                    setServicio(Monto * 0.1);
                    setBotonesOp({
                      Boton1: {
                        Status: "5%",
                        Color: "D3D3D3",
                        Text: "696969"
                      },
                      Boton2: {
                        Status: "10%",
                        Color: "green",
                        Text: "white"
                      },
                      Boton3: {
                        Status: "15%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      }
                    });
                  }}
                >
                  10%
                </Button>

                <Button
                  sx={{
                    width: "20%",
                    height: "34px",
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton3.Color}
                  color={BotonesOp.Boton3.Text}
                  onClick={() => {
                    setServicio(Monto * 0.15);
                    setBotonesOp({
                      Boton1: {
                        Status: "Bono de 300  (Recibes 350",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton2: {
                        Status: "Bono de 500  (Recibes 600",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton3: {
                        Status: "Bono de 1000  (Recibes 1250",
                        Color: "green",
                        Text: "white"
                      }
                    });
                  }}
                >
                  15%
                </Button>
              </Flex>
            </div>
          )}

          <Box bg="White" css={{ height: 34 }} />

          <Flex
            sx={{
              display: "flex",
              flexDirection: "column"
            }}
          />
        </div>
      )}
    </Flex>
  );
};

// -----------------------------------------------------------------------------

const SplitForm = props => {
  // const Estilo = useThemeUI().theme.styles;

  try {
    const { PayStripe, CreateCliente } = useData();
    const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;
    const [CardBrand, setCardBrand] = useContext(StateContext).CardBrand;
    const [Nombre, setNombre] = useContext(StateContext).Nombre;
    const [Loading, setLoading] = useContext(StateContext).Loading;
    const [Indica, setIndica] = useContext(StateContext).Indica;
    const [Disabled, setDisabled] = useContext(StateContext).Disabled;
    const [Monto, setMonto] = useContext(StateContext).Monto;
    const [Pagado, setPagado] = useContext(StateContext).Pagado;

    const handleSubmit = async ev => {
      //setLoading(true);
      ev.preventDefault();

      setPayStatus({ Status: "Procesando...", Color: "blue" });

      let Cliente = 1;

      if (Cliente > 0) {
        if (props.stripe) {
          // ---- el bueno
          let Pago;
          let Token = await props.stripe.createToken();
          // console.log("Token:" + JSON.stringify(Token));
          if (Token.token) {
            Pago = await PayStripe(Token);
          } else {
            Pago = 0;
          }

          // ---- el test
          // let Pago = await PayStripe(
          //   { token: { id: "TT0Ken", client_ip: "299.300" } },
          //   Cliente
          // ); //test

          // let Pago = 1; // test

          if (Pago === 1) {
            setPayStatus({ Status: "Pagado", Color: "green" });
            setIndica(
              "GRACIAS POR TU COMPRA! Si tienes dudas comunícate al 667 716 1800"
            );

            refCard.clear();
            refVenc.clear();
            refCvc.clear();
          } else {
            setPayStatus({ Status: "Falla", Color: "orange" });
            setIndica("Si tienes dudas comunícate al 667 716 1800");
          }
        } else {
          console.log("Stripe.js hasn't loaded yet.");
        }
      } else {
        setIndica("Si tienes dudas comunícate al 667 716 1800");
      }
      setDisabled(true);
      setLoading(false);
      return true;
    };

    // let brandicon = useRef(null);

    const [refCard, setRefCard] = useState(null);
    const [refVenc, setRefVenc] = useState(null);
    const [refCvc, setRefCvc] = useState(null);

    return (
      <Flex>
        {Pagado > 0 ? (
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text>------------</Text>
          </Flex>
        ) : (
          <Flex
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 233
            }}
          >
            {Loading ? (
              <Flex
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 150
                }}
              >
                <Spinner size={50} />
              </Flex>
            ) : (
              <form onSubmit={handleSubmit}>
                <Box bg="White" css={{ height: 25 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Tarjeta
                  <span
                    className={"brand"}
                    style={{ width: "30px", height: "30px" }}
                  >
                    <i
                      style={{ width: "30px", height: "30px" }}
                      // ref={brandicon}
                      className={CardBrand}
                    />
                    <CardNumberElement
                      onReady={e => setRefCard(e)}
                      {...createOptions(33)}
                      css={{
                        // fontSize: "40px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        height: 30,
                        width: 190,
                        paddingLeft: 20,
                        paddingTop: 9
                      }}
                      onChange={e => {
                        setCardBrand(defCardBrand(e.brand));
                      }}
                    />
                  </span>
                </label>

                <Box bg="White" css={{ height: 13 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Fecha de Vencimiento
                  <Box bg="White" css={{ height: 9 }} />
                  <CardExpiryElement
                    css={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: 30,
                      width: 90,
                      paddingLeft: 30,
                      paddingTop: 9
                    }}
                    onChange={handleChange}
                    {...createOptions(15)}
                    onReady={e => setRefVenc(e)}
                  />
                </label>

                <Box bg="White" css={{ height: 13 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  CVC (Código de Seguridad)
                  <Box bg="White" css={{ height: 9 }} />
                  <CardCVCElement
                    css={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: 30,
                      width: 90,
                      paddingLeft: 30,
                      paddingTop: 9
                    }}
                    onChange={handleChange}
                    {...createOptions(3)}
                    onReady={e => setRefCvc(e)}
                  />
                </label>
                <Box bg="White" css={{ height: 13 }} />

                {/* <button>Pay</button> */}

                <Button width={1} bg={PayStatus.Color} Disabled={Disabled}>
                  {PayStatus.Status}
                </Button>
              </form>
            )}
          </Flex>
        )}
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

const SSplitForm = injectStripe(SplitForm);

const Checkout = props => {
  try {
    return (
      <div className="Checkout">
        <Elements>
          <SSplitForm fontSize={{ elementFontSize: "30px" }} />
        </Elements>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------




const MpForm = props => {
  // const Estilo = useThemeUI().theme.styles;

  try {
    const { PayStripe, CreateCliente } = useData();
    const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;
    const [CardBrand, setCardBrand] = useContext(StateContext).CardBrand;
    const [Nombre, setNombre] = useContext(StateContext).Nombre;
    const [Loading, setLoading] = useContext(StateContext).Loading;
    const [Indica, setIndica] = useContext(StateContext).Indica;
    const [Disabled, setDisabled] = useContext(StateContext).Disabled;
    const [Monto, setMonto] = useContext(StateContext).Monto;
    const [Pagado, setPagado] = useContext(StateContext).Pagado;

    const handleSubmit = async ev => {
      //setLoading(true);
      ev.preventDefault();

      setPayStatus({ Status: "Procesando...", Color: "blue" });

      let Cliente = 1;

      if (Cliente > 0) {
        if (props.stripe) {
          // ---- el bueno
          let Pago;
          let Token = await props.stripe.createToken();
          // console.log("Token:" + JSON.stringify(Token));
          if (Token.token) {
            Pago = await PayStripe(Token);
          } else {
            Pago = 0;
          }

          // ---- el test
          // let Pago = await PayStripe(
          //   { token: { id: "TT0Ken", client_ip: "299.300" } },
          //   Cliente
          // ); //test

          // let Pago = 1; // test

          if (Pago === 1) {
            setPayStatus({ Status: "Pagado", Color: "green" });
            setIndica(
              "GRACIAS POR TU COMPRA! Si tienes dudas comunícate al 667 716 1800"
            );

            refCard.clear();
            refVenc.clear();
            refCvc.clear();
          } else {
            setPayStatus({ Status: "Falla", Color: "orange" });
            setIndica("Si tienes dudas comunícate al 667 716 1800");
          }
        } else {
          console.log("Stripe.js hasn't loaded yet.");
        }
      } else {
        setIndica("Si tienes dudas comunícate al 667 716 1800");
      }
      setDisabled(true);
      setLoading(false);
      return true;
    };

    // let brandicon = useRef(null);

    const [refCard, setRefCard] = useState(null);
    const [refVenc, setRefVenc] = useState(null);
    const [refCvc, setRefCvc] = useState(null);

    return (
      <Flex>
        {Pagado > 0 ? (
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text>------------</Text>
          </Flex>
        ) : (
          <Flex
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 233
            }}
          >
            {Loading ? (
              <Flex
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 150
                }}
              >
                <Spinner size={50} />
              </Flex>
            ) : (





              
              <form onSubmit={handleSubmit}>
                <Box bg="White" css={{ height: 25 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Tarjeta
                  <span
                    className={"brand"}
                    style={{ width: "30px", height: "30px" }}
                  >
                    <i
                      style={{ width: "30px", height: "30px" }}
                      // ref={brandicon}
                      className={CardBrand}
                    />
                    <CardNumberElement
                      onReady={e => setRefCard(e)}
                      {...createOptions(33)}
                      css={{
                        // fontSize: "40px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        height: 30,
                        width: 190,
                        paddingLeft: 20,
                        paddingTop: 9
                      }}
                      onChange={e => {
                        setCardBrand(defCardBrand(e.brand));
                      }}
                    />
                  </span>
                </label>

                <Box bg="White" css={{ height: 13 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  Fecha de Vencimiento
                  <Box bg="White" css={{ height: 9 }} />
                  <CardExpiryElement
                    css={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: 30,
                      width: 90,
                      paddingLeft: 30,
                      paddingTop: 9
                    }}
                    onChange={handleChange}
                    {...createOptions(15)}
                    onReady={e => setRefVenc(e)}
                  />
                </label>

                <Box bg="White" css={{ height: 13 }} />

                <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                  CVC (Código de Seguridad)
                  <Box bg="White" css={{ height: 9 }} />
                  <CardCVCElement
                    css={{
                      border: "1px solid grey",
                      borderRadius: "5px",
                      height: 30,
                      width: 90,
                      paddingLeft: 30,
                      paddingTop: 9
                    }}
                    onChange={handleChange}
                    {...createOptions(3)}
                    onReady={e => setRefCvc(e)}
                  />
                </label>
                <Box bg="White" css={{ height: 13 }} />

                {/* <button>Pay</button> */}

                <Button width={1} bg={PayStatus.Color} Disabled={Disabled}>
                  {PayStatus.Status}
                </Button>
              </form>
            )}
          </Flex>
        )}
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};
















// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getSaldo } = useData();
  const [Indica, setIndica] = useContext(StateContext).Indica;
  const [Pagado] = useContext(StateContext).Pagado;

  try {
    return (
      <Flex>
        {Pagado > 0 ? (
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text>------------</Text>
          </Flex>
        ) : (
          <div>
            <Flex>
              <Box sx={{ width: "80%" }}>
                <Text sx={Estilo.h2}>{Indica}</Text>
              </Box>
            </Flex>
          </div>
        )}
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  let token = "pk_live_mACxLJxa59sA5vaLUlnL26ww004oD7fung";
  if (props.usr === 6) {token = "pk_live_XeCZoqEJLdnAqKuLRoMTrETC00501hfITJ";} //Fortuna
  if (props.usr === 11) {token = "pk_live_gAvCBHk4hD5pLpSBTl75RJRI00G0c6pnCT"} //Esfera



  return (
    <StateProvider theme={Theme}>
      <Flex
        css={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256,
          width: "100%"
        }}
      >
        <Box
          sx={{
            maxWidth: "700px",
            width: "456px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >
          <EncabezadoImagen {...props} texto="Pagar" />
        </Box>

        <Box
          sx={{
            maxWidth: "700px",
            width: "400px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >
          <Form1 />

          <Encabezado {...props} texto="Total a Pagar:" />
          <StripeProvider apiKey={token}>
            <Checkout />
          </StripeProvider>

          <Pie {...props} />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
