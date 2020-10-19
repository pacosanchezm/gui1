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
  PieChart,
  Pie,
  Label,
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
    if (v === "Mal") {
      return "#8B0000";
    }
    if (v === "Regular") {
      return "#FF8C00";
    }
    if (v === "Bien") {
      return "#006400";
    }
  };

  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RenderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, Rango }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radiusf = innerRadius + (outerRadius - innerRadius) * 1.1;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const xf = cx + radiusf * Math.cos(-midAngle * RADIAN);

    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const yf = cy + radiusf * Math.sin(-midAngle * RADIAN);

    return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
  };

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <ResponsiveContainer width={"100%"} height={"100%"} aspect={2}>
            <PieChart

              sx={Estilo.h2}
            >
              <Tooltip active={true} />

              <Pie
                dataKey={"Valor"}
                nameKey={"Rango"}
                data={Data}
                labelLine={false}
                label={RenderCustomizedLabel}
              >
                {/* <LabelList
                  dataKey={"Valor"}
                  position="insideEnd"
                  strokeWidth={1}
                /> */}


                {/* <LabelList
                  dataKey={"Valor"}
                  content={v => RenderCustomizedLabel(v)}
                /> */}




                {Data.map((entry, index) => {
                  return (
                    <Cell 
                      key={`cell-${index}`}
                      fill={color(entry.Rango)}
                    />

                    
                  );
                })}





              </Pie>
            </PieChart>
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
