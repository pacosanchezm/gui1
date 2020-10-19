import React, { useState, useEffect, useContext, createContext } from "react";

import moment from "moment";
//import axios from "axios";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Grid, Button, Text, Textarea, Image, Spinner, Input, Label, Radio } from "@theme-ui/components";


import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe, StripeProvider, Elements} from "react-stripe-elements";

  import Theme from "../css/cssui/theme";

  import Dropbox from "react-select";
  import DropboxCss from "../css/css5/select";
  //import { usePosition } from "./csuseposition";

  

let App;
// ----------------------------------------------------------------


const Colores = [
  { value: "Otro", label: "Otro" },
  { value: "Blanco", label: "Blanco" },
  { value: "Negro", label: "Negro" },
  { value: "Gris", label: "Gris" },
  { value: "Rojo", label: "Rojo" },
  { value: "Azul", label: "Azul" },
  { value: "Amarillo", label: "Amarillo" },
  { value: "Verde", label: "Verde" },
  { value: "Cafe", label: "Cafe" },
];




const StateContext = createContext();
const CtxPayStatus = createContext({ Status: "Pagar", Color: "grey" });
const CtxBrand = createContext("pf pf-credit-card");

const CtxMonto = createContext(0);
const CtxEnvio = createContext(0);

const CtxServicio = createContext(0);

const CtxImporte = createContext(0);

const CtxPagado = createContext(0);
const CtxObv = createContext("");
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



const CtxLoading = createContext(false);





// ----------------------------------------------------------------------


const useStateLocal = () => {
  return {

    PayStatus: useState(useContext(CtxPayStatus)),
    CardBrand: useState(useContext(CtxBrand)),
    Monto: useState(useContext(CtxMonto)),
    Envio: useState(useContext(CtxEnvio)),

    Servicio: useState(useContext(CtxServicio)),
    Importe: useState(useContext(CtxImporte)),

    Pagado: useState(useContext(CtxPagado)),

    Obv: useState(useContext(CtxObv)),
    Indica: useState(useContext(CtxIndica)),
    Disabled: useState(useContext(CtxDisabled)),

    BotonesOp: useState(useContext(CtxBotonesOp)),



    Loading: useState(useContext(CtxLoading)),






  };
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};



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


// --------------------------------------------------------------------------


const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <Box
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 1,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            {props.texto}
          </Box>
        </Flex>

      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


const Form1 = (props) => {
  // const [Theme] = useContext(StateContext).Theme;

  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).Loading;

  // const [Nombre] = useContext(StateContext).Nombre;
  // const [Pedido] = useContext(StateContext).Pedido;

  // const [Email, setEmail] = useContext(StateContext).Email;
  //const [Monto] = useContext(StateContext).Monto;
  //const [Cuenta] = useContext(StateContext).Cuenta;
  //const [Fecha] = useContext(StateContext).Fecha;
  const [Obv] = useContext(StateContext).Obv;
  //const [Pagado] = useContext(StateContext).Pagado;

  const [Servicio, setServicio] = useContext(StateContext).Servicio;
  const [Envio, setEnvio] = useContext(StateContext).Envio;

  const [BotonesOp, setBotonesOp] = useContext(StateContext).BotonesOp;

  const Cuenta = props.Cuenta;

  let Pagado = props.Pagado


  const setTipoEntrega = props.setTipoEntrega;
  const TipoEntrega = props.TipoEntrega;

  const setTipoPago = props.setTipoPago;
  const TipoPago = props.TipoPago;
  const Monto = props.Monto;





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
    <div>

      {Pagado > 0 ? (
            <Flex>
              <Box bg="White" css={{ height: 34 }} />
              <Text sx={Estilo.h4}>Ticket Ya Pagado: ${Pagado}</Text>
            </Flex>
          ) : (
            <div>


              <Flex >
                <Text sx={Estilo.t1}>
                  Tu cuenta es: $ {Cuenta.Monto}
                </Text>
              </Flex>

            <Box as='form'
              onSubmit={e => e.preventDefault()}
            >




              <Grid sx={{p:2, m: 2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

                <Box sx={{ width: "100%", p:0}}>
                  <Text sx={Estilo.t3s}>
                    ¿Cómo entregaremos tu pedido?
                  </Text>
                </Box>

                <Box>
                  <Flex sx={Estilo.t1s}>

                    <Label sx={{m:0}}>
                      <Radio
                        name='entrega'
                        defaultChecked={TipoEntrega===1 ? true : false}
                        onChange={()=>{
                          setTipoEntrega(1)
                          setEnvio(0)
                        }}
                      />
                       En la sucursal (ToGo)
                    </Label>
                    <Label>
                      <Radio
                        name='entrega'
                        defaultChecked={TipoEntrega===2 ? true : false}
                        onChange={()=>{
                          setTipoEntrega(2)
                          setEnvio(30)
                        }}

                      />
                      A domicilio (+30)
                    </Label>

                  </Flex>
                </Box>

              </Grid>

            </Box>

              <Grid sx={{p:2, m:2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

                <Box sx={{ width: "100%", p:0}}>
                  <Text sx={Estilo.t3s}>
                    ¿Cómo deseas pagar?
                  </Text>
                </Box>

                <Box>
                  <Flex sx={Estilo.t1s}>

                    <Label sx={{m:0}}>
                      <Radio
                        name='pago'
                        defaultChecked={TipoPago===1 ? true : false}
                        onChange={()=>{
                          setTipoPago(1)
                          setServicio(0)
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
                      Efectivo / Tarjeta 
                    </Label>
                    <Label>
                      <Radio
                        name='pago'
                        defaultChecked={TipoPago===2 ? true : false}
                        onChange={()=>{setTipoPago(2)}}
                      />
                      Pago en Línea
                    </Label>

                  </Flex>
                </Box>

              </Grid>



             







            </div>
          )}


    </div>

  );
};


// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------


const Form2 = (props) => {
  // const [Theme] = useContext(StateContext).Theme;

  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).Loading;

  // const [Nombre] = useContext(StateContext).Nombre;
  // const [Pedido] = useContext(StateContext).Pedido;

  // const [Email, setEmail] = useContext(StateContext).Email;
  const [Monto] = useContext(StateContext).Monto;
  //const [Cuenta] = useContext(StateContext).Cuenta;
  //const [Fecha] = useContext(StateContext).Fecha;
  const [Obv] = useContext(StateContext).Obv;
  const [Pagado] = useContext(StateContext).Pagado;

  const [Servicio, setServicio] = useContext(StateContext).Servicio;
  const [Envio] = useContext(StateContext).Envio;

  const [BotonesOp, setBotonesOp] = useContext(StateContext).BotonesOp;

  const Cuenta = props.Cuenta;

  const setTipoPago = props.setTipoPago;
  const TipoPago = props.TipoPago;


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
    <div>

          <div>

            <Box bg="White" css={{ height: 5 }} />

              <Flex>
                <Box bg="White" css={{ height: 34 }} />
                <Text sx={Estilo.t3s}>
                  ¿Deseas incluir un extra para el repartidor?
                </Text>
              </Flex>

              <Box bg="White" css={{ height: 5 }} />

              <Flex>
                <Box sx={{ width: "25%", mr:2 }}>
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
                    height: "25px",
                    mr:2,
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton1.Color}
                  color={BotonesOp.Boton1.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta.Monto * 0.05));
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
                    height: "25px", mr:2,

                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton2.Color}
                  color={BotonesOp.Boton2.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta.Monto * 0.1));
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
                    height: "25px",
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton3.Color}
                  color={BotonesOp.Boton3.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta.Monto * 0.15));
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
        

              <Flex sx={{mt:3}}>
                <Text sx={Estilo.h4s}>
                  Total a Pagar: $ {Number(Cuenta.Monto) + Number(Servicio) + Number(Envio)}
                </Text>
              </Flex>


    </div>

  );
};


// -----------------------------------------------------------------------------




// -----------------------------------------------------------------------------


const Form3 = (props) => {
  // const [Theme] = useContext(StateContext).Theme;

  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).Loading;

  // const [Nombre] = useContext(StateContext).Nombre;
  //const [Pedido] = useContext(StateContext).Pedido;

  //const [Monto, setMonto] = useContext(StateContext).Monto;
  //const [Fecha] = useContext(StateContext).Fecha;
  //const [Obv, setObv] = useContext(StateContext).Obv;
  const [Pagado] = useContext(StateContext).Pagado;

  const [Servicio, setServicio] = useContext(StateContext).Servicio;
  const [Envio] = useContext(StateContext).Envio;

  const [BotonesOp, setBotonesOp] = useContext(StateContext).BotonesOp;

  const Cuenta = props.Cuenta;
  const Monto = props.Monto;

  const setTipoPago = props.setTipoPago;
  const TipoPago = props.TipoPago;

  const {ShareLocation, setShareLocation} = props
  const {useAcciones} = props
  const {Marca, setMarca, Color, setColor, LocObv, setLocObv} = props

// ----

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


// ----------------------------

  const Confirmar = () => {

    if(Monto>0) {return  (
      <div>
        <Box bg="White" css={{ height: 55 }} />
        <Text sx={Estilo.h4sub}> Gracias! Hemos recibido tu pedido, en unos momentos nos pondremos  en  contacto contigo para confirrmarlo</Text>
        <Box bg="White" css={{ height: 34 }} />
      </div>
    
    )} else{ return (        
      

      <div>

        <Flex sx={{mt:3}}>
          <Text sx={Estilo.h4s}>
            Total a Pagar: $ {Number(Cuenta.Monto) + Number(Servicio) + Number(Envio)}
          </Text>
        </Flex>


        <Box bg="White" css={{ height: 55 }} />
          <Text sx={Estilo.h4sub}> El pago se  hará al entregarse el pedido </Text>
        <Box bg="White" css={{ height: 34 }} />



          <Button
            sx={{ height: "34px", mb: 3, width: "100%" }}
            bg={"#A52A2A"}
            Disabled={false}
            onClick={ () => {props.usedata.Pedidos().confirma(Cuenta.Monto + Number(Envio))}}
          >
            Aceptar y Hacer Pedido
          </Button>

          <Box bg="White" css={{ height: 34 }} />


        </div>
      )}

  }

// ------------------------------------

// ----------------------------

const CompartirLoc = () => {

  if(!Envio && Monto>0){
    return (

    
  <div>


      <Flex sx={{ width: "100%", bg: Color }}>

        <Box sx={{ width: "50%", mr:2 }}>
          <Text sx={Estilo.t3s}> ¿Qué marca / modelo es tu auto?</Text>
        </Box>

        <Box sx={{ width: "50%", mr:2 }}>
          <Input
            {...useChange(Marca, setMarca)}
          />
        </Box>
      </Flex>

      <Box bg="White" css={{ height: 5 }} />

      <Flex>
        <Box sx={{ width: "50%", mr:2 }}>
          <Text sx={Estilo.t3s}> ¿Qué color?</Text>
        </Box>

        <Box sx={{ width: "50%" }}>
            <Dropbox
              name="Color"
              isSearchable={false}
              styles={DropboxCss.filtro2}
              value={{
                value: Color,
                label: Color
              }}
              options={Colores}
              onChange={async e => {
                await setColor(e.value);
              }}
            />
        </Box>
      </Flex>

      <Box bg="White" css={{ height: 13 }} />


      <Flex sx={{ width: "100%", bg: Color }}>
        <Button
          sx={{ height: "34px", mb: 3, width: "100%" }}
          bg={ShareLocation ? "green":"#A52A2A"}
          Disabled={false}
          onClick={ async () => {
            await setShareLocation(!ShareLocation)
            useAcciones.addPositionIni()
          }}
        >
          Compartir Ubicación
        </Button>
      </Flex>








      <Text sx={Estilo.h2}>Indicaciones:</Text>

      <Flex sx={{ width: "100%" }}>

      <Box sx={{ width: "100%" }}>
        <Textarea
          {...useChange(LocObv, setLocObv)}
          rows={3}
        />
      </Box>
      </Flex>
    </div>










    )
  } else return (<div/>)

}





// -------------------------------------


  return (
    <div>

      <Flex>
        {Confirmar()}
      </Flex>


      <Flex>
        {CompartirLoc()}
      </Flex>



    </div>

  );
};


// -----------------------------------------------------------------------------


























// -----------------------------------------------------------------------------



const SplitForm = props => {
  // const Estilo = useThemeUI().theme.styles;

  try {
    //const { PayStripe, CreateCliente } = useData();
    const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;
    const [CardBrand, setCardBrand] = useContext(StateContext).CardBrand;
    //const [Nombre, setNombre] = useContext(StateContext).Nombre;
    const [Loading, setLoading] = useContext(StateContext).Loading;
    const [Indica, setIndica] = useContext(StateContext).Indica;
    const [Disabled, setDisabled] = useContext(StateContext).Disabled;
    const [Monto, setMonto] = useContext(StateContext).Monto;
    const [Servicio, setServicio] = useContext(StateContext).Servicio;

    //const [Pagado, setPagado] = useContext(StateContext).Pagado;
    let Pagado = props.Pagado
    const setPagado = props.setPagado
    const Cuenta = props.Cuenta;
    const [Envio] = useContext(StateContext).Envio;

    const [refCard, setRefCard] = useState(null);
    const [refVenc, setRefVenc] = useState(null);
    const [refCvc, setRefCvc] = useState(null);















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

           console.log("Token:" + JSON.stringify(Token));

          //----------- El Bueno
            if (Token.token) {
              Pago = await props.usedata.Pagos().Stripe(Token, Number(Cuenta.Monto) + Number(Envio), Servicio);
            } else {
              Pago = 0;
            }

          // ---- el test
          // let Pago = await PayStripe(
          //   { token: { id: "TT0Ken", client_ip: "299.300" } },
          //   Cliente
          // ); //test

          // Pago = 1; // test

          if (Pago === 1) {
            setPayStatus({ Status: "Pagado", Color: "green" });
            setIndica(
              "GRACIAS POR TU COMPRA! Si tienes dudas comunícate al 55 21217784"
            );

            refCard.clear();
            refVenc.clear();
            refCvc.clear();

            setPagado(Number(Cuenta.Monto) + Number(Servicio) + Number(Envio))

            setMonto(Number(Cuenta.Monto) + Number(Envio))



          } else {
            setPayStatus({ Status: "Falla", Color: "orange" });
            setIndica("Si tienes dudas comunícate al 5521217784");
          }
        } else {
          console.log("Stripe.js hasn't loaded yet.");
        }
      } else {
        setIndica("Si tienes dudas comunícate al 5521217784");
      }
      setDisabled(true);
      setLoading(false);
      return true;
    };

    // let brandicon = useRef(null);

















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

<div>
              <Form2 {...props} />






              <form onSubmit={handleSubmit}>
                <Box bg="White" css={{ height: 11 }} />

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
                <Box bg="White" css={{ height: 21 }} />

                {/* <button>Pay</button> */}

                {/* <Button width={1} bg={PayStatus.Color} Disabled={Disabled}>
                  {PayStatus.Status}
                </Button> */}


                  <Button
                    sx={{ height: "34px", mb: 3, width: "100%" }}
                    bg={PayStatus.Color}
                    Disabled={Disabled}
                  >
                    {PayStatus.Status}
                  </Button>






              </form>

              </div>
          
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
          <SSplitForm fontSize={{ elementFontSize: "30px" }} 
            usedata={props.usedata}
            Cuenta={props.Cuenta}
            Pagado={props.Pagado}
            setPagado={props.setPagado}          
          />
          
        </Elements>
      </div>

    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------




// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
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

// -----------------------------------------------------------------




















// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {


  let token = "pk_live_mACxLJxa59sA5vaLUlnL26ww004oD7fung";
  if (props.Suc === 6) {token = "pk_live_XeCZoqEJLdnAqKuLRoMTrETC00501hfITJ";} //Fortuna
  if (props.Suc === 11) {token = "pk_live_gAvCBHk4hD5pLpSBTl75RJRI00G0c6pnCT"} //Esfera


  return (
    <ContextProvider theme={props.Theme}>
      <Flex>
        <Box sx={{ width: "100%" }}>
          {/* {console.log(props.LoadingDet)} */}
          {/* {props.LoadingDet ? (
            <Spinner />
          ) : (
            <Form {...props} texto="Detalle de Pedido" />
          )} */}

          {/* <Form {...props} texto="Detalle de Pedido" /> */}

          {/* <Encabezado {...props} texto="Pagar" /> */}

          <Form1 {...props} />


          {props.TipoPago===1 ? (
            <div>
              <Form3 {...props} />
            </div>
          ) : (
            <div>
              {/* <Form2 {...props} /> */}
              <StripeProvider apiKey={token}>
                <Checkout 
                  usedata={props.usedata}
                  Cuenta={props.Cuenta}
                  Pagado={props.Pagado}
                  setPagado={props.setPagado}
                />
              </StripeProvider>
              <Pie {...props} />


            </div>
          )}






        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------