import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  Component
} from "react";

import "@babel/polyfill";

import Theme from "../../css/cssui/theme";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  Spinner,
  Input
} from "@theme-ui/components";

import axios from "axios";
import moment from "moment";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

//import WebviewControls from '../../messenger-api-helpers/webview-controls';

// ----------------------------------------------------------------
let App;

let Images = {
  logo1: {
    src: "https://smxai.net/sf/pagos1.jpg"
  },
  logo2: {
    src: "https://smxai.net/sf/eglogo1.jpeg"
  }
};

function valuetext(value) {
  return `${value}°C`;
}

let color = v => {
  if (v > 70) {
    return "red";
  }
  if (v > 30) {
    return "orange";
  }
  if (v > 0) {
    return "green";
  }
};

const marks = [
  { value: 10, label: "1 - Me siento muy bien! 🤩" },
  { value: 20, label: "2 - Me siento bien 😊" },
  { value: 30, label: "3 - Creo que bien 🙂" },
  { value: 40, label: "4 - Creo que tengo algunos síntomas 😕" },
  { value: 50, label: "5 - Sí tengo síntomas pero leves 😅" },
  { value: 60, label: "6 - Mis molestias están aumentando 🤧" },
  { value: 70, label: "7 - Estoy enfermo pero no grave 🤒" },
  { value: 80, label: "8 - Está aumentando la enfermedad 😨" },
  { value: 90, label: "9 - Me siento mal 😰" },
  { value: 100, label: "10 - Estoy mal, necesito ayuda 😱" }
];

// ------------------

const StateContext = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);

const CtxColorBarra = createContext(0);

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages)),
    ColorBarra: useState(useContext(CtxColorBarra))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    <ThemeProvider theme={Theme}>{children}</ThemeProvider>
  </StateContext.Provider>
);

// ------------------

const useData = function() {
  const [ColorBarra, setColorBarra] = useContext(StateContext).ColorBarra;

  return {
    addRegistro: async function(props) {
      // await setLoadingDet(true);

      var axdata = await axios({
        //url: "https://8t8jt.sse.codesandbox.io/gqltracking",
        url: "https://smxai.net/graphqltracking",
        method: "post",
        data: {
          query: `
            mutation AddMood ($Query: MoodInput ) {
              MoodsM {
                Registro {
                  InsertMood (Query: $Query)
                }
              }
            }
           `,
          variables: {
            Query: {
              Suscripcion: props.token,
              Valor: ColorBarra / 10
            }
          }
        }
      });

      if (axdata.data.data.MoodsM.Registro.InsertMood) {
        //WebviewControls.close();
      }
    }
  };
};

// ---------------------

// -----------------------------------------------------------------------------

const Slider1 = props => {
  const Estilo = useThemeUI().theme.styles;
  const [ColorBarra, setColorBarra] = useContext(StateContext).ColorBarra;

  const useStyles = makeStyles({
    root: {
      color: color(ColorBarra),
      height: 8,
      width: 5
    },
    thumb: {
      height: 24,
      width: 24,
      margin: 5,

      backgroundColor: "#fff",
      border: "2px solid grey",
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit"
      }
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      border: "2px solid currentColor",
      height: 30,
      width: 5,
      borderRadius: 4
    },
    rail: {
      border: "2px solid currentColor",
      height: 8,
      width: 30,
      borderRadius: 4
    },
    markLabel: {
      marginLeft: 16
    }
  });

  // useEffect(() => {
  //   getRegistros(props);
  // }, []);

  const classes = useStyles();

  try {
    return (
      <Flex sx={{ height: "400px", width: "200px" }}>
        <Box bg={props.bg || "White"}>
          <Slider
            //style={SliderStyle}
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={0}
            aria-labelledby="vertical-slider"
            marks={marks}
            step={10}
            onChange={(e, v) => {
              console.log(v);
              setColorBarra(v);
            }}
            classes={classes}
          />
        </Box>
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  // useEffect(() => {
  //   getRegistros(props);
  // }, []);

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

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { addRegistro } = useData();
  const [ColorBarra, setColorBarra] = useContext(StateContext).ColorBarra;

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <Box
            sx={{
              p: 3,
              bg: "white",
              fontWeight: "normal",
              fontSize: 3,
              color: "#FFFFFF",
              fontFamily: "body",
              width: "100%"
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Button
                width={1}
                bg={color(ColorBarra)}
                Disabled={false}
                onClick={() => {
                  addRegistro(props);
                }}
              >
                Enviar Respuesta
              </Button>
            </Box>
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2} />
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
    <StateProvider theme={Theme}>
      <Flex
        css={{
          display: "flex",
          flexDirection: "column",
          // set this to `minHeight: '100vh'` for full viewport height
          minHeight: 256,
          width: "100%"
        }}
      >
        <Box
          sx={{
            maxWidth: "700px",
            width: "456px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        />

        <Box
          sx={{
            maxWidth: "700px",
            width: "400px",
            mx: "auto",
            px: 2,
            py: 2
          }}
        >
          <Encabezado {...props} texto="¿Cómo te sientes hoy?" />

          <Box bg="White" css={{ height: 21 }} />
          <Slider1 {...props} />
          <Box bg="White" css={{ height: 34 }} />

          <Pie {...props} texto="Total a Pagar:" />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
