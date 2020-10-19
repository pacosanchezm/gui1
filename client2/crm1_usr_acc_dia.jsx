import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import moment from "moment";

import "@babel/polyfill";
import { ThemeProvider } from "styled-components";
import theme from "../css/themes";
import { Button, Text, Link, Image, Card } from "rebass";
import { Flex, Box } from "@rebass/grid";

import Dropbox from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Bar, Pie } from "react-chartjs-2";

import Container from "../css/css5/container";
import Titulo from "../css/css5/titulo";
import Input from "../css/css5/input";
import Checkbox from "../css/css5/checkbox";
import Label from "../css/css5/label";

import models from "../models/models";

let App;

//let Micolor = "#DCDCDC";

let MisColores = [
  { Cat: "Mango", Color: "#FFD700" }, //
  { Cat: "Toronjo", Color: "#FF69B4" },
  { Cat: "Naranjo", Color: "#ff9933" },
  { Cat: "Limon", Color: "#009933" },
  { Cat: "Lichi", Color: "#DC143C" },

  { Cat: "Default", Color: "#808080" } //Grey
];

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const CtxTheme = createContext(0);
const CtxFechaFiltro = createContext(0);
const CtxCheckInactivos = createContext(0);

const CtxUsuarios = createContext([]);
const CtxResOps = createContext([]);
const CtxDataChart = createContext(0);

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(theme.theme5);
  const [FechaFiltro, setFechaFiltro] = useState(new Date());
  // const [FechaFiltro, setFechaFiltro] = useState(moment());
  const [CheckInactivos, setCheckInactivos] = useState(false);

  const [Usuarios, setUsuarios] = useState([]);
  const [ResOps, setResOps] = useState([]);
  const [ChartData, setChartData] = useState([]);

  return (
    <CtxTheme.Provider value={[Theme, setTheme]}>
      <CtxFechaFiltro.Provider value={[FechaFiltro, setFechaFiltro]}>
        <CtxCheckInactivos.Provider value={[CheckInactivos, setCheckInactivos]}>
          <CtxUsuarios.Provider value={[Usuarios, setUsuarios]}>
            <CtxResOps.Provider value={[ResOps, setResOps]}>
              <CtxDataChart.Provider value={[ChartData, setChartData]}>
                {children}
              </CtxDataChart.Provider>
            </CtxResOps.Provider>
          </CtxUsuarios.Provider>
        </CtxCheckInactivos.Provider>
      </CtxFechaFiltro.Provider>
    </CtxTheme.Provider>
  );
};

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const useData = () => {
  const [Usuarios, setUsuarios] = useContext(CtxUsuarios);
  const [FechaFiltro, setFechaFiltro] = useContext(CtxFechaFiltro);
  const [CheckInactivos, setCheckInactivos] = useContext(CtxCheckInactivos);

  const [ResOps, setResOps] = useContext(CtxResOps);
  const [DataChart, setDataChart] = useContext(CtxDataChart);

  //-------------------------

  const ChartDataGenera = MiArray => {
    const ColorCat = (Categoria, Colores) => {
      let MiFiltro = Colores.filter(color => color.Cat === Categoria);
      if (MiFiltro.length != 0) {
        return MiFiltro[0].Color;
      } else {
        return Colores.filter(color => color.Cat === "Default")[0].Color;
      }
    };

    try {
      let MiColumnas1 = MiArray.map(row => row.Opcion);

      let MiColor = MiArray.map(row => {
        return ColorCat(row.Opcion, MisColores);
      });

      let MiDataSet = () => {
        let MiStatus = "Status";

        return [
          {
            stack: 0,
            label: MiStatus,
            data: MiArray.map(row => row.Cantidad),
            borderWidth: 1,
            backgroundColor: MiColor
          }
        ];
      };

      return {
        labels: MiColumnas1,
        datasets: MiDataSet()
      };
    } catch (e) {
      console.error(e);
    }
  };

  //-------------------------

  //-------------------------

  return {
    getUsuarios: async CheckInactivos => {
      const MiStatus = () => (CheckInactivos === false ? "Activo" : "Todos");
      console.log(CheckInactivos);

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query UsuariosRes($FiltroU: UsuarioFiltro){
              Crm3{
                Usuarios{
                  UsuariosRes(Query: $FiltroU){
                    ID
                    Page
                    FbId
                    Nombre
                    Apellidos
                    Colonia
                    Fecha
                    Status
                    IdAccion
                    Fotos
                    Opts
                    lonaccion
                    lataccion
                  }
                }
              }
            }
        `,
          variables: {
            FiltroU: {
              Page: 1964012340493592,
              Dia: moment(FechaFiltro).format("DD"),
              Mes: moment(FechaFiltro).format("MM"),
              Ano: moment(FechaFiltro).format("YYYY"),
              Status: MiStatus()
            }
          }
        }
      });

      await setUsuarios(axdata.data.data.Crm3.Usuarios.UsuariosRes);
    },

    //-------------------------
    sumOpts: Usuarios.reduce((a, b) => a + b.Opts, 0),
    //-------------------------
    sumFotos: Usuarios.reduce((a, b) => a + b.Fotos, 0),
    //-------------------------
    ctaRegs: Usuarios.length,
    //-------------------------

    getResOps: async CheckInactivos => {
      const MiStatus = () => (CheckInactivos === false ? "Activo" : "Todos");

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query OpsRes($FiltroU: UsuarioFiltro){
              Crm3{
                Usuarios{
                OpsRes(Query: $FiltroU){
                  IdOp
                  Opcion
                  Cantidad
                }
                }
              }
            }
        `,
          variables: {
            FiltroU: {
              Page: 1964012340493592,
              Dia: moment(FechaFiltro).format("DD"),
              Mes: moment(FechaFiltro).format("MM"),
              Ano: moment(FechaFiltro).format("YYYY"),
              Status: MiStatus()
            }
          }
        }
      });

      await setResOps(axdata.data.data.Crm3.Usuarios.OpsRes);
      await setDataChart(ChartDataGenera(axdata.data.data.Crm3.Usuarios.OpsRes));
    },

    //-------------------------

    UsuarioU: async Row => {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
        mutation UsuarioU($Reg: UsuarioInput){
          Crm2M{UsuarioU(Reg: $Reg)}
        }
        `,
          variables: {
            Reg: {
              ID: Row.ID,
              Status: Row.Status,
              Seguimiento: Row.Seguimiento,
              Obv: Row.Obv
            }
          }
        }
      });

      if (axdata.data.data.Crm2M.UsuarioU === 1) {
        console.log("actualizacion exitosa");
      } else {
        console.log("falló actualizacion");
      }

      return axdata.data.data.Crm2M.UsuarioU;
    }
    //-------------------------
  };
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto}
        </Titulo>
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const EncabezadoPagina = props => {
  const [Theme] = useContext(CtxTheme);
  const [FechaFiltro, setFechaFiltro] = useContext(CtxFechaFiltro);
  const { getUsuarios, getResOps } = useData();
  const [CheckInactivos, setCheckInactivos] = useContext(CtxCheckInactivos);

  useEffect(() => {
    getUsuarios(CheckInactivos);
    getResOps(CheckInactivos);
  }, [FechaFiltro, CheckInactivos]);

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex>
        <Box>
          <DatePicker
            selected={FechaFiltro}
            onChange={e => setFechaFiltro(e)}
          />
        </Box>

        <Box width={10 / 20} p={0}>
          <Text>
            <Checkbox
              checked={CheckInactivos}
              onClick={async e => {
                setCheckInactivos(!CheckInactivos);
                // getUsuarios(!CheckInactivos);
              }}
            />
            Mostrar Inactivos
          </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------

const Listado = props => {
  const [Usuarios, setUsuarios] = useContext(CtxUsuarios);
  let Micolor = "#DCDCDC";

  //----------------------------------

  const Renglones = Usuarios.map(row => {
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

const Renglon = props => {
  const { UsuarioU, getUsuarios, getResOps } = useData();

  const [Theme] = useContext(CtxTheme);
  const [Edited, setEdited] = useState(false);
  const [CheckInactivos, setCheckInactivos] = useContext(CtxCheckInactivos);

  const [StatusCheck, setStatusCheck] = useState(false);

  useEffect(() => {
    setEdited(false);
    props.Row.Status === "Activo"
      ? setStatusCheck(true)
      : setStatusCheck(false);
  }, [props.Row]);

  //----------------------------------

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.Color}>
        <Box width={2 / 20}>
          <Text>
            <strong>{props.Row.ID} </strong>
          </Text>
        </Box>

        <Box width={3 / 8}>
          <Text>
            {props.Row.Nombre} {props.Row.Apellidos}
          </Text>
        </Box>

        <Box width={2 / 10}>
          <Text>{props.Row.Colonia}</Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>{props.Row.Opts} </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>{props.Row.Fotos} </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>{props.Row.lonaccion != null ? "Si" : "No"}</strong>
          </Text>
        </Box>

        <Box width={1 / 20} p={1}>
          <Checkbox
            checked={StatusCheck}
            onClick={async e => {
              setStatusCheck(!StatusCheck);
              props.Row.Status === "Activo"
                ? (props.Row.Status = "Inactivo")
                : (props.Row.Status = "Activo");
              await UsuarioU(props.Row);
              getUsuarios(CheckInactivos);
              getResOps(CheckInactivos);
            }}
          />
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------

const CabezaPagina = props => {
  const [Theme] = useContext(CtxTheme);
  const { sumOpts, sumFotos, ctaRegs } = useData();

  return (
    <ThemeProvider theme={Theme.head}>
      <Flex bg={props.bg}>
        <Box width={2 / 20}>
          <Text color="red">
            <strong>Id </strong>
          </Text>
        </Box>

        <Box width={3 / 8}>
          <Text>
            <strong>Nombre </strong>
          </Text>
        </Box>

        <Box width={2 / 10}>
          <Text>
            <strong>Colonia </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>A </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>F </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>L </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>Act </strong>
          </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------

// -------------------------------------------------------------------------------

const PiePagina = props => {
  const [Theme] = useContext(CtxTheme);
  const { sumOpts, sumFotos, ctaRegs } = useData();

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.bg}>
        <Box width={2 / 20} color="magenta">
          <Text color="magenta">
            <strong>{ctaRegs} </strong>
          </Text>
        </Box>

        <Box width={3 / 8}>
          <Text />
        </Box>

        <Box width={2 / 10} />

        <Box width={1 / 20}>
          <Text>
            <strong>{sumOpts} </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text>
            <strong>{sumFotos} </strong>
          </Text>
        </Box>

        <Box width={1 / 20}>
          <Text />
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------

const ListadoOps = props => {
  const [ResOps, setResOps] = useContext(CtxResOps);
  const { getResOps } = useData();
  const [FechaFiltro, setFechaFiltro] = useContext(CtxFechaFiltro);
  const [CheckInactivos, setCheckInactivos] = useContext(CtxCheckInactivos);

  let Micolor = "#DCDCDC";

  useEffect(() => {
    getResOps(CheckInactivos);
  }, [FechaFiltro, CheckInactivos]);

  //----------------------------------

  const RenglonesOps = ResOps.map(row => {
    Micolor === "#DCDCDC" ? (Micolor = "White") : (Micolor = "#DCDCDC");

    return <RenglonOps {...props} key={row.IdOp} Row={row} Color={Micolor} />;
  });

  //----------------------------------

  return (
    <Flex>
      <Box width={"100%"}>{RenglonesOps}</Box>
    </Flex>
  );
};

// -------------------------------------------------------------------------------

const RenglonOps = props => {
  const [Theme] = useContext(CtxTheme);

  const [Edited, setEdited] = useState(false);
  const [Locok, setLocok] = useState("");

  useEffect(() => {
    setEdited(false);
    props.Row.lonaccion != null ? setLocok("Si") : setLocok("No");
  }, [props.Row]);

  //----------------------------------

  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex bg={props.Color}>
        <Box width={3 / 20}>
          <Text>
            <strong>{props.Row.Opcion} </strong>
          </Text>
        </Box>

        <Box width={3 / 20}>
          <Text>{props.Row.Cantidad}</Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// -------------------------------------------------------------------------------

const ChartBar1 = props => {
  const [DataChart, setDataChart] = useContext(CtxDataChart);
  const [Cat, setCat] = useState("Todos");

  const selCategoria = elems => {
    if (elems[0]) {
      // console.log(elems)
      setCat(elems[0]._model.label);
    } else {
      setCat("Todos");
    }
  };

  return (
    <Flex>
      <Pie
        data={DataChart}
        redraw={false}
        getElementsAtEvent={selCategoria}
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
  );
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado
            key={1}
            texto="Usuarios Sembrando de Corazón -----"
            bg="slategrey"
            color="white"
          />
          <EncabezadoPagina key={2} />
          <ChartBar1 key={6} title={"Árboles Sembrados"} />
          {/* <ListadoOps key={5} /> */}
          <CabezaPagina key={7} bg="slategrey" color="white" />

          <Listado key={3} />
          <PiePagina key={4} bg="#b3e6ff" color="white" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});
