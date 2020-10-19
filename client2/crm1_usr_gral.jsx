import React, { useState, useEffect, useContext, createContext } from "react"
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

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import Container from "../css/css5/container";
import Titulo from "../css/css5/titulo"
import Input from "../css/css5/input";
import Input2 from "../css/css5/input2";

// import Checkbox from "../css/css5/checkbox";
// import Label from "../css/css5/label";

import models from "../models/models";

let App

// ------------------------------------------------------------------
// ------------------------------------------------------------------
const MisColumnas = [
  { Label: "Id", Width: 0.17 },
  { Label: "Nombre", Width: 0.25 },
  { Label: "Ciudad", Width: 0.2 },
  { Label: "Email", Width: 0.25 },
  { Label: "Telefono", Width: 0.15 },
  { Label: "Atiende", Width: 0.2 },
  { Label: "Seguimiento", Width: 0.2 }
]


// ------------------------------------------------------------------

const StateContext = createContext()
const CtxTheme = createContext(theme.theme5)
const CtxColumnas = createContext(MisColumnas)
const CtxPagina = createContext(1)
const CtxLimit = createContext(50)
const CtxCount = createContext(0)
const CtxOrden = createContext('Name')
const CtxFAtiende = createContext('Todos')
const CtxFSeguimiento = createContext("Todos")
const CtxUsuarios = createContext([])
const CtxBuscar = createContext()
const CtxEstado = createContext('Todos')
const CtxCiudad = createContext('Todos')

const CtxEstadosOpts = createContext(models.estados)


const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Columnas: useState(useContext(CtxColumnas)),
    Pagina: useState(useContext(CtxPagina)),
    Limit: useState(useContext(CtxLimit)),
    Count: useState(useContext(CtxCount)),
    Orden: useState(useContext(CtxOrden)),
    FAtiende: useState(useContext(CtxFAtiende)),
    FSeguimiento: useState(useContext(CtxFSeguimiento)),
    Usuarios: useState(useContext(CtxUsuarios)),
    Buscar: useState(useContext(CtxBuscar)),
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
  const [Usuarios, setUsuarios] = useContext(StateContext).Usuarios
  const [Columnas] = useContext(StateContext).Columnas
  var [FAtiende] = useContext(StateContext).FAtiende
  const [FSeguimiento] = useContext(StateContext).FSeguimiento
  const [Pagina] = useContext(StateContext).Pagina
  const [Limit] = useContext(StateContext).Limit
  const [Count, setCount] = useContext(StateContext).Count
  const [Orden, setOrden] = useContext(StateContext).Orden
  const [Buscar] = useContext(StateContext).Buscar
  const [Estado] = useContext(StateContext).Estado
  var [Ciudad] = useContext(StateContext).Ciudad


  return {
    getUsuarios: async props => {

      if (props.atiende!=='Todos'){FAtiende = props.atiende}
      if (props.ciudad!=='Todos'){Ciudad = props.ciudad}

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: ` 
            query Usuarios($Query: UsuarioFiltro){
              Crm3 {
                Usuarios{
                  Query(Query: $Query) {...UsuarioData}
                } 
              }
            }
          ${gqlf.UsuarioData}
        `,
          variables: {
              Query: {
                Page: props.page,
                Atiende: FAtiende,
                Seguimiento: FSeguimiento,
                Limit: Limit,
                Offset: (Pagina - 1) * Limit,
                Buscar: Buscar,
                Estado: Estado,
                Orden: Orden,
                Ciudad: Ciudad

            }
          }
        }
      })
      await setUsuarios(axdata.data.data.Crm3.Usuarios.Query)
    },

    ctaRegs: Usuarios.length,

    ColWidth: Label => {
      try {
        let MiFiltro = Columnas.filter(columna => columna.Label === Label)
        if (MiFiltro.length !== 0) {
          return MiFiltro[0].Width
        } else {
          return 0
        }
      } catch (e) {console.error(e)}
    },

    getCount : async (props) => {
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
              Buscar: Buscar,
              Estado: Estado,
              Ciudad: Ciudad

          }
        }
        }
      });
  
      await setCount(axdata.data.data.Crm3.Usuarios.Count);
      return axdata.data.data.Crm3.Usuarios.Count
    },
  }
}

// -----------------------------------------------------------------------------

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto}
        </Titulo>
      </Box>
    )
  } catch (e) {console.error(e)}
}

// -----------------------------------------------------------------------------

const EncabezadoPagina = (...props) => {
  const [Theme] = useContext(StateContext).Theme
  const { getUsuarios, getCount } = useData()
  const { ColWidth } = useData()
  const [FAtiende, setFAtiende] = useContext(StateContext).FAtiende
  const [FSeguimiento, setFSeguimiento] = useContext(StateContext).FSeguimiento

  const [Pagina, setPagina] = useContext(StateContext).Pagina
  const [Limit, setLimit] = useContext(StateContext).Limit
  const [Count, setCount] = useContext(StateContext).Count
  const [Paginas, setPaginas] = useState([])

  const [Buscar, setBuscar] = useContext(StateContext).Buscar

  const [Estado, setEstado] = useContext(StateContext).Estado
  const [EstadosOpts] = useContext(StateContext).EstadosOpts

  //----------------------------------

  const getPaginas = async () => {
    let Paginas = Math.floor(await getCount(...props) / Limit) + 1;
    let NewPaginas = [];
    let number = 1;

    while (number <= Paginas) {
      NewPaginas.push({ value: number, label: number });
      number++;
    }
    setPaginas(NewPaginas);
  };


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
            isSearchable={ false }
            name="DropAtiende"
            value={{
              value: FAtiende,
              label: FAtiende
            }}
            options={AtiendeOps}
            onChange={e => {
              setFAtiende(e.value)
              setPagina(1)
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
            isSearchable={ false }
            name="DropSeguimiento"
            value={{
              value: FSeguimiento,
              label: FSeguimiento
            }}
            options={SegOps}
            onChange={e => {
              setFSeguimiento(e.value)
              setPagina(1)
            }}
          />
        </Box>
      )
    }
  }

  const useField = Field => {
    return {
      name: Field,
      value: Field,
      fontSize: 1,
      color: "slategrey",
      bg: "whitesmoke",
      onChange: e => {
        setBuscar(e.target.value);
      }
    };
  };

  //----------------------------------

  useEffect(() => {
    getCount(...props);
  }, []);


  useEffect(() => {
    getUsuarios(...props)
    getCount(...props)
    getPaginas()
  }, [FAtiende, FSeguimiento, Pagina, Estado])

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex width={1} bg={props.bg || "SlateGrey"}>

        <ThemeProvider theme={Theme.head}>

          <Flex width={1} bg={props.bg || "SlateGrey"}>

            <Box width={.3}>
              <Text> Usuarios: {Count} </Text>
            </Box>

            <Box>
              <Button bg="lightgrey" onClick={e => setPagina(Pagina - 1)}>
                {"<"}
              </Button>
            </Box>

            <Box width={3/12}>
              <Dropbox
                name="DropPagina"
                isSearchable={ false }
                styles={DropboxCss.filtro1}
                value={{ value: Pagina, label: Pagina }}
                options={Paginas}
                onChange={e => setPagina(e.value)}
              />
            </Box>


            <Box>
              <Button bg="lightgrey" onClick={e => setPagina(Pagina + 1)}>
                {">"}
              </Button>
            </Box>


            <Box width={1 / 5} >
           
            </Box>
            <Box width={1 / 2}
            border= '4px dotted blue'>
              <Input2
                key="N7"
                {...useField(Buscar)}
                 {...Theme.head.Input2}
                bg='slategrey'
                css={{
                    border: '1px solid lightgrey',
                    borderRadius: '5px',
                  }}
                
              />
            </Box>


            <Box width={'89px'} alignItems="top" alignSelf="up" mr={3} >
              <Button
                bg= 'whitesmoke'
                color='slategray'
                fontFamily='Arial'
                fontSize={12}
                onClick={async e => {
                  await getUsuarios(...props)
                  await getCount(...props)
                  await getPaginas()
                  await setPagina(1)
                  }}
              >

              Buscar
              </Button>
            </Box>

            <Box width={6/12}>
              <Dropbox
                name="DropEstado"
                isSearchable={ false }
                styles={DropboxCss.filtro1}
                value={{ value: Estado, label: Estado }}
                options={EstadosOpts}
                onChange={async e => {
                  await setEstado(e.value)
                  await getPaginas()
                  await setPagina(1)
                  }}
              />
            </Box>

          </Flex>

        </ThemeProvider>


        <Box width={0.3}
          css={{"@media(max-width: 600px)": { width: 100 } }}
        />
        <Box width={ColWidth("Atiende") - 0.01}
          css={{ "@media(max-width: 600px)": { width: 100 } }}
        >
          {FiltroAsignado()}
        </Box>
        <Box width={ColWidth("Seguimiento") - 0.01}
          css={{ "@media(max-width: 600px)": { width: 100 } }}
        >
          {FiltroSeguimiento()}
        </Box>
      </Flex>

    </ThemeProvider>
  )
}

// -----------------------------------------------------------------------------

const CabezaPagina = (props) => {
  const [Theme] = useContext(StateContext).Theme
  const { getUsuarios } = useData()
  const [Orden, setOrden] = useContext(StateContext).Orden
  const { ColWidth } = useData()

  useEffect(() => {
    getUsuarios(props)
  }, [Orden])


  return (
    <ThemeProvider theme={Theme.head}>
      <Flex bg={props.bg}>
        <Box width={ColWidth("Id")}>
          <Link href='#' onClick={async e => {setOrden('Id')}}>
            <strong>Id</strong>
          </Link>
        </Box>

        <Box width={ColWidth("Nombre")}>
          <Link href='#' onClick={async e => {setOrden('Name')}}>
            <strong>Nombre</strong>
          </Link>
        </Box>

        <Box width={ColWidth("Ciudad")}>
          <Link href='#' onClick={async e => {setOrden('Ciudad')}}>
            <strong>Ciudad, Edo</strong>
          </Link>
        </Box>

        <Box width={ColWidth("Email")}
          css={{ "@media(max-width: 600px)": { display: "none" } }}
        >
          <Link href='#' onClick={async e => {setOrden('Email')}}>
            <strong>Email</strong>
          </Link>       
        </Box>

        <Box width={ColWidth("Telefono")}
          css={{ "@media(max-width: 600px)": { display: "none" } }}
        >
          <Link href='#' onClick={async e => {setOrden('Telefono')}}>
            <strong>Telefono</strong>
          </Link>
        </Box>

        <Box width={ColWidth("Atiende")}>
          <Link href='#' onClick={async e => {setOrden('Atiende')}}>
            <strong>Atiende</strong>
          </Link>
        </Box>

        <Box width={ColWidth("Seguimiento")}>
          <Link href='#' onClick={async e => {setOrden('Seguimiento')}}>
            <strong>Seguimiento</strong>
          </Link>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

// -------------------------------------------------------------------------------

const Listado = props => {
  const [Usuarios] = useContext(StateContext).Usuarios
  let Micolor = "#DCDCDC"

  const Renglones = Usuarios.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC")
    return <Renglon key={row.Id} Row={row} Color={Micolor} page={props.page} />
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
        <Box width={ColWidth("Id")}>
          <Text fontSize={2}>
            <Link
              textAlign="left"
              target="_blank"
              href={
                "https://smxai.net/crm1/?secc=1&opt=1&id=" +
                props.Row.ID +
                "&page=" +
                props.page
              }
            >
              <strong>{props.Row.ID} </strong>
            </Link>
          </Text>
        </Box>

        <Box width={ColWidth("Nombre")}>
          <Text> {props.Row.Nombre} {props.Row.Apellidos} </Text>
        </Box>

        <Box width={ColWidth("Ciudad")}>
          <Text> {props.Row.Ciudad}, {props.Row.Estado} </Text>
        </Box>

        <Box width={ColWidth("Email")}
          css={{ "@media(max-width: 600px)": { display: "none" } }}
        >
          <Text>{props.Row.Email}</Text>
        </Box>

        <Box width={ColWidth("Telefono")}
          css={{ "@media(max-width: 600px)": { display: "none" } }}
        >
          <Text> <strong>{props.Row.Telefono} </strong> </Text>
        </Box>

        <Box width={ColWidth("Atiende")}>
          <Text> <strong>{props.Row.Atiende} </strong> </Text>
        </Box>

        <Box width={ColWidth("Seguimiento")}>
          <Text> <strong>{props.Row.Seguimiento} </strong> </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

// -----------------------------------------------------------------------------

const PiePagina = props => {
  const [Theme] = useContext(StateContext).Theme
  const { ctaRegs } = useData()

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.bg}>
        <Box width={2 / 20} color="magenta">
          <Text color="magenta">
            <strong>{ctaRegs} </strong>
          </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

// -------------------------------------------------------------------------------

export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado key={1} texto="Usuarios" bg="slategrey" color="white" />
          <EncabezadoPagina key={2} {...props} bg="slategrey" />
          <CabezaPagina {...props} key={7} bg="slategrey" color="white" />
          <Listado {...props} key={3} />
          <PiePagina key={4} bg="#b3e6ff" color="white" />
        </Box>
      </Flex>
    </StateProvider>
  )
})

// -------------------------------------------------------------------------------
