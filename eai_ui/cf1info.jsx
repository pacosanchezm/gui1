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
const CtxLoadingCupon = createContext(false);


// ------------------


const useStateLocal = () => {
  return {
    Categoria: useState(useContext(CtxCategoria)),
    LoadingCupon: useState(useContext(CtxLoadingCupon))

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
 const [LoadingSecc, setLoadingSecc] = props.useContext.LoadingSecc2;
 const [Loading, setLoading] = props.useContext.Loading;


 const [Detalle, setDetalle] = props.useContext.Detalle;
 const [Editado, setEditado] = props.useContext.Editado;
 const [Productos, setProductos] = props.useContext.Productos;
 const [Cupon, setCupon] = props.useContext.Cupon;

 const [LoadingCupon, setLoadingCupon] = useContext(StateContext).LoadingCupon





 


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
  if(Detalle.Nombre && Detalle.Apellido && Detalle.Telefono && Detalle.Email){

    if(Detalle.Email.lastIndexOf('@')>0){
      if(Detalle.Email.lastIndexOf('.')>0){
        return "#428b87"
      } 
    }    
  }
};

const EnableBoton = function(props) {
  if(Detalle.Nombre && Detalle.Apellido && Detalle.Telefono && Detalle.Email){
    if(Detalle.Email.lastIndexOf('@')>0){
      if(Detalle.Email.lastIndexOf('.')>0){
        return false
      } 
    }      
  } 
  return true
  
};





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


const ModuloSold  = () => {

  return (
    <Flex sx={{ width: "100%" }}>
      <Box
        //bg="primary"
        sx={{
          fontWeight: "normal",
          fontSize: 5,
          color: "whitesmoke",
          fontFamily: "body",
          width: "100%",
          ml: 9
        }}
      >

        Boletos Agotados!!

      </Box>
    </Flex>
  )
}







const ModuloSimple  = () => {

  return (
    <div>

      <Grid bg="#333333" css={{ maxWidth: "610px" }}>
                
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.msecc1}>{"Participante"}</Text>
          </Box>
        </Flex>
      
      </Grid>


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

    <Grid bg="#999999" css={{ maxWidth: "610px" }}>
                
    <Flex sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Text sx={Estilo.msecc2}>{"Participante"}</Text>
      </Box>
    </Flex>
    
  </Grid>


  <Box bg="WhiteSmoke" css={{ height: 13 }} />




    <Flex sx={{ width: "100%" }} bg="WhiteSmoke">
      <Box
        bg="WhiteSmoke"
        sx={{
          fontWeight: "normal",
          fontSize: 1,
          color: "text",
          fontFamily: "body",
          width: "100%",
          ml: 5
        }}
      >

        <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: "20%"}}>
              <Text sx={Estilo.h2b} >Nombre</Text>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Input {...useChangeArray(Detalle, "Nombre", setDetalle)}/>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2b}>Apellidos</Text>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Input {...useChangeArray(Detalle, "Apellido", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2b}>Telefono</Text>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Input {...useChangeArray(Detalle, "Telefono", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%", alignItems: 'center', mb: 3 }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2b}>Email</Text>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Input {...useChangeArray(Detalle, "Email", setDetalle)} />
            </Box>
          </Flex>

          <Box css={{ height: 21 }} />


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              

              <Box sx={{ width: "70%" }}>

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={ColorBoton()}
                    disabled={EnableBoton()}
                    onClick={async () => {
                      setLoadingSecc(true)
                      await props.useAcciones.InfoAdd(props.Referido)
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
            <Box css={{ height: 21 }} />

        </Grid>



      </Box>
    </Flex>
    </div>
  )
}


  try {
    return (
      <div>
        
          {Loading ? <Spinner size={17} ml={3} /> : 




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


                {/* { (props.CompStatus.Comp1()===1) ? ModuloSimple() : ModuloEdit()} */}

                {/* { (props.CompStatus.Comp1()===1) ? <ModuloSimple/> : ModuloEdit()} */}

                {/* <ModuloSimple/> */}

                {/* {ModuloSimple()} */}

                {(props.CompStatus.Comp1()===3) ? ModuloSold() : <div/>}
                {(props.CompStatus.Comp1()===1) ? ModuloSimple() : <div/>}
                {(props.CompStatus.Comp1()===0) ? ModuloEdit() : <div/>}


              </Box>
            </Flex>

          </div>
        }
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

          <Body {...props} texto="info" css={{ maxWidth: "610px" }} />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
