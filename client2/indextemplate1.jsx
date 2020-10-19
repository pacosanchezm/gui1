import React, { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

let App;

// -----------------------------------------------------------------------------

const StateContextM = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading))
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContextM.Provider>
  );
};

// ------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>
        <Flex sx={{ height: "55px", mb: 3 }} />

        <Flex>
          <Box
            sx={{
              p: 3,
              bg: "#ffcc00",
              fontWeight: "normal",
              fontSize: 4,
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

const Router1 = props => {
  const [Loading, setLoading] = useContext(StateContextM).Loading;

  const routeHolder1 = useRoutes(
    routes1({
      Theme,
      Loading
    })
  );

  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "100%" }}>
            {/* <Box>
              <A href={"/movs"}>
                <Button mr={7}>Movimientos</Button>
              </A>
              <Button variant="secondary">Detalles</Button>
            </Box> */}

            {routeHolder1}
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// ------------------------------------------

const routes1 = props => {
  return {
    "/": () => (
      // <Movs2wab
      //   Theme={props.Theme}
      //   navigate={props.navigate}
      //   Loading={props.Loading}
      //   setDetFolio={props.setDetFolio}
      //   Movimientos={props.Movimientos}
      // />
      <Text>raiz</Text>
    )
  };
};

// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;

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
              color: "white",
              fontFamily: "body",
              width: "100%"
            }}
          >
            Pie
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "50%" }}>
            <Text sx={Estilo.h2}>{props.texto}</Text>
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

export default (App = props => {
  return (
    <ContextProvider>
      <Flex>
        <Box sx={{ width: "100%" }}>
          <Encabezado {...props} texto="Encabezado" />
          <Router1 {...props} sx={{ width: "100%" }} />
          <Pie {...props} texto="PiedePag" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
