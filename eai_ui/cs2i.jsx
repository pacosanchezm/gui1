import React, { useState, useEffect, useContext, createContext } from "react";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

//import { CSSTransition, SwitchTransition } from "react-transition-group";

// ------------------

import Productos from "./cs2prods";
import Detalle from "./cs2det";
import Registros from "./cs2check";
import Pagar from "./cs2checkout";

import UsedataM from "./csusedata";


let App;

// -----------------------------------------------------------------------------




let Images = {
  logo1: {src: "https://smxai.net/sf/sflogo1.jpg"},
  logo2: {src: "https://smxai.net/jukevox/logo3.jpg"},
  icon1: {src: "https://smxai.net/sf/cs1/avatar.jpg"},
  icon2: {src: "https://smxai.net/sf/cs1/cuenta2.jpg"},


};


let MisRegistros = [
  {
    "Pedido": [""],
    "Id": [""],
    "Fecha": [""],
    "Producto": [""],
    "ProductosTitulo": [""],
    "ProductosFoto": [""],
    "Precio": [""],
    "Descuento": null,
    "Cantidad": [""],
    "Importe": [""],
    "ConsumosExtrasImporte": [""],
    "ConsumoTotal": [""],
    "Obv": [""]
  }
];




let MisCategorias = [
  {
    "CategoriasTitulo": "Bebidas",
    "CategoriasDescripcion": "Brinda  con tu artista",
    "Color": "purple"
  },


  {
    "CategoriasTitulo": "Canciones de Autor",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Pop - Rock",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Chuy Saldivar",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Cómicas",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  
  {
    "CategoriasTitulo": "Cumbia",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  
  {
    "CategoriasTitulo": "Norteña y Banda",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Rancheras",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Trova",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  
  {
    "CategoriasTitulo": "Viejitas pero Bonitas",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },


  {
    "CategoriasTitulo": "Regalos",
    "CategoriasDescripcion": "Manda un regalo virttual tu artista",
    "Color": "purple"
  },

]


let MisCategorias21 = [
  {
    "CategoriasTitulo": "Bebidas",
    "CategoriasDescripcion": "Brinda  con tu artista",
    "Color": "purple"
  },

  {
    "CategoriasTitulo": "Antonio Lza",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Chavorrucos (Pop-Rock)",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Norteña y Banda",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  



  {
    "CategoriasTitulo": "Trova",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Canciones de Autor",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  
  {
    "CategoriasTitulo": "Cómicas",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  
  {
    "CategoriasTitulo": "Viejitas pero Bonitas",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },


  {
    "CategoriasTitulo": "Regalos",
    "CategoriasDescripcion": "Manda un regalo virttual tu artista",
    "Color": "purple"
  },

]



let MisCategorias24 = [
  {
    "CategoriasTitulo": "Bebidas",
    "CategoriasDescripcion": "Brinda  con tu artista",
    "Color": "purple"
  },



  {
    "CategoriasTitulo": "Pop - Rock",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Norteña y Banda",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Rancheras",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Trova",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  


  {
    "CategoriasTitulo": "Boleros",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  






  {
    "CategoriasTitulo": "Canciones de Autor",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  


  // {
  //   "CategoriasTitulo": "Cómicas",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  


  {
    "CategoriasTitulo": "Viejitas pero Bonitas",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },

  {
    "CategoriasTitulo": "Opera",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  

  {
    "CategoriasTitulo": "Regalos",
    "CategoriasDescripcion": "Manda un regalo virttual tu artista",
    "Color": "purple"
  },

]





let MisCategorias26 = [
  {
    "CategoriasTitulo": "Bebidas",
    "CategoriasDescripcion": "Brinda  con tu artista",
    "Color": "purple"
  },



  {
    "CategoriasTitulo": "Saludos",
    "CategoriasDescripcion": "",
    "Color": "purple"
  },  



  // {
  //   "CategoriasTitulo": "Norteña y Banda",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  











  // {
  //   "CategoriasTitulo": "Canciones de Autor",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  







  // {
  //   "CategoriasTitulo": "Boleros",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  


  // {
  //   "CategoriasTitulo": "Cómicas",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  


  // {
  //   "CategoriasTitulo": "Pop - Rock",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  



  // {
  //   "CategoriasTitulo": "Son Cubano",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  



  // {
  //   "CategoriasTitulo": "Cumbia",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  





  // {
  //   "CategoriasTitulo": "Trova",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },  


  // {
  //   "CategoriasTitulo": "Viejitas pero Bonitas",
  //   "CategoriasDescripcion": "",
  //   "Color": "purple"
  // },



  {
    "CategoriasTitulo": "Regalos",
    "CategoriasDescripcion": "Manda un regalo virttual tu artista",
    "Color": "purple"
  },

]





let MisCategorias29 = [
  {
    "CategoriasTitulo": "Bebidas",
    "CategoriasDescripcion": "Brinda  con tu artista",
    "Color": "purple"
  },




  {
    "CategoriasTitulo": "Regalos",
    "CategoriasDescripcion": "Manda un regalo virttual tu artista",
    "Color": "purple"
  },

]







let MisExtras = [
  {
    "ExtrasTitulo": "Canciones",
    "ExtrasDescripcion": "Agrega los ingredientes de tu preferencia",
  },
  {
    "ExtrasTitulo": "Bebidas",
    "ExtrasDescripcion": "Agrega la bebida de tu preferencia",
  },
  {
    "ExtrasTitulo": "Regalos",
    "ExtrasDescripcion": "Agrega la bebida de tu preferencia",
  },
]



let MisExtrasDet = [
  // {
  //   "Producto": 1,
  //   "Id": 1,
  //   "Titulo": "Ingredientes Extra",
  //   "Descripcion": "Agrega los ingredientes de tu preferencia",
  //   "ExtrasDetId": 1,
  //   "ExtrasDetTitulo": "Chiles Toreados",
  //   "ExtrasDetPrecio": 7,
  //   "ExtrasDetCantidad": 0,
  //   "ExtrasDetImporte": 7,
  // },

]


let MisConsumosExtras = []








let MisProductos = [
  // {
  //   "Id": 1,
  //   "Sucursal": 1,
  //   "CategoriasTitulo": "Entradas",
  //   "CategoriasDescripcion": "Para comenzar",
  //   "Producto": 1,
  //   "ProductosTitulo": "Rollo Test1",
  //   "ProductosDescripcion": "Arroz y salmon",
  //   "ProductosIcon": null,
  //   "ProductosFoto": "https://smxai.net/sf/cs1/test1.jpg",
  //   "Precio": 50
  // },
]



let MiDetalle =   {
  "ProductosId": 0,
  "ProductosTitulo": "",
  "ProductosDescripcion": "",
  "ProductosFoto": "",
  "ProductosFoto2": [""],
  "ProductosFoto3": [""],
  "ProductosVideo": [""],

  "MenusPrecio": 0,
  "MenusPrecioObv": "Grande",
  "MenusProducto2": [""],
  "MenusPrecio2": [""],
  "MenusPrecioObv2": [""],
  "MenusObv": [""],

  "ConsumosId": 0,
  "ConsumosFecha": [""],
  "ConsumosPrecio": 0,
  "ConsumosDescuento": [""],
  "ConsumosCantidad": 0,
  "ConsumosImporte": 0,
  "ConsumosObv": ""
}





// --------------------------------------------------------

const StateContextM = createContext();
const CtxTheme = createContext(Theme);

const CtxLoading = createContext(false);
const CtxLoadingDet = createContext(false);
const CtxLoadingCheck = createContext(false);

const CtxRouter = createContext(1);

const CtxImages = createContext(Images);
const CtxTipoAnim = createContext(1);

const CtxFiltroFecha = createContext(new Date());

const CtxCategorias = createContext(MisCategorias);

const CtxRegistros = createContext(MisRegistros);
const CtxProductos = createContext(MisProductos);
const CtxDetalle = createContext(MiDetalle);
const CtxExtras = createContext(MisExtras);
const CtxExtrasDet = createContext(MisExtrasDet);
const CtxConsumosExtras = createContext(MisConsumosExtras);






const CtxCuenta = createContext({Pedido: 0, Cuenta: "", Monto: ""});
const CtxEditado = createContext(false);
const CtxConsumo = createContext(1);

const CtxPedido = createContext(4444);
const CtxSucursal = createContext(99);
const CtxNombre = createContext("");
const CtxNumCuenta = createContext("");
const CtxFecha = createContext("");
const CtxObv = createContext("");


const CtxTipoEntrega = createContext(1);
const CtxTipoPago = createContext(2);
const CtxPagado = createContext(0);
const CtxIndica = createContext("Llena todos los datos");

const CtxCupon = createContext("");


const CtxComodin = createContext(0);



// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    LoadingDet: useState(useContext(CtxLoadingDet)),
    LoadingCheck: useState(useContext(CtxLoadingCheck)),

    FiltroFecha: useState(useContext(CtxFiltroFecha)),


    LoadingSecc1: useState(useContext(CtxComodin)),
    LoadingSecc2: useState(useContext(CtxComodin)),
    LoadingSecc3: useState(useContext(CtxComodin)),
    LoadingSecc4: useState(useContext(CtxComodin)),
    LoadingSecc5: useState(useContext(CtxComodin)),
    LoadingSecc6: useState(useContext(CtxComodin)),


    DataOpcion1: useState(useContext(CtxComodin)),


    Data1: useState(useContext(CtxComodin)),
    Data2: useState(useContext(CtxComodin)),
    Data3: useState(useContext(CtxComodin)),
    Data4: useState(useContext(CtxComodin)),
    Data5: useState(useContext(CtxComodin)),

    Filtro1: useState(useContext(CtxComodin)),
    Filtro2: useState(useContext(CtxComodin)),
    Filtro3: useState(useContext(CtxComodin)),
    Filtro4: useState(useContext(CtxComodin)),
    Filtro5: useState(useContext(CtxComodin)),
    Filtro6: useState(useContext(CtxComodin)),

    Meetings: useState(useContext(CtxComodin)),









    Router: useState(useContext(CtxRouter)),
    Images: useState(useContext(CtxImages)),
    TipoAnim: useState(useContext(CtxTipoAnim)),

    Categorias: useState(useContext(CtxCategorias)),

    Registros: useState(useContext(CtxRegistros)),
    Productos: useState(useContext(CtxProductos)),
    Detalle: useState(useContext(CtxDetalle)),
    Extras: useState(useContext(CtxExtras)),
    ExtrasDet: useState(useContext(CtxExtrasDet)),
    ConsumosExtras: useState(useContext(CtxConsumosExtras)),

    Cuenta: useState(useContext(CtxCuenta)),

    Editado: useState(useContext(CtxEditado)),
    Consumo: useState(useContext(CtxConsumo)),

    Pedido: useState(useContext(CtxPedido)),
    Sucursal: useState(useContext(CtxSucursal)),
    Nombre: useState(useContext(CtxNombre)),
    NumCuenta: useState(useContext(CtxNumCuenta)),
    Fecha: useState(useContext(CtxFecha)),
    Obv: useState(useContext(CtxObv)),

    TipoEntrega: useState(useContext(CtxTipoEntrega)),
    TipoPago: useState(useContext(CtxTipoPago)),
    Pagado: useState(useContext(CtxPagado)),
    Indica: useState(useContext(CtxIndica)),

    Empresa: useState(useContext(CtxComodin)),

    Cliente: useState(useContext(CtxComodin)),

    Monto: useState(useContext(CtxComodin)),
    Cupon: useState(useContext(CtxCupon)),


    Sucursales: useState(useContext(CtxComodin)),

    Activos: useState(useContext(CtxComodin)),
    Participante: useState(useContext(CtxComodin)),
    

  };
};

// ------------------

const ContextProvider = ({ children }) => {
  // let xTheme = useState(useContext(CtxTheme))
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContextM.Provider>
  );
};

// ------------------------------------------------------------------

// -----------------------------------------------------------------------------



const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  const [Images] = useContext(StateContextM).Images;
  const [Router, setRouter] = useContext(StateContextM).Router;

  const [Categorias, setCategorias] = useContext(StateContextM).Categorias;


  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Sucursal] = useContext(StateContextM).Sucursal;

  const [Registros, setRegistros] = useContext(StateContextM).Registros;

  const [Nombre] = useContext(StateContextM).Nombre;
  const [NumCuenta] = useContext(StateContextM).NumCuenta;



  

  //const { getRegistros, getCuenta, getProductos, getPedido} = useData();

  let useDataMx = new UsedataM(StateContextM)

  useEffect(() => {
    useDataMx.Pedidos().get(props)
    navigate("/");
  }, []);

  useEffect(() => {
    useDataMx.Consumos().getCuenta()
  }, [Registros]);

  useEffect(() => {
    useDataMx.Consumos().get()
    useDataMx.Consumos().getCuenta()


  }, [Pedido]);

  useEffect(() => {
    useDataMx.Productos().get()


    if(Sucursal===20){setCategorias(MisCategorias)}
    if(Sucursal===21){setCategorias(MisCategorias21)}
    if(Sucursal===24){setCategorias(MisCategorias24)}
    if(Sucursal===26){setCategorias(MisCategorias26)}
    if(Sucursal===29){setCategorias(MisCategorias29)}


  }, [Sucursal]);







  const Opciones  = () => {
    if(Router===2){
      return (

        <Box sx={{ width: "10%", p:0 }}>
        <Button
          sx={{ height: "34px", mb: 0, width: "100%", fontSize: 2, }}
          bg={"#A52A2A"}
          Disabled={false}
          onClick={() => {
            navigate("/");
            setRouter(1)          }}
        >
          X 
        </Button>
      </Box>

      )
    }
  }



  





  try {
    return (
      <div>

        <Flex sx={{ height: "34px", width: "100%" }}>

          {Opciones()}

          {/* <Box
            sx={{
              p: 3,
              bg: "#ffcc00",
              fontWeight: "normal",
              fontSize: 2,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            
            Hola {Nombre}, {props.texto} es el num: {NumCuenta}
          </Box> */}

          <Box sx={{ width: "40%" }}>
            <Image sx={{ height: "34px" }} src={Images.logo2.src} />
          </Box>

          {/* <Box sx={{ width: "40%" }}>
          <Text sx={Estilo.d1s}> de Chuy Saldivar  con Kuko Montaño</Text>
          </Box> */}

          <Box sx={{ width: "21px", height: "21px" }}>
            <Image src={Images.icon1.src} sx={{ height: "100%" }}/>
          </Box>

          <Box sx={{ height: "21px", mr:3 }}>
            <Text sx={Estilo.d1s}> {Nombre}</Text>
          </Box>



          <Box sx={{ width: "21px", height: "21px" }}>
            <Image src={Images.icon2.src} sx={{ height: "100%" }}/>
          </Box>

          <Text sx={Estilo.d1s}> {NumCuenta}</Text>



        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Cuenta] = useContext(StateContextM).Cuenta;
  const [Router, setRouter] = useContext(StateContextM).Router;
  const [Detalles,  setDetalles] = useContext(StateContextM).Detalle;
  //const [ExtrasDet, setExtrasDet] = useContext(StateContextM).ExtrasDet;
  //const { sumExtras, addRegistro, upRegistro} = useData();

  let useDataMx = new UsedataM(StateContextM)
  const [Pagado] = useContext(StateContextM).Pagado;


  try {
    const PieDinamico = () => {    
      try {

        if(Router===1){
          return (
            <div>

              <Flex sx={{ height: "34px", mb: 3, width: "100%" }}>
                <Box
                  sx={{
                    p: 3,
                    bg: "#DCDCDC",
                    fontWeight: "normal",
                    fontSize: 3,
                    color: "text",
                    fontFamily: "body",
                    width: "60%"
                  }}
                >
      
                  <Flex sx={{ width: "100%", }}>
      
                    <Box sx={{ width: "50%" }}>
                      <Text >Artículos: {Cuenta.Cuenta} </Text>
                    </Box>
      
                    <Box sx={{ width: "50%" }}>
                      <Text >$ {Cuenta.Monto} </Text>
                    </Box>
      
                    </Flex>
                </Box>
      
                <Box sx={{ width: "40%" }}>
                  <Button
                    sx={{ height: "34px", mb: 3, width: "100%" }}
                    bg={"#FF8C00"}
                    Disabled={false}
                    onClick={() => {
                      navigate("/check");
                      setRouter(3)
                    }}
                  >
                    Ver Orden
                  </Button>
                </Box>
              </Flex>
      
            </div>
          );
        }

        if(Router===2){


          if (Pagado>0){

            return (
              <div>
  
                <Flex sx={{ height: "34px", mb: 1, width: "100%" }}>
                  <Flex
                    sx={{
                      p: 3,
                      bg: "#DCDCDC",
                      fontWeight: "normal",
                      fontSize: 3,
                      color: "text",
                      fontFamily: "body",
                      width: "100%"
                    }}
                  >
        
                    <Text
                      sx={{ height: "100%", mb: 3, fontSize: 2, }}
                      mr={3}
                    > Tu pedido está pagado, si deseas hacer otro pedido por favor cierra la ventana y vuelve a entrar 
                    </Text>
    
                  </Flex>
        
  
                </Flex>
        
              </div>
            );


          } else {







          return (
            <div>

              <Flex sx={{ height: "34px", mb: 1, width: "100%" }}>
                <Flex
                  sx={{
                    p: 3,
                    bg: "#DCDCDC",
                    fontWeight: "normal",
                    fontSize: 3,
                    color: "text",
                    fontFamily: "body",
                    width: "70%"
                  }}
                >
      
                  <Text
                    sx={{ height: "100%", mb: 3, fontSize: 2, }}
                    mr={3}
                  > Cantidad:
                  </Text>

                  <Button
                    sx={Estilo.p1s}
                    w={"40px"}
                    bg={"#DCDCDC"}
                    onClick={() => {
                      setDetalles({ ...Detalles, "ConsumosCantidad": Detalles.ConsumosCantidad - 1 });
                    }}
                  >
                    - 
                  </Button>

                  <Text pl={3}  pr={3} sx={Estilo.p2s}>{Detalles.ConsumosCantidad} </Text>

                  <Button
                    sx={Estilo.p1s}
                    bg={"#DCDCDC"}
                    Disabled={false}
                    onClick={() => {
                      setDetalles({ ...Detalles, "ConsumosCantidad": Detalles.ConsumosCantidad  + 1 });
                    }}
                  >
                    + 
                  </Button>

                </Flex>
      





                <Box sx={{ width: "40%" }}>
                  <Button
                    sx={{ height: "100%", mb: 3, width: "100%", fontSize: 2, }}
                    bg={"#FF8C00"}
                    Disabled={false}
                    onClick={() => {
                      //addRegistro()
                      
                      useDataMx.Consumos().add()

                      navigate("/")
                      setRouter(1)
                    }}
                  >
                    Agregar $ {Detalles.ConsumosCantidad * (Detalles.ConsumosPrecio +                       useDataMx.Extras().sum)}
                  </Button>
                </Box>


              </Flex>
      
            </div>
          );
        }
      }

        if(Router===3){
          return (
            <div>

              <Flex sx={{ height: "34px", mb: 3, width: "100%" }}>
                <Box
                  sx={{
                    p: 3,
                    bg: "#DCDCDC",
                    fontWeight: "normal",
                    fontSize: 3,
                    color: "text",
                    fontFamily: "body",
                    width: "60%"
                  }}
                >
      
                  <Flex sx={{ width: "100%", }}>
      
                    <Box sx={{ width: "50%" }}>
                      <Text >Artículos: {Cuenta.Cuenta} </Text>
                    </Box>
      
                    <Box sx={{ width: "50%" }}>
                      <Text >$ {Cuenta.Monto} </Text>
                    </Box>
      
                    </Flex>
                </Box>
      
                <Box sx={{ width: "40%" }}>
                  <Button
                    sx={{ height: "34px", mb: 3, width: "100%" }}
                    bg={"#FF8C00"}
                    Disabled={false}
                    onClick={() => {
                      navigate("/checkout");
                      setRouter(4)
                    }}
                  >
                    Pagar
                  </Button>
                </Box>
              </Flex>
      
            </div>
          );
        }



        if(Router===4){
          return (
            <div>

              <Flex sx={{ height: "34px", mb: 3, width: "100%" }}>
                <Box
                  sx={{
                    p: 3,
                    bg: "#DCDCDC",
                    fontWeight: "normal",
                    fontSize: 3,
                    color: "text",
                    fontFamily: "body",
                    width: "60%"
                  }}
                >
      
                  <Flex sx={{ width: "100%", }}>
      
                    <Box sx={{ width: "50%" }}>
                      {/* <Text >Artículos: {Cuenta.Cuenta} </Text> */}
                    </Box>
      
                    <Box sx={{ width: "50%" }}>
                      {/* <Text >$ {Cuenta.Monto} </Text> */}
                    </Box>
      
                    </Flex>
                </Box>
      
                <Box sx={{ width: "40%" }}>
                  <Button
                    sx={{ height: "34px", mb: 3, width: "100%" }}
                    bg={"#FF8C00"}
                    Disabled={false}
                    onClick={() => {
                      navigate("/check");
                      setRouter(3)
                    }}
                  >
                    Regresar
                  </Button>
                </Box>
              </Flex>
      
            </div>
          );
        }



        if(Router===5){


          if (Pagado>0){

            return (
              <div>
  
                <Flex sx={{ height: "34px", mb: 1, width: "100%" }}>
                  <Flex
                    sx={{
                      p: 3,
                      bg: "#DCDCDC",
                      fontWeight: "normal",
                      fontSize: 3,
                      color: "text",
                      fontFamily: "body",
                      width: "100%"
                    }}
                  >
        
                    <Text
                      sx={{ height: "100%", mb: 3, fontSize: 2, }}
                      mr={3}
                    > Tu pedido está pagado, si deseas hacer otro pedido por favor cierra la ventana y vuelve a entrar 
                    </Text>
    
                  </Flex>
                  
                  <Box sx={{ width: "40%" }}>
                      <Button
                        sx={{ height: "34px", mb: 3, width: "100%" }}
                        bg={"#A52A2A"}
                        Disabled={false}
                        onClick={() => {
                          navigate("/check");
                          setRouter(3)
                        }}
                      >
                        Regresar
                      </Button>
                    </Box>
  
                </Flex>
        
              </div>
            );


          } else {



          return (
            <div>

              <Flex sx={{ height: "34px", mb: 1, width: "100%" }}>
                <Flex
                  sx={{
                    p: 3,
                    bg: "#DCDCDC",
                    fontWeight: "normal",
                    fontSize: 3,
                    color: "text",
                    fontFamily: "body",
                    width: "70%"
                  }}
                >
      
                  <Text
                    sx={{ height: "100%", mb: 3, fontSize: 2, }}
                    mr={3}
                  > Cantidad:
                  </Text>


                  <Button
                    sx={Estilo.p1s}
                    w={"40px"}
                    bg={"#DCDCDC"}
                    onClick={() => {
                      setDetalles({ ...Detalles, "ConsumosCantidad": Detalles.ConsumosCantidad - 1 });
                    }}
                  >
                    - 
                  </Button>

                  <Text pl={2}  pr={2} sx={Estilo.p2s}>{Detalles.ConsumosCantidad} </Text>

                  <Button
                    sx={Estilo.p1s}
                    bg={"#DCDCDC"}
                    w={"40px"}

                    Disabled={false}
                    onClick={() => {
                      setDetalles({ ...Detalles, "ConsumosCantidad": Detalles.ConsumosCantidad  + 1 });
                    }}
                  >
                    + 
                  </Button>

                  <Box sx={{ width: "20%" }}>
                  </Box>


                  <Box sx={{ width: "30%" }}>
                      <Text >$ {Detalles.ConsumosCantidad * (Detalles.ConsumosPrecio + useDataMx.Extras().sum)} </Text>
                  </Box>


                </Flex>
      
      




      
                <Box sx={{ width: "40%" }}>
                  <Button
                    sx={{ height: "100%", mb: 3, width: "100%", fontSize: 2, }}
                    bg={"#FF8C00"}
                    Disabled={false}
                    onClick={() => {

                      useDataMx.Consumos().up()

                      //upRegistro()
                      navigate("/check")
                      setRouter(3)
                    }}
                  >
                    Guardar
                  </Button>
                </Box>
              </Flex>
      
            </div>
          );
        }
      }

      } catch (e) {
        console.error(e);
      }
    };






    return (

      PieDinamico()


    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------





// -----------------------------------------------------------------------------

const Router = props => {

  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [LoadingDet, setLoadingDet] = useContext(StateContextM).LoadingDet;
  const [Router, setRouter] = useContext(StateContextM).Router;



  const [Editado, setEditado] = useContext(StateContextM).Editado;
  const [Cuenta] = useContext(StateContextM).Cuenta;

  const [Registrosx] = useContext(StateContextM).Registros;

  const [Productosx] = useContext(StateContextM).Productos;
  const [Categorias] = useContext(StateContextM).Categorias;


  const [Detalles,  setDetalles] = useContext(StateContextM).Detalle;
  const [Extras, setExtras] = useContext(StateContextM).Extras;
  const [ExtrasDet, setExtrasDet] = useContext(StateContextM).ExtrasDet;
  const [TipoEntrega, setTipoEntrega] = useContext(StateContextM).TipoEntrega;

  const [TipoPago, setTipoPago] = useContext(StateContextM).TipoPago;

  const useDataMx = new UsedataM(StateContextM)

  const [Pagado, setPagado] = useContext(StateContextM).Pagado;

  //const { sumExtras, getDetalle, getDetalleConsumo, deleteRegistro, PayStripe} = useData();


  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  const routeResult = useRoutes(
    routes({
      Theme,
      navigate,
      Router, setRouter,
      //TipoAnim,
      //setTipoAnim,

      Loading, LoadingDet,
      Editado, setEditado,
      Productosx,
      Categorias,
      Detalles,
      setDetalles,
      Extras, setExtras,
      ExtrasDet, setExtrasDet,
      Registrosx,
      Cuenta,
      TipoEntrega,
      setTipoEntrega,
      TipoPago,
      setTipoPago,

      useDataMx,
      Pagado,
      setPagado,
      // sumExtras,
      // PayStripe,
      // getDetalle,
      // getDetalleConsumo,
      // deleteRegistro,





    })
  );



  try {
    return (
      <div>

        <Box sx={{ width: "100%" }}>{routeResult}</Box>



        {/* <Productos
          Registros={Productosx}
          Loading={Loading}
          Categorias={Categorias}
        />  */}
        
        
        
        {/* <Detalle
          Theme={Theme}
          //navigate={props.navigate}
          Detalles={Detalles}
          setDetalle={setDetalles}
          LoadingDet={LoadingDet}
          Editado={Editado}
          setEditado={setEditado}
          Extras={Extras}
          setExtras={setExtras}
          ExtrasDet={ExtrasDet}
          setExtrasDet={setExtrasDet}
          ExtrasSum={sumExtras}
        />  */}
       



        
        {/* <Registros
          Registros={Registrosx}
          Loading={Loading}
          navigate={navigate}
          setRouter={setRouter}
          getDetalleConsumo={getDetalleConsumo}
          deleteRegistro={deleteRegistro}
        />  */}
       


        
        {/* <Pagar
          Cuenta={Cuenta}
          //Loading={Loading}
          TipoEntrega={TipoEntrega}
          setTipoEntrega={setTipoEntrega}
          TipoPago={TipoPago}
          setTipoPago={setTipoPago}
          PayStripe={props.PayStripe}
        /> */}
        
       






      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// ----------------------------------------

const routes = (props) => {
  return {
    "/": () => (
      <Productos
        Registros={props.Productosx}
        Loading={props.Loading}
        Categorias={props.Categorias}
        navigate={props.navigate}
        setRouter={props.setRouter}
        usedata={props.useDataMx}

      /> 
    ),
    "/det": () => (
      <Detalle
        Theme={props.Theme}
        navigate={props.navigate}
        setRouter={props.setRouter}
        LoadingDet={props.LoadingDet}

        Detalles={props.Detalles}
        setDetalle={props.setDetalles}

        Editado={props.Editado}
        setEditado={props.setEditado}
        Extras={props.Extras}
        setExtras={props.setExtras}
        ExtrasDet={props.ExtrasDet}
        setExtrasDet={props.setExtrasDet}
        ExtrasSum={props.sumExtras}

        usedata={props.useDataMx}



      /> 
    ),

    "/check": () => (

      <Registros
        Registros={props.Registrosx}
        Loading={props.Loading}
        navigate={props.navigate}
        setRouter={props.setRouter}

        usedata={props.useDataMx}

        //getDetalleConsumo={props.getDetalleConsumo}
        //deleteRegistro={props.deleteRegistro}
        Pagado={props.Pagado}


      /> 
    ),

    "/checkout": () => (
      <Pagar
        Cuenta={props.Cuenta}
        //Loading={props.Loading}
        TipoPago={props.TipoPago}
        setTipoPago={props.setTipoPago}
        TipoEntrega={props.TipoEntrega}
        setTipoEntrega={props.setTipoEntrega}
        //PayStripe={props.PayStripe}
        usedata={props.useDataMx}
        Pagado={props.Pagado}
        setPagado={props.setPagado}


      />

    ),


  };
};

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  // useRedirect("/", "/movs");
  return (
    <ContextProvider>
      <Flex
        sx={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256
        }}
      >
        <header sx={{width: "100%"}}>
          <Encabezado {...props} texto="Tu Pedido" />
        </header>

        <main sx={{width: "100%",flex: "1 1 auto"}}>
          <Router {...props} sx={{ width: "100%" }} />

        </main>

        <footer sx={{width: "100%"}}>
          <div
            sx={{
              display: "block",
              padding: "5px",
              height: "60px",
              width: "100%"
            }}
          />

          <div
            style={{
              backgroundColor: "white",
              fontSize: "20px",
              color: "white",
              borderTop: "1px solid #E7E7E7",
              textAlign: "left",
              padding: "5px",
              position: "fixed",
              left: "0",
              bottom: "0",
            
              width: "100%"
            }}
          >
            <Pie {...props} />
          </div>
        </footer>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------



