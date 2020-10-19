import React, { useState, useEffect, useContext, createContext, Fragment } from "react";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

import { CSSTransition, SwitchTransition } from "react-transition-group";

// import "../src/styles.css";

import Dropbox from "react-select";
import DropboxCss from "../css/css5/select";

import Registros from "./pagos1regs";
import Detalle from "./pagos1det";
//import Comandas from "./pagos1coms";


import UsedataM from "../eai_ui/csusedata";



import Pusher from 'pusher-js';
// import { setPusherClient } from 'react-pusher';
// import XPusher from 'react-pusher';



import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


//var EventSource = require('eventsource')

//Pusher.logToConsole = true;

var pusher = new Pusher('bef17b566c9f80236bf8', {
  cluster: 'us2'
});

//setPusherClient(pusher)




// var channel = pusher.subscribe('cs2');
// var context = { Sucursal: 6 };
// var handler = function(e){
//   console.log(e)
//   console.log('My suc is ' + this.Sucursal);
// };
// channel.bind('pedido', handler, context);



// channel.bind('pedido', function(data) {
//   console.log(data)
//   sseRecibe({data})
// });


let App;

// -----------------------------------------------------------------------------

let Images = {
  logo1: {
    src: "https://smxai.net/sf/sflogo1.jpg"
  }
};

let MiDetalle = {
  Id: ["0"],
  Codigo: [""],
  Fecha: [""],
  Telefono: [""],
  Nombre: [""],
  Apellido: [""],
  TipoEntrega: [""],
  Confirmado: [""],

  Sucursal: [""],
  Cliente: [""],
  Cuenta: [""],
  Monto: [""],
  Obv: [""]
};

let MisRegistros = [
  {
    Id: ["0"],
    Codigo: [""],
    Fecha: [""],
    Telefono: [""],
    Nombre: [""],

    Sucursal: [""],
    Cliente: [""],
    Cuenta: [""],
    Monto: [""],
    Obv: [""]
  }
];


// -----------------------------------------------------------------------


// var eventSourceInitDict = {
//  // headers: {'Cookie': 'test=test'},
//   withCredentials: true
// };

//var es = new window.EventSource('https://8t8jt.sse.codesandbox.io/sse/order', eventSourceInitDict)

// var es = new window.EventSource('https://smxai.net/sse/order', eventSourceInitDict)


// es.addEventListener('dateChannel', function (e) {
//   console.log(e.data)
// })








// -----------------------------------------------------------------------
// -----------------------------------------------------------------------













const StateContextM = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxLoadingDet = createContext(false);


const CtxFiltroFecha = createContext(new Date());



const CtxImages = createContext(Images);
const CtxTipoAnim = createContext(1);



const CtxEmpresa = createContext(1);


const CtxRegistros = createContext(MisRegistros);
const CtxSucursales = createContext([]);
const CtxSucursal = createContext({
  value: 1,
  label: "Sushi Factory Cinépolis Culiacan"
});

const CtxPedido = createContext(1);
const CtxDetalle = createContext(MiDetalle);
const CtxEditado = createContext(false);
const CtxLink = createContext("https://smxai.net/SushiFactoryPagos?id=");
const CtxLink2 = createContext("https://smxai.net/SushiFactory?id=");
const CtxLink3 = createContext("https://smxai.net/SushiFactoryPagosM?id=");

const CtxComodin = createContext(0);




// ------------------

const useStateUniv = () => {





  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    LoadingDet: useState(useContext(CtxLoadingDet)),

    TipoAnim: useState(useContext(CtxTipoAnim)),

    FiltroFecha: useState(useContext(CtxFiltroFecha)),


    Images: useState(useContext(CtxImages)),
    Registros: useState(useContext(CtxRegistros)),
    Detalle: useState(useContext(CtxDetalle)),


    Empresa: useState(useContext(CtxEmpresa)),


    Sucursal: useState(useContext(CtxSucursal)),
    Sucursales: useState(useContext(CtxSucursales)),
    Pedido: useState(useContext(CtxPedido)),
    Editado: useState(useContext(CtxEditado)),
    Link: useState(useContext(CtxLink)),
    Link2: useState(useContext(CtxLink2)),
    Link3: useState(useContext(CtxLink3)),



   // Productos: useState(useContext(CtxProductos)),
    Nombre: useState(useContext(CtxComodin)),
    Cliente: useState(useContext(CtxComodin)),
    NumCuenta: useState(useContext(CtxComodin)),
    Fecha: useState(useContext(CtxComodin)),
    Obv: useState(useContext(CtxComodin)),
    Monto: useState(useContext(CtxComodin)),

    Pagado: useState(useContext(CtxComodin)),
    Productos: useState(useContext(CtxComodin)),
    Cuenta: useState(useContext(CtxComodin)),
    ConsumosExtras: useState(useContext(CtxComodin)),
    ExtrasDet: useState(useContext(CtxComodin)),
    TipoEntrega: useState(useContext(CtxComodin)),


    DetalleVacio: MiDetalle,



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


const MiPusher = props => {
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;

  console.log(Sucursal)
  return (
    <div/>
  )

}





const Encabezado = props => {
  const [Images] = useContext(StateContextM).Images;
  // const { getSucursales, getRegistros, getDetalle, addRegistro } = useData();

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [Sucursales] = useContext(StateContextM).Sucursales;


  const [Detalle, setDetalle] = useContext(StateContextM).Detalle

  let useDataMx = new UsedataM(StateContextM)


    const [FiltroFecha, setFiltroFecha] = useContext(StateContextM).FiltroFecha

//setPusherClient(pusher)

    const sseRecibe = (e) => {
      console.log(e)
      console.log(Sucursal.value)
      if (e.sucursal===Sucursal.value) {
        console.log("sucursal indicada")
      }
    }


    // es.onmessage = function(e) {
    //   console.log(Sucursal.value)
    
    //    let msg = JSON.parse(e.data)
    
    //   console.log(msg)
    //   if(msg.data.Sucursal===Sucursal.value){

    //     if(msg.Accion==="Confirma") {
    //      alert("Confirmación recibida: " + msg.data.Pedido)
      
    //     }

    //   }
     
    // }
    





    




  useEffect(() => {
    //getSucursales(props);
    //getRegistros(props);
    useDataMx.Sucursales().get(props)
    useDataMx.Pedidos().getLista(props)



// var channel = pusher.subscribe('cs2');
// var context = { Sucursal: Sucursal.value };
// var handler = function(e){
//   console.log(e)
//   console.log('My suc is ' + this.Sucursal);
// };
// channel.bind('pedido', handler, {Sucursal:Sucursal.value});





    navigate("/");
  }, []);

  
    var channel = pusher.subscribe('cs2');

  useEffect(() => {
    //getRegistros(props);
    useDataMx.Pedidos().getLista(props)

    channel.unbind('pedido');


    var handler = function(e){
      console.log(e)
      console.log('My suc is ' + this.Sucursal);
    };
    channel.bind('pedido', handler, {Sucursal:Sucursal.value});



  }, [Sucursal, FiltroFecha]);

  useEffect(() => {
    //getDetalle(props);
    //setDetalle([MiDetalle])
    useDataMx.Pedidos().getDetalle(props)



  }, [Pedido]);

  try {




    return (
      <div>

          {/* <XPusher {...props}
            channel="cs2"
            event="pedido"
            onUpdate={(e)=>{
              sseRecibe(e)
            console.log(Sucursal)
            }}
          /> */}





        <Flex sx={{ height: "55px", mb: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Image sx={{ height: "55px" }} src={Images.logo1.src} />
          </Box>






          {/* <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={"05/05/2020"}
              //onChange={}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
          />
          </MuiPickersUtilsProvider> */}


        <Box sx={{ width: "30%" }}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              variant="inline"
              clearable
              //disableFuture
              //label="Basic example"
              value={FiltroFecha}
              onChange={setFiltroFecha}
            />
          </MuiPickersUtilsProvider>
        </Box>











          <Box sx={{ width: "50%" }}>
            <Dropbox
              styles={DropboxCss.filtro1}
              name="DropPaginas"
              value={{
                value: Sucursal.value,
                label: Sucursal.label
              }}
              options={Sucursales}
              onChange={e => {
                setSucursal({ value: e.value, label: e.label });
              }}
            />
          </Box>
        </Flex>

        <Flex sx={{ height: "34px", mb: 3, width: "100%" }}>
          <Box
            sx={{
              p: 3,
              bg: "#ffcc00",
              fontWeight: "normal",
              fontSize: 4,
              color: "text",
              fontFamily: "body",
              width: "70%"
            }}
          >
          
          </Box>


          <Box sx={{ width: "30%" }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={true}
              onClick={async() => {
                //await useDataMx.Pedidos().add(props)
                navigate("/coms")
              }}
            >
              Comandas
            </Button>
          </Box>







          <Box sx={{ width: "30%" }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={"#A52A2A"}
              Disabled={false}
              onClick={async() => {
                await useDataMx.Pedidos().add(props)
                useDataMx.Pedidos().getLista(props)
                navigate("/det")
              }}
            >
              Nuevo Pedido
            </Button>
          </Box>



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
  // const { getRegistros, getDetalle } = useData();

  let useDataMx = new UsedataM(StateContextM)




  try {
    return (
      <div>
        <Flex
        
        sx={{
          p: 3,
          bg: "gray",
          fontWeight: "normal",
          fontSize: 3,
          color: "#FFFFFF",
          fontFamily: "body",
          width: "100%"
        }}
        
        
        
        >

            <Box sx={{ width: "14%" }}>
              <Button
                width={1}
                bg={"gray"}
                Disabled={false}
                onClick={() => {
                // getRegistros(props);
                //getDetalle(props);
                  useDataMx.Pedidos().getLista(props)
                  useDataMx.Pedidos().getDetalle(props)


                }}
              >
                Actualizar
              </Button>
            </Box>


            <Box sx={{ width: "60%" }}>
            </Box>

            <Box sx={{ width: "20%" }}>
              {useDataMx.Pedidos().sumPagado}
            </Box>




        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2}>
              ** Si tienes dudas manda un Whatsapp al: 4772740011
            </Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};







// -----------------------------------------------------------------------------

const Router = props => {
  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [LoadingDet, setLoadingDet] = useContext(StateContextM).LoadingDet;

  const [TipoAnim, setTipoAnim] = useContext(StateContextM).TipoAnim;

  const [Pedido, setPedido] = useContext(StateContextM).Pedido;

  const [Editado, setEditado] = useContext(StateContextM).Editado;
  const [Link] = useContext(StateContextM).Link;
  const [Link2] = useContext(StateContextM).Link2;
  const [Link3] = useContext(StateContextM).Link3;


  const [Registros] = useContext(StateContextM).Registros;

  // const {
  //   getRegistros,
  //   getDetalle,
  //   upDetalle,
  //   pullCliente,
  //   sendSms,
  //   sendSms2,
  // } = useData();

  const usr = props.usr;

  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;

  const Detalles = Detalle;


  //const useDataMx = new UsedataM(StateContextM)

  const Pedidos = new UsedataM(StateContextM).Pedidos()
  const Clientes = new UsedataM(StateContextM).Clientes()


  // const {Pedidos, Clientes} = new UsedataM(StateContextM)



  const routeResult = useRoutes(
    routes({
      Pedido,
      setPedido,
      Registros,
      usr,
      navigate,
      Detalles,
      setDetalle,
      Loading,
      LoadingDet, setLoadingDet,
      Theme,

      Editado,
      setEditado,
      Link,
      Link2,
      Link3,


      //useDataMx,
      Pedidos, Clientes,

      // getRegistros,
      // pullCliente,
      // sendSms,
      // sendSms2,
      // upDetalle,
      // TipoAnim,
      // setTipoAnim,


    })
  );

  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  // let FadeTransition = props => {
  //   if (TipoAnim === 1) {
  //     return (
  //       <CSSTransition
  //         {...props}
  //         classNames={{
  //           enter: "fade-enter",
  //           enterActive: "fade-enter-active",
  //           exit: "fade-exit"
  //         }}
  //         addEndListener={(node, done) => {
  //           node.addEventListener("transitionend", done, false);
  //         }}
  //       />
  //     );
  //   } else {
  //     return (
  //       <CSSTransition
  //         {...props}
  //         classNames={{
  //           enter: "fade-enter2",
  //           enterActive: "fade-enter-active",
  //           exit: "fade-exit2"
  //         }}
  //         addEndListener={(node, done) => {
  //           node.addEventListener("transitionend", done, false);
  //         }}
  //       />
  //     );
  //   }
  // };

  try {
    return (
      <div>



        <Box sx={{ width: "100%" }}>{routeResult}</Box>



        {/* <Detalle
        Theme={Theme}
        navigate={navigate}
        Detalles={Detalles}
        setDetalle={setDetalle}
        setTipoAnim={setTipoAnim}
        LoadingDet={LoadingDet}
        upDetalle={upDetalle}
        Editado={Editado}
        setEditado={setEditado}
        Link={Link}
        pullCliente={pullCliente}
        sendSms={sendSms}
      /> */}










      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// ----------------------------------------

const routes = props => {
  return {
    "/": () => (
      <Registros
        Theme={props.Theme}
        navigate={props.navigate}
        // setTipoAnim={props.setTipoAnim}
        Loading={props.Loading}
        setLoadingDet={props.setLoadingDet}

        setPedido={props.setPedido}
        Registros={props.Registros}
        //usedata={props.useDataMx}
      />
    ),
    "/det": () => (
      <Detalle
        Theme={props.Theme}
        navigate={props.navigate}
        Detalles={props.Detalles}
        setDetalle={props.setDetalle}
        // setTipoAnim={props.setTipoAnim}
        LoadingDet={props.LoadingDet}
        Editado={props.Editado}
        setEditado={props.setEditado}
        Link={props.Link}
        Link2={props.Link2}
        Link3={props.Link3}

        //usedata={props.useDataMx}
        Pedidos={props.Pedidos}
        Clientes={props.Clientes}

        // upDetalle={props.upDetalle}
        // pullCliente={props.pullCliente}
        // sendSms={props.sendSms}
        // sendSms2={props.sendSms2}

      />
    ),

    // "/coms": () => (
    //   <Comandas
    //     Theme={props.Theme}
    //     navigate={props.navigate}
    //     // setTipoAnim={props.setTipoAnim}
    //     // Loading={props.Loading}
    //     // setLoadingDet={props.setLoadingDet}

    //     // setPedido={props.setPedido}
    //     // Registros={props.Registros}
    //     //usedata={props.useDataMx}
    //   />
    // ),





  };
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  // useRedirect("/", "/movs");


//console.log(props)



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
          <Encabezado {...props} texto="Pedidos Pago sin Contacto" />
          {/* <XPusher {...props}
            channel="cs2"
            event="pedido"
            onUpdate={()=>{console.log("soo")}}
          /> */}

        </header>

        <main sx={{width: "100%",flex: "1 1 auto"}}>
          <Router {...props} sx={{ width: "100%" }} />
          
        </main>

        <footer sx={{width: "100%"}}>
          <div
            sx={{
              display: "block",
              padding: "10px",
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
              padding: "0px",
              position: "fixed",
              left: "0",
              bottom: "0",
              height: "80px",
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
