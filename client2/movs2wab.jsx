import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxSaldo = createContext(0);

// ------------------

const useStateLocal = () => {
  return {
    Saldo: useState(useContext(CtxSaldo))
  };
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <Box
            pt={3}
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 2,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            {props.texto}
          </Box>
        </Flex>

        <Flex sx={{ width: "100%", bg: "primary" }}>
          <Box sx={{ width: "16%" }}>
            <Text sx={Estilo.h2}>Fecha</Text>
          </Box>

          <Box sx={{ width: "50%" }}>
            <Text sx={Estilo.h2}>Sucursal</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Puntos</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Saldo</Text>
          </Box>
          <Box sx={{ width: "5%" }}>
            <Text sx={Estilo.h2} />
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Listado = props => {
  let Micolor = "#DCDCDC";
  let Saldo = 0;

  const Renglones = props.Movimientos.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC");
    Saldo = Saldo + Number(row.Puntos);

    return (
      <Renglon
        key={row.Folio}
        Row={row}
        Color={Micolor}
        setDetFolio={props.setDetFolio}
        navigate={props.navigate}
        Saldo={Saldo}
        setTipoAnim={props.setTipoAnim}
      />
    );
  });

  return (
    <Flex>
      <Box sx={{ width: "100%" }}>{Renglones}</Box>
    </Flex>
  );
};

//
// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setDetFolio, navigate, Saldo, setTipoAnim } = props;

  return (
    <Flex sx={{ width: "100%", bg: Color }}>
      <Button
        sx={{
          width: "100%",
          bg: "transparent"
        }}
        onClick={() => {
          setDetFolio(Row.Folio);
          setTipoAnim(1);
          navigate("/det");
        }}
      >
        <Flex sx={{ width: "100%", bg: Color }}>
          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>{moment(Row.Fecha).format("DD MMM")}</Text>
          </Box>

          <Box sx={{ width: "50%", textAlign: "left" }}>
            <Text sx={Estilo.h2}>{Row.Sucursal}</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2s(Row.Puntos)}>{Row.Puntos} </Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>{Saldo}</Text>
          </Box>
          <Box sx={{ width: "5%" }}>
            <Text sx={Estilo.h2}>></Text>
          </Box>
        </Flex>
      </Button>
    </Flex>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Encabezado {...props} texto="Movimientos" />
          {props.Loading ? <Spinner size={30} /> : <Listado {...props} />}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
