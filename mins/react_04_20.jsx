import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  Component
} from "react";

import "@babel/polyfill";

import Theme from "../../css/cssui/theme";

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

// ----------------------------------------------------------------
let App;

let Images = {
  logo1: {
    src: "https://smxai.net/sf/pagos1.jpg"
  },
  logo2: {
    src: "https://smxai.net/sf/eglogo1.jpeg"
  }
};

// ------------------

const StateContext = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  </StateContext.Provider>
);

// ------------------

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  // useEffect(() => {
  //   getRegistros(props);
  // }, []);

  try {
    return (
      <Flex>
        <Box bg={props.bg || "SlateGrey"}>
          <Text sx={{ ...Estilo.h4s, color: "white" }} fontSize={[4]}>
            {props.texto}
          </Text>
        </Box>
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
        />

        <Box
          sx={{
            maxWidth: "700px",
            width: "400px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >
          <Encabezado {...props} texto="Total a Pagar:" />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
