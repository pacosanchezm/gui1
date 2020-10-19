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

// ------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [LoadingSecc, setLoadingSecc] = props.useContext.LoadingSecc5;
 const [Meetings] = props.useContext.Meetings;
 const [Detalle, setDetalle] = props.useContext.Detalle;
 const [Pagado, setPagado] = props.useContext.Pagado;
 const [Productos, setProductos] = props.useContext.Productos;



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


        {LoadingSecc ? <Spinner size={30} ml={3} /> : <div/>}



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

        <Grid bg="#999999" css={{ maxWidth: "610px" }}>
  
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
              
           
              <Box sx={{ width: "54%" }}>

                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={ColorBoton()}
                    Disabled={false}
                    onClick={async () => {
                      setLoadingSecc(true)
                      setPagado(Productos.Precio)
                        let Inscribir = await props.useAcciones.Inscribir()
                      setLoadingSecc(false)
                    }}
                  >
                     <Text sx={Estilo.mbtn1}>
                       Inscribirme
                       {LoadingSecc ? <Spinner size={17} ml={3} /> : <div/>}

                      </Text>
                  </Button>

              </Box>

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

        <Grid bg="#999999" css={{ maxWidth: "610px" }}>
  
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.msecc2}>{"Listo!"}</Text>
            </Box>



          </Flex>

          </Grid>



          <Grid bg="#000000" css={{ maxWidth: "610px" }}>

            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t3_3}>{"Este es tu Link para entrar al evento:"}</Text>
            </Box>

            <Box css={{ height: 13 }} />


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

              <Link 
                href={Meetings[0].ConsumosMeetingsIngresoUrl}
                target={"_blank"}
              >


                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={"#428b87"}
                    Disabled={false}

                  >
                  <Text sx={Estilo.mbtn1}>Entrar</Text>

                  </Button>
                
                  </Link>
              </Box>
          </Flex>



          <Box css={{ height: 13 }} />



            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t3_3}>{"En unos momentos recibirás en tu correo este link para que entres el día del evento."}</Text>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Text sx={Estilo.t3_2}>{"(si no lo encuentras en tu bandeja de entrada revisa en correo no deseado)"}</Text>
            </Box>



          {/* <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={ColorBoton()}
                    Disabled={false}
                    onClick={async () => {
                      let Mail = await props.useAcciones.MandarMail()
                      console.log(Mail)
                    }}
                  >
                    Mandar por Correo
                  </Button>

              </Box>
          </Flex> */}




          {/* <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={"#FFA07A"}
                    Disabled={false}
                    onClick={async () => {
                     let Mail = await props.useAcciones.MandarMail()
                     console.log(Mail)
                    }}
                  >
                    Mandar por SMS
                  </Button>

              </Box>
          </Flex> */}

        </Grid>




        <Grid css={{ maxWidth: "610px" }}>
        <Box css={{ height: 13 }} />

          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.md1c}>{"** NO compartas tu link! este es un link ÚNICO y solo se permitirá un participante por cada link generado, si lo compartes puedes quedarte fuera del evento!"}</Text>
          </Box>

          <Box css={{ height: 13 }} />


          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.md1}>{"Si deseas invitar a tus amigos a adquirir un boleto, compárteles este link para que se registren:"}</Text>
          </Box>

          <Box css={{ height: 5 }} />

          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.md1}>{"https://smxai.net/eventos?id=juansolo1&token="+Detalle.Cliente}</Text>
          </Box>

          <Box css={{ height: 13 }} />

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}/>
              <Box sx={{ width: "54%" }}>

                <Link 
                  href={"https://wa.me/?text=" + encodeURIComponent("Ya tengo mi boleto para Petit Comité de Juan Solo! compra el tuyo aquí: https://smxai.net/eventos?id='juansolo1'&token=" + Detalle.Cliente)}
                  target={"_blank"}
                >

                  <Button sx={{ width: "100%" }}
                    width={1}
                    bg={"#32CD32"}
                    Disabled={false}
                  >
                    <Text sx={Estilo.mbtn1}>Invitar por Whatsapp</Text>

                  </Button>
                
                </Link>
              </Box>




          </Flex>

              <Box sx={{ width: "100%" }}>
                <Text sx={Estilo.t3_3}>{"Si tienes dudas contáctanos en: boletos@beatamina.com"}</Text>
              </Box>


              <Box sx={{ width: "100%" }}>
                <Text sx={Estilo.t3_3}>{"Gracias por tu compra, ¡Nos vemos en Petit Comité!"}</Text>
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
                
                {(props.CompStatus.Comp5()===0) ? ModuloCero() : <div/>}
                {(props.CompStatus.Comp5()===1) ? ModuloSimple() : <div/>}
                {(props.CompStatus.Comp5()===2) ? ModuloListo() : <div/>}

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
