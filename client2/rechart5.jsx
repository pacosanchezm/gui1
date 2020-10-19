import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

import axios from "axios";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  Spinner,
  Link
} from "@theme-ui/components";

import Dropbox from "react-select";
import DropboxCss from "../css/css5/select";

let App;

// -----------------------------------------------------------------------

let MisMovs = [
  {
    Id: 46362,
    IdCliente: 7215,
    NombreCompleto: "Rocio Flores Ramirez",
    Tarjeta: "0101037934",
    Folio: "G01201080090",
    Ticket: "129976              ",
    Sucursal: "SUSHI FACTORY SAN IGNACIO, JAL",
    Fecha: "Fri Jan 24 2020 18:20:52 GMT+0000 (UTC)",
    Ano: 2020,
    Mes: 1,
    Dia: 24,
    Hora: 18,
    Tipo: "G",
    Concepto: "Puntos Generados",
    Importe: 115,
    Puntos: 7,
    Avisado: 0,
    Obv: null
  },
  {
    Id: 46365,
    IdCliente: 5507,
    NombreCompleto: "Maria fernanda Ojeda Quintero",
    Tarjeta: "0101067145",
    Folio: "G01201080093",
    Ticket: "280334              ",
    Sucursal: "SUSHI FACTORY CITITOWER",
    Fecha: "Fri Jan 24 2020 18:27:06 GMT+0000 (UTC)",
    Ano: 2020,
    Mes: 1,
    Dia: 24,
    Hora: 18,
    Tipo: "G",
    Concepto: "Puntos Generados",
    Importe: 66,
    Puntos: 7,
    Avisado: 0,
    Obv: null
  },
  {
    Id: 46360,
    IdCliente: 13275,
    NombreCompleto: "Nancy viviana Bucio Hernandez",
    Tarjeta: "0101068334",
    Folio: "G01201080087",
    Ticket: "86651               ",
    Sucursal: "SUSHI FACTORY ESCALA",
    Fecha: "Fri Jan 24 2020 18:19:12 GMT+0000 (UTC)",
    Ano: 2020,
    Mes: 1,
    Dia: 24,
    Hora: 18,
    Tipo: "G",
    Concepto: "Puntos Generados",
    Importe: 181,
    Puntos: 9,
    Avisado: 0,
    Obv: null
  }
];

const StateContext = createContext();
const CtxLoading = createContext(false);

const CtxMovimientos = createContext([]);
const CtxPagina = createContext(1);
const CtxPaginas = createContext([]);

const CtxLimit = createContext(50);
const CtxCount = createContext(0);
const CtxOrden = createContext("Id");

// ------------------

const useStateLocal = () => {
  return {
    Loading: useState(useContext(CtxLoading)),
    Pagina: useState(useContext(CtxPagina)),
    Paginas: useState(useContext(CtxPaginas)),
    Limit: useState(useContext(CtxLimit)),
    Count: useState(useContext(CtxCount)),
    Orden: useState(useContext(CtxOrden)),
    Movimientos: useState(useContext(CtxMovimientos))
  };
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------------------------------------------------------

const useData = props => {
  const [Movimientos, setMovimientos] = useContext(StateContext).Movimientos;
  const [Loading, setLoading] = useContext(StateContext).Loading;
  const [Count, setCount] = useContext(StateContext).Count;
  const [Pagina] = useContext(StateContext).Pagina;
  const [Paginas, setPaginas] = useContext(StateContext).Paginas;

  const [Orden] = useContext(StateContext).Orden;

  return {
    getMovimientos: async props => {
      console.log(props);
      setLoading(true);
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query DetMovs($Query1: FiltroBi1) {
            Bi1{
              Movimientos {
                DetMovs(Query: $Query1) {
                  Id
                  IdCliente
                  NombreCompleto
                  Tarjeta
                  Folio
                  Ticket
                  Sucursal
                  Fecha
                  Ano
                  Mes
                  Dia
                  Hora
                  Tipo
                  Concepto
                  Importe
                  Puntos
                  Avisado
                  Obv
                } 
              }
            }
          }
            `,
          variables: {
            Query1: {
              Ano: props.Ano,
              Mes: props.Mes,
              Dia: props.Dia,
              Hora: props.Hora,
              Sucursal: props.Sucursal,
              Orden: Orden,
              Limit: 50,
              Offset: (Pagina - 1) * 50
            }
          }
        }
      });
      await setMovimientos(axdata.data.data.Bi1.Movimientos.DetMovs);
      setLoading(false);
    },

    getCount: async function getCount(props) {
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query Count($Query1: FiltroBi1){
            Bi1{
              Movimientos{
                Count(Query: $Query1)
              }
            }
          }
            `,
          variables: {
            Query1: {
              Ano: props.Ano,
              Mes: props.Mes,
              Dia: props.Dia,
              Hora: props.Hora,
              Sucursal: props.Sucursal
            }
          }
        }
      });
      await setCount(axdata.data.data.Bi1.Movimientos.Count);
    }.bind(this),

    getPaginas: async function getPaginas() {
      console.log(Count);
      let Paginasm = Math.floor((await Count) / 50) + 1;
      let NewPaginas = [];
      let number = 1;

      while (number <= Paginasm) {
        NewPaginas.push({ value: number, label: number });
        number++;
      }
      setPaginas(NewPaginas);
    }
  };
};

// -----------------------------------------------------------------------------

// ------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getMovimientos, getCount, getPaginas } = useData();
  const [Count, setCount] = useContext(StateContext).Count;
  const [Orden, setOrden] = useContext(StateContext).Orden;

  const [Pagina, setPagina] = useContext(StateContext).Pagina;
  const [Paginas, setPaginas] = useContext(StateContext).Paginas;

  useEffect(() => {
    getMovimientos(props);
    getCount(props);
  }, []);

  useEffect(() => {
    getMovimientos(props);
    getCount(props);
  }, [
    props.Ano,
    props.Mes,
    props.Dia,
    props.Hora,
    props.Sucursal,
    Orden,
    Pagina
  ]);

  useEffect(() => {
    getPaginas();
  }, [Count]);

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <Box
            pt={3}
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 2,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            {props.texto} {Count}
          </Box>
        </Flex>

        <Flex>
          <Button
            variant="primary"
            onClick={() => {
              getMovimientos(props);
            }}
          >
            Actualizar
          </Button>

          <Box>
            <Button bg="lightgrey" onClick={e => setPagina(Pagina - 1)}>
              {"<"}
            </Button>
          </Box>

          <Box width={3 / 12}>
            <Dropbox
              name="DropPagina"
              isSearchable={false}
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
        </Flex>

        <Flex sx={{ width: "100%", bg: "primary" }}>
          <Box sx={{ width: "10%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Fecha");
              }}
            >
              <Text sx={Estilo.h2}>Fecha</Text>
            </Link>
          </Box>

          <Box sx={{ width: "20%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Sucursal");
              }}
            >
              <Text sx={Estilo.h2}>Sucursal</Text>
            </Link>
          </Box>

          <Box sx={{ width: "20%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Cliente");
              }}
            >
              <Text sx={Estilo.h2}>Cliente</Text>
            </Link>{" "}
          </Box>

          <Box sx={{ width: "15%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Tarjeta");
              }}
            >
              <Text sx={Estilo.h2}>Tarjeta</Text>
            </Link>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Ticket");
              }}
            >
              <Text sx={Estilo.h2}>Ticket</Text>
            </Link>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Link
              href="#"
              onClick={async e => {
                setOrden("Puntos");
              }}
            >
              <Text sx={Estilo.h2}>Puntos</Text>
            </Link>
          </Box>

          <Box sx={{ width: "15%" }}>
            <Text sx={Estilo.h2}>Puntos</Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Listado = props => {
  const [Movimientos, setMovimientos] = useContext(StateContext).Movimientos;
  const [Loading, setLoading] = useContext(StateContext).Loading;

  let Micolor = "#DCDCDC";
  let Saldo = 0;

  const Renglones = Movimientos.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC");
    Saldo = Saldo + Number(row.Puntos);

    return <Renglon key={row.Folio} Row={row} Color={Micolor} />;
  });

  return (
    <Flex>
      {/* <Box sx={{ width: "100%" }}>{Renglones}</Box> */}

      {Loading ? (
        <Spinner size={30} />
      ) : (
        <Box sx={{ width: "100%" }}>{Renglones}</Box>
      )}
    </Flex>
  );
};

//
// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color } = props;

  return (
    <Flex sx={{ width: "100%", bg: Color }}>
      <Flex sx={{ width: "100%", bg: Color }}>
        <Box sx={{ width: "10%" }}>
          <Text sx={Estilo.h2}>
            {moment(Row.Fecha)
              .add(6, "hours")
              .format("DD MMM HH mm")}
          </Text>
        </Box>

        <Box sx={{ width: "20%", textAlign: "left" }}>
          <Text sx={Estilo.h2}>{Row.Sucursal}</Text>
        </Box>

        <Box sx={{ width: "20%", textAlign: "left" }}>
          <Text sx={Estilo.h2}>{Row.NombreCompleto}</Text>
        </Box>

        <Box sx={{ width: "15%", textAlign: "left" }}>
          <Text sx={Estilo.h2}>{Row.Tarjeta}</Text>
        </Box>

        <Box sx={{ width: "15%", textAlign: "left" }}>
          <Text sx={Estilo.h2}>{Row.Ticket}</Text>
        </Box>

        <Box sx={{ width: "15%", textAlign: "left" }}>
          <Text sx={Estilo.h2}>{Row.Importe}</Text>
        </Box>

        <Box sx={{ width: "15%" }}>
          <Text sx={Estilo.h2s2(Row.Puntos, Row.Tipo)}>{Row.Puntos} </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  console.log(props);
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Encabezado {...props} texto="Movimientos" />
          <Listado {...props} />
          {/* {props.Loading ? <Spinner size={30} /> : <Listado {...props} />} */}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
