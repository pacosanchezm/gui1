import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components"
  import Theme from "../css/cssui/theme"
  import "@babel/polyfill"

// ------------------

  import UsedataM from "./csusedata"
  import CatComp from "./cf1cat"
  import InfoComp from "./cf1info"
  import OrdenComp from "./cf1orden"
  import CuponComp from "./cf1cupon"
  import SponsorComp from "./cf1sponsors"

  import PagoComp from "./cf1pago"
  import RollComp from "./cf1roll"



  //import Ccard from "./cc1st1"



  let App;

// -----------------------------------------------------------------------------


let Images = {
  logo1: {src: "https://smxai.net/empresando/conflogo2.jpg"},
  logo2: {src: "https://smxai.net/sf/cs1/sflogo2.jpg"},
  logo3: {src: "https://smxai.net/sf/cs1/factorylogo.png"},
  logo4: {src: "https://smxai.net/jukevox/beatlogo1.jpg"},

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
    "MeetingsTemplate": "",
    "EmpresasLogo2": "",
    "EmpresasLogo": "",
    "EmpresasTitulo": "",


  }
]


let MisRegistros = [
  {
    "Pedido": [""],
    "Id": [""],

  }
];











let MiDetalle = {
  Id: ["0"],
  Codigo: [""],
  Fecha: [""],
  Ciudad: "",


  // Nombre: "Paco",
  // Apellido: "Sanchez",
  // Telefono: "4772740011",
  // Email: "paco.sanchezm@gmail.com",



  Nombre: "",
  Apellido: "",
  Telefono: "",
  Email: "",




  TipoEntrega: [""],
  Confirmado: [""],

  Sucursal: [""],
  Cliente: null,
  Cuenta: [""],
  Monto: [""],
  Obv: [""],

  Cupon: [""],

};



let MiMeetings = [
  {
    "Pedido": [""],
    "Id": [""],
    "ConsumosMeetingsId": [""],

      "ConsumosMeetingsIngresoUrl": null,

     // "ConsumosMeetingsIngresoUrl": "https://us02web.zoom.us/w/86434072795?tk=Oi4qLRGUfcklHUNqyHO6QNVoWLOin2EyGC2LSzMy1qg.DQIAAAAUH99I2xZpSnNyYm5fX1NNdW1zcHdaZU1xaGxBAAAAAAAAAAAAAAAAAAAAAAAAAAAA&pwd=dDA1akkwNm1hKzFwTlJmT2s1NzMrUT09",


  }
];




// --------------------------------------------------------

const StateContextM = createContext();
const CtxComodin = createContext(0);



// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: useState(useContext(createContext(true))),
    LoadingDet: useState(useContext(createContext(false))),
    LoadingCheck: useState(useContext(createContext(false))),

    LoadingSecc1: useState(useContext(createContext(false))),
    LoadingSecc2: useState(useContext(createContext(false))),
    LoadingSecc3: useState(useContext(createContext(false))),
    LoadingSecc4: useState(useContext(createContext(false))),
    LoadingSecc5: useState(useContext(createContext(false))),
    LoadingSecc6: useState(useContext(createContext(false))),

    FiltroFecha: useState(useContext(createContext(new Date()))),

    Router: useState(useContext(createContext(1))),
    Images: useState(useContext(createContext(Images))),
    TipoAnim: useState(useContext(createContext(1))),

    Empresa: useState(useContext(createContext(1))),
    Sucursales: useState(useContext(createContext([]))),
    Categorias: useState(useContext(createContext(""))),
    Categoria: useState(useContext(createContext(""))),

    Registros: useState(useContext(createContext([]))),
    Productos: useState(useContext(createContext(MisProductos))),
    Detalle: useState(useContext(createContext(MiDetalle))),

    Extras: useState(useContext(createContext(""))),
    ExtrasDet: useState(useContext(createContext(""))),
    ConsumosExtras: useState(useContext(createContext(""))),

    Cuenta: useState(useContext(createContext({Pedido: 0, Cuenta: "", Monto: ""}))),
    Editado: useState(useContext(createContext(false))),
    Consumo: useState(useContext(createContext(1))),

    Pedido: useState(useContext(createContext(9999))),
    Sucursal: useState(useContext(createContext({value: 27}))),
    Cliente: useState(useContext(createContext(0))),
    Nombre: useState(useContext(createContext(""))),
    NumCuenta: useState(useContext(createContext(""))),
    Fecha: useState(useContext(createContext(""))),
    Obv: useState(useContext(createContext(""))),
    TipoEntrega: useState(useContext(createContext(1))),
    TipoPago: useState(useContext(createContext(1))),
    Monto: useState(useContext(createContext(0))),

    Pagado: useState(useContext(createContext(0))),
    Indica: useState(useContext(createContext("Llena todos los datos"))),
    
    Meetings: useState(useContext(createContext(MiMeetings))),
    Cupon: useState(useContext(createContext(""))),
    CuponAplicado: useState(useContext(createContext(false))),
    SponsorCupon: useState(useContext(createContext({}))),
    SponsorMeeting: useState(useContext(createContext({}))),

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


// -----------------------------------------------------------------------------

let useStatus = function(StateContextM) {

  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;
  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [Meetings, setMeetings] = useContext(StateContextM).Meetings;
  const [Productos, setProductos] = useContext(StateContextM).Productos;
  const [Pagado, setPagado] = useContext(StateContextM).Pagado;


  const [CuponAplicado, setCuponAplicado] = useContext(StateContextM).CuponAplicado;


// -------------------------------------
  
  return {

    Comp1: function() {
      // el bueno
      //if (Productos.Status==="Agotado") {return 3}

      if (Detalle.Cliente===0) {return 0}
      if (Detalle.Cliente>0) {return 1}

      return 0
    },


    Comp3: function() {

      return 0
    },


    Cupon: function() {
      const Info = this.Comp1()

     // return 0 // sin opcion de cupon


      if (Info===0) {return 0}

      if (Info===1) {
        
        if (Productos.Precio === 0 ) {
          if (CuponAplicado){ return 1} else {return 0}
        }  
        

        return 1
      }

      return 0
    },




    Sponsor: function () {
      const Info = this.Comp1()
      if (Info === 1){

        if (Productos.Precio === 0) {

          if (CuponAplicado){ return 2} else {return 1}

        } else {
          if (CuponAplicado){ return 2} else {return 0}
        }

      }

      return 0
    },




    Comp4: function() {

      if (Pedido===9999) {return 0}
      else {
        if (Pagado===Productos.Precio) {return 2}

        if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 0} // else {return 1}

        if (Productos.Precio > 0) { return 1}
        
      }

    },


    Comp5: function() {

      // el bueno

      //ocultar para pagar free
      if (Productos.Precio>0) {
        if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 2} else {return 0}
      }

      if (Pedido===9999) {return 0}
      else {
        if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 2} else {return 1}
      }

    },

  }
}

// -----------------------------------------------------------------------------


let useAcciones = function(StateContextM) {
  const useDataMx = new UsedataM(StateContextM)
  const useStatusx = new useStatus(StateContextM)




  const [Detalle, setDetalle] = useContext(StateContextM).Detalle
  const [Pedido, setPedido] = useContext(StateContextM).Pedido
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal

  const [Productos, setProductos] = useContext(StateContextM).Productos
  const [Registros, setRegistros] = useContext(StateContextM).Registros

  const [Empresa, setEmpresa] = useContext(StateContextM).Empresa
  const [Loading, setLoading] = useContext(StateContextM).Loading

  const [LoadingSecc5, setLoadingSecc5] = useContext(StateContextM).LoadingSecc5




  const [SponsorMeeting, setSponsorMeeting] = useContext(StateContextM).SponsorMeeting;
  const [SponsorCupon, setSponsorCupon] = useContext(StateContextM).SponsorCupon;

  const [Pagado, setPagado] = useContext(StateContextM).Pagado;


// -------------------------------------
  
  return {

    Loader : async function (e) {

      try{
        setLoading(true)

          let Data = await useDataMx.Catalogos().get(e)

        if (Data!==0){

          setProductos({...Data, "MeetingsObv": JSON.parse(Data.MeetingsObv)})

          setEmpresa(Data.Empresa)
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


    hookPrecio : async function (e) {

      try{

        console.log(useStatusx.Sponsor())

        if (useStatusx.Sponsor()===1){
          
          let Data = await useDataMx.Sponsors().getMeeting(Productos)
          await setSponsorMeeting(Data[0])
          console.log(Data)

        }

        return 1

      } catch (e) {console.error(e)
        return 0
      }
    },





    hookCupon : async function (e) {

      try{

        console.log(useStatusx.Sponsor())

        if (useStatusx.Sponsor()===2){
          
          // let Data = await useDataMx.Sponsors().get()
          // console.log(Data)

          console.log("cargar patro cup")
        }

        return 1

      } catch (e) {console.error(e)
        return 0
      }
    },








    InfoAdd : async function (Referido) {

      try{

        let MiCliente = await useDataMx.Clientes().pull2() 
        console.log({MiCliente: MiCliente})
        await setDetalle({ ...Detalle, "Cliente": MiCliente.Id })

        // el manual
          //  let MiPedido = 3332
          //  setPedido(MiPedido)
          //  setRegistros([{Id: 2107}])


        // el bueno
         let MiPedido = await this.PedidoAdd(MiCliente.Id, Referido)
         let MiConsumo = await this.ConsumoAdd(MiPedido)


        // console.log({MiConsumo: MiConsumo})

        return 1

      } catch (e) {
        console.error(e)
        return 0
      }
    },


    PedidoAdd : async function (MiCliente, Referido) {
     // console.log("ClienteP: " + MiCliente)
     // console.log("Referido: " + Referido)

      let MiPedido = await useDataMx.Pedidos().add({
        Sucursal: {value: Sucursal},
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



    PagarFree : async function (e) {

      let MiPago = await useDataMx.Pagos().Free({

        Forma: e.Forma


        // Pedido: MiPedido,
        // Producto: Productos.Producto,
        // Precio: Productos.Precio,
        // PrecioObv: "",
        // Cantidad: 1,
        // Importe: Productos.Precio,
        // Obv: String(Productos.Obv),

      }) 
      
      return MiPago
    },



    PagarStripe : async function (e) {
      //console.log({PagarStripe: e})

      let MiPago

      try{

        // return 0


         // ---- El bueno
          MiPago = await useDataMx.Pagos().Stripe2(e, Productos.Precio, 0) 

        // ---- Test
         //MiPago = 1

        if(MiPago===1){
          setPagado(Productos.Precio)
          this.Inscribir()
        }

        return MiPago

      } catch (e) {console.error(e); return 0}

    },













    Inscribir : async function () {
      //console.log("ClienteP: " + MiCliente)
      try{
        setLoadingSecc5(true)
        let MiInscribir = await useDataMx.ConsumosMeetings().inscribir({
          Consumo: Registros[0].Id,
          Host: String(Productos.Host),
          MeetingId: String(Productos.MeetingId),
          Email: String(Detalle.Email),
          Nombre: String(Detalle.Nombre),
          ApellidoPat: String(Detalle.Apellido),
          Telefono: String(Detalle.Telefono),
          Cupon: 0,
        }) 

        console.log({MiInscribir})

        if(MiInscribir===1){
          let getMeetings = await useDataMx.ConsumosMeetings().get()
          let mailenvia = await useDataMx.ConsumosMeetings().MandarMailNode(getMeetings)
          setLoadingSecc5(false)
          return 1
        }


        setLoadingSecc5(false)
        
        return 0

      } catch (e) {
        console.error(e)
        return 0
      }
    },

    MandarMail : async function () {
      //console.log("ClienteP: " + MiCliente)
      try{

        let mailenvia = await useDataMx.ConsumosMeetings().MandarMailNode();
        
        return mailenvia

      } catch (e) {console.error(e)
        return 0
      }
    },



    getCupon : async function (Codigo) {

      try{
        let MiCupon = await useDataMx.Cupones().get(Codigo);
        return MiCupon

      } catch (e) {console.error(e)
        return 0
      }
    },

    aplicarCupon : async function (e) {

      try{
        let MiCupon = await useDataMx.Cupones().aplicar(e.Id)
        let MiSponsor = await useDataMx.Sponsors().get(e)
        setSponsorCupon(MiSponsor[0])
        console.log(MiSponsor)
        return MiCupon

      } catch (e) {console.error(e)
        return 0
      }
    }

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
  const [Loading] = useContext(StateContextM).Loading;
  const [CuponAplicado] = useContext(StateContextM).CuponAplicado;



  let useDataMx = new UsedataM(StateContextM)

  const useAccionesX = new useAcciones(StateContextM)
  





// ------------

  useEffect(() => {useAccionesX.Loader(props) }, [])

  useEffect(() => {useAccionesX.hookPrecio(props) }, [Productos.Precio])

  useEffect(() => {useAccionesX.hookCupon(props) }, [CuponAplicado])

// ------------
  try {

    return (

      <Flex bg="#000000" sx={{ height: "34px", width: "100%" }}>


        {Loading ? <Spinner size={17} ml={3} /> : 

         
            <Flex sx={{ height: "34px", width: "100%" }}>

              <Box sx={{ width: "100%" }}>
                <Image sx={{ height: "34px" }} src={Productos.EmpresasLogo2} />
              </Box>

            </Flex>
          
        }
      </Flex>


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
  //let useStatusMx = new useStatus(StateContextM)
  //const useDataMx = new UsedataM(StateContextM)

  //console.log(props)

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
          Referido={props.token ? props.token : 1}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


const Cupon = props => {

  const useAccionesMx = new useAcciones(StateContextM)

  try {
    return (
      <div>

        <CuponComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
          useAcciones={useAccionesMx}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


const Sponsor = props => {

  const useAccionesMx = new useAcciones(StateContextM)



  try {
    return (
      <div>

        <SponsorComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}

          useAcciones={useAccionesMx}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------







const Orden = props => {
  try {
    return (
      <div>

        <OrdenComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
        />

      </div>
    )
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Pago = props => {
  const useAccionesMx = new useAcciones(StateContextM)

  try {
    return (
      <div>

        <PagoComp
          Theme={Theme}
          useContext={useContext(StateContextM)}
          CompStatus={useStatus(StateContextM)}
          useAcciones={useAccionesMx}

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
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider bg="#000000">
        <Flex bg="#000000"
          sx={{
            display: "flex",
            flexDirection: "column",
            // set this to `minHeight: '100vh'` for full viewport height
            minHeight: '100vh',
            justifyContent: 'center'
          }}
          css={{ maxWidth: "610px" }}
          // style={{display: 'flex', justifyContent: 'center'}}
        >
          <header sx={{width: "100%"}}>
            <Encabezado {...props} texto="Inscripción" />
          </header>

          <main sx={{width: "100%",flex: "1 1 auto"}}>
            <CatalogoProductos {...props} />
            <Info {...props} />
            <Cupon {...props} />
            <Sponsor {...props} />
            <Orden {...props} />
            <Pago {...props} />
            <Roll {...props} />
          </main>

        </Flex>
      </ContextProvider>

    </div>
);
});

// -------------------------------------------------------------------------------





