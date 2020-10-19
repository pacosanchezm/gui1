import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import {
  Grid,
  Flex,
  Box,
  Button,
  Text,
  Image,
  Spinner
} from "@theme-ui/components";
//import mitheme from "../css/cssui/theme";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();

// ------------------

const useStateLocal = () => {
  return {};
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------------

const Form = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setDetFolio, navigate, setTipoAnim } = props;
  const { Detalles } = props;
  try {
    return (
      <div>
        <Flex>
          <Box
            p={4}
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 2,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            <Button
              variant="primary"
              onClick={() => {
                setTipoAnim(2);
                navigate("/movs");
              }}
            >
              {"<"}
            </Button>
            {props.texto}
          </Box>
        </Flex>

        <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Folio:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Folio}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Fecha:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Fecha}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Empresa:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Empresa}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Sucursal:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Sucursal}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Tipo de Movimiento:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Tipo}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Puntos:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Puntos}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Concepto:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles[0].Concepto}</Text>
            </Box>
          </Flex>
        </Grid>
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
    <ContextProvider theme={props.Theme}>
      <Flex>
        <Box sx={{ width: "100%" }}>
          {props.DetFolio == null ? (
            <Spinner />
          ) : (
            <Form {...props} texto="Detalle" />
          )}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
