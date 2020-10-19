import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Flex, Box, Button, Text, Image } from "@theme-ui/components"
  import Theme from "../css/cssui/theme"
  import "@babel/polyfill"


  import Dropbox from "react-select";
  import DropboxCss from "../css/css5/select";




// ------------------

  import UsedataM from "./csusedata"
  import Rechart1 from "./cd1chart1"
  import Rechart2 from "./cd1chart2"
  import Rechart5 from "./cd1chart5"


  let App;

// -----------------------------------------------------------------------------


let Images = {
  logo1: {src: "https://smxai.net/sf/sflogo1.jpg"},
  logo2: {src: "https://smxai.net/sf/cs1/sflogo2.jpg"},
  logo3: {src: "https://smxai.net/sf/cs1/factorylogo.png"},

  icon1: {src: "https://smxai.net/sf/cs1/avatar.jpg"},
  icon2: {src: "https://smxai.net/sf/cs1/cuenta2.jpg"},
  cover1: {src: "https://smxai.net/sf/cs1/cover1.jpg"},
  menu1: {src: "https://smxai.net/sf/cs1/menuboton1.jpg"},

}


const Sucursales = [
  { value: null, label: "Todas" },
  { value: "SUSHI FACTORY 3 RIOS", label: "3 Rios" },
  { value: "SUSHI FACTORY ANDARES, JAL", label: "Andares" },
  { value: "SUSHI FACTORY CINEPOLIS", label: "Cinepolis" },
  { value: "SUSHI FACTORY CITITOWER", label: "Cititower" },
  { value: "SUSHI FACTORY ESCALA", label: "Escala" },
  { value: 6, label: "Fortuna" },
  { value: "SUSHI FACTORY GALERIAS, JAL", label: "Galerías" },
  { value: "SUSHI FACTORY LA LOMITA", label: "Lomita" },
  { value: "SUSHI FACTORY LA PAZ", label: "La Paz" },
  { value: "SUSHI FACTORY MALECON", label: "Malecón" },
  { value: 11, label: "Esfera" },
  { value: "SUSHI FACTORY PLAZA PASEO TIJ", label: "Paseo" },
  { value: "SUSHI FACTORY SAN IGNACIO, JAL", label: "San Ignacio" },
  { value: "SUSHI FACTORY TEPIC FORUM", label: "Forum" }
];

const Anos = [
  { value: null, label: "Todos" },
  { value: 2019, label: "2019" },
  { value: 2020, label: "2020" }
];

const Meses = [
  { value: null, label: "Todos" },
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" }
];

const Dias = [
  { value: null, label: "Todos" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" },
  { value: 24, label: "24" },
  { value: 25, label: "25" },
  { value: 26, label: "26" },
  { value: 27, label: "27" },
  { value: 28, label: "28" },
  { value: 29, label: "29" },
  { value: 30, label: "30" },
  { value: 31, label: "31" }
];

const Horas = [
  { value: null, label: "Todas" },
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" },
  { value: 14, label: "14" },
  { value: 15, label: "15" },
  { value: 16, label: "16" },
  { value: 17, label: "17" },
  { value: 18, label: "18" },
  { value: 19, label: "19" },
  { value: 20, label: "20" },
  { value: 21, label: "21" },
  { value: 22, label: "22" },
  { value: 23, label: "23" }
];



let MisRegistros = [
  {
    "Pedido": [""],
    "Id": [""],

  }
];

// --------------------------------------------------------




const StateContextM = createContext();
const CtxTheme = createContext(Theme);

const CtxLoadingSecc1 = createContext(false)
const CtxLoadingSecc2 = createContext(false)
const CtxLoadingSecc3 = createContext(false)
const CtxLoadingSecc4 = createContext(false)
const CtxLoadingSecc5 = createContext(false)
const CtxLoadingSecc6 = createContext(false)

const CtxFiltro1 = createContext({value: 2020, label: 2020}) // -- Año
const CtxFiltro2 = createContext({value: null, label: 'Todos'}) // -- Mes
const CtxFiltro3 = createContext({value: null, label: 'Todos'}) // -- Dia
const CtxFiltro4 = createContext({value: null, label: 'Todas'}) // -- Hora
const CtxFiltro5 = createContext({value: null, label: 'Todas'}) // -- Sucursal
const CtxFiltro6 = createContext(false)


const CtxDataOpcion1 = createContext(1)


const CtxData1 = createContext([])
const CtxData2 = createContext([])
const CtxData3 = createContext([])
const CtxData4 = createContext([])
const CtxData5 = createContext([])


const CtxRouter = createContext(1);

const CtxImages = createContext(Images);
const CtxRegistros = createContext([]);

const CtxSucursales = createContext(Sucursales);

const CtxPedido = createContext(9999);
const CtxSucursal = createContext({value: 25});
const CtxCliente = createContext(0);

const CtxComodin = createContext(0);



// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxComodin)),
    LoadingDet: useState(useContext(CtxComodin)),
    LoadingCheck: useState(useContext(CtxComodin)),

    LoadingSecc1: useState(useContext(CtxLoadingSecc1)),
    LoadingSecc2: useState(useContext(CtxLoadingSecc2)),
    LoadingSecc3: useState(useContext(CtxLoadingSecc3)),
    LoadingSecc4: useState(useContext(CtxLoadingSecc4)),
    LoadingSecc5: useState(useContext(CtxLoadingSecc5)),
    LoadingSecc6: useState(useContext(CtxLoadingSecc6)),


    DataOpcion1: useState(useContext(CtxDataOpcion1)),


    Data1: useState(useContext(CtxData1)),
    Data2: useState(useContext(CtxData2)),
    Data3: useState(useContext(CtxData3)),
    Data4: useState(useContext(CtxData4)),
    Data5: useState(useContext(CtxData5)),



    Filtro1: useState(useContext(CtxFiltro1)),
    Filtro2: useState(useContext(CtxFiltro2)),
    Filtro3: useState(useContext(CtxFiltro3)),
    Filtro4: useState(useContext(CtxFiltro4)),
    Filtro5: useState(useContext(CtxFiltro5)),
    Filtro6: useState(useContext(CtxFiltro6)),

    FiltroFecha: useState(useContext(CtxComodin)),

    Router: useState(useContext(CtxRouter)),
    Images: useState(useContext(CtxImages)),
    TipoAnim: useState(useContext(CtxComodin)),

    Empresa: useState(useContext(CtxComodin)),

    Sucursales: useState(useContext(CtxSucursales)),

    Categorias: useState(useContext(CtxComodin)),
    Categoria: useState(useContext(CtxComodin)),

    Registros: useState(useContext(CtxRegistros)),
    Productos: useState(useContext(CtxComodin)),
    Detalle: useState(useContext(CtxComodin)),

    Meetings: useState(useContext(CtxComodin)),


    Extras: useState(useContext(CtxComodin)),
    ExtrasDet: useState(useContext(CtxComodin)),
    ConsumosExtras: useState(useContext(CtxComodin)),

    Cuenta: useState(useContext(CtxComodin)),

    Editado: useState(useContext(CtxComodin)),
    Consumo: useState(useContext(CtxComodin)),

    Pedido: useState(useContext(CtxPedido)),
    Sucursal: useState(useContext(CtxSucursal)),
    Cliente: useState(useContext(CtxCliente)),

    Nombre: useState(useContext(CtxComodin)),
    NumCuenta: useState(useContext(CtxComodin)),
    Fecha: useState(useContext(CtxComodin)),
    Obv: useState(useContext(CtxComodin)),
    TipoEntrega: useState(useContext(CtxComodin)),
    TipoPago: useState(useContext(CtxComodin)),
    Monto: useState(useContext(CtxComodin)),

    Pagado: useState(useContext(CtxComodin)),
    Indica: useState(useContext(CtxComodin)),

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



// -----------------------------------------------------------------------------

let useStatus = function(StateContextM) {


  const [Mes, setMes] = useContext(StateContextM).Filtro2;




// -------------------------------------
  
  return {

    // Comp1: () => {
    //   if (Detalle.Cliente===0) {return 0}
    //   if (Detalle.Cliente>0) {return 1}

    //   return 0
    // },

    Comp2: () => {
      console.log(Mes)
      if (Mes.value===null) {return false}
      else { return true
       // if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 2} else {return 1}
      }



    },

    // Comp3: () => {

    //   return 0
    // },

    // Comp4: () => {
    //   if (Pedido===9999) {return 0}
    //   else {
    //       if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 0} else {return 1}
    //   }

    // },


    Comp5: () => {
      if (Mes===null) {return 0}
      else { return 1
       // if (Meetings[0].ConsumosMeetingsIngresoUrl!==null) {return 2} else {return 1}
      }

    },

  }

}

// -----------------------------------------------------------------------------




// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  let useDataMx = new UsedataM(StateContextM)


  const [Sucursal, setSucursal] = useContext(StateContextM).Filtro5;

  const [Ano, setAno] = useContext(StateContextM).Filtro1;
  const [Mes, setMes] = useContext(StateContextM).Filtro2;
  const [Dia, setDia] = useContext(StateContextM).Filtro3;
  const [Hora, setHora] = useContext(StateContextM).Filtro4;


  const [DataOpcion1, setDataOpcion1] = useContext(StateContextM).DataOpcion1;






  useEffect(() => {
    useDataMx.Pedidos().getData1()
    useDataMx.Pedidos().getData2()
    useDataMx.Pedidos().getData5()

  }, []);


  useEffect(() => {
    useDataMx.Pedidos().getData1()
    useDataMx.Pedidos().getData2()
    useDataMx.Pedidos().getData5()

  }, [Sucursal, Ano, Mes]);





  try {

    return (
      <div>

        <Flex sx={{ height: "34px", width: "100%" }}>

          <Box sx={{ width: "30%" }}>
            <Image sx={{ height: "34px" }} src={Images.logo1.src} />
          </Box>

        </Flex>




        <Flex sx={{ mb: 3 }} />

        <Flex sx={{ width: "100%" }}>
          <Box sx={{ width: "20%" }}>
            <Dropbox
              name="DropSuc"
              isSearchable={false}
              styles={DropboxCss.filtro1}
              value={{
                value: Sucursal.value,
                label: Sucursal.label
              }}
              options={Sucursales}
              onChange={async e => {
                await setSucursal(e);
              }}
            />
          </Box>

          <Box sx={{ width: "5%" }} />

          <Box sx={{ width: "20%" }}>
            <Dropbox
              name="DropAno"
              isSearchable={false}
              styles={DropboxCss.filtro1}
              value={{
                value: Ano.value,
                label: Ano.label
              }}
              options={Anos}
              onChange={async e => {
                await setAno(e);
              }}
            />
          </Box>

          <Box sx={{ width: "5%" }} />

          <Box sx={{ width: "20%" }}>
            <Dropbox
              name="DropMes"
              isSearchable={false}
              styles={DropboxCss.filtro1}
              value={{
                value: Mes.value,
                label: Mes.label
              }}
              options={Meses}
              onChange={async e => {
                await setMes(e);
              }}
            />
          </Box>

          <Box sx={{ width: "5%" }} />

          {/* <Box sx={{ width: "20%" }}>
            <Dropbox
              name="DropDia"
              isSearchable={false}
              styles={DropboxCss.filtro1}
              value={{
                value: Dia.value,
                label: Dia.label
              }}
              options={Dias}
              onChange={async e => {
                await setDia(e);
              }}
            />
          </Box>

          <Box sx={{ width: "5%" }} />

          <Box sx={{ width: "20%" }}>
            <Dropbox
              name="DropHora"
              isSearchable={false}
              styles={DropboxCss.filtro1}
              value={{
                value: Hora.value,
                label: Hora.label
              }}
              options={Horas}
              onChange={async e => {
                await setHora(e);
              }}
            />
          </Box> */}
        </Flex>

        {/* <Flex>
          <Button
            variant="primary"
            onClick={() => {
             // navigate("/");
            }}
          >
            Gráficas
          </Button>

          <Button
            variant="primary"
            onClick={() => {
             // navigate("/movs");
            }}
          >
            Movimientos
          </Button>
        </Flex>
 */}



        <Flex>
          <Button variant="primary" onClick={() => setDataOpcion1(1)}>
            Monto
          </Button>

          <Button variant="primary" onClick={() => setDataOpcion1(2)}>
            Pedidos
          </Button>
        </Flex>









      </div>
    








    )
    
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------






// -----------------------------------------------------------------------------

const Chart1 = props => {
  const Estilo = useThemeUI().theme.styles;

  let useDataMx = new UsedataM(StateContextM)


  const [LoadingSecc, setLoadingSecc] = useContext(StateContextM).LoadingSecc1;
  const [Data, setData] = useContext(StateContextM).Data1;

  const [Filtro, setFiltro] = useContext(StateContextM).Filtro2;
  const [DataOpcion1, setDataOpcion1] = useContext(StateContextM).DataOpcion1;

  try {

    return (
      <div>

        <Rechart1
          //Theme={props.Theme}
          Loading={LoadingSecc}
          DataT={DataOpcion1}
          Data={Data}
          Activo={Filtro}
          setActivo={setFiltro}
        />

      </div>
  
    )
    
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------







const Chart2 = props => {
  const Estilo = useThemeUI().theme.styles;

  let useDataMx = new UsedataM(StateContextM)


  const [LoadingSecc, setLoadingSecc] = useContext(StateContextM).LoadingSecc1;
  const [Data, setData] = useContext(StateContextM).Data2;

  const [Filtro, setFiltro] = useContext(StateContextM).Filtro3;
  const [DataOpcion, setDataOpcion] = useContext(StateContextM).DataOpcion1;

  try {

    return (
      <div>

        <Rechart2
          //Theme={props.Theme}
          Loading={LoadingSecc}
          DataT={DataOpcion}
          Data={Data}
          Activo={Filtro}
          setActivo={setFiltro}
          CompStatus={useStatus(StateContextM)}

        />

      </div>

    )
    
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Chart5 = props => {
  const Estilo = useThemeUI().theme.styles;

  let useDataMx = new UsedataM(StateContextM)


  const [LoadingSecc, setLoadingSecc] = useContext(StateContextM).LoadingSecc5;
  const [Data, setData] = useContext(StateContextM).Data5;

  const [Filtro, setFiltro] = useContext(StateContextM).Filtro5;
  const [DataOpcion1, setDataOpcion1] = useContext(StateContextM).DataOpcion1;

  const [Sucursales, setSucursales] = useContext(StateContextM).Sucursales;




  try {

    return (
      <div>

        <Rechart5
          //Theme={props.Theme}
          Loading={LoadingSecc}
          DataT={DataOpcion1}
          Data={Data}
          Activo={Filtro}
          setActivo={setFiltro}
          Opciones={Sucursales}
          CompStatus={useStatus(StateContextM)}

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

          {/* <CatalogoProductos {...props} />
          <Info {...props} />
          <Orden {...props} />
          <Pago {...props} />
          <Roll {...props} /> */}
          <Chart5  {...props} />

          <Chart1  {...props} />

          <Chart2  {...props} />





        </main>


      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------


