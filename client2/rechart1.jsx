import React, { useState, useEffect, useContext, createContext, useReducer } from "react";

// import axios from "axios";
// import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList, Brush } from "recharts";

import theme from "../css/cssui/theme";

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

const Chart1 = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Data, DataT, Activo, setActivo } = props;

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
                if (Activo.value === v.activePayload[0].payload.Mes) {
                  setActivo({ value: null, label: "Todos" });
                } else {
                  setActivo({
                    value: v.activePayload[0].payload.Mes,
                    label: v.activePayload[0].payload.Mes
                  });
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Mes" />
              <YAxis />
              {/* <Tooltip active={true} /> */}
              <Legend />
              <Bar
                // dataKey="Puntos"

                dataKey={DataT === 1 ? "Puntos" : "Movs"}
                fill={DataT === 1 ? "#82ca9d" : "lightblue"}
              >
                {Data.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      stroke={"darkgreen"}
                      strokeWidth={entry.Mes === props.Activo.value ? 4 : 1}
                    />
                  );
                })}

                <LabelList
                  dataKey={DataT === 1 ? "Puntos" : "Movs"}
                  position="insideTop"
                  strokeWidth={1}
                />
              </Bar>
              {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
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

          <Chart1 {...props} texto="Movimientos" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
