import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Link } from "@theme-ui/components";

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

// --------------------------------------------


const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [LoadingSecc, setLoadingSecc] = props.useContext.LoadingSecc5;
 const [Meetings] = props.useContext.Meetings;
 const [PedidoQ] = props.useContext.PedidoQ;
 const [Detalle] = props.useContext.Detalle;



 const ColorBoton = function(props) {
  return "#228B22";
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

        <Grid bg="#2952a3" css={{ maxWidth: "610px" }}>
  
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.msecc2}>{"Inscripción"}</Text>
            </Box>
          </Flex>
        </Grid>



          <Grid bg="whitesmoke" css={{ maxWidth: "610px" }}>
          <Box css={{ height: 13 }} />

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.md1}>{"Apúntate a nuestro evento aquí:"}</Text>
            </Box>
          </Flex>

          <Box css={{ height: 13 }} />




          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              
          

          </Flex>

          <Box css={{ height: 13 }} />

        </Grid>

      </Box>
    </Flex>
  )
}



const ModuloListo  = () => {

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

        <Grid bg="#2952a3" css={{ maxWidth: "610px" }}>
  
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.msecc2}>{"Listo!"}</Text>
            </Box>



          </Flex>

          </Grid>



          <Grid bg="whitesmoke" css={{ maxWidth: "610px" }}>

            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t3_3}>{"Entra aquí para hacer tu orden:"}</Text>
            </Box>

            <Box css={{ height: 13 }} />


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

                <Link 
                  href={"https://smxai.net/SushiFactoryMesas?id=" + PedidoQ + "&token=" + Detalle.Cliente}
                >


                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={"#1E90FF"}
                    Disabled={false}

                  >
                  <Text sx={Estilo.mbtn1}>Entrar</Text>

                  </Button>
                
                  </Link>
              </Box>
          </Flex>



          <Box css={{ height: 13 }} />




        </Grid>




        <Grid bg="whitesmoke" css={{ maxWidth: "610px" }}>
        <Box css={{ height: 13 }} />


          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.md1}>{"Si deseas invitar a tus acompañantes a que agreguen platillos a tu orden, compárteles este link:"}</Text>
          </Box>

          <Box css={{ height: 5 }} />

          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.md1}>{"https://smxai.net/SushiFactoryQR?id=" + props.id}</Text>
          </Box>

          <Box css={{ height: 13 }} />

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

              <Link 
                href={"https://wa.me/?text=" + encodeURI("únete a mi orden Sushi Factory: https://smxai.net/SushiFactoryQR?id='" + props.id + "'")}
                target={"_blank"}
              >


                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={"#32CD32"}
                    Disabled={false}

                  >
                  <Text sx={Estilo.mbtn1}>Mandar por Whatsapp</Text>

                  </Button>
                
                  </Link>

              </Box>
          </Flex>

            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.md1}>{"o pídeles que escaneen el código QR de la mesa"}</Text>
            </Box>

        </Grid>




      </Box>
    </Flex>
  )
}







  try {
    return (
      <div>
      
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
                
                {(props.CompStatus.Roll()===0) ? ModuloCero() : <div/>}
                {(props.CompStatus.Roll()===1) ? ModuloSimple() : <div/>}
                {(props.CompStatus.Roll()===2) ? ModuloListo() : <div/>}

              </Box>
            </Flex>

          </div>
       
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

          <Body {...props} texto="Roll" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------




