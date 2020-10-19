import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer
} from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  Brush
} from "recharts";

import theme from "../../css/cssui/theme";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxActivo = createContext(3);

// ------------------------------------

const useStateLocal = () => {
  return {
    Activo: useState(useContext(CtxActivo))
  };
};

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------

const Chart1 = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Data, Activo, setActivo } = props;

  let color = v => {
    console.log(v);
    if (v > 7) {return "#8B0000";}
    if (v > 3) {return "#FF8C00";}
    if (v > 0) {return "#006400";}
  };

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <ResponsiveContainer width={"100%"} height={"100%"} aspect={2}>
            <BarChart
              sx={Estilo.h2}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              data={Data}
              onClick={v => {
                if (Activo === v.activePayload[0].payload.Usuario) {
                  setActivo(0);
                } else {
                  setActivo(v.activePayload[0].payload.Usuario);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Genero" />
              <YAxis />
              {/* <Tooltip active={true} /> */}
              <Legend />
              <Bar dataKey={"Bien"} stackId="a" fill={"green"} />

              <Bar dataKey={"Regular"} stackId="a" fill={"orange"} />

              <Bar dataKey={"Mal"} stackId="a" fill={"red"} />
            </BarChart>
          </ResponsiveContainer>
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
    <ContextProvider theme={theme}>
      <Flex sx={{ width: "100%", alignItems: "center" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Chart1 {...props} texto="Movimientos" /> */}

          {props.Loading ? (
            <Spinner size={60} sx={{ width: "100%", alignItems: "center" }} />
          ) : (
            <Box sx={{ width: "100%", height: "63px" }} />
          )}

          <Chart1 {...props} texto="Últimos Reportes" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
