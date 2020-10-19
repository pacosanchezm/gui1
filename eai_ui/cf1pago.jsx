import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";

//import MaskedInput from "react-text-mask";
//import Ccard from "./cc1mp1"
import Ccard from "./cc1st1"


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
  const [LoadingSecc] = props.useContext.LoadingSecc4;
  const [Detalle] = props.useContext.Detalle;
  const [Productos, setProductos] = props.useContext.Productos;



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

      <div>

        <Grid bg="#999999" css={{ maxWidth: "610px" }}>
          
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.msecc2}>{"Costo" + (Productos.Precio>0 ? " $ " + Productos.Precio : "")}    </Text>
            </Box>
          </Flex>
        
        </Grid>

        <Flex sx={{ width: "100%" }} css={{ maxWidth: "610px" }}>
          <Ccard
            Indica={props.useContext.Indica}
            Pagar={(e) => props.useAcciones.PagarStripe(e)}
             token={"pk_test_51HOpsyGJ7Qox7HrulwMiLbcAReD0Q7T3gDWQ69GRiiYsZCuN6hO4X7XzX7L0jo97wRWqPGJhbCcyVlZMc3MwtRsE00rJ8gtEZR"}

            // token={"pk_live_51HOpsyGJ7Qox7Hru2YA4aF3IldU6R7BhKOhtdb0zEf3yy07eOHRNvRjfGPvZd7OBVaSKCIzK4EO7P8jwRxMvnSo600gmaYSDCE"}
          />

        </Flex>   



      </div>
    )
  }
  

  

  const ModuloPagado  = () => {

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

              <Grid bg="#333333" css={{ maxWidth: "610px" }}>
                
                <Flex sx={{ width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <Text sx={Estilo.msecc1}>{"Pagado"}</Text>
                  </Box>
                </Flex>
              
              </Grid>
        
        
            <Box css={{ height: 8 }} />

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



                { (props.CompStatus.Comp4()===0) ? ModuloCero() : <div/>}
                { (props.CompStatus.Comp4()===1) ? ModuloSimple() : <div/>}
                { (props.CompStatus.Comp4()===2) ? ModuloPagado() : <div/>}




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

          <Body {...props} texto="Pago" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
