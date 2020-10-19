import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Grid, Box, Button, Text, Image, Spinner, Close } from "@theme-ui/components";

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
        <Flex sx={{ width: "100%" }}>
          <Box
            pt={3}
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

// -----------------------------------------------------------------------------

const Listado = props => {
  let Micolor = "#f2f2f2";

  const Renglones = props.Registros.map((row, index) => {
    Micolor === "#f2f2f2" ? (Micolor = "White") : (Micolor = "#f2f2f2");

    return (
      <Renglon
        key={row.Id}
        Row={row}
        Color={"White"}
        navigate={props.navigate}
        setRouter={props.setRouter}

        i={index}
        usedata={props.usedata}

        getDetalleConsumo={props.getDetalleConsumo}
        deleteRegistro={props.deleteRegistro}
        Pagado={props.Pagado}


      />
    );
  });

  return (
    <div>


      <Box bg="White" css={{ height: 13 }} />

      <Grid sx={{p:2, m: 2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>



      <Flex>
        <Box sx={{ width: "100%" }}>{Renglones}</Box>
      </Flex>


    </Grid>

      <Box bg="White" css={{ height: 13 }} />


      <Flex>

        <Box sx={{ width: "30%"}}>
          <Button
            sx={{ height: "100%", ml: 3, width: "100%", fontSize: 2, }}
            bg={"#A52A2A"}
            Disabled={false}
            onClick={() => {
              props.navigate("/");
              props.setRouter(1)
            }}
          >
            Agregar
          </Button>
        </Box>

      </Flex>

      

    </div>
  );
};



// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, navigate, setRouter, getDetalleConsumo, i, usedata } = props;

  return (
    <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

        <Flex sx={{ width: "100%", bg: Color }}
          columns={[1,null,2]}
        >
            <Flex sx={{ width: "25%", bg: Color, pr:2 }}>


              <Button
                sx={{
                  width: "100%",
                  bg: "transparent",
                  p:0
                }}
                onClick={() => {
                //getDetalleConsumo(Row.Id);
                  usedata.Consumos().getDetalleC(Row.Id)
                  setRouter(5)
                  navigate("/det");
                }}
              >

                <Image sx={{ height: "55px", borderRadius: 3 }} src={Row.ProductosFoto} />


              </Button>


            </Flex>

          


          <Grid sx={{ width: "75%", bg: Color, gridGap: 0 }}>


              <Button
                  sx={{
                    bg: "transparent",
                  }}
                  onClick={() => {
                    usedata.Consumos().getDetalleC(Row.Id)
                    setRouter(5)
                    navigate("/det");
                  }}
                >


            <Flex sx={{ width: "100%", bg: Color }}>

                  <Box sx={{ width: "70%" }}>
                    <Text sx={Estilo.t1s}>{Row.ProductosTitulo}</Text>
                  </Box>

                  <Box sx={{ width: "15%" }}>
                    {/* <Text sx={Estilo.t1s}>{Row.Cantidad}</Text> */}
                  </Box>

                  <Box sx={{ width: "15%" }}>
                    <Text sx={Estilo.l1s}>$ {Row.ConsumoTotal} </Text>
                  </Box>

            </Flex>

              </Button>


            <Flex sx={{ width: "100%", bg: Color }}>

              <Box sx={{ width: "90%" }}>
                <Text sx={Estilo.d1s}>{Row.Obv}</Text>
              </Box>


            {props.Pagado>0 ? (<div/>) : (



              <Box sx={{ width: "25px"}}>
                <Close
                  sx={{ height: "21px", mb: 0, width: "100%", fontSize: 2, }}
                  bg={"transparent"}
                  color={"#A52A2A"}
                  Disabled={false}
                  onClick={() => {usedata.Consumos().del(Row.Id)}}
                >
                  X 
                </Close>
              </Box>

            )}








            </Flex>

          </Grid>

        </Flex>

    </Grid>
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
          {/* <Encabezado {...props} texto="Pedidos" /> */}
          {props.LoadingDet ? <Spinner size={33} /> : <Listado {...props} />}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------