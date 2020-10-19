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
  { Cat: "Mango", Color: "#FFD700" }, //
  { Cat: "Toronjo", Color: "#FF69B4" },
  { Cat: "Naranjo", Color: "#ff9933" },
  { Cat: "Limon", Color: "#009933" },
  { Cat: "Lichi", Color: "#DC143C" },

  { Cat: "Default", Color: "#808080" } //Grey
];


const MisColumnas = [
  { Label: "Cat", Width: 0.15 },
  { Label: "Cantidad", Width: 0.17 }
]

// ------------------------------------------------------------------


const StateContext = createContext()
const CtxTheme = createContext(theme.theme5)
const CtxColumnas = createContext(MisColumnas)

const CtxCount = createContext(0);
const CtxMeses = createContext(models.meses)
const CtxMes = createContext(7)


const CtxChartData = createContext([{ Cat: "", Cantidad: 0 }])
const CtxChart = createContext({})

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Columnas: useState(useContext(CtxColumnas)),
    Count: useState(useContext(CtxCount)),
    ChartData: useState(useContext(CtxChartData)),
    Chart: useState(useContext(CtxChart)),

    Meses: useState(useContext(CtxMeses)),
    Mes: useState(useContext(CtxMes)),

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
  const [Chart, setChart] = useContext(StateContext).Chart
  const [ChartData, setChartData] = useContext(StateContext).ChartData

  const [Count, setCount] = useContext(StateContext).Count

  const [Meses, setMeses] = useContext(StateContext).Meses
  const [Mes, setMes] = useContext(StateContext).Mes




  const ColorCat = (Categoria, Colores) => {
    let MiFiltro = Colores.filter(color => color.Cat === Categoria)
    if (MiFiltro.length !== 0) {
      return MiFiltro[0].Color
    } else {
      return Colores.filter(color => color.Cat === "Default")[0].Color
    }
  }

  const ChartDataGenera = async (MiArray, Colores) => {
    try {

      let MiColumnas1 = MiArray.map(row => row.Cat)

      let MiColor = MiArray.map(row => {
        return ColorCat(row.Cat, MisColores)
      })

      let MiDataSet = () => {
        let MiStatus = "Totales"

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
    getChart: async props => {

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: ` 
            query OpsResMes($Query: UsuarioFiltro){
              Crm3{
                Usuarios{
                OpsResMes(Query: $Query){
                  Cantidad
                  Dia
                  Mes
                }
                }
              }
            }
        `,
          variables: {
            Query: {
              Page: 1964012340493592,
              Mes: Mes,
              Status: 'Activo'
            }
          }
        }
      })

      let resultado = await axdata.data.data.Crm3.Usuarios.OpsResMes
      setCount(resultado.reduce((a, b) => a + b.Cantidad, 0))
      let MiChart = await ChartDataGenera(resultado.map(row => {
        return({Cat: row.Dia, Cantidad: row.Cantidad})
      }
      ))

       setChart(MiChart)
      //await setDataAsignado(resultado)
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
  const [Count, setCount] = useContext(StateContext).Count
  const [Chart, setChart] = useContext(StateContext).Chart

  const { getChart } = useData()
  const [Mes, setMes] = useContext(StateContext).Mes

  const [Meses, setMeses] = useContext(StateContext).Meses



  useEffect(() => {
    getChart(...props)
  }, []);



  useEffect(() => {
   getChart(...props)

  }, [Mes])

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex width={1} bg={props.bg || "SlateGrey"}>
      <Box width={6/12}>
        <Dropbox
          name="DropEstado"
          isSearchable={ false }
          styles={DropboxCss.filtro1}
          value={{ value: Mes, label: Mes }}
          options={Meses}
          onChange={e => setMes(e.value)}
        />
      </Box>
      <ThemeProvider theme={Theme.head}>

      <Box width={.2}>
        <Text> Totales del Mes: {Count} </Text>
      </Box>

      </ThemeProvider>
      

      </Flex>
    </ThemeProvider>
  )
}

// ------------------------------------------------------------------

// ------------------------------------------------------------------

const Chart1 = props => {
  const [Chart, setChart] = useContext(StateContext).Chart

  //----------------------------------

  return (
    <Flex>
      <Bar
        data={Chart}
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
          // events: ["click"]
        }}
      />
    </Flex>
  )
}


// ------------------------------------------------------------------

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado
            key={1}
            texto="Resumen del Mes"
            bg="slategrey"
            color="white"
          />
          <EncabezadoPagina key={2} {...props} bg="slategrey" />

          <Chart1 title={"Árboles por Día"} />


        </Box>
      </Flex>
    </StateProvider>
  )
})
