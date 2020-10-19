import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxCategoria = createContext("X");


// ------------------


const useStateLocal = () => {
  return {
    Categoria: useState(useContext(CtxCategoria))
  };
};


// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={props.Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------


const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [LoadingSecc] = props.useContext.LoadingSecc3;


 const [Detalle, setDetalle] = props.useContext.Detalle;
 const [Editado, setEditado] = props.useContext.Detalle;



 const useChangeArray = (MiArray, Field, setField) => {
  return {
    name: Field,
    value: MiArray[Field],
    fontSize: 1,
    color: "#595959",
    bg: "#DCDCDC",
    onChange: e => {
      setField({ ...MiArray, [Field]: e.target.value });
      setEditado(true);
    }
  };
};

const ColorGuardar = function(props) {
  if (Editado) return "grey";
};






const ModuloCero  = () => {

  return (
    <Flex sx={{ width: "100%" }}>
      <Box
        //bg="primary"
        sx={{
          fontWeight: "normal",
          fontSize: 1,
          color: "text",
          fontFamily: "body",
          width: "100%"
        }}
      >

      </Box>
    </Flex>
  )
}














const ModuloSimple  = () => {

  return (
    <Flex sx={{ width: "100%" }}>
      <Box
        //bg="primary"
        sx={{
          fontWeight: "normal",
          fontSize: 1,
          color: "text",
          fontFamily: "body",
          width: "100%"
        }}
      >

        <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Cupón</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalle, "Cupon", setDetalle)} />
            </Box>


          </Flex>

        </Grid>

      </Box>
    </Flex>
  )
}














  try {
    return (
      <div>
        {LoadingSecc ? <Spinner size={21} /> : (
          <div>
            <Flex sx={{ width: "100%" }}>
              <Box
                //bg="primary"
                sx={{
                  fontWeight: "normal",
                  fontSize: 1,
                  color: "text",
                  fontFamily: "body",
                  width: "100%"
                }}
              >

                { (props.CompStatus.Comp3()===0) ? ModuloCero() : ModuloSimple()}



              </Box>
            </Flex>

          </div>
        )}
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
    <ContextProvider Theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <Body {...props} texto="orden" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------








