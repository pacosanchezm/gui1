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



const OpcionesSel = (Clave, Opciones) => {

  console.log(Opciones)


  let MiFiltro = Opciones.filter(op => op.label === Clave);
  if (MiFiltro.length != 0) {
    return MiFiltro[0];
  } else {
    return 0;
  }
};


const ModuloCero  = () => {

  return (
    <Flex sx={{ width: "100%" }}>
      <Box
        //bg="primary"
        sx={{
          fontWeight: "normal",
          fontSize: 1,
          color: "text",
          fontFamily: "body",
          width: "100%"
        }}
      >

      </Box>
    </Flex>
  )
}








const Chart1 = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Data, DataT, Activo, setActivo, Opciones } = props;

  try {
    return (
      <div>


      {(props.CompStatus.Comp5()===0) ? ModuloCero() : (



        <Flex sx={{ width: "100%" }}>
          <ResponsiveContainer width={"100%"} height={"100%"} aspect={2}>
            <BarChart
              sx={Estilo.h2}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              data={Data}
              onClick={v => {
                if (Activo.value === OpcionesSel(v.activePayload[0].payload.Clave, Opciones).value) {
                  setActivo({ value: null, label: "Todos" });
                } else {
                  setActivo({
                    value: OpcionesSel(v.activePayload[0].payload.Clave, Opciones).value,
                    label: OpcionesSel(v.activePayload[0].payload.Clave, Opciones).label
                  });
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Clave" />
              <YAxis />
              {/* <Tooltip active={true} /> */}
              <Legend />
              <Bar
                // dataKey="Puntos"

                dataKey={DataT === 1 ? "Monto" : "Cuenta"}
                fill={DataT === 1 ? "#82ca9d" : "lightblue"}
              >
                {Data.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      stroke={"darkgreen"}
                      strokeWidth={entry.Clave === props.Activo.label ? 4 : 1}
                    />
                  );
                })}

                <LabelList
                  dataKey={DataT === 1 ? "Monto" : "Cuenta"}
                  //dataKey={"Monto"}

                  position="insideTop"
                  strokeWidth={1}
                />
              </Bar>
              {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
            </BarChart>
          </ResponsiveContainer>
        </Flex>











      )}



        




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
