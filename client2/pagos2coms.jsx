import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

import axios from "axios";



/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Grid, Box, Button, Text, Image, Checkbox, Spinner } from "@theme-ui/components";

import Theme from "../css/cssui/theme";


let App;

// -----------------------------------------------------------------------


// let MisRegistros = [
//   {
//     "Id": 332,
//     "Fecha": "1589076357000",
//     "Nombre": "Nalleli",
//     "ProductosTitulo": "Alejandro Filio",
//     "ProductosFoto": "https://smxai.net/jukevox/alejandrofilio.jpg",
//     "ExtrasDetTitulo": "Brazos de Sol",
//     "ConsumosObv": null,
//     "ConsumosExtrasCompletado": 0,
//     "ConsumosExtrasId": 1451
//   },
//   {
//     "Id": 333,
//     "Fecha": "1589076442000",
//     "Nombre": "Mauriciio",
//     "ProductosTitulo": "Manuel Mijares",
//     "ProductosFoto": "https://smxai.net/jukevox/mijares.jpg",
//     "ExtrasDetTitulo": "Para amarnos más",
//     "ConsumosObv": "Para Nalle, la flaca sabrosura",
//     "ConsumosExtrasCompletado": 0,
//     "ConsumosExtrasId": 1448
//   },
//   {
//     "Id": 336,
//     "Fecha": "1589077749000",
//     "Nombre": "Gaby",
//     "ProductosTitulo": "José José",
//     "ProductosFoto": "https://smxai.net/jukevox/josejose.jpg",
//     "ExtrasDetTitulo": "La nave del olvido",
//     "ConsumosObv": "Para tu sueter",
//     "ConsumosExtrasCompletado": 1,
//     "ConsumosExtrasId": 1513
//   },
// ];

let MisRegistros = [
  {
    "Id": "",
    "Fecha": "",
    "Nombre": "",
    "ProductosTitulo": "",
    "ProductosFoto": "",
    "ExtrasDetTitulo": "",
    "ConsumosObv": null,
    "ConsumosExtrasCompletado": "",
    "ConsumosExtrasId": ""
  },
];



const StateContext = createContext();
const CtxSaldo = createContext(0);
const CtxRegistros = createContext(MisRegistros);

// ------------------


const useStateLocal = () => {
  return {
    Saldo: useState(useContext(CtxSaldo)),
    Registros: useState(useContext(CtxRegistros))

  };
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------


let usedata = function(StateContextM) {

    //let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
    let graphqlserver = "https://smxai.net/graphqleai2"

    const [Registros, setRegistros] = useContext(StateContext).Registros;

    const Sucursal = props.Sucursal


  return {


    

    ConsumosExtras: function() {
      return {

        getResumen : async function(Consumo) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query PedidoResumen($Query: PedidoInput){
                Pedidos {
                  Consultas {
                    PedidoResumen(Query: $Query){
                      Id
                      Fecha
                      Nombre
                      ProductosTitulo
                      ProductosFoto
                      ExtrasDetTitulo
                      ConsumosObv
                      ConsumosExtrasCompletado
                      ConsumosExtrasId
                    }
                  }
                }
              }           
               `,
              variables: {
                Query: {
                  "Sucursal": Sucursal.value,
                  "ConsumosExtrasCantidad": 1
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumen;
      
          if (axdataRes) {
            setRegistros(axdataRes);
          } else {}
        },



      

        UpdateCompletado : async function(Id, Completado) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumosExtra ($Query: ConsumoExtraInput) {
                  ConsumosExtrasM {
                    Registro {
                      UpdateCompletado (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Id,
                  Completado: Completado
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtrasM.Registro.UpdateCompletado;
      
          if (axdataRes) {} else {}
        },


      };
    }, // ------- ConsumosExtras

  };
};















// -----------------------------------------------------------------------------

const Listado = props => {
  let Micolor = "#f2f2f2";

  //const [Registros, setRegistros] = useContext(StateContext).Registros;


  const Comandas = props.Comandas

  //const {ConsumosExtras} = usedata();

  const ConsumosExtras = props.usedata


  useEffect(() => {
  //ConsumosExtras().getResumen()
  }, []);




  const Renglones = Comandas.map((row, index) => {
    row.ConsumosExtrasCompletado === 0 ? (Micolor = "White") : (Micolor = "#90EE90");

    return (
      <Renglon
        key={row.ConsumosExtrasId}
        Row={row}
        Color={Micolor}
        i={index}
        usedata={ConsumosExtras}
      />
    );
  });




  



  return (
    <div>

      <Box bg="White" css={{ height: 13 }} />

      <Grid sx={{p:2, m: 2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        <Flex>
          <Box sx={{ width: "100%" }}>{Renglones}</Box>
        </Flex>

     </Grid>

    </div>
  );
};



// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, navigate, setRouter, i, usedata } = props;


  return (
    <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

        <Flex sx={{ width: "100%", bg: Color }}
          columns={[1,null,2]}
        >
            <Flex sx={{ width: "25%", bg: Color, pr:2 }}>

                <Image sx={{ height: "55px", borderRadius: 3 }} src={Row.ProductosFoto} />

            </Flex>




            <Box sx={{ width: "25%" }}>
              <Text sx={Estilo.t1s}>{Row.Nombre} </Text>
            </Box>




          <Grid sx={{ width: "75%", bg: Color, gridGap: 0 }}>



            <Flex sx={{ width: "100%", bg: Color }}>

              <Box sx={{ width: "70%" }}>
                <Text sx={Estilo.t1s}>{Row.ProductosTitulo} - {Row.ExtrasDetTitulo}</Text>
              </Box>



              <Box sx={{ width: "15%" }}>
                {/* <Text sx={Estilo.l1s}>$ {Row.ConsumoTotal} </Text> */}
              </Box>
              <Box >
                <Button sx={{ width: "25px", height: "100%"}}
                //value={Row.ConsumosExtrasCompletado}
                  //checked={Row.ConsumosExtrasCompletado}
                  onClick={async() => {
                    await usedata().UpdateCompletado(Row.ConsumosExtrasId, Row.ConsumosExtrasCompletado===0 ? 1 : 0)
                  
                    //usedata().getResumen()
                  }}

                />
              </Box>
            </Flex>



            <Flex sx={{ width: "100%", bg: Color }}>

              <Box sx={{ width: "90%" }}>
                <Text sx={Estilo.d1s}>{Row.ConsumosObv}</Text>
              </Box>




            </Flex>

          </Grid>

        </Flex>

    </Grid>
  );
};

// -----------------------------------------------------------------------------











// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Encabezado {...props} texto="Pedidos" /> */}
          {props.LoadingDet ? <Spinner size={33} /> : <Listado {...props} />}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------