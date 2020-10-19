import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  Component
} from "react";

import "@babel/polyfill";

import theme from "../css/themes";
import Theme from "../css/cssui/theme";

// import { Button, Text, Image } from "rebass";
// import { Flex, Box } from "@rebass/grid";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  Spinner,
  Input
} from "@theme-ui/components";

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

// ----------------------------------------------------------------

let App;

let Images = {
  logo1: {
    src: "https://smxai.net/sushibonos/bonoshead2.jpg"
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

const CtxNombre = createContext("");
const CtxTelefono = createContext("");
const CtxEmail = createContext("");
const CtxMonto = createContext(0);
const CtxIndica = createContext("Llena  todos los datos");

const CtxDisabled = createContext(false);
const CtxBotonesOp = createContext({
  Boton1: {
    Status: "Bono de 300  (Recibes 350",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 30000
  },
  Boton2: {
    Status: "Bono de 500  (Recibes 600",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 50000
  },
  Boton3: {
    Status: "Bono de 1000  (Recibes 1250",
    Color: "#D3D3D3",
    Text: "#696969",
    Importe: 100000
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
    Nombre: useState(useContext(CtxNombre)),
    Telefono: useState(useContext(CtxTelefono)),
    Email: useState(useContext(CtxEmail)),
    Monto: useState(useContext(CtxMonto)),
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
const useData = () => {
  const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;
  const [Monto, setMonto] = useContext(StateContext).Monto;

  //-------------------------

  return {
    PayStripe: async (token, id) => {
      console.log("PayStripe: " + JSON.stringify(token));

      var axdata = await axios({
        // url: "https://8t8jt.sse.codesandbox.io/gql",
        url: "https://smxai.net/graphqleai2",

        method: "post",
        data: {
          query: `
          mutation BonoToken ($PayIntent:  StripePaymentIntent) {
            BonosM  {
              Pagos {
                CreateToken (Query: $PayIntent)
              }
            }
          }
        `,
          variables: {
            PayIntent: {
              Id: id,
              Cart: 333,
              Token: 1234,
              SToken: token.token.id,
              Amount: Monto,
              Descripcion: "Bono Sushi Factory: " + id,
              Ip: token.token.client_ip
            }
          }
        }
      });

      console.log("update: " + axdata.data.data.BonosM.Pagos.CreateToken);
      if (axdata.data.data.BonosM.Pagos.CreateToken === 1) {
        // setPayStatus({ Status: "Pagado", Color: "green" });
        return 1;
      } else {
        setPayStatus({ Status: "Pago No Procesado", Color: "red" });
        return 0;
      }
    },
    //-------------------------

    CreateCliente: async (Nombre, Telefono, Email) => {
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gql",
        // url: "https://smxai.net/graphqlpub2",
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          mutation AddClienteBono ($Query: ClienteBono ) {
            BonosM {
              Registro {
                InsertCliente (Query: $Query)
              }
            }
          }
        `,
          variables: {
            Query: {
              Nombre: Nombre,
              Telefono: Telefono,
              Email: Email,
              Obv: "Cliente SandBox Test"
            }
          }
        }
      });

      let Result = axdata.data.data.BonosM.Registro.InsertCliente;

      console.log("Cliente: " + Result);
      if (Result > 0) {
        return Result;
      } else {
        setPayStatus({
          Status: "Ocurrió un error, por favor intenta más tarde",
          Color: "red"
        });
        return 0;
      }
    }
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
  const [Monto, setMonto] = useContext(StateContext).Monto;

  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto} : {Monto / 100}
        </Titulo>
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Form1 = (...props) => {
  // const [Theme] = useContext(StateContext).Theme;

  const Estilo = useThemeUI().theme.styles;

  const [Nombre, setNombre] = useContext(StateContext).Nombre;
  const [Telefono, setTelefono] = useContext(StateContext).Telefono;
  const [Email, setEmail] = useContext(StateContext).Email;
  const [Monto, setMonto] = useContext(StateContext).Monto;

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
        minHeight: 256
      }}
    >
      <div>
        <Flex>
          <Box bg="White" css={{ height: 34 }} />
          <Text sx={Estilo.h2a}>Selecciona el Bono que deseas adquirir:</Text>
        </Flex>
        <Box bg="White" css={{ height: 8 }} />

        <Flex>
          <Button
            sx={{
              width: "100%",
              height: "44px",
              "&:hover": { color: "text" }
            }}
            bg={BotonesOp.Boton1.Color}
            color={BotonesOp.Boton1.Text}
            onClick={() => {
              setMonto(BotonesOp.Boton1.Importe);
              setBotonesOp({
                Boton1: {
                  Status: "Bono de 300  (Recibes 350)",
                  Color: "green",
                  Text: "white",
                  Importe: 30000
                },
                Boton2: {
                  Status: "Bono de 500  (Recibes 600)",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 50000
                },
                Boton3: {
                  Status: "Bono de 1000  (Recibes 1250)",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 100000
                }
              });
            }}
          >
            Bono de 300 (Recibes 350)
          </Button>
        </Flex>

        <Box bg="White" css={{ height: 13 }} />

        <Flex>
          <Button
            sx={{
              width: "100%",
              height: "44px",
              "&:hover": { color: "text" }
            }}
            bg={BotonesOp.Boton2.Color}
            color={BotonesOp.Boton2.Text}
            onClick={() => {
              setMonto(BotonesOp.Boton2.Importe);
              setBotonesOp({
                Boton1: {
                  Status: "Bono de 300  (Recibes 350",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 30000
                },
                Boton2: {
                  Status: "Bono de 500  (Recibes 600",
                  Color: "green",
                  Text: "white",
                  Importe: 50000
                },
                Boton3: {
                  Status: "Bono de 1000  (Recibes 1250",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 100000
                }
              });
            }}
          >
            Bono de 500 (Recibes 600)
          </Button>
        </Flex>

        <Box bg="White" css={{ height: 13 }} />

        <Flex>
          <Button
            sx={{
              width: "100%",
              height: "44px",
              "&:hover": { color: "text" }
            }}
            bg={BotonesOp.Boton3.Color}
            color={BotonesOp.Boton3.Text}
            onClick={() => {
              setMonto(BotonesOp.Boton3.Importe);
              setBotonesOp({
                Boton1: {
                  Status: "Bono de 300  (Recibes 350",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 30000
                },
                Boton2: {
                  Status: "Bono de 500  (Recibes 600",
                  Color: "#D3D3D3",
                  Text: "#696969",
                  Importe: 50000
                },
                Boton3: {
                  Status: "Bono de 1000  (Recibes 1250",
                  Color: "green",
                  Text: "white",
                  Importe: 100000
                }
              });
            }}
          >
            Bono de 1,000 (Recibes 1,250)
          </Button>
        </Flex>

        <Flex
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box bg="White" css={{ height: 34 }} />
          <Text sx={Estilo.h2a}>Nombre</Text>

          <Box>
            <Input {...useChange(Nombre, setNombre)} />
          </Box>
        </Flex>

        <Box bg="White" css={{ height: 21 }} />

        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "20%" }}>
            <Text sx={Estilo.h2a}>Teléfono</Text>
          </Box>

          <Box sx={{ width: "54%" }}>
            <Input {...useChange(Telefono, setTelefono)} />
          </Box>
        </Flex>

        <Box bg="White" css={{ height: 21 }} />

        <Flex>
          <Box sx={{ width: "20%" }}>
            <Text sx={Estilo.h2a}>Email</Text>
          </Box>

          <Box sx={{ width: "80%" }}>
            <Input {...useChange(Email, setEmail)} />
          </Box>
        </Flex>

        <Box bg="White" css={{ height: 34 }} />
      </div>
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
    const [Telefono, setTelefono] = useContext(StateContext).Telefono;
    const [Email, setEmail] = useContext(StateContext).Email;
    const [Loading, setLoading] = useContext(StateContext).Loading;
    const [Indica, setIndica] = useContext(StateContext).Indica;
    const [Disabled, setDisabled] = useContext(StateContext).Disabled;
    const [Monto, setMonto] = useContext(StateContext).Monto;

    const handleSubmit = async ev => {
      //setLoading(true);
      ev.preventDefault();

      if (!Email) {
        setIndica("Ingresa el Email");
        return false;
      }

      if (Monto === 0) {
        setIndica("Selecciona un Bono a adquirir");
        return false;
      }

      setPayStatus({ Status: "Procesando...", Color: "blue" });

      let Cliente = await CreateCliente(Nombre, Telefono, Email);

      if (Cliente > 0) {
        console.log("Cliente creado: " + Cliente);

        if (props.stripe) {
          let Pago;
          let Token = await props.stripe.createToken();
          // console.log("Token:" + JSON.stringify(Token));
          if (Token.token) {
            Pago = await PayStripe(Token, Cliente);
          } else {
            Pago = 0;
          }

          // let Pago = await PayStripe(
          //   { token: { id: "TT0Ken", client_ip: "299.300" } },
          //   Cliente
          // ); //test

          // let Pago = 1; // test

          if (Pago === 1) {
            setPayStatus({ Status: "Pagado", Color: "green" });
            setIndica(
              "GRACIAS POR TU COMPRA! En unos momentos recibirás un email (revisa en tu bandeja de correo no deseado). Si tienes dudas comunícate al 667 716 1800"
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
            <Box bg="White" css={{ height: 13 }} />

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

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getSaldo } = useData();
  const [Indica, setIndica] = useContext(StateContext).Indica;

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "80%" }}>
            <Text sx={Estilo.h2}>{Indica}</Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
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
          <EncabezadoImagen {...props} texto="Pagar Bono Sushi Factory" />
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
          <Encabezado {...props} texto="Pagar Bono Sushi Factory" />
          <StripeProvider apiKey="pk_test_zPLWi1QgcEijbjkGMlqJDYNd00iy0SY35c">
            <Checkout />
          </StripeProvider>

          <Pie {...props} />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
