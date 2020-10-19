import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer
} from "react";

import axios from "axios";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
  Brush
} from "recharts";

import theme from "../css/cssui/theme";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxInterno = createContext([]);
const CtxTipoG = createContext(1);

// ------------------------------------

const useStateLocal = () => {
  return {
    Interno: useState(useContext(CtxInterno)),
    TipoG: useState(useContext(CtxTipoG))
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
  const [TipoG, setTipoG] = useContext(StateContext).TipoG;

  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const CustomizedLabel = props => {
    console.log(props);
    return <Text>Hola</Text>;
  };

  const RenderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    Clave
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radiusf = innerRadius + (outerRadius - innerRadius) * 1.1;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const xf = cx + radiusf * Math.cos(-midAngle * RADIAN);

    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const yf = cy + radiusf * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>

        <text
          x={xf}
          y={yf}
          fill="gray"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {Clave}
        </text>
      </g>
    );
  };

  let ChartTipo = () => {
    if (TipoG === 1) {
      return (
        <BarChart
          sx={Estilo.h2}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          data={Data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Clave" />
          <YAxis />
          <Tooltip active={true} />
          <Legend />

          <Bar
            dataKey={DataT === 1 ? "Puntos" : "Movs"}
            fill={DataT === 1 ? "#82ca9d" : "lightblue"}
          >
            {Data.map((entry, index) => {
              return <Cell key={`cell-${index}`} />;
            })}

            <LabelList
              dataKey={DataT === 1 ? "Puntos" : "Movs"}
              position="insideTop"
              strokeWidth={1}
            />
          </Bar>
        </BarChart>
      );
    }

    if (TipoG === 2) {
      return (
        <PieChart
          sx={Estilo.h2}
          // margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <Tooltip active={true} />

          <Pie
            dataKey={DataT === 1 ? "Puntos" : "Movs"}
            nameKey={"Clave"}
            data={Data}
            // labelLine={false}

            fill={DataT === 1 ? "#82ca9d" : "lightblue"}
            // label={CustomizedLabel}
            // label={(v)=> v.Clave}
            label={v => RenderCustomizedLabel(v)}
            labelLine={false}
          >
            {/* <LabelList
              dataKey={DataT === 1 ? "Puntos" : "Movs"}
              position="insideEnd"
              strokeWidth={1}
            /> */}

            {/* {
          	Data.map((entry, index) => {
              return(   
              // <Cell fill={COLORS[index % COLORS.length]} />
                <LabelList dataKey={"Clave"} position="top" />
              )
            })
          } */}

            <LabelList
              dataKey={"Clave"}
              content={v => RenderCustomizedLabel(v)}
            />
          </Pie>
        </PieChart>
      );
    }
  };

  try {
    return (
      <div>
        <Flex>
          <Button variant="primary" onClick={() => props.setDataT(1)}>
            Monto
          </Button>

          <Button variant="primary" onClick={() => props.setDataT(2)}>
            Movimientos
          </Button>
        </Flex>

        <Flex sx={{ width: "100%" }}>
          <ResponsiveContainer width={"100%"} height={"100%"} aspect={1.5}>
            {ChartTipo()}
          </ResponsiveContainer>
        </Flex>

        <Flex>
          <Button variant="primary" onClick={() => setTipoG(1)}>
            Barras
          </Button>

          <Button variant="primary" onClick={() => setTipoG(2)}>
            Pie
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

export default (App = props => {
  return (
    <ContextProvider theme={theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
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
