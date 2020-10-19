import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

import { ThemeProvider } from "styled-components";
import theme from "../css/themes";
import { Button, Text, Link, Image, Card } from "rebass";
import { Flex, Box } from "@rebass/grid";

import Dropbox from "react-select";
import { Bar, Pie } from "react-chartjs-2";

import Titulo from "../css/css5/titulo";
import Container from "../css/css5/container";

import Switch from "../css/css5/switch";
import Progress from "../css/css5/progress";
import Slider from "../css/css5/slider";

//--------------------------------------------------------
//--------------------------------------------------------

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

//--------------------------------------------------------
//--------------------------------------------------------

function NameForm(props) {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName
  } = useInput("");
  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName
  } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting Name ${firstName} ${lastName}`);
    resetFirstName();
    resetLastName();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" {...bindFirstName} />
      </label>
      <label>
        Last Name:
        <input type="text" {...bindLastName} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

//--------------------------------------------------------
//--------------------------------------------------------

let Micolor = true;
let MisColores = [
  { Cat: "Entregado", Color: "#1fad8a" }, //
  { Cat: "Enviar", Color: "#808080" },
  { Cat: "Enviado", Color: "#F0E68C" },
  { Cat: "Leido", Color: "#9191ee" },
  { Cat: "Rechazado", Color: "#DC143C" },
  { Cat: "Default", Color: "#808080" } //Grey
];

//--------------------------------------------------------
//-------------------------------------------------------- Contexto

const CtxTheme = createContext(0);
const CtxSwitch1 = createContext(0);

const CtxSegundos = createContext(0);
const CtxDataChart = createContext(0);

const CtxSwitchTest = createContext(0);
const CtxSegundosTest = createContext(0);

// --------------------------------------------

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(theme.theme5);

  const [Switch1, setSwitch1] = useState(false);

  const [Segundos, setSegundos] = useState(10);
  const [ChartData, setChartData] = useState([]);

  const [SwitchTest, setSwitchTest] = useState(false);
  const [SegundosTest, setSegundosTest] = useState(false);

  return (
    <CtxTheme.Provider value={[Theme, setTheme]}>
      <CtxSwitch1.Provider value={[Switch1, setSwitch1]}>
        <CtxSegundos.Provider value={[Segundos, setSegundos]}>
          <CtxDataChart.Provider value={[ChartData, setChartData]}>
            <CtxSwitchTest.Provider value={[SwitchTest, setSwitchTest]}>
              <CtxSegundosTest.Provider value={[SegundosTest, setSegundosTest]}>
                {children}
              </CtxSegundosTest.Provider>
            </CtxSwitchTest.Provider>
          </CtxDataChart.Provider>
        </CtxSegundos.Provider>
      </CtxSwitch1.Provider>
    </CtxTheme.Provider>
  );
};

//--------------------------------------------------------
//--------------------------------------------------------

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

//--------------------------------------------------------------

const Paginador = props => {
  const [Theme, setTheme] = useContext(CtxTheme);

  const [Switch1, setSwitch1] = useContext(CtxSwitch1);
  const [Segundos, setSegundos] = useContext(CtxSegundos);

  const [SwitchTest, setSwitchTest] = useContext(CtxSwitchTest);
  const [SegundosTest, setSegundosTest] = useContext(CtxSegundosTest);

  const {
    getDataChart,
    accMailEnvia,
    accMailStop,
    getMailSemaforo,
    getMailSegundos,
    accSegundos,
    getSemaforoTest,
    getSegundosTest,
    accSegundosTest
  } = useData();

  //------------------------------

  useEffect(() => {
    getMailSemaforo();
    getSemaforoTest();
    getSegundosTest();

    getMailSegundos();
  }, []);

  const SwitchAction = async Switch1 => {
    console.log(Switch1);
    if (!Switch1) {
      let MailEnviar = await accMailEnvia();
      if (MailEnviar === 1) {
        console.log("Prendido");
      }
    } else {
      let MailStop = await accMailStop();
      if (MailStop === 1) {
        console.log("Detenido");
      }
    }
  };

  //------------------------------
  return (
    <ThemeProvider theme={Theme.renglon}>
      <Flex>
        <Box width={2 / 8}>
          <Button
            bg={"Gainsboro "}
            color={"SlateGrey"}
            onClick={() => getDataChart()}
          >
            Actualizar
          </Button>
        </Box>

        <Box width={1 / 8}>
          <Switch
            checked={Switch1}
            onClick={e => {
              SwitchAction(Switch1);
              setSwitch1(!Switch1);
            }}
          />
        </Box>

        <Box width={2 / 8}>
          <Text>
            <Button
              bg="grey"
              onClick={e => {
                accSegundos(Segundos - 1);
                getMailSegundos();
              }}
            >
              {"<"}
            </Button>
            Segundos: {Segundos}
            <Button
              bg="grey"
              onClick={e => {
                accSegundos(Segundos + 1);
                getMailSegundos();
              }}
            >
              {">"}
            </Button>
          </Text>
        </Box>

        <Box width={1 / 8}>
          <Switch checked={SwitchTest} />
        </Box>

        <Box width={2 / 8}>
          <Text>
            Segundo: {SegundosTest}
            <Button
              bg="grey"
              onClick={e => {
                accSegundosTest(SegundosTest + 1);
                getSegundosTest();
              }}
            >
              {">"}
            </Button>
          </Text>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const ChartBar1 = props => {
  const [DataChart, setDataChart] = useContext(CtxDataChart);

  const [Cat, setCat] = useState("Todos");
  const [ColoresCat, setColoresCat] = useState([MisColores]);

  const { getDataChart } = useData();

  useEffect(() => {
    getDataChart();
  }, []);

  //----------------------------------

  const selCategoria = elems => {
    if (elems[0]) {
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

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const useData = () => {
  const [Switch1, setSwitch1] = useContext(CtxSwitch1);
  const [Segundos, setSegundos] = useContext(CtxSegundos);

  const [DataChart, setDataChart] = useContext(CtxDataChart);

  const [SwitchTest, setSwitchTest] = useContext(CtxSwitchTest);
  const [SegundosTest, setSegundosTest] = useContext(CtxSegundosTest);

  //-------------------------

  const ColorCat = (Categoria, Colores) => {
    let MiFiltro = Colores.filter(color => color.Cat === Categoria);
    if (MiFiltro.length != 0) {
      return MiFiltro[0].Color;
    } else {
      return Colores.filter(color => color.Cat === "Default")[0].Color;
    }
  };

  //-------------------------

  let ChartDataGenera = (MiArray, Colores) => {
    try {
      let MiColumnas1 = MiArray.map(row => row.Cat);

      let MiColor = MiArray.map(row => {
        return ColorCat(row.Cat, MisColores);
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

  const getDataChart = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query mailstatus($Campana: Int) {
            IndMailStatusX(Campana: $Campana) {
              Cat
              X
              Cantidad
            }
          }
      `,
        variables: {
          Campana: 7
        }
      }
    });

    let resultado = axdatachart.data.data.IndMailStatusX;
    setDataChart(ChartDataGenera(resultado));
  };

  //-------------------------

  const accMailEnvia = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation MandarMail1($Campana: Int) {
            Mail1M {Mandar1(Query: $Campana)}
          }
      `,
        variables: {
          Campana: 6
        }
      }
    });

    let Resultado = axdatachart.data.data.Mail1M.Mandar1;
    console.log("Resultado MailEnvia: " + Resultado);
    return Resultado;
  };

  //-------------------------

  const accMailStop = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation MailStop {
            Mail1M {MailStop}
          }
      `
      }
    });

    let Resultado = axdatachart.data.data.Mail1M.MailStop;
    console.log("Resultado MailStop: " + Resultado);
    return Resultado;
  };

  //-------------------------

  const accSegundos = async NewSegundos => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation MailSegundos($Segundos: Int) {
            Mail1M {MailSegundos(Segundos: $Segundos)}
          }
      `,
        variables: {
          Segundos: NewSegundos
        }
      }
    });

    let Resultado = axdatachart.data.data.Mail1M.MailSegundos;
    console.log("Resultado MailStop: " + Resultado);
    return Resultado;
  };

  //-------------------------

  const getMailSemaforo = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query MailSemaforo{
            Mail1{
              MailSemaforoQ
            }
          }
      `
      }
    });

    let Resultado = axdatachart.data.data.Mail1.MailSemaforoQ;
    setSwitch1(Resultado);
  };

  //-------------------------

  const getMailSegundos = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query MailSegundos{
            Mail1{
              MailSegundosQ
            }
          }
      `
      }
    });

    let Resultado = axdatachart.data.data.Mail1.MailSegundosQ;
    console.log("Segundos: " + Resultado);
    setSegundos(Resultado);
    return Resultado;
  };

  //-------------------------

  const getSemaforoTest = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query SemaforoTest{
            Test{
              SemaforoQ
            }
          }
      `
      }
    });

    let Resultado = axdatachart.data.data.Test.SemaforoQ;
    console.log("SemaforoTest: " + Resultado);
    setSwitchTest(Resultado);
  };

  //-------------------------

  const getSegundosTest = async () => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          query query{
            Test{
              SegundosQ
            }
          }
      `
      }
    });

    let Resultado = axdatachart.data.data.Test.SegundosQ;
    console.log("SegundosTest: " + Resultado);

    setSegundosTest(Resultado);
  };

  const accSegundosTest = async NewSegundos => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query: `
          mutation query($Segundos: Int) {
            TestM {SegundosS(Segundos: $Segundos)}
          }
      `,
        variables: {
          Segundos: NewSegundos
        }
      }
    });

    let Resultado = axdatachart.data.data.TestM.SegundosS;
    console.log("Resultado SegundosTest: " + Resultado);
    return Resultado;
  };

  //-------------------------

  //-------------------------

  return {
    getDataChart,
    ColorCat,
    accMailEnvia,
    accMailStop,
    getMailSemaforo,
    getMailSegundos,
    accSegundos,
    getSemaforoTest,
    getSegundosTest,
    accSegundosTest
  };
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const App = () => {
  return (
    <ContextProvider>
      <Container>
        <Encabezado
          key={1}
          texto="Seguimiento de Campaña Mail"
          bg="slategrey"
          color="white"
        />

        <Paginador key={2} />

        <ChartBar1 title={"Seguimiento de Campaña Mails"} />

        <Box bg="White">
          <NameForm />
        </Box>
      </Container>
    </ContextProvider>
  );
};

export default App;
