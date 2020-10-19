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

import { CSSTransition, SwitchTransition } from "react-transition-group";

import "../src/styles.css";

import Movs2wab from "./movs2wab";
import Movs2det from "./movs2det";

let App;

// -----------------------------------------------------------------------------

let MisMovs = [
  {
    Folio: ["G03190989580"],
    Fecha: ["2019-03-27T10:45:00-07:00"],
    Empresa: ["LA MAROMA"],
    Sucursal: ["LA MAROMA 3 RIOS"],
    Tipo: ["INCREMENTO"],
    Puntos: ["20"],
    Concepto: ["Incremento por Aclaración"]
  },
  {
    Folio: ["G03190989581"],
    Fecha: ["2019-03-27T10:46:00-07:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY 3 RIOS"],
    Tipo: ["INCREMENTO"],
    Puntos: ["30"],
    Concepto: ["Incremento por Aclaración"]
  },
  {
    Folio: ["D03190318853"],
    Fecha: ["2019-03-27T10:46:00-07:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY FORTUNA"],
    Tipo: ["DECREMENTO"],
    Puntos: ["-50"],
    Concepto: ["Decremento por Aclaración"]
  },
  {
    Folio: ["G03190989582"],
    Fecha: ["2019-03-27T10:47:00-07:00"],
    Empresa: ["BONHOMIA"],
    Sucursal: ["BONHOMIA LAS QUINTAS"],
    Tipo: ["INCREMENTO"],
    Puntos: ["10"],
    Concepto: ["Incremento por Aclaración"]
  },
  {
    Folio: ["G03190989583"],
    Fecha: ["2019-03-27T10:47:00-07:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY CINEPOLIS"],
    Tipo: ["INCREMENTO"],
    Puntos: ["10"],
    Concepto: ["Incremento por Aclaración"]
  },
  {
    Folio: ["D03190318854"],
    Fecha: ["2019-03-27T10:48:00-07:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY 3 RIOS"],
    Tipo: ["DECREMENTO"],
    Puntos: ["-20"],
    Concepto: ["Decremento por Aclaración"]
  },
  {
    Folio: ["G05191007506"],
    Fecha: ["2019-05-24T14:10:00-06:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY FORTUNA"],
    Tipo: ["INCREMENTO"],
    Puntos: ["25"],
    Concepto: ["Puntos Generados"]
  },
  {
    Folio: ["G05191007505"],
    Fecha: ["2019-05-24T14:10:00-06:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY FORTUNA"],
    Tipo: ["INCREMENTO"],
    Puntos: ["50"],
    Concepto: ["Puntos Generados 1er Compra"]
  },
  {
    Folio: ["G09191038926"],
    Fecha: ["2019-09-04T17:06:00-06:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY FORTUNA"],
    Tipo: ["INCREMENTO"],
    Puntos: ["1"],
    Concepto: ["Puntos Generados"]
  },
  {
    Folio: ["G09191038927"],
    Fecha: ["2019-09-04T17:08:00-06:00"],
    Empresa: ["SUSHI FACTORY"],
    Sucursal: ["SUSHI FACTORY FORTUNA"],
    Tipo: ["INCREMENTO"],
    Puntos: ["10"],
    Concepto: ["Puntos Generados"]
  }
];

let Images = {
  logo1: {
    src: "https://smxai.net/sf/sflogo1.jpg"
  },
  logo2: {
    src: "https://smxai.net/sf/eglogo1.jpeg"
  }
};

const StateContextM = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);
const CtxTipoAnim = createContext(1);

const CtxMovimientos = createContext(MisMovs);
const CtxDetFolio = createContext(null);

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages)),
    Movimientos: useState(useContext(CtxMovimientos)),
    DetFolio: useState(useContext(CtxDetFolio)),
    TipoAnim: useState(useContext(CtxTipoAnim))
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  // let xTheme = useState(useContext(CtxTheme))
  return (
    <StateContextM.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
      {/* <ThemeProvider theme={xTheme}>{children}</ThemeProvider> */}
    </StateContextM.Provider>
  );
};

// ------------------------------------------------------------------

const useData = () => {
  const [Movimientos, setMovimientos] = useContext(StateContextM).Movimientos;
  const [DetFolio] = useContext(StateContextM).DetFolio;
  const [Loading, setLoading] = useContext(StateContextM).Loading;

  return {
    getMovimientos: async props => {
      setLoading(true);
      var axdata = await axios({
        url: "https://smxai.net/graphqleai2",
        method: "post",
        data: {
          query: `
              query MovimientosWab($Cliente: String, $Token: String) {
                Clientes{
                  MovimientosWab(Cliente: $Cliente, Token: $Token) {
                    Folio, Fecha, Empresa, Sucursal, Tipo, Puntos, Concepto
                  }
                }
              }
            `,
          variables: {
            Cliente: props.usr,
            Token: props.token
          }
        }
      });
      await setMovimientos(axdata.data.data.Clientes.MovimientosWab);
      setLoading(false);
    },

    getDetalle: props => Movimientos.filter(v => v.Folio === DetFolio),

    // getSaldo: () => Movimientos.reduce(v=>Number(v.Puntos), 0),
    getSaldo: Movimientos.reduce((a, b) => a + Number(b.Puntos), 0)
  };
};

// -----------------------------------------------------------------------------

const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;
  const [Images] = useContext(StateContextM).Images;

  try {
    return (
      <div>
        <Flex sx={{ height: "55px", mb: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Image sx={{ height: "55px" }} src={Images.logo1.src} />
          </Box>

          <Box sx={{ width: "50%" }}>
            <Image sx={{ height: "55px" }} src={Images.logo2.src} />
          </Box>
        </Flex>

        <Flex>
          <Box
            sx={{
              p: 3,
              bg: "#ffcc00",
              fontWeight: "normal",
              fontSize: 4,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            {props.texto}
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

const Pie = props => {
  const Estilo = useThemeUI().theme.styles;
  const { getSaldo } = useData();

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
            Puntos disponibles: {getSaldo}
          </Box>
        </Flex>

        <Flex>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.h2}>
              ** Datos proporcionados con fines informativos. Para aclaciones
              contactar al centro de Atención a Clientes de Enlace Gourmet: 667
              455 27 18
            </Text>
          </Box>
        </Flex>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Router = props => {
  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [TipoAnim, setTipoAnim] = useContext(StateContextM).TipoAnim;

  const [DetFolio, setDetFolio] = useContext(StateContextM).DetFolio;
  const [Movimientos] = useContext(StateContextM).Movimientos;
  const { getMovimientos, getDetalle } = useData();

  const usr = props.usr;
  const Detalles = getDetalle(DetFolio);

  const routeResult = useRoutes(
    routes({
      DetFolio,
      setDetFolio,
      Movimientos,
      usr,
      navigate,
      Detalles,
      Loading,
      Theme,
      TipoAnim,
      setTipoAnim
    })
  );

  // useEffect(() => {
  //   getMovimientos(props);
  // }, []);

  let FadeTransition = props => {
    if (TipoAnim === 1) {
      return (
        <CSSTransition
          {...props}
          classNames={{
            enter: "fade-enter",
            enterActive: "fade-enter-active",
            exit: "fade-exit"
          }}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
        />
      );
    } else {
      return (
        <CSSTransition
          {...props}
          classNames={{
            enter: "fade-enter2",
            enterActive: "fade-enter-active",
            exit: "fade-exit2"
          }}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
        />
      );
    }

    // return (
    //   <CSSTransition
    //     {...props}
    //     classNames={{
    //       enter: "fade-enter",
    //       enterActive: "fade-enter-active",
    //       exit: "fade-exit"
    //     }}
    //     addEndListener={(node, done) => {
    //       node.addEventListener("transitionend", done, false);
    //     }}
    //   />
    // )
  };

  try {
    return (
      // <div>
      //   <Flex>
      //     <Box sx={{ width: "100%" }}>{routeResult}</Box>
      //   </Flex>
      // </div>

      <div>
        <SwitchTransition mode={"out-in"}>
          <FadeTransition key={5}>
            <Box sx={{ width: "100%" }}>{routeResult}</Box>
          </FadeTransition>
        </SwitchTransition>
      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// ----------------------------------------

const routes = props => {
  return {
    "/movs": () => (
      <Movs2wab
        Theme={props.Theme}
        navigate={props.navigate}
        setTipoAnim={props.setTipoAnim}
        Loading={props.Loading}
        setDetFolio={props.setDetFolio}
        Movimientos={props.Movimientos}
      />
    ),
    "/det": () => (
      <Movs2det
        Theme={props.Theme}
        navigate={props.navigate}
        DetFolio={props.DetFolio}
        Detalles={props.Detalles}
        setTipoAnim={props.setTipoAnim}
      />
    )
  };
};
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  useRedirect("/", "/movs");
  return (
    // <ContextProvider>
    //   <Flex>
    //     <Box sx={{ width: "100%" }}>
    //       <Encabezado {...props} texto="Estado de Cuenta" />
    //       <Router {...props} sx={{ width: "100%" }} />
    //       <Pie {...props} />
    //     </Box>
    //   </Flex>
    // </ContextProvider>

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
          <Encabezado {...props} texto="Estado de Cuenta" />
        </header>

        <main
          sx={{
            width: "100%",
            flex: "1 1 auto"
          }}
        >
          <Router {...props} sx={{ width: "100%" }} />
        </main>

        {/* <div
          sx={{
            display: 'grid',
            gridGap: 4,
            gridTemplateColumns: [
              'auto',
              '1fr 500px'
            ]
          }}>
          <main>Main</main>
          <aside><Router {...props} sx={{ width: "100%" }} /></aside>
        </div>
 */}

        <footer
          sx={{
            width: "100%"
          }}
        >
          <div
            sx={{
              display: "block",
              padding: "10px",
              height: "60px",
              width: "100%"
            }}
          />

          <div
            style={{
              backgroundColor: "white",
              fontSize: "20px",
              color: "white",
              borderTop: "1px solid #E7E7E7",
              textAlign: "left",
              padding: "0px",
              position: "fixed",
              left: "0",
              bottom: "0",
              height: "80px",
              width: "100%"
            }}
          >
            <Pie {...props} />
          </div>
        </footer>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
