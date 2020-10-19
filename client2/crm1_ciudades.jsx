import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import "@babel/polyfill";
import { ThemeProvider } from "styled-components";
import theme from "../css/themes";
import { Button, Text, Link, Image, Card } from "rebass";
import { Flex, Box } from "@rebass/grid";

import Dropbox from "react-select";

import Container from "../css/css5/container";
import Titulo from "../css/css5/titulo";
import Input from "../css/css5/input";
import Checkbox from "../css/css5/checkbox";
import Label from "../css/css5/label";

import models from "../models/models";

let App;

let Micolor = "#DCDCDC";

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const CtxTheme = createContext(0);
const CtxPagina = createContext(0);
const CtxLimit = createContext(0);
const CtxCount = createContext(0);

const CtxCiudades = createContext([]);
const CtxEstadosOpts = createContext([]);

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(theme.theme5);

  const [Pagina, setPagina] = useState(1);
  const [Limit, setLimit] = useState(50);
  const [Count, setCount] = useState(0);
  const [EstadosOpts, setEstadosOpts] = useState(models.estados);

  const [Ciudades, setCiudades] = useState([]);

  return (
    <CtxTheme.Provider value={[Theme, setTheme]}>
      <CtxPagina.Provider value={[Pagina, setPagina]}>
        <CtxLimit.Provider value={[Limit, setLimit]}>
          <CtxCount.Provider value={[Count, setCount]}>
            <CtxEstadosOpts.Provider value={[EstadosOpts, setEstadosOpts]}>
              <CtxCiudades.Provider value={[Ciudades, setCiudades]}>
                {children}
              </CtxCiudades.Provider>
            </CtxEstadosOpts.Provider>
          </CtxCount.Provider>
        </CtxLimit.Provider>
      </CtxPagina.Provider>
    </CtxTheme.Provider>
  );
};

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const useData = () => {
  const [Pagina, setPagina] = useContext(CtxPagina);
  const [Limit, setLimit] = useContext(CtxLimit);
  const [Count, setCount] = useContext(CtxCount);

  const [Ciudades, setCiudades] = useContext(CtxCiudades);
  //-------------------------

  const getCiudades = async () => {
    var axdata = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query CiudadesEstados($Filtro: CiudadEstadoFiltro){
            Crm1{
              CiudadesEstados(Filtro: $Filtro){
			          Id, Ciudad, CiudadOK, Estado, Corregido, Ejecutado
              }
            }
          }
        `,
        variables: {
          Filtro: {
            Limit: Limit,
            Offset: (Pagina - 1) * Limit
            // Corregido: Filtro.Corregido
          }
        }
      }
    });

    await setCiudades(axdata.data.data.Crm1.CiudadesEstados);
  };

  //-------------------------

  const getCount = async () => {
    var axdata = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query CiudadesEstadosCount($Filtro: CiudadEstadoFiltro){
            Crm1{
              CiudadesEstadosCount(Filtro: $Filtro)
            }
          }
        `,
        variables: {
          Filtro: {
            Limit: Limit
          }
        }
      }
    });

    await setCount(axdata.data.data.Crm1.CiudadesEstadosCount);
  };

  //-------------------------

  const upCiudad = async (Id, CiudadOK, Estado) => {
    var axdata = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation CiudadU($Reg: CiudadEstadoInput) {
            Crm1M {CiudadU(Reg: $Reg)}
          }
        `,
        variables: {
          Reg: {
            Id: Id,
            CiudadOK: CiudadOK,
            Estado: Estado
          }
        }
      }
    });

    return axdata.data.data.Crm1M.CiudadU;
  };

  //-------------------------

  const upCiudades = async Id => {
    var axdata = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation CiudadEstadoU($Id: Int) {
            Crm1M {CiudadEstadoU(Id: $Id)}
          }
        `,
        variables: {
          Id: Id
        }
      }
    });

    return axdata.data.data.Crm1M.CiudadEstadoU;
  };

  //-------------------------

  return { getCiudades, getCount, upCiudad, upCiudades };
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"}>
        <Titulo color={props.color || "white"}>{props.texto}</Titulo>
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Paginador = props => {
  const [Theme] = useContext(CtxTheme);

  const [Pagina, setPagina] = useContext(CtxPagina);
  const [Limit, setLimit] = useContext(CtxLimit);
  const [Count, setCount] = useContext(CtxCount);

  const [Paginas, setPaginas] = useState([]);
  const { getCount } = useData();

  //----------------------------------

  useEffect(() => {
    getCount();
  }, []);

  useEffect(() => {
    getPaginas();
  }, [Count, Limit]);

  //----------------------------------

  const getPaginas = async () => {
    let Paginas = Math.floor(Count / Limit) + 1;
    let NewPaginas = [];
    let number = 1;

    while (number <= Paginas) {
      NewPaginas.push({ value: number, label: number });
      number++;
    }
    setPaginas(NewPaginas);
  };

  //----------------------------------

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex>
        <Box>
          <Button bg="grey" onClick={e => setPagina(Pagina - 1)}>
            {"<"}
          </Button>
        </Box>

        <Box width={1 / 8}>
          <Dropbox
            name="DropPagina"
            value={{ value: Pagina, label: Pagina }}
            options={Paginas}
            onChange={e => setPagina(e.value)}
          />
        </Box>

        <Box>
          <Button bg="grey" onClick={e => setPagina(Pagina + 1)}>
            {">"}
          </Button>
        </Box>

        <Box>
          <Text> Registros: {Count}</Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Listado = props => {
  const [Pagina, setPagina] = useContext(CtxPagina);
  const [Limit, setLimit] = useContext(CtxLimit);
  const [Ciudades, setCiudades] = useContext(CtxCiudades);

  const { getCiudades } = useData();

  useEffect(() => {
    getCiudades();
  }, [Pagina, Limit]);

  //----------------------------------

  const Renglones = Ciudades.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC");

    return <Renglon {...props} key={row.Id} Row={row} Color={Micolor} />;
  });

  //----------------------------------

  return (
    <Flex>
      <Box width={"100%"}>{Renglones}</Box>
    </Flex>
  );
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Renglon = props => {
  const [Theme] = useContext(CtxTheme);
  const [EstadosOpts] = useContext(CtxEstadosOpts);

  const { getCiudades, upCiudad, upCiudades } = useData();
  const [CiudadOK, setCiudadOK] = useState(props.Row.CiudadOK);
  const [Estado, setEstado] = useState({
    value: props.Row.Estado,
    label: props.Row.Estado
  });
  const [Edited, setEdited] = useState(false);
  const [Updates, setUpdates] = useState(0);

  const [ColorEjecutado, setColorEjecutado] = useState("blue");
  const [ColorCorregido, setColorCorregido] = useState("blue");

  useEffect(() => {
    setCiudadOK(props.Row.CiudadOK);
    setEstado({ value: props.Row.Estado, label: props.Row.Estado });
    setEdited(false);
  }, [props.Row]);

  useEffect(() => {
    if (props.Row.Ejecutado === 1) {
      setColorEjecutado("green");
    }
    if (props.Row.Corregido === 1) {
      setColorCorregido("green");
    }
    if (Edited === true) {
      setColorCorregido("SlateGrey");
    }
  });

  //----------------------------------

  const SaveMe = async Id => {
    let Save = await upCiudad(Id, CiudadOK, Estado.value);

    if (Save > 0) {
      await getCiudades();
    }
  };

  //----------------------------------

  const UpdateMe = async Id => {
    let Updated = await upCiudades(Id);
    setUpdates(Updated);
    if (Updated > 0) {
      await getCiudades();
    } else {
      setUpdates("N/E");
    }
  };
  //----------------------------------

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.Color}>
        <Box width={1 / 20}>
          <Text> {props.Row.Id} </Text>
        </Box>

        <Box width={2 / 8}>
          <Text> {props.Row.Ciudad} </Text>
        </Box>

        <Box width={2 / 8}>
          <Input
            css={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 12
            }}
            pr={2}
            value={CiudadOK}
            onChange={e => {
              setCiudadOK(e.target.value);
              setEdited(true);
            }}
          />
        </Box>

        <Box width={2 / 8}>
          <Dropbox
            css={{ fontFamily: "Arial, Helvetica, sans-serif" }}
            name="DropPage"
            value={Estado}
            options={EstadosOpts}
            onChange={e => {
              setEstado({ value: e.value, label: e.label });
              setEdited(true);
            }}
          />
        </Box>

        <Box width={2 / 16}>
          <Button
            bg={ColorCorregido}
            fontSize={"13px"}
            onClick={e => SaveMe(props.Row.Id)}
          >
            Guardar
          </Button>
        </Box>

        <Box width={1 / 16}>
          <Button bg={ColorEjecutado} onClick={e => UpdateMe(props.Row.Id)}>
            {"=>"}
          </Button>
        </Box>

        <Box width={1 / 20}>
          <Text> {Updates} </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

export default (App = () => {
  return (
    <ContextProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado
            key={1}
            texto="Ciudades y Estados"
            bg="slategrey"
            color="white"
          />
          <Paginador key={2} />
          <Listado key={3} />
        </Box>
      </Flex>
    </ContextProvider>
  );
});
