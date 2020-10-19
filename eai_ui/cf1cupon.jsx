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

// -------------------------------------------------

// ------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [LoadingSecc, setLoadingSecc] = props.useContext.LoadingSecc2;


 const [Detalle, setDetalle] = props.useContext.Detalle;
 const [Editado, setEditado] = props.useContext.Editado;
 const [Productos, setProductos] = props.useContext.Productos;
 const [Cupon, setCupon] = props.useContext.Cupon;
 const [CuponAplicado, setCuponAplicado] = props.useContext.CuponAplicado;

 const [LoadingCupon, setLoadingCupon] = useContext(StateContext).LoadingCupon

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

  const cuponmask = [/[A-Z]/i, /\d/, /\d/, /[A-Z]/i, /\d/];
  const cccupon = React.useRef(undefined);



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




const ModuloEdit  = () => {

    return (
      <div>
  
        <Grid bg="#999999" css={{ maxWidth: "610px" }}>
                    
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.msecc2}>{"Cupón"}</Text>
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

            <Box sx={{ width: "140px", mt:3 }}>
              <label sx={Estilo.cardl1m} >¿Tienes un Cupón?</label>
            </Box>

            <Box sx={{ width: "120px", mt:3 }}>
              <MaskedInput
                sx={Estilo.cuponi1}
                id="Cupon" 
                ref={cccupon}
                value={Cupon}
                //autocomplete="cc-exp"
                autoCorrect="off"
                spellCheck="false"
                name="exp-date"
                //inputMode="string"
                guide={false}
                //placeholder="MM / AA"
                //className="input cc-exp"
                mask={cuponmask}

                onChange={async(e) => {
                  setCupon(e.target.value)

                  if(e.target.value.length>4){

                    setLoadingCupon(true)

                    let MiCupon = await props.useAcciones.getCupon(e.target.value)
                    console.log({MiCupon: MiCupon})
                    if (MiCupon===0){console.log("Cupon no valido")}
                    if (MiCupon.Aplicado===null){
                      let AplicarCupon = await props.useAcciones.aplicarCupon(MiCupon)
                      if(AplicarCupon===1){

                        let NuevoPrecio = Productos.Precio - (Productos.Precio * MiCupon.DescuentoPct / 100) 

                        setProductos({ ...Productos, "Precio": NuevoPrecio })
                        setCuponAplicado(true)
                      }
                    }

                    setLoadingCupon(false)
                  }

                }}

              />
            </Box>
                  {LoadingCupon ? <Spinner size={34} ml={3} /> : <div/>}

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


              {/* { (props.CompStatus.Cupon()===1) ? ModuloEdit() : <div/>} */}
              { (props.CompStatus.Cupon()===0) ? ModuloCero() : ModuloEdit()}





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
