import React, { useState, useEffect, useContext, createContext } from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Grid, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import Theme from "../css/cssui/theme";

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
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------


const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>

<Flex
        css={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256,
          width: "100%",
          alignItems: "center"
        }}
      >


        <Grid sx={{ width: "100%", borderTopStyle: "solid", borderWidth:0, borderColor: "#D3D3D3", alignItems: "center"}}>

          <Flex>
            <Box        
              css={{
                display: "flex",
                flexDirection: "column",
                minHeight: 55,
                width: "97%",
                alignItems: "center"
              }}
            >

              <Image src={props.Images.logo3.src} />

            </Box>
          </Flex>



          <Flex sx={{ width: "100%" }}>
          <Box        
              css={{
                display: "flex",
                flexDirection: "column",
                minHeight: 55,
                width: "100%",
                alignItems: "center"
              }}
            >
            <Text sx={Estilo.l1}>¡Hola {props.Nombre}!</Text>
          </Box>
        </Flex>




          <Flex>
            <Box        
              css={{
                display: "flex",
                flexDirection: "column",
                minHeight: 55,
                width: "100%",
                alignItems: "center"
              }}
            >

            <Button
                  sx={{
                    bg: "transparent",
                  }}
                  onClick={() => {
                    //usedata.Consumos().getDetalle(Row.Id)
                    props.setRouter(1)
                    props.navigate("/");
                  }}
                >



              <Image src={props.Images.menu1.src} />

              </Button>



            </Box>
          </Flex>

          <Flex>
            <Box        
              css={{
                display: "flex",
                flexDirection: "column",
                minHeight: 256,
                width: "100%",
                alignItems: "center"
              }}
            >

              <Image sx={{ width: "100%" }} src={props.Images.cover1.src} />

            </Box>
          </Flex>





        </Grid>


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
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Encabezado {...props} texto="Pedidos" /> */}
          {props.LoadingDet ? <Spinner size={33} /> : <Encabezado {...props} />}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
