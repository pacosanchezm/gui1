import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";

//import MaskedInput from "react-text-mask";


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
 const [Cupon, setCupon] = props.useContext.Cupon;

// const [LoadingCupon, setLoadingCupon] = useContext(StateContext).LoadingCupon


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

const ColorBoton = function(props) {
  if (Editado) return "#1E90FF";
};




const ModuloSimple  = () => {

  return (
    <div>

      {/* <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>
                
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.msecc1}>{"Participante"}</Text>
          </Box>
        </Flex>
      
      </Grid> */}


    <Box css={{ height: 8 }} />




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

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.h4s}>{Detalle.Nombre + " " + Detalle.Apellido}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.d1}>{Detalle.Email}</Text>
            </Box>
          </Flex>

          <Box css={{ height: 21 }} />


        </Box>
      </Flex>
    </div>
  )
}




const ModuloEdit  = () => {
//console.log(props)
  return (
    <div>

    {/* <Grid bg="#2952a3" css={{ maxWidth: "610px" }}>
                
    <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Text sx={Estilo.msecc2}>{"Participante"}</Text>
      </Box>
    </Flex>
    
  </Grid> */}


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

        <Grid bg="WhiteSmoke" css={{ maxWidth: "410px" }}>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Nombre</Text>
            </Box>
            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalle, "Nombre", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Apellidos</Text>
            </Box>
            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalle, "Apellido", setDetalle)} />
            </Box>
          </Flex>

          {/* <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Telefono</Text>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Input {...useChangeArray(Detalle, "Telefono", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Email</Text>
            </Box>
            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalle, "Email", setDetalle)} />
            </Box>
          </Flex> */}

          <Box css={{ height: 8 }} />


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              
           

              <Box sx={{ width: "54%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={ColorBoton()}
                    Disabled={false}
                    onClick={async () => {
                      setLoadingSecc(true)
                        await props.useAcciones.InfoAdd(props)
                      setLoadingSecc(false)


                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Continuar

                      {LoadingSecc ? <Spinner size={17} ml={3} /> : <div/>}

                       
                      </Text>

                     


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


                { (props.CompStatus.Comp1()===1) ? ModuloSimple() : ModuloEdit()}



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






