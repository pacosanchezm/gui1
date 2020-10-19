import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";

import MaskedInput from "react-text-mask";


let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxCategoria = createContext("X");


// ------------------

const useStateLocal = () => {
  return {
    Categoria: useState(useContext(CtxCategoria)),

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

// -------------------------------------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [LoadingSecc, setLoadingSecc] = props.useContext.LoadingSecc2;


 const [Detalle, setDetalle] = props.useContext.Detalle;
 const [Editado, setEditado] = props.useContext.Editado;
 const [Productos, setProductos] = props.useContext.Productos;
 const [Cupon, setCupon] = props.useContext.Cupon
 const [SponsorMeeting] = props.useContext.SponsorMeeting
 const [SponsorCupon] = props.useContext.SponsorCupon


// -----------------

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

// -----------------




const Modulo1  = () => {

  return (
    <div>

      <Grid bg="#999999" css={{ maxWidth: "610px" }}>
                  
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.msecc2}>{"Patrocinador"}</Text>
          </Box>
        </Flex>
      
      </Grid>


      <Box css={{ height: 13 }} />


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



        <Grid  css={{ maxWidth: "610px" }}>
            
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Text sx={Estilo.md1b}>{"Este evento no tiene costo para ti gracias a nuestro patrocinador:"}</Text>
              </Box>
            </Flex>

          </Grid>

          <Grid  css={{ maxWidth: "610px" }}>
    
            <Flex sx={{ width: "100%" }}>

              <Box sx={{ width: "100%" }}>


                <Button sx={{width : "33%", bg: "transparent"}} >

                  <Image 
                    src={SponsorMeeting.SponsorsLogo}
                    sx={{borderRadius: 5}}
                    mr={30}
                    loading="lazy"
                  />

                  <Text sx={Estilo.t2s2}>{SponsorMeeting.SponsorsTitulo}</Text>
                
                </Button>

              </Box>

             </Flex>

          </Grid>


        </Box>
      </Flex>
    </div>
  )
}

// -----------------



const Modulo2  = () => {

  return (
    <div>

      <Grid bg="#999999" css={{ maxWidth: "610px" }}>
                  
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.msecc2}>{"Patrocinador"}</Text>
          </Box>
        </Flex>
      
      </Grid>


      <Box css={{ height: 13 }} />


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

      <Grid  css={{ maxWidth: "610px" }}>
            
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Text sx={Estilo.md1b}>{"Este cupón es gracias a nuestro patrocinador:"}</Text>
              </Box>
            </Flex>

          </Grid>

          <Grid  css={{ maxWidth: "610px" }}>
    
            <Flex sx={{ width: "100%" }}>

              <Box sx={{ width: "100%" }}>


                <Button sx={{width : "33%", bg: "transparent"}} >

                  <Image 
                    src={SponsorCupon.Logo}

                    sx={{borderRadius: 5}}
                    mr={30}
                    loading="lazy"
                  />

                  <Text sx={Estilo.t2s2}>{SponsorCupon.Titulo}</Text>
                
                </Button>

              </Box>

             </Flex>

          </Grid>

        </Box>
      </Flex>
    </div>
  )
}








 try {

  //console.log("Sponsor: " + props.CompStatus.Sponsor())

  //console.log(props.CompStatus)



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




              { (props.CompStatus.Sponsor()===0) ? ModuloCero() : <div/>}
              { (props.CompStatus.Sponsor()===1) ? Modulo1() : <div/>}
              { (props.CompStatus.Sponsor()===2) ? Modulo2() : <div/>}




              {/* { (props.CompStatus.Cupon()===1) ? ModuloEdit() : <div/>} */}
              {/* { (props.CompStatus.Cupon()===0) ? ModuloCero() : ModuloEdit()} */}


              


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
  
          <Body {...props} texto="info" />
  
        </Box>
      </Flex>
    </ContextProvider>
  );
  });
  
  // -------------------------------------------------------------------------------
  