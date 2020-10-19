import React, { useState, useEffect, useContext, createContext, Suspense } from "react";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

// import axios from "axios";
// import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

//import { CSSTransition, SwitchTransition } from "react-transition-group";

//import { usePosition } from "./csuseposition";
//import iterators from './csiterators'
import Pusher from 'pusher-js';


// ------------------

//import Productos from "./cs1prods";
import Detalle from "./cs1det";
import Registros from "./cs1check";
import Pagar from "./cs1checkout";

import UsedataM from "./csusedata"

const CoverPage = React.lazy(() => import("./cs1cover"))
const ProductPage = React.lazy(() => import("./cs1prods"))

let App;

// -----------------------------------------------------------------------------

var pusher = new Pusher('bef17b566c9f80236bf8', {
  cluster: 'us2'
});


let Images = {
  logo1: {src: "https://smxai.net/sf/sflogo1.jpg"},
  logo2: {src: "https://smxai.net/sf/cs1/sflogo2.jpg"},
  logo3: {src: "https://smxai.net/sf/cs1/factorylogo.png"},

  icon1: {src: "https://smxai.net/sf/cs1/avatar.jpg"},
  icon2: {src: "https://smxai.net/sf/cs1/cuenta2.jpg"},
  cover1: {src: "https://smxai.net/sf/cs1/cover1.jpg"},
  menu1: {src: "https://smxai.net/sf/cs1/menuboton1.jpg"},

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
    "CategoriasTitulo": "TOSTADAS",
    "CategoriasDescripcion": "Date un Gusto",
    span: 2,

  },  
  {
    "CategoriasTitulo": "ENTRADAS",
    "CategoriasDescripcion": "Para comenzar",
    span: 2,

  },

  {
    "CategoriasTitulo": "SOPAS",
    "CategoriasDescripcion": "",
    span: 2,

  },
  {
    "CategoriasTitulo": "ARROCES",
    "CategoriasDescripcion": "Un delicioso comienzo",
    span: 2,

  },

  {
    "CategoriasTitulo": "POKES",
    "CategoriasDescripcion": "Un bowl de sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "NATURALES",
    "CategoriasDescripcion": "Los clásicos",
    span: 2,

  },
  {
    "CategoriasTitulo": "CALIENTES",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },
  {
    "CategoriasTitulo": "HORNEADOS",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "VEGETARIANOS",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },
  {
    "CategoriasTitulo": "PREMIUM",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },


  {
    "CategoriasTitulo": "PLATILLOS",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "RAMEN",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "POSTRES",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "BEBIDAS",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },

  {
    "CategoriasTitulo": "INFANTIL",
    "CategoriasDescripcion": "Sabor",
    span: 2,

  },


  {
    "CategoriasTitulo": "ROLLO DEL MES",
    "CategoriasDescripcion": "Sabor",
    span: 1,

  },
  {
    "CategoriasTitulo": "EXTRAS",
    "CategoriasDescripcion": "Sabor",
    span: 3,

  },
]

let MisExtras = [
  {
    "ExtrasTitulo": "Ingredientes Extra",
    "ExtrasDescripcion": "Agrega los ingredientes de tu preferencia",
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
  "ProductosObv": [""],


  "MenusPrecio": 0,
  "MenusPrecioObv": "",
  "MenusProducto2": [""],
  "MenusPrecio2": [""],
  "MenusPrecioObv2": [""],
  "MenusObv": [""],

  "ConsumosId": 0,
  "ConsumosFecha": [""],
  "ConsumosPrecio": 0,
  "ConsumosPrecioObv": [""],
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
const CtxFiltroFecha = createContext(new Date());

const CtxRouter = createContext(1);

const CtxImages = createContext(Images);
const CtxTipoAnim = createContext(1);


const CtxEmpresa = createContext(1);
const CtxSucursales = createContext([]);


const CtxCategoria = createContext("");
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

const CtxPedido = createContext(99999);
const CtxSucursal = createContext(999);
const CtxCliente = createContext(0);

const CtxNombre = createContext("");

const CtxNumCuenta = createContext("");
const CtxFecha = createContext("");
const CtxObv = createContext("");


const CtxTipoEntrega = createContext(1);
const CtxTipoPago = createContext(1);
const CtxPagado = createContext(0);

const CtxMonto = createContext(0);
const CtxIndica = createContext("Llena todos los datos");
const CtxCupon = createContext("");

const CtxLocation = createContext(true);


const CtxComodin = createContext(0);



// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    LoadingDet: useState(useContext(CtxLoadingDet)),
    LoadingCheck: useState(useContext(CtxLoadingCheck)),
    FiltroFecha: useState(useContext(CtxFiltroFecha)),

    Router: useState(useContext(CtxRouter)),
    Images: useState(useContext(CtxImages)),
    TipoAnim: useState(useContext(CtxTipoAnim)),

    Empresa: useState(useContext(CtxEmpresa)),

    Sucursales: useState(useContext(CtxSucursales)),

    Categorias: useState(useContext(CtxCategorias)),
    Categoria: useState(useContext(CtxCategoria)),

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
    Cliente: useState(useContext(CtxCliente)),
    Nombre: useState(useContext(CtxNombre)),
    NumCuenta: useState(useContext(CtxNumCuenta)),
    Fecha: useState(useContext(CtxFecha)),
    Obv: useState(useContext(CtxObv)),
    TipoEntrega: useState(useContext(CtxTipoEntrega)),
    TipoPago: useState(useContext(CtxTipoPago)),
    Monto: useState(useContext(CtxMonto)),

    Pagado: useState(useContext(CtxPagado)),
    Indica: useState(useContext(CtxIndica)),

    Cupon: useState(useContext(CtxCupon)),
    Location: useState(useContext(CtxLocation)),


    LoadingSecc1: useState(useContext(CtxComodin)),
    LoadingSecc2: useState(useContext(CtxComodin)),
    LoadingSecc3: useState(useContext(CtxComodin)),
    LoadingSecc4: useState(useContext(CtxComodin)),
    LoadingSecc5: useState(useContext(CtxComodin)),
    LoadingSecc6: useState(useContext(CtxComodin)),


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
    Activos: useState(useContext(CtxComodin)),
    Participante: useState(useContext(CtxComodin)),

    DataOpcion1: useState(useContext(CtxComodin)),

    ShareLocation: useState(useContext(createContext(false))),
    Marca: useState(useContext(createContext(""))),
    Color: useState(useContext(createContext("Otro"))),
    LocObv: useState(useContext(createContext(""))),


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



let useStatus = function(StateContextM) {



  // ---------------------------


  return {

    Comp1: () => {
      if (Detalle.Cliente===2) {return 0}
      if (Detalle.Cliente>0) {return 1}

      return 0
    },



  }
}

// ------------------------------------------------


let useAcciones = function(StateContextM) {
  const useDataMx = new UsedataM(StateContextM)

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;

  const [Location, setLocation] = useContext(StateContextM).Location;

  const [ShareLocation, setShareLocation] = useContext(StateContextM).ShareLocation;
  const [Marca, setMarca] = useContext(StateContextM).Marca
  const [Color, setColor] = useContext(StateContextM).Color
  const [LocObv, setLocObv] = useContext(StateContextM).LocObv


  // const { latitude, longitude, timestamp, accuracy, error } = usePosition(false, {
  //   Active: true,
  //   enableHighAccuracy: true,
  //   timeout: Infinity,
  //   maximumAge: 0
  // });



// ------------
  
return {


  // Loader : async function (e) {

  //   try{



  //     return 1

  //   } catch (e) {console.error(e)
  //     return 0
  //   }
  // },


  addPositionIni : async (MiPedido) => {

    const defaultSettings = {
      Active: true,
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const showPosition = async (position) => {
      
      let add = await useDataMx.Location().insert({
        Pedido: Pedido,
        LocLat: position.coords.latitude,
        LocLong: position.coords.longitude,
        Accuracy: position.coords.accuracy,
        Marca: Marca,
        Color: Color,
        Obv: LocObv
        //Fecha: timestamp
      }) 

      return add
    }

    const onError = error => { console.log(error)}// setError(error.message)}

    if(!ShareLocation){
      let geo = await navigator.geolocation.getCurrentPosition(showPosition, onError, defaultSettings)

      let upProceso = await useDataMx.Pedidos().upProceso({
        Id: Pedido,
        Proceso: "RutaTogo",
      }) 

    }














    return 1
  },


  }
}

// -------------------------------------------


// -----------------------------------------------------------------------------



const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  const [Images] = useContext(StateContextM).Images;
  const [Router, setRouter] = useContext(StateContextM).Router;

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Sucursal] = useContext(StateContextM).Sucursal;

  const [Registros, setRegistros] = useContext(StateContextM).Registros;

  const [Nombre] = useContext(StateContextM).Nombre;
  const [NumCuenta] = useContext(StateContextM).NumCuenta;


  //const { getRegistros, getCuenta, getProductos, getPedido} = useData();
  const [Location, setLocation] = useContext(StateContextM).Location;
  const [ShareLocation, setShareLocation] = useContext(StateContextM).ShareLocation;

  let useDataMx = new UsedataM(StateContextM)

  const [Marca, setMarca] = useContext(StateContextM).Marca
  const [Color, setColor] = useContext(StateContextM).Color
  const [LocObv, setLocObv] = useContext(StateContextM).LocObv
// -----------------------------------------------------------------------------


  let addPosition = async (MiPedido) => {

    const defaultSettings = {
      Active: true,
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    
    const showPosition = async (position) => {
      
      let add = await useDataMx.Location().insert({
        Pedido: MiPedido,
        LocLat: position.coords.latitude,
        LocLong: position.coords.longitude,
        Accuracy: position.coords.accuracy,
        Marca: Marca,
        Color: Color,
        Obv: LocObv      }) 

      return add
    }

    const onError = error => { }// setError(error.message)}
    
    if(ShareLocation){
      
      let geo = await navigator.geolocation.getCurrentPosition(showPosition, onError, defaultSettings)
    }
    return 1
  }





  var pusherRadar = function(e){
    //console.log(e)
    //console.log("radar recibido")
     addPosition(Pedido)

  }




  var channel = pusher.subscribe('csradar');






 // console.log(Sucursal)


  useEffect(() => {
    useDataMx.Pedidos().get(props)
    

    switch (props.opt) {

      case 1:
        navigate("/cover")
        setRouter(0)
      break

      case 2:
        navigate("/check")
        setRouter(3)
      break

      case 3:
        navigate("/checkout")
        setRouter(4)
      break

      default:
        navigate("/")
      break

    }

    channel.bind('report', pusherRadar, {Pedido:Pedido});


  }, []);



  // useEffect(() => {useAccionesX.LocationAdd() }, [Pedido])





  useEffect(() => {
    useDataMx.Consumos().getCuenta()
  }, [Registros]);

  useEffect(() => {
    useDataMx.Consumos().get()
    useDataMx.Consumos().getCuenta()

    channel.unbind('report');
    channel.bind('report', pusherRadar, {Pedido:Pedido});

  }, [Pedido]);

  useEffect(() => {
    useDataMx.Productos().get()
  }, [Sucursal]);


  useEffect(() => {
    channel.unbind('report');
    channel.bind('report', pusherRadar, {Pedido:Pedido});
    }, [ShareLocation]);


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
            setRouter(1)
          }}
        >
          X 
        </Button>
      </Box>

      )
    }
  }




  try {





    if(Router===0){
      return (

        <div>

          <Flex sx={{ height: "34px", width: "100%" }}>
          </Flex>


        </div>

      )


    } else {

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

          <Box sx={{ width: "30%" }}>
            <Image sx={{ height: "34px" }} src={Images.logo2.src} />
          </Box>

          <Box sx={{ width: "20%" }}>
          </Box>

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

          {/* <Text sx={Estilo.d1s}> {latitude}</Text> */}





        </Flex>
      </div>
    
    )
    }
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
  const [Monto] = useContext(StateContextM).Monto;

  //const [ExtrasDet, setExtrasDet] = useContext(StateContextM).ExtrasDet;
  //const { sumExtras, addRegistro, upRegistro} = useData();

  let useDataMx = new UsedataM(StateContextM)


  try {
    const PieDinamico = () => {    
      try {



        if(Router===0){
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
                    width: "100%"
                  }}
                >
      
                  <Flex sx={{ width: "100%", }}>
      

      
                    </Flex>
                </Box>
      

              </Flex>
      
            </div>
          );
        }

















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
                    bg={"#A52A2A"}
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
          if (Monto>0){

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
                    > Tu pedido está recibido 
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
                    bg={"#A52A2A"}
                    Disabled={false}
                    onClick={() => {
                      //addRegistro()
                      
                      useDataMx.Consumos().add()

                      navigate("/")
                      setRouter(1)
                    
                    }}
                  >
                    Agregar $ {Detalles.ConsumosCantidad * (Detalles.ConsumosPrecio + useDataMx.Extras().sum)}
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
                    bg={"#A52A2A"}
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
                    bg={"#A52A2A"}
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



        if(Router===5){


          if (Monto>0){

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
                    > Tu pedido está recibido 
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
                    bg={"#A52A2A"}
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


  const [Sucursal] = useContext(StateContextM).Sucursal;

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
  const [Monto, setMonto] = useContext(StateContextM).Monto;
  const [Categoria, setCategoria] = useContext(StateContextM).Categoria;






  const [Images] = useContext(StateContextM).Images;
  const [Pedido] = useContext(StateContextM).Pedido;
  const [Nombre] = useContext(StateContextM).Nombre;
  const [NumCuenta] = useContext(StateContextM).NumCuenta;

  const useAccionesX = new useAcciones(StateContextM)

  const [Location, setLocation] = useContext(StateContextM).Location
  const [ShareLocation, setShareLocation] = useContext(StateContextM).ShareLocation
  const [Marca, setMarca] = useContext(StateContextM).Marca
  const [Color, setColor] = useContext(StateContextM).Color
  const [LocObv, setLocObv] = useContext(StateContextM).LocObv







  //const { sumExtras, getDetalle, getDetalleConsumo, deleteRegistro, PayStripe} = useData();


  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  const routeResult = useRoutes(
    routes({
      Theme,
      navigate,
      //A,
      Router, setRouter,
      //TipoAnim,
      //setTipoAnim,

      Loading, setLoading,
      LoadingDet,
      Editado, setEditado,
      Productosx,
      Categorias, 
      Categoria, setCategoria,
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
      Monto,
      Sucursal,
      // sumExtras,
      // PayStripe,
      // getDetalle,
      // getDetalleConsumo,
      // deleteRegistro,

      Nombre, NumCuenta,
      Images,
      Pedido,
      useAccionesX,

      Location, setLocation,
      ShareLocation, setShareLocation,
      Marca, setMarca,
      Color, setColor,
      LocObv, setLocObv,
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
         />  */}
       



       {/* <Registros
        Registros={Registrosx}
        Loading={Loading}
        navigate={navigate}
        setRouter={setRouter}
        Monto={Monto}

        usedata={useDataMx}
      />  */}
       


{/*         
       <Pagar
        Cuenta={Cuenta}
        //Loading={props.Loading}
        TipoPago={props.TipoPago}
        setTipoPago={props.setTipoPago}
        TipoEntrega={props.TipoEntrega}
        setTipoEntrega={props.setTipoEntrega}
        //PayStripe={props.PayStripe}
        usedata={props.useDataMx}
        Pagado={props.Pagado}
        setPagado={props.setPagado}
        Monto={props.Monto}
        Suc={props.Sucursal}
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
    "/cover": () => (

      <CoverPage
        Registros={props.Productosx}
        Loading={props.Loading}
        setLoading={props.setLoading}
        Nombre={props.Nombre}
        Cuenta={props.Cuenta}

        navigate={props.navigate}
        setRouter={props.setRouter}
        usedata={props.useDataMx}
        Monto={props.Monto}
        Suc={props.Sucursal}
        Images={props.Images}


      /> 




    ),


    "/": () => (
      <ProductPage
        Registros={props.Productosx}
        Loading={props.Loading}
        setLoading={props.setLoading}

        Categorias={props.Categorias}
        navigate={props.navigate}
        setRouter={props.setRouter}
        usedata={props.useDataMx}
        Categoria={props.Categoria}
        setCategoria={props.setCategoria}
      /> 
    ),












    "/det": () => (
      <Detalle
        Theme={props.Theme}
        navigate={props.navigate}
        Router={props.Router}
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
        Monto={props.Monto}

        usedata={props.useDataMx}

        //getDetalleConsumo={props.getDetalleConsumo}
        //deleteRegistro={props.deleteRegistro}


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
        Monto={props.Monto}
        Suc={props.Sucursal}

        useAcciones={props.useAccionesX}
        Location={props.Location}
        setLocation={props.setLocation}
        ShareLocation={props.ShareLocation}
        setShareLocation={props.setShareLocation}
        
        Marca={props.Marca}
        setMarca={props.setMarca}
        Color={props.Color}
        setColor={props.setColor}
        LocObv={props.LocObv}
        setLocObv={props.setLocObv}





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

        
        <React.Suspense fallback={<div>Loading...</div>}>
          <Router {...props} sx={{ width: "100%" }} />
        </React.Suspense>

          {/* <Router {...props} sx={{ width: "100%" }} /> */}

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

