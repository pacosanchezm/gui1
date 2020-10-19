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
import { Button, Text, Image } from "rebass";
import { Flex, Box } from "@rebass/grid";
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

const StateContext = createContext();
const CtxTheme = createContext(theme.theme5);
const CtxPayStatus = createContext({ Status: "Pagar", Color: "grey" });
const CtxBrand = createContext("pf pf-credit-card");

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    PayStatus: useState(useContext(CtxPayStatus)),
    CardBrand: useState(useContext(CtxBrand))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    {children}
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

  //-------------------------

  return {
    PayStripe: async token => {
      console.log("PayStripe: " + token.token.id);

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
        mutation Stripe1M($Reg: StripePaymentIntent){
          Stripe1M{
            Charge{
              Create(Query: $Reg)
            }
          }
        }
        `,
          variables: {
            Reg: {
              Id: 999,
              Cart: 333,
              Token: 1234,
              SToken: token.token.id,
              Amount: 3300,
              Descripcion: "Conferencia1"
            }
          }
        }
      });

      console.log("update: " + axdata.data.data.Stripe1M.Charge.Create);
      if (axdata.data.data.Stripe1M.Charge.Create === 1) {
        setPayStatus({ Status: "Pagado", Color: "green" });
      } else {
        setPayStatus({ Status: "No Procesado", Color: "red" });
      }
    }
    //-------------------------
  };
};

// ------------------------------------------------------------------

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto}
        </Titulo>
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

const SplitForm = props => {
  try {
    const { PayStripe } = useData();
    const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus;
    const [CardBrand, setCardBrand] = useContext(StateContext).CardBrand;

    const handleSubmit = ev => {
      ev.preventDefault();

      setPayStatus({ Status: "Procesando...", Color: "blue" });

      if (props.stripe) {
        props.stripe.createToken().then(payload => {
          console.log("[token]", payload);
          PayStripe(payload);
        });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };

    // let brandicon = useRef(null);

    return (
      <form onSubmit={handleSubmit}>
        <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          Tarjeta
          <span className={"brand"} style={{ width: "30px", height: "30px" }}>
            <i
              style={{ width: "30px", height: "30px" }}
              // ref={brandicon}
              className={CardBrand}
            />
            <CardNumberElement
              {...createOptions(33)}
              onChange={e => {
                setCardBrand(defCardBrand(e.brand));
              }}
            />
          </span>
        </label>

        <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          Fecha de Expiración
          <CardExpiryElement onChange={handleChange} {...createOptions(15)} />
        </label>
        <label style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          CVC (Código de Seguridad)
          <CardCVCElement onChange={handleChange} {...createOptions(3)} />
        </label>

        {/* <button>Pay</button> */}

        <Button
          width={1}
          bg={PayStatus.Color}
          // onClick={() => {UsuarioU(setBotonC, setEdited, props.page);}}
        >
          {PayStatus.Status}
        </Button>
      </form>
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
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado {...props} texto="Pagar Conferencia" />

          <StripeProvider apiKey="pk_test_zPLWi1QgcEijbjkGMlqJDYNd00iy0SY35c">
            <Checkout />
          </StripeProvider>
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
