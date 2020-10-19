import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Radio, Checkbox, Spinner } from "@theme-ui/components";

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

    const Renglones = (Cat) => {
      return props.ExtrasDet.filter(v => v.Titulo === Cat).map((row, i) => (
        <Renglon 
          key={row.ExtrasDetId}
          row={row}
          i={i}
          ExtrasDet={props.ExtrasDet}
          setExtrasDet={props.setExtrasDet}
          setEditado={props.setEditado}
          usedata={props.usedata}

        />
      ))
    }



    const Grupos = props.Extras.map((row, i) => {
      return (
      <div>
        <Flex>
          {/* <Text sx={Estilo.t2}>{row.ExtrasTitulo}: $ {props.usedata.Extras().sum}</Text> */}
        </Flex>  

        <Flex>
          <Box sx={{ width: "100%" }}>{Renglones(row.ExtrasTitulo)}</Box>
        </Flex>  
      </div>
      );
    });

    return (
      <Flex>
        <Box sx={{ width: "100%" }}>{Grupos}</Box>
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
  const { row, Color, setPedido, navigate, setTipoAnim, i } = props;
  const [Cantidad, setCantidad] = useState(props.row.ExtrasDetCantidad);

  const ClickExtra = (x) => {
    props.setExtrasDet(props.ExtrasDet.map((item, i) => {
      if (i===x) {return {...item, "ExtrasDetCantidad": item.ExtrasDetCantidad===1 ? 0 : 1}} 
      else {return item}
    }))
    props.setEditado(true)
  };

  return (
    <Flex pl={3} sx={{ width: "100%", bg: Color }}>
      <Button
        sx={{
          width: "100%",
          bg: "transparent"
        }}
        onClick={() => ClickExtra(i)}
              
      >
        <Flex sx={{ width: "100%", bg: Color }}>

          <Box sx={{ width: "70%", mr: 2 }}>
            <Text pt={"0px"} sx={Estilo.d2sn}>{row.ExtrasDetTitulo}</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text pt={"0px"} sx={Estilo.d2sn}>{row.ExtrasDetPrecio}</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Checkbox 
              //  sx={Estilo.h2}
              checked={row.ExtrasDetCantidad}
            />

          </Box>

        </Flex>
      </Button>
    </Flex>
  );
};

// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Encabezado {...props} texto="Extras" /> */}
          {/* {props.Loading ? <Spinner size={21} /> : <Listado {...props} />} */}
          <Listado {...props} />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------

