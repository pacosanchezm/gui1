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

import Barcode from "react-barcode";

// ----------------------------------------------------------------

let App;

const StateContext = createContext();
const CtxTheme = createContext(theme.theme5);
const CtxPayStatus = createContext({ Status: "Pagar", Color: "grey" });

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    PayStatus: useState(useContext(CtxPayStatus))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    {children}
  </StateContext.Provider>
);

// ------------------

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

// -----------------------------------------------------------------------------

const BarcodeBox = props => {
  try {
    const baropts = {
      width: 200,
      height: 100,
      format: "CODE128",
      displayValue: true,
      fontOptions: "",
      font: "monospace",
      textAlign: "center",
      textPosition: "bottom",
      textMargin: 2,
      fontSize: 20,
      background: "#ffffff",
      lineColor: "#000000",
      margin: 10,
      marginTop: undefined,
      marginBottom: undefined,
      marginLeft: undefined,
      marginRight: undefined
    };

    return (
      <Box bg={props.bg || "white"} p={1 / 1}>
        <Barcode
          style={{ width: "50px" }}
          value={props.code}
          options={baropts}
          height={55}
          width={1.5}
          fontSize={15}
        />
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado {...props} texto="Pagar Conferencia en Oxxo" />

          <BarcodeBox
            {...props}
            texto="Pagar Conferencia en Oxxo"
            code="12345678901234657890123456789012"
          />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
