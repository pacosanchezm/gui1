import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Flex, Box, Button, Text, Image } from "@theme-ui/components"
  import Theme from "../css/cssui/theme"
  import "@babel/polyfill"

// ------------------


import UsedataM from "./csusedata"
import CatComp from "./cq1cat"
import InfoComp from "./cq1info"
import ActComp from "./cq1acts"



import RollComp from "./cq1roll"


let App;

// -----------------------------------------------------------------------------



let Images = {
  logo1: {src: "https://smxai.net/jukevox/beatlogo1.jpg"},
  logo2: {src: "https://smxai.net/sf/cs1/sflogo2.jpg"},
  logo3: {src: "https://smxai.net/sf/cs1/factorylogo.png"},

  icon1: {src: "https://smxai.net/sf/cs1/avatar.jpg"},
  icon2: {src: "https://smxai.net/sf/cs1/cuenta2.jpg"},
  cover1: {src: "https://smxai.net/sf/cs1/cover1.jpg"},
  menu1: {src: "https://smxai.net/sf/cs1/menuboton1.jpg"},

}







let MisProductos = [
  {
    "Id": 0,
    "Producto": null,
    "ProductosTitulo": "",
    "Precio": null,
    "Obv": "",
    "ProductosFoto": "",
    "ProductosFoto2": "",
    "MeetingsId": null,
    "MeetingId": "",
    "MeetingsObv": "",
    "MeetingsFecha": "",
    "MeetingsLugar": "",
    "MeetingsTemplate": ""
  }
]



let MisParticipantes = [
  {
    Id: 0,
    Nombre: [""],
    Apellido: [""],
  }
]


let MisActivos = [
  {
    Id: null,
    Codigo: "",
    Nombre: "",
    Apellido: "",
  }
]


// let MisActivos = [
//   {
//     Id: 1,
//     Nombre: "Paco",
//     Apellido: "Sanchez",
//   }
// ]






let MiDetalle = {
  Id: null,
  Codigo: [""],
  Fecha: [""],

  Nombre: [""],
  Apellido: [""],
  Telefono: [""],
  Email: [""],
  Ciudad: [""],

  TipoEntrega: [""],
  Confirmado: [""],

  Sucursal: [""],
  Cliente: 2,
  Cuenta: [""],
  Monto: [""],
  Obv: [""],

  Cupon: [""],
}


let MiMeetings = [
  {
    "Pedido": [""],
    "Id": [""],
    "ConsumosMeetingsId": [""],

    "ConsumosMeetingsIngresoUrl": null,

    // "ConsumosMeetingsIngresoUrl": "https://us02web.zoom.us/w/86434072795?tk=Oi4qLRGUfcklHUNqyHO6QNVoWLOin2EyGC2LSzMy1qg.DQIAAAAUH99I2xZpSnNyYm5fX1NNdW1zcHdaZU1xaGxBAAAAAAAAAAAAAAAAAAAAAAAAAAAA&pwd=dDA1akkwNm1hKzFwTlJmT2s1NzMrUT09",

  }
]


// --------------------------------------------------------

const StateContextM = createContext()
const CtxTheme = createContext(Theme)

const CtxLoadingSecc1 = createContext(false)
const CtxLoadingSecc2 = createContext(false)
const CtxLoadingSecc3 = createContext(false)
const CtxLoadingSecc4 = createContext(false)
const CtxLoadingSecc5 = createContext(false)
const CtxLoadingSecc6 = createContext(false)

const CtxImages = createContext(Images)
const CtxIndica = createContext("Llena todos los datos")

const CtxEmpresa = createContext(1)
const CtxSucursal = createContext({value: 6})

const CtxRegistros = createContext([])
const CtxProductos = createContext(MisProductos)
const CtxDetalle = createContext(MiDetalle)
const CtxMeetings = createContext(MiMeetings)
const CtxActivos = createContext(MisActivos)
const CtxHayActivos = createContext(false)

const CtxParticipantes = createContext(MisParticipantes)
const CtxParticipante = createContext(0)


const CtxPedido = createContext(9999)
const CtxPedidoQ = createContext(0)

const CtxConsumo = createContext(1)

const CtxCliente = createContext(0)
const CtxEditado = createContext(false)

const CtxComodin = createContext(0)

// --------------------------------------------------------

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),

    LoadingSecc1: useState(useContext(CtxLoadingSecc1)),
    LoadingSecc2: useState(useContext(CtxLoadingSecc2)),
    LoadingSecc3: useState(useContext(CtxLoadingSecc3)),
    LoadingSecc4: useState(useContext(CtxLoadingSecc4)),
    LoadingSecc5: useState(useContext(CtxLoadingSecc5)),
    LoadingSecc6: useState(useContext(CtxLoadingSecc6)),

    Images: useState(useContext(CtxImages)),

    Empresa: useState(useContext(CtxEmpresa)),

    Registros: useState(useContext(CtxRegistros)),
    Productos: useState(useContext(CtxProductos)),
    Detalle: useState(useContext(CtxDetalle)),
    Meetings: useState(useContext(CtxMeetings)),
    HayActivos: useState(useContext(CtxHayActivos)),

    Activos: useState(useContext(CtxActivos)),
    
    Participantes: useState(useContext(CtxParticipantes)),
    Participante: useState(useContext(CtxParticipante)),

    Editado: useState(useContext(CtxEditado)),

    TipoAnim: useState(useContext(CtxComodin)),
    Indica: useState(useContext(CtxIndica)),

    Sucursales: useState(useContext(CtxComodin)),

    Categorias: useState(useContext(CtxComodin)),
    Categoria: useState(useContext(CtxComodin)),
    Consumo: useState(useContext(CtxConsumo)),

    Pedido: useState(useContext(CtxPedido)),
    PedidoQ: useState(useContext(CtxPedidoQ)),



    Sucursal: useState(useContext(CtxSucursal)),
    Cliente: useState(useContext(CtxCliente)),



    Loading: useState(useContext(CtxComodin)),
    LoadingDet: useState(useContext(CtxComodin)),


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

    FiltroFecha: useState(useContext(CtxComodin)),

    Router: useState(useContext(CtxComodin)),

    Extras: useState(useContext(CtxComodin)),
    ExtrasDet: useState(useContext(CtxComodin)),
    ConsumosExtras: useState(useContext(CtxComodin)),

    Cuenta: useState(useContext(CtxComodin)),



    Nombre: useState(useContext(CtxComodin)),
    NumCuenta: useState(useContext(CtxComodin)),
    Fecha: useState(useContext(CtxComodin)),
    Obv: useState(useContext(CtxComodin)),
    TipoEntrega: useState(useContext(CtxComodin)),
    TipoPago: useState(useContext(CtxComodin)),
    Monto: useState(useContext(CtxComodin)),

    Pagado: useState(useContext(CtxComodin)),
    

    Cupon: useState(useContext(CtxComodin)),


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


// -----------------------------------------------------------------------------

let useStatus = function(StateContextM) {

  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;
  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Meetings, setMeetings] = useContext(StateContextM).Meetings;
  const [Productos, setProductos] = useContext(StateContextM).Productos;

  const [Activos, setActivos] = useContext(StateContextM).Activos;
  const [HayActivos, setHayActivos] = useContext(StateContextM).HayActivos;

  const [PedidoQ, setPedidoQ] = useContext(StateContextM).PedidoQ;


// -------------------------------------
  
  return {

    Comp1: () => {
      if (Detalle.Cliente===2) {return 0}
      if (Detalle.Cliente>0) {return 1}

      return 0
    },

    Activos: () => {
       if (Activos[0].Id===null) {return 0}

       if (Pedido!==9999) {return 0}


       if (Activos[0].Id===0) {return 1}

     // if (HayActivos) {return 1}

      return 2
    },


    Roll: () => {
      if (PedidoQ>0) {return 2}

      return 0
    },



  }
}

// -----------------------------------------------------------------------------


let useAcciones = function(StateContextM) {
  const useDataMx = new UsedataM(StateContextM)

  const [Detalle, setDetalle] = useContext(StateContextM).Detalle
  const [Pedido, setPedido] = useContext(StateContextM).Pedido
  const [PedidoQ, setPedidoQ] = useContext(StateContextM).PedidoQ

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal

  const [Productos, setProductos] = useContext(StateContextM).Productos
  const [Registros, setRegistros] = useContext(StateContextM).Registros

  const [Activos, setActivos] = useContext(StateContextM).Activos
  const [HayActivos, setHayActivos] = useContext(StateContextM).HayActivos;

  const [Loading, setLoading] = useContext(StateContextM).Loading

// ------------
  
  return {


    Loader : async function (e) {

      try{
        setLoading(true)

          let Data = await useDataMx.Catalogos().get(e)

        if (Data!==0){

          setProductos({...Data, "MeetingsObv": JSON.parse(Data.MeetingsObv)})

          //setEmpresa(Data.Empresa)
          setSucursal({value: Data.Sucursal})
          setLoading(false)
        } else {
          setLoading(false)

        }


        return 1

      } catch (e) {console.error(e)
        return 0
      }
    },












    InfoAdd : async function (props) {

      try{

        // 🔶🔶🔶🔶🔶🔶🔶 

        let MiCliente = await useDataMx.Clientes().pull3() 

        let MisActivos = await useDataMx.Pedidos().getActivos({
          Producto: Productos.Producto
        }) 
        //console.log(MisActivos)

        await setActivos(MisActivos)


        // 🔶🔶🔶🔶🔶🔶🔶 
        await setDetalle({ ...Detalle, "Cliente": MiCliente.Id })
        //await setDetalle({ ...Detalle, "Cliente": 4 })


        return 1

      } catch (e) {
        console.error(e)
        return 0
      }
    },



    






    PedidoSetup : async function (props) {

      try{

        let MiPedido = await this.PedidoAdd(Detalle.Cliente, props.Referido)

        let MiConsumo = await this.ConsumoAdd(MiPedido.Id)

        let MiConsumoMeeting = await this.ConsumoMeetingAdd({
          Consumo: MiConsumo
        })

        setPedidoQ(MiPedido.Codigo)
        return 1

      } catch (e) {
        console.error(e)
        return 0
      }
    },










    PedidoAdd : async function (MiCliente, Referido) {
      // console.log("ClienteP: " + MiCliente)
      // console.log("Referido: " + Referido)
 
       let MiPedido = await useDataMx.Pedidos().addQ2({
         Sucursal: Sucursal,
         Cliente: MiCliente,
         Referido: Referido ? Referido : null,
       }) 
       return MiPedido
 

 
 
     },
 
 
     ConsumoAdd : async function (MiPedido) {
 
       let MiConsumo = await useDataMx.Consumos().add2({
         Pedido: MiPedido,
         Producto: Productos.Producto,
         Precio: Productos.Precio,
         PrecioObv: "",
         Cantidad: 1,
         Importe: Productos.Precio,
         Obv: String(Productos.Obv),
 
       }) 
       
       return MiConsumo
     },


 
     ConsumoMeetingAdd : async function (e) {
 
      let MiConsumo = await useDataMx.ConsumosMeetings().insert({
        Consumo: e.Consumo,

        // Producto: Productos.Producto,
        // Precio: Productos.Precio,
        // PrecioObv: "",
        // Cantidad: 1,
        // Importe: Productos.Precio,
        // Obv: String(Productos.Obv),

      }) 
      
      return MiConsumo
    },







  }
}

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  const [Images] = useContext(StateContextM).Images;
  const [Router, setRouter] = useContext(StateContextM).Router;
  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;
  const [Sucursal] = useContext(StateContextM).Sucursal;
  const [Productos, setProductos] = useContext(StateContextM).Productos;
  const [Nombre] = useContext(StateContextM).Nombre;
  const [NumCuenta] = useContext(StateContextM).NumCuenta;

  let useDataMx = new UsedataM(StateContextM)

  const useAccionesX = new useAcciones(StateContextM)


// ------------

useEffect(() => {useAccionesX.Loader(props) }, [])


// ------------
  try {

    return (
      <div>

        <Flex sx={{ height: "34px", width: "100%" }}>

          <Box sx={{ width: "30%" }}>
            <Image sx={{ height: "34px" }} src={Images.logo3.src} />
          </Box>

        </Flex>
      </div>
    
    )
    
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const CatalogoProductos = props => {
  try {
    return (
      <div>

        <CatComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


const Info = props => {

  const useAccionesMx = new useAcciones(StateContextM)

  try {
    return (
      <div>

        <InfoComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
          //usedata={useDataMx}
          useAcciones={useAccionesMx}
          Referido={props.token}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


const Activos = props => {

  const useAccionesMx = new useAcciones(StateContextM)

  try {
    return (
      <div>

        <ActComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
          //usedata={useDataMx}
          useAcciones={useAccionesMx}
          //Referido={props.token}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Roll = props => {
  const useAccionesMx = new useAcciones(StateContextM)

  try {
    return (
      <div>

        <RollComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
          useAcciones={useAccionesMx}
          id={props.id}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------










// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
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
          <Encabezado {...props} texto="Inscripción" />
        </header>

        <main sx={{width: "100%",flex: "1 1 auto"}}>


        <CatalogoProductos {...props} />
        <Info {...props} />
        <Activos {...props} />
        <Roll {...props} /> 


          {/* <CatalogoProductos {...props} />
          <Info {...props} />
          <Orden {...props} />
          <Pago {...props} />
          <Roll {...props} /> */}

        </main>


      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
