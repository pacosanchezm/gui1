import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Textarea, Image, Spinner } from "@theme-ui/components";

import Theme from "../css/cssui/theme";

//import Extras from "./cs1extras";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxCantidad = createContext(1);

const CtxObv = createContext("");

// ------------------


const useStateLocal = () => {
  return {
    Obv: useState(useContext(CtxObv)),
    Cantidad: useState(useContext(CtxCantidad))

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
  const Detalle  = props.Detalles
  const setDetalle  = props.setDetalle

  const setEditado  = props.setEditado


  try {

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



    const useChangeArray = (MiArray, Field, setField) => {
      return {
        name: Field,
        value: MiArray[Field],
        fontSize: 1,
        color: "#FFFFF",
        bg: "#FFFFF",
        onChange: e => {
          setField({ ...MiArray, [Field]: e.target.value });
          setEditado(true);
        }
      };
    };








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
            <Image sx={{ width: "100%" }} src={Detalle.ProductosFoto2} />
          </Box>
        </Flex>

        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text 
              sx={Estilo.t1}
            >{Detalle.ProductosTitulo}
            </Text>
          </Box>
        </Flex>

        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.d1}>{Detalle.ProductosDescripcion} </Text>
          </Box>
        </Flex>


        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.l1}>${Detalle.ConsumosPrecio} </Text>
          </Box>
        </Flex>



        <Text sx={Estilo.h2}>Indicaciones:</Text>




        <Flex sx={{ width: "100%" }}>

          <Box sx={{ width: "100%" }}>
            <Textarea
              {...useChangeArray(Detalle, "ConsumosObv", setDetalle)}
              rows={3}
            />
          </Box>
        </Flex>



        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.d1}>{Detalle.ProductosObv} </Text>
          </Box>
        </Flex>









        {/* <Extras {...props}
          texto="Producto"
          
        /> */}


      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex>
        <Box sx={{ width: "100%" }}>

          {props.LoadingDet ? (<Spinner size={33} />) : (
            <Encabezado {...props} texto="Producto" />
          )}


          {/* <Encabezado {...props} texto="Producto" /> */}

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------




