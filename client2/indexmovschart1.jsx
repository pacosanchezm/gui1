import React, { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";

import axios from "axios";
import moment from "moment";
import "@babel/polyfill";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

import "../src/styles.css";

import Dropbox from "react-select";
import DropboxCss from "../css/css5/select";

import Rechart1 from "./rechart1";
import Rechart2 from "./rechart2";
import Rechart3 from "./rechart3";
import Rechart4 from "./rechart4";
import Rechart5 from "./rechart5";

let App;

// -----------------------------------------------------------------------------

const StateContextM = createContext();
const CtxTheme = createContext(Theme);

const CtxAno = createContext({ value: 2019, label: "2019" });
const CtxSucursal = createContext({ value: null, label: "Todas" });

const CtxDataT = createContext(1);

const CtxLoading1 = createContext(false);
const CtxData1 = createContext([
  { Mes: 9, Puntos: 486058, Movs: 8249 },
  { Mes: 10, Puntos: 524672, Movs: 9272 },
  { Mes: 11, Puntos: 595994, Movs: 10475 },
  { Mes: 12, Puntos: 126706, Movs: 11550 }
]);
const CtxActivo1 = createContext({ value: null, label: "Todos" });

const CtxLoading2 = createContext(false);
const CtxData2 = createContext([{}]);
const CtxActivo2 = createContext({ value: null, label: "Todos" });

const CtxLoading3 = createContext(false);
const CtxData3 = createContext([{}]);
const CtxActivo3 = createContext({ value: null, label: "Todos" });

const CtxLoading4 = createContext(false);
const CtxData4 = createContext([{}]);
const CtxActivo4 = createContext({ value: null, label: "Todos" });

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Ano: useState(useContext(CtxAno)),

    Sucursal: useState(useContext(CtxSucursal)),
    DataT: useState(useContext(CtxDataT)),

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
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;

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
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query ResAno($Query: FiltroBi1) {
            Bi1{
              Movimientos {
                ResAno(Query: $Query) {
                  Mes
                  Puntos
                  Movs
                }
              }
            }
          }
            `,
          variables: {
            Query: {
              Ano: Ano.value,
              Sucursal: Sucursal.value
            }
          }
        }
      });
      await setData1(axdata.data.data.Bi1.Movimientos.ResAno);
      setLoading1(false);
    },

    getData2: async props => {
      setLoading2(true);
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query ResRes($Query: FiltroBi1) {
            Bi1{
              Movimientos {
                ResMes(Query: $Query) {
                  Dia
                  Puntos
                  Movs
                }
              }
            }
          }
            `,
          variables: {
            Query: {
              Ano: Ano.value,
              Mes: Activo1.value,
              Sucursal: Sucursal.value
            }
          }
        }
      });
      await setData2(axdata.data.data.Bi1.Movimientos.ResMes);
      setLoading2(false);
    },

    getData3: async props => {
      setLoading3(true);
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query ResDia($Query: FiltroBi1) {
            Bi1{
              Movimientos {
                ResDia(Query: $Query) {
                  Hora
                  Puntos
                  Movs
                }
              }
            }
          }
            `,
          variables: {
            Query: {
              Ano: Ano.value,
              Mes: Activo1.value,
              Dia: Activo2.value,
              Sucursal: Sucursal.value
            }
          }
        }
      });
      await setData3(axdata.data.data.Bi1.Movimientos.ResDia);
      setLoading3(false);
    },

    getData4: async props => {
      setLoading4(true);
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
          query ResSuc($Query: FiltroBi1){
            Bi1{
              Movimientos{
                ResSuc(Query: $Query) {
                  Clave
                  Puntos
                  Movs
                }
              }
            }
          }
            `,
          variables: {
            Query: {
              Ano: Ano.value,
              Mes: Activo1.value,
              Dia: Activo2.value,
              Hora: Activo3.value,
              Sucursal: Sucursal.value
            }
          }
        }
      });
      await setData4(axdata.data.data.Bi1.Movimientos.ResSuc);
      setLoading4(false);
    },

    // getData2: props => Data2.filter(v => v.name === Activo1.name),

    // getSaldo: () => Movimientos.reduce(v=>Number(v.Puntos), 0),
    getSuma2: Data2.reduce((a, b) => a + Number(b.pv), 0)

    
  };
};

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Mes, setMes] = useContext(StateContextM).Activo1;
  const [Dia, setDia] = useContext(StateContextM).Activo2;
  const [Hora, setHora] = useContext(StateContextM).Activo3;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [DataT, setDataT] = useContext(StateContextM).DataT;

  const { getData1, getData2 } = useData();

  const Sucursales = [
    { value: null, label: "Todas" },
    { value: "SUSHI FACTORY 3 RIOS", label: "3 Rios" },
    { value: "SUSHI FACTORY ANDARES, JAL", label: "Andares" },
    { value: "SUSHI FACTORY CINEPOLIS", label: "Cinepolis" },
    { value: "SUSHI FACTORY CITITOWER", label: "Cititower" },
    { value: "SUSHI FACTORY ESCALA", label: "Escala" },
    { value: "SUSHI FACTORY FORTUNA", label: "Fortuna" },
    { value: "SUSHI FACTORY GALERIAS, JAL", label: "Galerías" },
    { value: "SUSHI FACTORY LA LOMITA", label: "Lomita" },
    { value: "SUSHI FACTORY LA PAZ", label: "La Paz" },
    { value: "SUSHI FACTORY MALECON", label: "Malecón" },
    { value: "SUSHI FACTORY PLAZA ESFERA", label: "Esfera" },
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

  try {
    return (
      <div>



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

          <Box sx={{ width: "20%" }}>
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
          </Box>
        </Flex>

        <Flex>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Gráficas
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              navigate("/movs");
            }}
          >
            Movimientos
          </Button>
        </Flex>






        
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const RouterM = props => {
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const routes = props => {
    return {
      "/": () => (
        <div>
          <Router4 {...props} sx={{ width: "100%" }} />
          <Router1 {...props} sx={{ width: "100%" }} />
          <Router2 {...props} sx={{ width: "100%" }} />
          <Router3 {...props} sx={{ width: "100%" }} />
        </div>
      ),

      "/movs": () => (
        <div>
          {/* <Router5 {...props} sx={{ width: "100%" }} /> */}

          <Rechart5
            Theme={Theme}
            Ano={Ano.value}
            Mes={Activo1.value}
            Dia={Activo2.value}
            Hora={Activo3.value}
            Sucursal={Sucursal.value}

            // Ano={2020}
            // Mes={2}
            // Dia={4}
            // Hora={null}
            // Sucursal={null}
          />
        </div>
      )
    };
  };

  const routeHolder = useRoutes(routes({ ...props }));

  // useEffect(() => {
  //   getData2();
  // }, [Activo1, Sucursal, Ano]);

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Router1 = props => {
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [DataT, setDataT] = useContext(StateContextM).DataT;

  const [Loading1, setLoading1] = useContext(StateContextM).Loading1;
  const [Data1, setData1] = useContext(StateContextM).Data1;

  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;

  const { getData1, getData2 } = useData();

  const routes = props => {
    return {
      "/": () => (
        <Rechart1
          Theme={props.Theme}
          Loading={props.Loading1}
          DataT={props.DataT}
          Data={props.Data1}
          Activo={props.Activo1}
          setActivo={props.setActivo1}
          getData={props.getData2}
        />
        // <Text>raiz</Text>
      )
    };
  };

  const routeHolder = useRoutes(
    routes({
      Theme,
      Loading1,
      DataT,
      Data1,
      Activo1,
      setActivo1,
      getData2
    })
  );

  useEffect(() => {
    getData1();
  }, []);

  useEffect(() => {
    getData1();
  }, [Sucursal, Ano]);

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// ------------------------------------------

// -----------------------------------------------------------------------------

const Router2 = props => {
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [DataT, setDataT] = useContext(StateContextM).DataT;

  const [Loading2, setLoading2] = useContext(StateContextM).Loading2;
  const [Data2, setData2] = useContext(StateContextM).Data2;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;

  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;

  const { getData2 } = useData();

  const routes = props => {
    return {
      "/": () => (
        <Rechart2
          Theme={props.Theme}
          Loading={props.Loading2}
          DataT={props.DataT}
          Data={props.Data2}
          Activo={props.Activo2}
          setActivo={props.setActivo2}
        />
        // <Text>raiz</Text>
      )
    };
  };

  const routeHolder = useRoutes(
    routes({
      Theme,
      Loading2,
      DataT,
      getData2,
      Data2,
      Activo2,
      setActivo2
    })
  );

  useEffect(() => {
    getData2();
  }, [Activo1, Sucursal, Ano]);

  try {
    return (
      <div>
        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Router3 = props => {
  const [Ano, setAno] = useContext(StateContextM).Ano;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [DataT, setDataT] = useContext(StateContextM).DataT;

  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;

  const [Loading3, setLoading3] = useContext(StateContextM).Loading3;
  const [Data3, setData3] = useContext(StateContextM).Data3;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const { getData3 } = useData();

  const routes = props => {
    return {
      "/": () => (
        <Rechart3
          Theme={props.Theme}
          Loading={props.Loading3}
          DataT={props.DataT}
          Data={props.Data3}
          Activo={props.Activo3}
          setActivo={props.setActivo3}
        />
        // <Text>raiz</Text>
      )
    };
  };

  const routeHolder = useRoutes(
    routes({
      Theme,
      Loading3,
      DataT,
      getData3,
      Data3,
      Activo3,
      setActivo3
    })
  );

  useEffect(() => {
    getData3();
  }, [Activo1, Activo2, Sucursal, Ano]);

  try {
    return (
      <div>
        <Flex />

        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Router4 = props => {
  const [Ano, setAno] = useContext(StateContextM).Ano;

  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [DataT, setDataT] = useContext(StateContextM).DataT;

  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const [Loading4, setLoading4] = useContext(StateContextM).Loading4;
  const [Data4, setData4] = useContext(StateContextM).Data4;
  const [Activo4, setActivo4] = useContext(StateContextM).Activo4;

  const { getData4 } = useData();

  const routes = props => {
    return {
      "/": () => (
        <Rechart4
          Theme={props.Theme}
          Loading={props.Loading4}
          DataT={props.DataT}
          setDataT={props.setDataT}
          Data={props.Data4}
          Activo={props.Activo4}
          setActivo={props.setActivo4}
        />
        // <Text>raiz</Text>
      )
    };
  };

  const routeHolder = useRoutes(
    routes({
      Theme,
      DataT,
      setDataT,
      Loading4,
      getData4,
      Data4,
      Activo4,
      setActivo4
    })
  );

  useEffect(() => {
    getData4();
  }, [Activo1, Activo2, Sucursal, Ano, Activo3]);

  try {
    return (
      <div>
        <Flex />

        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Router5 = props => {
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal;
  const [Ano, setAno] = useContext(StateContextM).Ano;
  const [Activo1, setActivo1] = useContext(StateContextM).Activo1;
  const [Activo2, setActivo2] = useContext(StateContextM).Activo2;
  const [Activo3, setActivo3] = useContext(StateContextM).Activo3;

  const routes = props => {
    return {
      "/": () => (
        <Rechart5
          Theme={props.Theme}
          Ano={props.Ano.value}
          Mes={props.Activo1.value}
          Dia={props.Activo2.value}
          Hora={props.Activo3.value}
          Sucursal={props.Sucursal.value}

          // Theme={props.Theme}
          // Ano={2020}
          // Mes={1}
          // Dia={5}
          // Hora={17}
          // Sucursal={"SUSHI FACTORY CITITOWER"}
        />
      )
    };
  };

  const routeHolder = useRoutes(
    routes({
      Theme,
      Ano,
      Activo1,
      Activo2,
      Activo3,
      Sucursal
    })
  );

  useEffect(() => {
    getData4();
  }, [Activo1, Activo2, Sucursal, Ano, Activo3]);

  try {
    return (
      <div>
        <Flex />

        <Flex>
          <Box sx={{ width: "100%" }}>{routeHolder}</Box>
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
              color: "white",
              fontFamily: "body",
              width: "100%"
            }}
          >
            Pie
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "50%" }}>
            <Text sx={Estilo.h2}>{props.texto}</Text>
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
          <div
          // style={{
          //   backgroundColor: "white",
          //   fontSize: "20px",
          //   color: "white",
          //   borderTop: "1px solid #E7E7E7",
          //   textAlign: "left",
          //   padding: "0px",
          //   position: "fixed",
          //   left: "0",
          //   top: "0",
          //   height: "80px",
          //   width: "100%"
          // }}
          >
            <Encabezado {...props} texto="Puntos Canjeados" />
          </div>

          {/* 

          <div
            sx={{
              display: "block",
              padding: "10px",
              height: "60px",
              width: "100%"
            }}
          /> */}
        </header>

        <main
          sx={{
            width: "100%",
            flex: "1 1 auto"
          }}
        >
          <RouterM {...props} sx={{ width: "100%" }} />

          {/* <Router4 {...props} sx={{ width: "100%" }} />
          <Router1 {...props} sx={{ width: "100%" }} />
          <Router2 {...props} sx={{ width: "100%" }} />
          <Router3 {...props} sx={{ width: "100%" }} /> */}
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
