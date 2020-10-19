import React, {useState, useEffect, useRef, useContext, createContext, Component} from "react";

import "@babel/polyfill";

import Theme from "../css/cssui/theme";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Input, Spinner, Link } from "@theme-ui/components";

import axios from "axios";




let App;
// ----------------------------------------------------------------

let Images = {

  logo2: {
    src: "https://smxai.net/sf/eglogo1.jpeg"
  },

  evento1: {
    src: "https://smxai.net/jukevox/evento1.jpg"
  },

  evento2: {
    src: "https://smxai.net/jukevox/evento2.jpg"
  },

  evento4: {
    src: "https://smxai.net/jukevox/evento4.jpg"
  },

  evento5: {
    src: "https://smxai.net/jukevox/evento5.jpg"
  },



  




};

// ------------------

const StateContext = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);



const CtxCliente = createContext(0);

const CtxNombre = createContext("");
const CtxTelefono = createContext("");

const CtxPedido = createContext(8778353);
const CtxSucursal = createContext(0);

const CtxIndica = createContext("");

const CtxDisabled = createContext(false);


// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages)),

    Pedido: useState(useContext(CtxPedido)),
    Sucursal: useState(useContext(CtxSucursal)),

    Cliente: useState(useContext(CtxCliente)),
    Nombre: useState(useContext(CtxNombre)),
    Telefono: useState(useContext(CtxTelefono)),

    Indica: useState(useContext(CtxIndica)),
    Disabled: useState(useContext(CtxDisabled)),

  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  </StateContext.Provider>
);

// ------------------



// ------------------------------------------------------------------
const useData = props => {

  //let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
let graphqlserver = "https://smxai.net/graphqleai2"



  const [Pedido, setPedido] = useContext(StateContext).Pedido;
  const [Sucursal, setSucursal] = useContext(StateContext).Sucursal;


  const [Cliente, setCliente] = useContext(StateContext).Cliente;

  const [Nombre, setNombre] = useContext(StateContext).Nombre;
  const [Telefono, setTelefono] = useContext(StateContext).Telefono;


  const [Loading, setLoading] = useContext(StateContext).Loading;

  //-------------------------


  const upPedidoM = async function(Codigo, Cliente) {

    var axdata = await axios({
      url: graphqlserver,
      method: "post",
      data: {
        query: `
          mutation upPedido ($Query: PedidoInput ) {
            PedidosM {
              Registro {
                UpdatePedidoQ (Query: $Query)
              }
            }
          }
        `,
        variables: {
          Query: {
            Codigo: Codigo,
            Cliente: Cliente,

          }
        }
      }
    });

    if (axdata.data) {
      return 1
    }

    //setLoadingDet(false);
  }



  return {

    addPedido: async function(props) {
      //await setLoadingDet(true);

      console.log("agregando pedido: " + Sucursal)

      var axdata = await axios({
        url: graphqlserver,
        method: "post",
        data: {
          query: `
            mutation AddPedido ($Query: PedidoInput ) {
              PedidosM {
                Registro {
                  InsertPedidoQ (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Sucursal: props.usr
            }
          }
        }
      });

      if (axdata.data.data.PedidosM.Registro.InsertPedidoQ) {
        console.log(
          "Agregado:" + axdata.data.data.PedidosM.Registro.InsertPedidoQ
        );
        //setPedido(axdata.data.data.PedidosM.Registro.InsertPedidoQ);
        //navigate("/det");
        //this.Pedidos().getLista();

        await setPedido(axdata.data.data.PedidosM.Registro.InsertPedidoQ)


        return axdata.data.data.PedidosM.Registro.InsertPedidoQ
      }

      // setLoadingDet(false);
    },





    pullCliente: async function(props) {
      console.log("pulliin")
      var axdata = await axios({
        url: graphqlserver,
        method: "post",
        data: {
          query: `
            mutation PullCliente ($Query: ClienteInput ) {
              PedidosM {
                Pull {
                  ClientePedido (Query: $Query)  {
                    Id
                    Nombre
                    ApellidoPat
                  }
                }
              }
            }
           `,
          variables: {
            Query: {
              Telefono: Telefono,
              Nombre: Nombre,
              Pedido: Pedido
              
            }
          }
        }
      });

      let axdataRes = axdata.data.data.PedidosM.Pull.ClientePedido;
      if (axdataRes) {
        console.log("Pulled:" + axdataRes.Id);
      
        return axdataRes.Id
      }
    },









    //-------------------------
    //-------------------------
  };
};

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const EncabezadoImagen = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Images] = useContext(StateContext).Images;
  const [Sucursal, setSucursal] = useContext(StateContext).Sucursal;


  useEffect(() => {

    setSucursal(props.usr)

  }, []);


  try {
    return (
      <div>
        <Flex sx={{ mb: 3 }}>
          <Box sx={{ width: "100%" }}>
            <Image src={
                Sucursal===26 ? Images.evento5.src : Images.evento4.src
              } />
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};



// --------------------------------------------------------------------------


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




// -----------------------------------------------------------------------------

const Form1 = (props) => {

  const Estilo = useThemeUI().theme.styles;
  const [Loading, setLoading] = useContext(StateContext).Loading;


  const [Cliente, setCliente] = useContext(StateContext).Cliente;


  const [Nombre, setNombre] = useContext(StateContext).Nombre;
  const [Telefono, setTelefono] = useContext(StateContext).Telefono;
  

  const [Pedido, setPedido] = useContext(StateContext).Pedido;

  const [Indica, setIndica] = useContext(StateContext).Indica;


  const {addPedido, pullCliente, upPedido } = useData();


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


  const MyLinkButton = props => {
    return (
      // <A {...setLinkProps(props)}>

      // </A>
        <Link 
          onClick={handleClick}
          href={props.href}
          //href='https://smxai.net/JukeVox?id=6563915'
        //{...setLinkProps(props)}
        >
          
          Hello
        
        
        </Link>

    )
    




  };

let myLink = {
  href: "https://smxai.net/JukeVox?id=" + Pedido,
  target: "_blank"
};


async function handleClick(e) {

  // let PedidoQ = await addPedido(props)
  // await setPedido(PedidoQ)
 pullCliente(props)

  console.log("The link was clicked.");
}


useEffect(() => {
  //console.log(props.usr)
 addPedido(props)
  }, []);

  return (
    <Flex
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: 123
      }}
    >
      {Loading ? (
        <div>
          <Flex
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 150
            }}
          >
            <Spinner size={50} />
          </Flex>
        </div>
      ) : (
        <div>



          {/* <Flex
            sx={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Box bg="White" css={{ height: 34 }} />
            <Text sx={Estilo.h2a}>Nombre</Text>

            <Box>
              <Input {...useChange(Nombre, setNombre)} />
            </Box>
          </Flex> */}


            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "20%" }}>
                <Text sx={Estilo.h2a}>Nombre</Text>
              </Box>

              <Box sx={{ width: "54%" }}>
                <Input {...useChange(Nombre, setNombre)} />
              </Box>
            </Flex>




          <Box bg="White" css={{ height: 21 }} />

            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "20%" }}>
                <Text sx={Estilo.h2a}>Teléfono</Text>
              </Box>

              <Box sx={{ width: "54%" }}>
                <Input {...useChange(Telefono, setTelefono)} />
              </Box>
            </Flex>



            <Box bg="White" css={{ height: 21 }} />

            {/* <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={ () => {}}
            >
              Entrar
            </Button> */}
            
            

            <Button
                sx={{ height: "34px", mb: 3, width: "100%" }}
                bg={Cliente>0 ? "#90EE90" :  "#FF8C00"}
                Disabled={false}
                onClick={ async() => {
                  //let PedidoQ = await addPedido(props)


                  if (Nombre.length>0) {

                    if (Telefono.length === 10) {

                        let Cliente = await pullCliente(props)
                        await setCliente(Cliente)
                        setIndica("")


                    } else {setIndica("Por favor proporciona tu teléfono") }

                  } else {
                    setIndica("Por favor proporciona tu Nombre")
                  }

                }}

                //onClick={handleClick}
              >
                {Cliente>0 ? "Registrado" : "Registrarme"}
              </Button>

              {/* <Flex>
                <Box sx={{ width: "80%" }}>
                  <Text sx={Estilo.h2}>{Indica}</Text>
                </Box>
              </Flex> */}



            {Cliente>0 ? (


            <Link 
              href={"https://smxai.net/JukeVox?id=" + Pedido}
            >
          
              <Button
                sx={{ height: "34px", mb: 3, width: "100%" }}
                bg={"#FF8C00"}
                Disabled={false}
                // onClick={ async() => {
                //   let PedidoQ = await addPedido(props)
                //   // let Cliente = await pullCliente(props)
                //   // let UpCliente = await upPedido(PedidoQ, Cliente)
                //  await setPedido(PedidoQ)
                //   console.log("The buttton was clicked.");
                // }}

                //onClick={handleClick}
              >
                Entrar
              </Button>
      
            </Link>



            ) : (

              <div/>


            )}















            <Flex
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
            />
        </div>
      )}
    </Flex>
  );
};

// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Indica, setIndica] = useContext(StateContext).Indica;

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "80%" }}>
            <Text sx={Estilo.h2}>{Indica}</Text>
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

export default (App = props => {
  return (
    <StateProvider theme={Theme}>
      <Flex
        css={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256,
          width: "100%"
        }}
      >
        <Box
          sx={{
            maxWidth: "700px",
            width: "456px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >
          <EncabezadoImagen {...props} texto="Entrar a Evento" />
        </Box>

        <Box
          sx={{
            maxWidth: "700px",
            width: "400px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >

          <Form1 {...props}/>


          <Pie {...props} />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------

