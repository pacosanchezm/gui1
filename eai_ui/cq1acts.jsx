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

 const [Activos, setActivos] = props.useContext.Activos;

 const [Detalle, setDetalle] = props.useContext.Detalle;


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
    <div>

      <Grid bg="#2952a3" css={{ maxWidth: "610px" }}>
                
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
          <Text sx={Estilo.msecc2}>{"Órdenes en tu mesa"}</Text>
          </Box>
        </Flex>
      
      </Grid>


    <Box css={{ height: 8 }} />


    <Box sx={{ width: "100%" }}>
      <Text sx={Estilo.md1}>{"No hay órdenes abiertas en tu mesa"}</Text>
    </Box>

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

        <Box sx={{ width: "54%" }}>

          <Button sx={{ width: "100%", height: "34px" }}
            width={1}
            bg={"darkred"}
            Disabled={false}
            onClick={async () => {
              setLoadingSecc(true)
                await props.useAcciones.PedidoSetup(props)
              setLoadingSecc(false)


            }}
          >
            <Text sx={Estilo.mbtn1}>
              Abrir una orden nueva
              {LoadingSecc ? <Spinner size={17} ml={3} /> : <div/>}
            </Text>

          </Button>

        </Box>

          <Box css={{ height: 21 }} />


        </Box>
      </Flex>
    </div>
  )
}







const ModuloEdit  = () => {
  //console.log(props)

// -------------------------------

const Listado = props => {
  const Estilo = useThemeUI().theme.styles;
  let Micolor = "#f2f2f2";

  // console.log(Activos)

  const Renglones = Activos.map((row, index) => {
    Micolor === "#f2f2f2" ? (Micolor = "White") : (Micolor = "#f2f2f2");

    return (
      <Renglon
        i={index}
        key={row.Id}
        Row={row}
        Color={"White"}
        //navigate={props.navigate}
        //setRouter={props.setRouter}
        //usedata={props.usedata}
        //Monto={props.Monto}
        //getDetalleConsumo={props.getDetalleConsumo}
        //deleteRegistro={props.deleteRegistro}
      />
    );
  });

  return (
    <div>

      <Box bg="White" css={{ height: 13 }} />

      <Grid sx={{p:2, m: 2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        <Flex>
          <Box sx={{ width: "100%" }}>
          {Renglones}
          </Box>
        </Flex>

      </Grid>

      <Box bg="White" css={{ height: 13 }} />

    </div>
  );
};



// ---------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, navigate, setRouter, getDetalleConsumo, i, usedata } = props;

  return (
    <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

        <Flex sx={{ width: "100%", bg: Color }}
          columns={[1,null,2]}
        >

          <Grid sx={{ width: "75%", bg: Color, gridGap: 0 }}>

              <Flex sx={{ width: "100%", bg: Color }}>

                {/* <Box sx={{ width: "15%" }}>
                  <Text sx={Estilo.t1s}>{Row.Id}</Text>
                </Box> */}


                <Box sx={{ width: "50%" }}>
                  <Text sx={Estilo.t1sam}>
                    {Row.Nombre} {" "} {Row.Apellidos}
                  </Text>
                </Box>


                <Box sx={{ width: "50%"}}>

                  <Link 
                    href={"https://smxai.net/SushiFactoryMesas?id=" + Row.Codigo + "&token=" + Detalle.Cliente}
                  >

                    <Button
                      sx={{ height: "21px", mb: 0, width: "100%", fontSize: 2, }}
                      bg={"transparent"}
                      color={'#228B22'}
                      //color={"#A52A2A"}
                      Disabled={false}

                    >
                      Unirme a esta orden
                    </Button>

                  </Link>






                </Box>

              </Flex>

          </Grid>

        </Flex>

    </Grid>
  );
};

// ----------------------------




// ------------------


    return (
      <div>
  
      <Grid bg="#2952a3" css={{ maxWidth: "610px" }}>
                  
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
          <Text sx={Estilo.msecc2}>{"Órdenes en tu mesa"}</Text>
          </Box>
        </Flex>
      
      </Grid>
  
  
    <Box css={{ height: 13 }} />
  
    <Box sx={{ width: "100%" }}>
      <Text sx={Estilo.md1}>{"Puedes unirte a una orden existente en tu mesa o abrir una nueva"}</Text>
    </Box>

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
  


                <Grid bg="white" css={{ maxWidth: "610px" }}>
                  
                  <Flex sx={{ width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                      {/* {Listado()} */}

                    <Listado/>



                    </Box>
                  </Flex>
                

                  <Button sx={{ width: "100%", height: "34px" }}
                    width={1}
                    bg={"darkred"}
                    Disabled={false}
                    onClick={async () => {
                      setLoadingSecc(true)
                        await props.useAcciones.PedidoSetup(props)
                      setLoadingSecc(false)


                    }}
                  >
                    <Text sx={Estilo.mbtn1}>
                      Abrir una orden nueva
                      {LoadingSecc ? <Spinner size={17} ml={3} /> : <div/>}
                    </Text>

                  </Button>







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

              {(props.CompStatus.Activos()===0) ? ModuloCero() : <div/>}
              {(props.CompStatus.Activos()===1) ? ModuloSimple() : <div/>}
              {(props.CompStatus.Activos()===2) ? ModuloEdit() : <div/>}

              {/* { (props.CompStatus.Activos()===0) ? ModuloCero() : ModuloEdit()} */}

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

