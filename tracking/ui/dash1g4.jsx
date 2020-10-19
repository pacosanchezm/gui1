import React, {useState, useEffect, useContext, createContext, useReducer} from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList, Brush, LineChart,
  Line
} from "recharts";

import theme from "../../css/cssui/theme";
import moment from "moment";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxActivo = createContext(0);

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

// -----------------------------------------------------------------------

const Chart = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Data, Activo, setActivo } = props;

  let color = v => {
    console.log(v);
    if (v > 7) {return "#8B0000";}
    if (v > 3) {return "#FF8C00";}
    if (v > 0) {return "#006400";}
  };

  const CustomizedDot = props => {
    const { cx, cy, stroke, payload, value } = props;

    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        fill="green"
        viewBox="0 0 1024 1024"
      >

      </svg>
    );

  };


  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
        <ResponsiveContainer width={"100%"} height={"100%"} aspect={2}>
            <LineChart
              sx={Estilo.h2}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              data={Data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="FechaCorta" />
              <YAxis />
              <Tooltip active={true} />
              <Legend />

              <Line
                dataKey={"Valor"}
              //dot={<CustomizedDot />}
                dot={{ stroke: 'red', strokeWidth: 2 }}
                strokeWidth={2}
                type="monotone"
                stroke="#8884d8"
              />
            </LineChart>
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
            <Spinner size={30} sx={{ width: "100%", alignItems: "center" }} />
          ) : (
            <Box sx={{ width: "100%", height: "33px" }} />
          )}

          <Chart {...props} texto="Últimos Reportes" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------




