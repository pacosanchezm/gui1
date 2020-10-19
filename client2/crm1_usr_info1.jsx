import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import moment from "moment";

import "@babel/polyfill";
import { ThemeProvider } from "styled-components";

import theme from "../css/themes";
import { Button, Text, Link, Image, Card, Provider } from "rebass";
import { Flex, Box } from "@rebass/grid";


import Dropbox from "react-select";

import Container from "../css/css5/container";
import Titulo from "../css/css5/titulo";
import Input from "../css/css5/input";
import Input2 from "../css/css5/input2";



import TextArea from "../css/css5/textarea";

import Checkbox from "../css/css5/checkbox";
import Label from "../css/css5/label";

import models from "../models/models";

let App;

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const CtxTheme = createContext(0);
const CtxUsuarios = createContext({});

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(theme.theme5);
  const [Usuarios, setUsuarios] = useState([{}]);

  return (
    <CtxTheme.Provider value={[Theme, setTheme]}>
      <CtxUsuarios.Provider value={[Usuarios, setUsuarios]}>
        {children}
      </CtxUsuarios.Provider>
    </CtxTheme.Provider>
  );
};

// ------------------------------------------------------------------
// ------------------------------------------------------------------

const useData = () => {
  const [Usuarios, setUsuarios] = useContext(CtxUsuarios);

  //-------------------------

  return {
    getUsuarios: async (Id, Page) => {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
        query Usuarios($FiltroU: UsuarioFiltro){
          Crm2{
            Usuarios(Filtro: $FiltroU) {
              ID
              Page
              FbId
              Nombre
              Apellidos
              Email
              Telefono
              Direccion
              Colonia
              Ciudad
              Estado
              CP
              Pais
              Nacimiento
              Fecha
              Status
              AsistHumano
              Profile_pic
              Genero
              IdInterno
              IdExterno
              Valor1
              Valor2
              Seguimiento
              Atiende
              Obv
            }
          }
        }
        `,
          variables: {
            FiltroU: {
              Id: Id,
              Page: Page
            }
          }
        }
      });

      await setUsuarios(axdata.data.data.Crm2.Usuarios[0]);
    },

    //-------------------------

    UsuarioU: async (setBotonC, setEdited, page) => {
      console.log(Usuarios);

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
        mutation UsuarioU($Reg: UsuarioInput){
          Crm2M{UsuarioU(Reg: $Reg)}
        }
        `,
          variables: {
            Reg: {
              ID: Usuarios.ID,
              Status: Usuarios.Status,
              Seguimiento: Usuarios.Seguimiento,
              Obv: Usuarios.Obv,
              Atiende: Usuarios.Atiende,
              Page: page
            }
          }
        }
      });

      console.log("update: " + axdata.data.data.Crm2M.UsuarioU);
      if (axdata.data.data.Crm2M.UsuarioU === 1) {
        setBotonC("green");
        setEdited(false);
      } else {
        setBotonC("red");
      }
    }
    //-------------------------
  };
};

const Encabezado = props => {
  try {
    return (
      <Box bg={props.bg || "SlateGrey"} p={1 / 2}>
        <Titulo color={props.color || "white"} fontSize={[1]} p={10}>
          {props.texto}
        </Titulo>
      </Box>
    );
  } catch (e) {
    console.error(e);
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const Forma = props => {
  try {
    const [Theme] = useContext(CtxTheme);
    const [Usuarios, setUsuarios] = useContext(CtxUsuarios);
    const { getUsuarios, UsuarioU } = useData();

    const [Edited, setEdited] = useState(false);
    const [BotonC, setBotonC] = useState("whitesmoke");

    const MiObject = Usuarios;
    const MiSetter = setUsuarios;

    // ------------------------------

    const boxcss = {
      css: { maxWidth: props.maxcolumna }
    };

    var SegOps = [
      { value: "Contactar", label: "Contactar" },
      { value: "Contactado", label: "Contactado" },
      { value: "En Progreso", label: "En Progreso" },
      { value: "Completado", label: "Completado" },
      { value: "Descartado", label: "Descartado" }
    ];

    var AtiendeOps = [
      { value: "Aurora", label: "Aurora" },
      { value: "Adriana", label: "Adriana" },
      { value: "Sargento ", label: "Sargento" },
      { value: "Sofia", label: "Sofia" },

    ];

    // ------------------------------

    useEffect(() => {
      getUsuarios(props.id, props.page);
    }, []);

    useEffect(() => {
      defBotonC();
    }, [Edited]);

    // ------------------------------

    const useChange = Field => {
      return {
        name: Field,
        value: MiObject[Field],
        fontSize: 1,
        color: "#595959",
        bg: "white",
        onChange: e => {
          MiSetter({ ...MiObject, [Field]: e.target.value });
          setEdited(true);
        }
      };
    };

    // ------------------------------

    const defBotonC = () => {
      if (Edited) {
        setBotonC("#ffb833");
      } else {
      }
    };

    const FieldNacimiento = () => {
      if (Usuarios.Nacimiento > 0) {
        return (
          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Edad </Text>
            </Box>
            <Box width={1 / 2}>
              <Text>
                {moment().diff(Usuarios.Nacimiento, "years")} (
                {moment(Usuarios.Nacimiento).format("DD MMM YYYY")})
              </Text>
            </Box>
          </Flex>
        );
      }
    };

    const FieldAsignado = () => {
      if (props.page === 2315779415325834) {
        AtiendeOps = [
          { value: "Aurora", label: "Aurora" },
          { value: "Adriana", label: "Adriana" },
          { value: "Sargento ", label: "Sargento" }
        ];

        return (
          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Asignado a </Text>
            </Box>
            <Box width={1 / 2} mb={21}>
              <Dropbox
                css={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                name="DropAtiende"
                value={{
                  value: Usuarios.Atiende,
                  label: Usuarios.Atiende
                }}
                options={AtiendeOps}
                onChange={e => {
                  setUsuarios({ ...Usuarios, Atiende: e.value });
                  setEdited(true);
                }}
              />
            </Box>
          </Flex>
        );
      }
    };













    //----------------------------------

    return (
      <ThemeProvider theme={Theme.renglon}>
        <Flex flexWrap="wrap" bg="WhiteSmoke" css={{ maxWidth: "610px" }}>
          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Nombre </Text>
            </Box>
            <Box width={1 / 2}>
              <Text>
                {Usuarios.Nombre} {Usuarios.Apellidos}
              </Text>
            </Box>
          </Flex>

          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Ciudad </Text>
            </Box>
            <Box width={1 / 2}>
              <Text>
                {Usuarios.Ciudad}, {Usuarios.Estado}
              </Text>
            </Box>
          </Flex>

          <Flex width={1}>
            <Box width={1 / 3} {...boxcss}>
              <Text> Teléfono </Text>
            </Box>
            <Box width={1 / 3}>
            <Flex width={1}>
              <Text>{Usuarios.Telefono}</Text> 

              <Box width={'123px'} alignItems="top" alignSelf="up" mr={3} >

              <Button
                bg= 'lightgreen'
                color='white'
                fontFamily='Arial'
                fontSize={10}
                onClick={async e => {
                  window.open(
                    "https://api.whatsapp.com/send?phone=521" + Usuarios.Telefono + "&text=Hola%20" + Usuarios.Nombre + "%20Gracias%20por%20ponerte%20en%20contacto%20con%20M%C3%A9xico%20Libre",
                    '_blank' // <- This is what makes it open in a new window.
                  )
                  }}
              >

              WhatsApp
              </Button>
              </Box>
            </Flex>

            </Box>
          </Flex>

          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Email </Text>
            </Box>
            <Box width={1 / 2}>
              <Text>{Usuarios.Email}</Text>
            </Box>
          </Flex>

          {FieldNacimiento()}
          {FieldAsignado()}

          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Seguimiento </Text>
            </Box>
            <Box width={1 / 2} mb={21}>
              <Dropbox
                css={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                name="DropSeg"
                value={{
                  value: Usuarios.Seguimiento,
                  label: Usuarios.Seguimiento
                }}
                options={SegOps}
                onChange={e => {
                  setUsuarios({ ...Usuarios, Seguimiento: e.value });
                  setEdited(true);
                }}
              />
            </Box>
          </Flex>



          {/* <Flex width={1} mb={21}>
            <Box width={1 / 2} {...boxcss}
            >
              <Text> Heredado </Text>
            </Box>
            <Box width={1 / 2}>
              <Input2
                key="N7"
                {...useChange("Ciudad")}
                {...Theme.renglon.Input}
              />
            </Box>

          </Flex> */}



          {/* <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Asignado a </Text>
            </Box>
            <Box width={1 / 2} mb={21}>
              <Dropbox
                css={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                name="DropAtiende"
                value={{
                  value: Usuarios.Atiende,
                  label: Usuarios.Atiende
                }}
                options={AtiendeOps}
                onChange={e => {
                  setUsuarios({ ...Usuarios, Atiende: e.value });
                  setEdited(true);
                }}
              />
            </Box>
          </Flex> */}


          <Flex width={1}>
            <Box width={1 / 2} {...boxcss}>
              <Text> Notas </Text>
            </Box>

            <Box width={1 / 2}>
              <TextArea
                {...useChange("Obv")}
                type="text"
                key="editor1"
                bg={"white"}
                css={{
                  height: "144px",
                  align: "top",
                  padding: "5px",
                  fontFamily: "Arial",
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "#595959",
                  fontWeight: "Normal",
                  fontStyle: "Normal",
                  rows: 4,
                  cols: 50
                }}
              />
            </Box>
          </Flex>

          <Flex width={1}>
            <Box width={1} alignItems="center" alignSelf="center" right={89} >
              <Button
                width={1}
                bg={BotonC}
                onClick={() => {
                  UsuarioU(setBotonC, setEdited, props.page);
                }}
              >
                Guardar
              </Button>
            </Box>
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  } catch (e) {
    console.error(e);
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado
            key={1}
            texto="Datos Generales"
            bg="slategrey"
            color="white"
          />
          <Forma key={2} id={props.id} page={props.page} maxcolumna={123} />
        </Box>
      </Flex>
    </ContextProvider>
  );
});
