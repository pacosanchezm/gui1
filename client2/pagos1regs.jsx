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
          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Pedido</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Cuenta</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Entrega</Text>
          </Box>




          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Fecha</Text>
          </Box>

          <Box sx={{ width: "30%" }}>
            <Text sx={Estilo.h2}>Cliente</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Confirmado</Text>
          </Box>


          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Importe</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Pagado</Text>
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

  const Renglones = props.Registros.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC")

    return (
      <Renglon
        key={row.Id}
        Row={row}
        Color={Micolor}
        setPedido={props.setPedido}
        navigate={props.navigate}
        setLoadingDet={props.setLoadingDet}
        //setTipoAnim={props.setTipoAnim}
      />
    );
  });

  return (
    <Flex>
      {props.Registros ? <Box sx={{ width: "100%" }}>{Renglones}</Box>  : <Box sx={{ width: "100%" }}></Box> 
      }

    </Flex>
  );
};

//
// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setPedido, navigate, setLoadingDet } = props;

  return (
    <Flex sx={{ width: "100%", bg: Color }}>
      <Button
        sx={{
          width: "100%",
          bg: "transparent"
        }}
        onClick={() => {
          setPedido(Row.Id);
          //setTipoAnim(1);
          setLoadingDet(true)
          navigate("/det");
        }}
      >
        <Flex sx={{ width: "100%", bg: Color }}>
          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>{Row.Id}</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>{Row.Cuenta}</Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>{Row.TipoEntrega}</Text>
          </Box>



          <Box sx={{ width: "15%" }}>
            {/* <Text sx={Estilo.h2}>{moment(Row.Fecha).format("DD MMM")}</Text> */}
            <Text sx={Estilo.h2}>
              {moment(Row.Fecha).format("DD MMM HH:mm")}
            </Text>
          </Box>

          <Box sx={{ width: "30%", textAlign: "left" }}>
            <Text sx={Estilo.h2}>
              {Row.Telefono} {Row.Nombre}
            </Text>
          </Box>


          <Box sx={{ width: "15%" }}>
            {/* <Text sx={Estilo.h2}>{moment(Row.Fecha).format("DD MMM")}</Text> */}
            <Text sx={Estilo.h2}>
              {moment(Row.Confirmado).format("DD MMM HH:mm")}
            </Text>
          </Box>




          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2s(Row.Monto)}>{Row.Monto} </Text>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2s(Row.Pagado)}>{Row.Pagado} </Text>
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
          <Encabezado {...props} texto="Pedidos" />
          {props.Loading ? <Spinner size={30} /> : <Listado {...props} />}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------


