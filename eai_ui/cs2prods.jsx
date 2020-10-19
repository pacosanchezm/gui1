import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";



/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import Theme from "../css/cssui/theme";


let App;

// -----------------------------------------------------------------------


const StateContext = createContext();
const CtxCategoria = createContext(0);


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


const Listado = props => {
  let Micolor = "#DCDCDC";
  const Estilo = useThemeUI().theme.styles;

  const ListaCategorias = () => {

    const Fotos = (Cat) => {
      return props.Registros.filter(v => v.CategoriasTitulo === Cat).map((row, i) => (
        <Renglon
          key={row.Id}
          Row={row}
          getDetalle={props.getDetalle}
          navigate={props.navigate}
          setRouter={props.setRouter}
          usedata={props.usedata}
        />
      ))
    }

  
    const Renglones = props.Categorias.map((row, i) => {
      return (
      <div>
        <Flex>
          <Text sx={Estilo.t3n}>{row.CategoriasTitulo}</Text>
        </Flex>  

        <Flex>
          <Box sx={{ width: "100%" }}>{Fotos(row.CategoriasTitulo)}</Box>
        </Flex>  
      </div>
      );
    });

    return (
      <Flex>
        <Box sx={{ width: "100%" }}>{Renglones}</Box>
      </Flex>
      );
  };
  























  return (
    <Flex>
      <Box sx={{ width: "100%" }}>{ListaCategorias()}</Box>
    </Flex>
  );
};

// -----------------------------------------------------------------------------


const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setPedido, navigate, setRouter, setTipoAnim, getDetalle,  usedata } = props;


  return (

      <Button
        sx={{width : "33%", bg: "transparent"}}

        onClick={() => {
          usedata.Productos().getDetalle(Row.Id)
          navigate("/det");
          setRouter(2)
        }}
      >

        <Image src={Row.ProductosFoto}
          sx={{borderRadius: 5,}}
          m={0}
        />




        <Text sx={Estilo.d2s2}>{Row.ProductosTitulo}</Text>
      
      </Button>
  )
};



// -----------------------------------------------------------------------------





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Encabezado {...props} texto="Menú" /> */}
          {props.Loading ? <Spinner size={21} /> : <Listado {...props} />}

          {/* <Listado {...props} /> */}

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
