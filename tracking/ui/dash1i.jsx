import React, { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../../css/cssui/theme";

import Dropbox from "react-select";
import DropboxCss from "../../css/css5/select";

// -----------------------------------------------------------------------------

import Chart1 from "./dash1g1";
import Chart2 from "./dash1g2";
import Chart3 from "./dash1g3";
import Chart4 from "./dash1g4";


let App;
// -----------------------------------------------------------------------------

const StateContextM = createContext();
const CtxTheme = createContext(Theme);

const CtxLoading1 = createContext(false);
const CtxData1 = createContext([{}]);
const CtxActivo1 = createContext(0);

const CtxLoading2 = createContext(false);
const CtxData2 = createContext([{}]);
const CtxActivo2 = createContext(0);

const CtxLoading3 = createContext(false);
const CtxData3 = createContext([{}]);
const CtxActivo3 = createContext(0);

const CtxLoading4 = createContext(false);
const CtxData4 = createContext([{}]);
const CtxActivo4 = createContext(0);
// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),

    Loading1: useState(useContext(CtxLoading1)),
    Data1: useState(useContext(CtxData1)),
    Activo1: useState(useContext(CtxActivo1)),

    Loading2: useState(useContext(CtxLoading2)),
    Data2: useState(useContext(CtxData2)),
    Activo2: useState(useContext(CtxActivo2)),

    Loading3: useState(useContext(CtxLoading3)),
    Data3: useState(useContext(CtxData3)),
    Activo3: useState(useContext(CtxActivo3)),

    Loading4: useState(useContext(CtxLoading4)),
    Data4: useState(useContext(CtxData4)),
    Activo4: useState(useContext(CtxActivo4))
  };
};

// ------------------------------------------------------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContextM.Provider>
  );
};

// ------------------------------------------------------------------

const useData = () => {
  const [Loading1, setLoading1] = useContext(StateContextM).Loading1;
  const [Data1, setData1] = useContext(StateContextM).Data1;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;

  const [Loading2, setLoading2] = useContext(StateContextM).Loading2;
  const [Data2, setData2] = useContext(StateContextM).Data2;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;

  const [Loading3, setLoading3] = useContext(StateContextM).Loading3;
  const [Data3, setData3] = useContext(StateContextM).Data3;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const [Loading4, setLoading4] = useContext(StateContextM).Loading4;
  const [Data4, setData4] = useContext(StateContextM).Data4;
  const [Activo4, setActivo4] = useContext(StateContextM).Activo4;


  return {
    getData1: async props => {
      setLoading1(true);
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gqltracking",
        url: "https://smxai.net/graphqltracking",
        method: "post",
        data: {
          query: `
          query Indicadores ($Query: TrackInput) {
            Indicadores{
              Tracks {
                LastUsuario(Query: $Query) {
                  IdMood, Fecha, Ano, Mes, Dia, Hora, Status, Valor, Rango, Weight,
                  Obv, Usuario, Nombre, Genero
                  Ciudad, Estado, Nacimiento, DescTrack
                }
              }
            }
          }
            `,
          variables: {
            Query: {
              Id: 1
            }
          }
        }
      });
      await setData1(axdata.data.data.Indicadores.Tracks.LastUsuario);
      setLoading1(false);
    },
    getData2: async props => {
      setLoading2(true);
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gqltracking",
        url: "https://smxai.net/graphqltracking",
        method: "post",
        data: {
          query: `
            query Rangos ($Query: TrackInput) {
              Indicadores{
                Tracks {
                  LastRango(Query: $Query) {
                    Valor
                    Rango
                    DescTrack
                  }
                }
              }
            }
            `,
          variables: {
            Query: {
              Id: 1
            }
          }
        }
      });
      await setData2(axdata.data.data.Indicadores.Tracks.LastRango);
      setLoading2(false);
    },
    getData3: async props => {
      setLoading3(true);
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gqltracking",
        url: "https://smxai.net/graphqltracking",
        method: "post",
        data: {
          query: `
            query Genero ($Query: TrackInput) {
              Indicadores{
                Tracks {
                  LastGenero(Query: $Query) {
                    Valor
                    Rango
                    Genero
                  }
                }
              }
            }
            `,
          variables: {
            Query: {
              Id: 1
            }
          }
        }
      });
      let xRes = axdata.data.data.Indicadores.Tracks.LastGenero;

      let Hombres = xRes.filter(v => v.Genero === "Hombre");
      let Mujeres = xRes.filter(v => v.Genero === "Mujer");

      let Genero = [
        {
          Genero: "Hombre",
          Bien: Hombres.filter(v => v.Rango === "Bien").reduce((a, b) => a +  Number(b.Valor), 0),
          Regular: Hombres.filter(v => v.Rango === "Regular").reduce((a, b) => a + Number(b.Valor), 0),
          Mal: Hombres.filter(v => v.Rango === "Mal").reduce((a, b) => a + Number(b.Valor),0)
        },
        {
          Genero: "Mujer",
          Bien: Mujeres.filter(v => v.Rango === "Bien").reduce((a, b) => a + Number(b.Valor),0),
          Regular: Mujeres.filter(v => v.Rango === "Regular").reduce((a, b) => a + Number(b.Valor),0),
          Mal: Mujeres.filter(v => v.Rango === "Mal").reduce((a, b) => a + Number(b.Valor),0)
        }
      ];

      setData3(Genero);

      setLoading3(false);
    },

    getData4: async props => {
      setLoading4(true);
      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gqltracking",
        url: "https://smxai.net/graphqltracking",
        method: "post",
        data: {
          query: `
            query Linea ($Query: TrackInput) {
              Indicadores{
                Tracks {
                  LineaUsuario(Query: $Query) {
                    Usuario
                    Valor
                    Rango
                    Fecha
                    FechaCorta
                    Nombre
                  }
                }
              }
            }
            `,
          variables: {
            Query: {
              Id: 1,
              Usuario: Activo1
            }
          }
        }
      });
      await setData4(axdata.data.data.Indicadores.Tracks.LineaUsuario);
      setLoading4(false);
    },
  };
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;


  const { getData1, getData2, getData3, getData4 } = useData();

  useEffect(() => {
    getData1(props);
    getData2(props);
    getData3(props);
    getData4(props);
  }, []);

  useEffect(() => {
    getData4(props);
  }, [Activo1]);






  try {
    return (
      <Flex>
        <Box bg={props.bg || "#FFFFFF"}>
          <Text sx={{ ...Estilo.h4s, color: "Grey" }} fontSize={[4]}>
            {props.texto}
          </Text>
        </Box>
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const MiChart1 = props => {
  const [Loading1, setLoading1] = useContext(StateContextM).Loading1;
  const [Data1, setData1] = useContext(StateContextM).Data1;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;

  const { getData1, getData2, getData3, getData4 } = useData();


  try {
    return (
      <div>
        <Flex>
          {/* <Box sx={{ width: "100%" }}>{routeHolder}</Box> */}

          <Chart1
            Theme={Theme}
            Loading={Loading1}
            Data={Data1}
            Activo={Activo1}
            setActivo={setActivo1}
            getData={getData1}
            Update={getData4}
          />

        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const MiChart2 = props => {

  const [Loading2, setLoading2] = useContext(StateContextM).Loading2;
  const [Data2, setData2] = useContext(StateContextM).Data2;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;

  const { getData1, getData2, getData3, getData4 } = useData();

  try {
    return (
      <div>
        <Flex>

          <Chart2
            Theme={Theme}
            Loading={Loading2}
            Data={Data2}
            Activo={Activo2}
            setActivo={setActivo2}
            getData={getData2}
          />

        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// ----------------------------------------------------------------------------

const MiChart3 = props => {

  const [Loading3, setLoading3] = useContext(StateContextM).Loading3;
  const [Data3, setData3] = useContext(StateContextM).Data3;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const { getData3 } = useData();

  try {
    return (
      <div>
        <Flex>

          <Chart3
            Theme={Theme}
            Loading={Loading3}
            Data={Data3}
            Activo={Activo3}
            setActivo={setActivo3}
            getData={getData3}
          />

        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const MiChart4 = props => {

  const [Loading4, setLoading4] = useContext(StateContextM).Loading4;
  const [Data4, setData4] = useContext(StateContextM).Data4;
  const [Activo4, setActivo4] = useContext(StateContextM).Activo4;

  const { getData4 } = useData();

  try {
    return (
      <div>
        <Flex>

        <Chart4
          Theme={Theme}
          Loading={Loading4}
          Data={Data4}
          Activo={Activo4}
          setActivo={setActivo4}
          getData={getData4}
        />

        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------


// ------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getData1, getData2, getData3, getData4 } = useData();

  try {
    return (
      <div>
        <Flex>
          <Box
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
                  
                  getData1(props);
                  getData2(props);
                  getData3(props);
                  getData4(props);
                }}
              >
                Actualizar
              </Button>
            </Box>
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2}>**</Text>
          </Box>
        </Flex>
      </div>
    );
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
        <header
          sx={{
            width: "100%"
          }}
        >
          <div>
            <Encabezado {...props} texto="Tracking -- ¿Cómo te sientes Hoy?" />
          </div>
        </header>

        <main
          sx={{
            width: "100%",
            flex: "1 1 auto"
          }}
        >

          <Flex>
            <Box sx={{ width: "70%" }}>
              <MiChart1 {...props} sx={{ width: "100%" }} />
            </Box>

            <Box sx={{ width: "30%" }}>
              <MiChart2 {...props} sx={{ width: "100%" }} />
              <MiChart3 {...props} sx={{ width: "100%" }} />
            </Box>
          </Flex>

          <Flex>
            <Box sx={{ width: "100%" }}>
              <MiChart4 {...props} sx={{ width: "100%" }} />
            </Box>

          </Flex>




        </main>

        <footer
          sx={{
            width: "100%"
          }}
        >
          <Pie {...props} texto="PiedePag" />
        </footer>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
