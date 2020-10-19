import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer
} from "react"
import axios from "axios"
import gqlf from "../client2/gqlfragments"

import moment from "moment"

import "@babel/polyfill"
import { ThemeProvider } from "styled-components"
import theme from "../css/themes"
import { Button, Text, Link, Image, Card } from "rebass"
import { Flex, Box } from "@rebass/grid"

import Dropbox from "react-select"
import DropboxCss from "../css/css5/select"

import { Bar, Pie } from "react-chartjs-2"

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import Container from "../css/css5/container";
import Titulo from "../css/css5/titulo"
// import Input from "../css/css5/input";
// import Checkbox from "../css/css5/checkbox";
// import Label from "../css/css5/label";

import models from "../models/models";

let App

// ------------------------------------------------------------------

let MisColores = [
  { Cat: "Entregado", Color: "#1fad8a" }, //
  { Cat: "Enviar", Color: "#808080" },
  { Cat: "Enviado", Color: "#F0E68C" },
  { Cat: "Leido", Color: "#9191ee" },
  { Cat: "Rechazado", Color: "#DC143C" },
  { Cat: "Default", Color: "#808080" }, //Grey

  { Cat: "Contactar", Color: "#FF7F50" }, // Coral
  { Cat: "Contactado", Color: "#FFA500" }, //Orange
  { Cat: "Descartado", Color: "#DC143C" }, //Crimson
  { Cat: "En Progreso", Color: "#4169E1" }, //RoyalBlue
  { Cat: "Completado", Color: "#FF00FF" }, //Magenta

  { Cat: "Adriana", Color: "#FF7F50" }, // Coral
  { Cat: "Aurora", Color: "#FFC0CB" }, //Pink
  { Cat: "Sargento ", Color: "#4169E1" }, //RoyalBlue
  { Cat: "Sofia", Color: "#FF00FF" }, //Magenta
]

const MisColumnas = [
  { Label: "Cat", Width: 0.15 },
  { Label: "Cantidad", Width: 0.17 }
]

// ------------------------------------------------------------------

const StateContext = createContext()
const CtxTheme = createContext(theme.theme5)
const CtxColumnas = createContext(MisColumnas)

const CtxUsuarios = createContext([])
const CtxFAtiende = createContext("Todos")
const CtxFSeguimiento = createContext("Todos")
const CtxCount = createContext(0);

const CtxDataAsignado = createContext([{ Cat: "", Cantidad: 0 }])
const CtxChartAsignado = createContext()
const CtxDataSeguimiento = createContext([])
const CtxChartSeguimiento = createContext()
const CtxEstado = createContext('Todos')
const CtxCiudad = createContext('Todos')

const CtxEstadosOpts = createContext(models.estados)


const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Columnas: useState(useContext(CtxColumnas)),
    Usuarios: useState(useContext(CtxUsuarios)),
    FAtiende: useState(useContext(CtxFAtiende)),
    FSeguimiento: useState(useContext(CtxFSeguimiento)),
    Count: useState(useContext(CtxCount)),
    DataAsignado: useState(useContext(CtxDataAsignado)),
    ChartAsignado: useState(useContext(CtxChartAsignado)),
    DataSeguimiento: useState(useContext(CtxDataSeguimiento)),
    ChartSeguimiento: useState(useContext(CtxChartSeguimiento)),
    Estado: useState(useContext(CtxEstado)),
    Ciudad: useState(useContext(CtxCiudad)),
    EstadosOpts: useState(useContext(CtxEstadosOpts)),

  }
}

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    {children}
  </StateContext.Provider>
)
// ------------------------------------------------------------------

const useData = () => {
  const [Columnas] = useContext(StateContext).Columnas
  var [FAtiende, setFAtiende] = useContext(StateContext).FAtiende
  const [FSeguimiento, setFSeguimiento] = useContext(StateContext).FSeguimiento
  const [ChartAsignado, setChartAsignado] = useContext(StateContext).ChartAsignado
  const [DataAsignado, setDataAsignado] = useContext(StateContext).DataAsignado
  const [ChartSeguimiento, setChartSeguimiento] = useContext(StateContext).ChartSeguimiento
  const [DataSeguimiento, setDataSeguimiento] = useContext(StateContext).DataSeguimiento

  const [Estado] = useContext(StateContext).Estado
  var [Ciudad] = useContext(StateContext).Ciudad

  const [Count, setCount] = useContext(StateContext).Count




  const ColorCat = (Categoria, Colores) => {
    let MiFiltro = Colores.filter(color => color.Cat === Categoria)
    if (MiFiltro.length !== 0) {
      return MiFiltro[0].Color
    } else {
      return Colores.filter(color => color.Cat === "Default")[0].Color
    }
  }

  const ChartDataGenera = (MiArray, Colores) => {
    try {
      let MiColumnas1 = MiArray.map(row => row.Cat)

      let MiColor = MiArray.map(row => {
        return ColorCat(row.Cat, MisColores)
      })

      let MiDataSet = () => {
        let MiStatus = "Status"

        return [
          {
            stack: 0,
            label: MiStatus,
            data: MiArray.map(row => row.Cantidad),
            borderWidth: 1,
            backgroundColor: MiColor
          }
        ]
      }

      return {
        labels: MiColumnas1,
        datasets: MiDataSet()
      }
    } catch (e) {
      console.error(e)
    }
  }

  //-------------------------

  return {
    getResAsignado: async props => {

      if (props.atiende!=='Todos'){FAtiende = props.atiende}
      if (props.ciudad!=='Todos'){Ciudad = props.ciudad}

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: ` 
            query ResAsignado($Query: UsuarioFiltro){
              Crm3 {
                Usuarios{
                  ResAsignado(Query: $Query) {
                    Cat
                    X
                    Cantidad
                    Color
                  } 
                  } 
                }
              }
        `,
          variables: {
            Query: {
              Page: props.page,
              Atiende: FAtiende,
              Seguimiento: FSeguimiento,
              Estado: Estado,
              Ciudad: Ciudad
              // Status: 'Activo'
            }
          }
        }
      })

      let resultado = await axdata.data.data.Crm3.Usuarios.ResAsignado
      setChartAsignado(ChartDataGenera(resultado))
      await setDataAsignado(resultado)
    },

    getResSeguimiento: async props => {

      if (props.atiende!=='Todos'){FAtiende = props.atiende}
      if (props.ciudad!=='Todos'){Ciudad = props.ciudad}

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: ` 
            query ResSeguimiento($Query: UsuarioFiltro){
              Crm3 {
                Usuarios{
                  ResSeguimiento(Query: $Query) {
                    Cat
                    X
                    Cantidad
                    Color
                  } 
                  } 
                }
              }
        `,
          variables: {
            Query: {
              Page: props.page,
              Atiende: FAtiende,
              Seguimiento: FSeguimiento,
              // Status: 'Activo'
              Estado: Estado,
              Ciudad: Ciudad,
            }
          }
        }
      })

      let resultado = axdata.data.data.Crm3.Usuarios.ResSeguimiento
      setChartSeguimiento(ChartDataGenera(resultado))
      setDataSeguimiento(resultado)
    },

    ColWidth: Label => {
      try {
        let MiFiltro = Columnas.filter(columna => columna.Label === Label)
        if (MiFiltro.length !== 0) {
          return MiFiltro[0].Width
        } else {
          return 0
        }
      } catch (e) {
        console.error(e)
      }
    },


    getCount : async (props) => {

      if (props.atiende!=='Todos'){FAtiende = props.atiende}
      if (props.ciudad!=='Todos'){Ciudad = props.ciudad}

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query Count($Query: UsuarioFiltro){
              Crm3 {
                Usuarios{
                  Count(Query: $Query) 
                  
                  } 
                }
              }
          `,
          variables: {
            Query: {
              Page: props.page,
              Atiende: FAtiende,
              Seguimiento: FSeguimiento,
              Estado: Estado,
              Ciudad: Ciudad,
          }
        }
        }
      });
  
      await setCount(axdata.data.data.Crm3.Usuarios.Count);
      return axdata.data.data.Crm3.Usuarios.Count
    },

    //-------------------------

    //-------------------------
  }
}

// ------------------------------------------------------------------

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto}
        </Titulo>
      </Box>
    )
  } catch (e) {
    console.error(e)
  }
}

// -------------------------------------------------------------------------------

const EncabezadoPagina = (...props) => {
  const [Theme] = useContext(StateContext).Theme
  const [FAtiende, setFAtiende] = useContext(StateContext).FAtiende
  const [FSeguimiento, setFSeguimiento] = useContext(StateContext).FSeguimiento
  const { getResAsignado, getResSeguimiento, getCount } = useData()
  const [Estado, setEstado] = useContext(StateContext).Estado
  const [EstadosOpts] = useContext(StateContext).EstadosOpts
  const [Count, setCount] = useContext(StateContext).Count



  const FiltroAsignado = () => {
    if (props[0].page === 2315779415325834) {
      var AtiendeOps = [
        { value: "Todos", label: "Todos" },
        { value: "Aurora", label: "Aurora" },
        { value: "Adriana", label: "Adriana" },
        { value: "Sargento", label: "Sargento" },
        { value: "Sofia", label: "Sofia" },
        { value: "Sin Asignar", label: "Sin Asignar" }
      ]

      return (
        <Box mb={21}>
          <Dropbox
            styles={DropboxCss.filtro1}
            name="DropAtiende"
            value={{
              value: FAtiende,
              label: FAtiende
            }}
            options={AtiendeOps}
            onChange={e => {
              setFAtiende(e.value)
            }}
          />
        </Box>
      )
    }
  }

  const FiltroSeguimiento = () => {
    if (props[0].page === 2315779415325834) {
      var SegOps = [
        { value: "Todos", label: "Todos" },
        { value: "Contactar", label: "Contactar" },
        { value: "Contactado", label: "Contactado" },
        { value: "En Progreso", label: "En Progreso" },
        { value: "Completado", label: "Completado" },
        { value: "Descartado", label: "Descartado" }
      ]

      return (
        <Box mb={21}>
          <Dropbox
            styles={DropboxCss.filtro1}
            name="DropSeguimiento"
            value={{
              value: FSeguimiento,
              label: FSeguimiento
            }}
            options={SegOps}
            onChange={e => {
              setFSeguimiento(e.value)
            }}
          />
        </Box>
      )
    }
  }

  useEffect(() => {
    getCount(...props);
  }, []);



  useEffect(() => {
    getResAsignado(...props)
    getResSeguimiento(...props)
    getCount(...props)
  }, [FAtiende, FSeguimiento, Estado])

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex width={1} bg={props.bg || "SlateGrey"}>

      <ThemeProvider theme={Theme.head}>

      <Box width={.2}>
        <Text> Usuarios: {Count} </Text>
      </Box>

      </ThemeProvider>

      <Box width={6/12}>
        <Dropbox
          name="DropEstado"
          isSearchable={ false }
          styles={DropboxCss.filtro1}
          value={{ value: Estado, label: Estado }}
          options={EstadosOpts}
          onChange={e => setEstado(e.value)}
        />
            </Box>
        <Box width={0.82} />
        <Box width={0.2}>{FiltroAsignado()}</Box>
        <Box width={0.2}>{FiltroSeguimiento()}</Box>
      </Flex>
    </ThemeProvider>
  )
}

// ------------------------------------------------------------------

const Chart1 = props => {
  const [ChartAsignado, setChartAsignado] = useContext(
    StateContext
  ).ChartAsignado
  const [Cat, setCat] = useState("Todos")

  //----------------------------------

  const selCategoria = elems => {
    if (elems[0]) {
      setCat(elems[0]._model.label)
    } else {
      setCat("Todos")
    }
  }

  return (
    <Flex>
      <Pie
        data={ChartAsignado}
        redraw={false}
        // getElementsAtEvent={selCategoria}
        options={{
          legend: {
            display: true,
            labels: {
              fontColor: "slategrey"
            }
          },
          title: {
            display: true,
            text: props.title,
            fontsize: 21
          },
          events: ["click"]
        }}
      />
    </Flex>
  )
}


// ------------------------------------------------------------------

// ------------------------------------------------------------------

const Chart2 = props => {
  const [ChartSeguimiento, setChartSeguimiento] = useContext(
    StateContext
  ).ChartSeguimiento
  const [Cat, setCat] = useState("Todos")

  //----------------------------------

  const selCategoria = elems => {
    if (elems[0]) {
      setCat(elems[0]._model.label)
    } else {
      setCat("Todos")
    }
  }

  return (
    <Flex>
      <Pie
        data={ChartSeguimiento}
        redraw={false}
        // getElementsAtEvent={selCategoria}
        options={{
          legend: {
            display: true,
            labels: {
              fontColor: "slategrey"
            }
          },
          title: {
            display: true,
            text: props.title,
            fontsize: 21
          },
          events: ["click"]
        }}
      />
    </Flex>
  )
}

// ------------------------------------------------------------------

const Listado = props => {
  const [Data] = useContext(StateContext)[props.lista]
  let Micolor = "#DCDCDC"

  const Renglones = Data.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC")
    return <Renglon key={row.Cat} Row={row} Color={"white"} page={props.page} />
  })

  return (
    <Flex>
      <Box width={"100%"}>{Renglones}</Box>
    </Flex>
  )
}

// -----------------------------------------------------------------------------

const Renglon = props => {
  const [Theme] = useContext(StateContext).Theme
  const { ColWidth } = useData()

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.Color}>
        <Box width={ColWidth("Cat")}>
          <Text fontSize={2}>
            <strong>{props.Row.Cat} </strong>
          </Text>
        </Box>

        <Box width={ColWidth("Cantidad")}>
          <Text fontSize={0}>{props.Row.Cantidad}</Text>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

// ----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado
            key={1}
            texto="Resumen de Asignados y Seguimiento"
            bg="slategrey"
            color="white"
          />
          <EncabezadoPagina key={2} {...props} bg="slategrey" />
          <Chart1 title={"Asignados"} />
          <Listado {...props} key={3} lista="DataAsignado" />

          <Chart2 title={"Seguimiento"} key={4} />
          <Listado {...props} key={5} lista="DataSeguimiento" />
        </Box>
      </Flex>
    </StateProvider>
  )
})
