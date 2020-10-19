import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import {
  Grid,
  Flex,
  Box,
  Button,
  Link,
  Text,
  Textarea,
  Input,
  Image,
  Spinner
} from "@theme-ui/components";

let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxTelefono = createContext("");
const CtxNombre = createContext("");
const CtxApellidos = createContext("");

// ------------------

const useStateLocal = () => {
  return {
    Telefono: useState(useContext(CtxTelefono))
  };
};


// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------------

const Form = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, navigate, setTipoAnim } = props;
  const {
    Detalles,
    setDetalle,
    upDetalle,
    Editado,
    setEditado,
    Link,
    Link2,
    pullCliente,
    sendSms,
    sendSms2,
  } = props;

  const useChange = (Field, setField) => {
    return {
      name: Field,
      value: Field,
      fontSize: 1,
      color: "#595959",
      bg: "#DCDCDC",
      onChange: e => {
        setField(e.target.value);
      }
    };
  };

  const useChangeArray = (MiArray, Field, setField) => {
    return {
      name: Field,
      value: MiArray[Field],
      fontSize: 1,
      color: "#595959",
      bg: "#DCDCDC",
      onChange: e => {
        setField({ ...MiArray, [Field]: e.target.value });
        setEditado(true);
      }
    };
  };

  const ColorGuardar = function(props) {
    if (Editado) return "grey";
  };

  try {
    return (
      <div>
        <Flex>
          <Box
            p={4}
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 2,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            <Button
              variant="primary"
              onClick={() => {
                setTipoAnim(2);
                navigate("/");
              }}
            >
              {"<"}
            </Button>
            {props.texto}
          </Box>
        </Flex>

        <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>
          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>Pedido:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>{Detalles.Id} - {Detalles.TipoEntrega}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>Fecha:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>
                {moment(Detalles.Fecha).format("DD MMM HH:mm")}
              </Text>
            </Box>
          </Flex>


          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>Confirmado:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>
                {moment(Detalles.Confirmado).format("DD MMM HH:mm")}
              </Text>
            </Box>
          </Flex>






          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>Pagado:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h4sub}>{Detalles.Pagado}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Cliente:</Text>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>{Detalles.Cliente}</Text>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Telefono</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalles, "Telefono", setDetalle)} />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                width={1}
                bg={"slategrey"}
                Disabled={false}
                onClick={() => {
                  pullCliente();
                }}
              >
                Buscar
              </Button>
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Nombre</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalles, "Nombre", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Apellido</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalles, "Apellido", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Cuenta</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalles, "Cuenta", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Monto</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Input {...useChangeArray(Detalles, "Monto", setDetalle)} />
            </Box>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "20%" }}>
              <Text sx={Estilo.h2a}>Notas</Text>
            </Box>

            <Box sx={{ width: "54%" }}>
              <Textarea
                {...useChangeArray(Detalles, "Obv", setDetalle)}
                rows={3}
              />
            </Box>
          </Flex>





          <Box css={{ height: 55 }} />

          <Button
            width={1}
            bg={ColorGuardar()}
            Disabled={false}
            onClick={() => {
              upDetalle();
            }}
          >
            Guardar
          </Button>
          <Box css={{ height: 11 }} />




          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "70%" }}>
              <Text sx={Estilo.h2}>Solo Pago:</Text>
            </Box>
          </Flex>


          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "65%" }}>
              <Input
                sx={{ fontSize: "1" }}
                name="Link"
                value={Link + Detalles.Codigo + "&usr=" + Detalles.Sucursal}
                fontSize={1}
              />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                sx={{ fontSize: "1" }}
                bg={"slategrey"}
                Disabled={false}
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    props.Link + Detalles.Codigo + "&usr=" + Detalles.Sucursal
                  );
                }}
              >
                Copiar
              </Button>
            </Box>

            <Box sx={{ width: "15%" }}>

              <Button
                sx={{
                  fontSize: "2"
                }}
                width={1}
                bg={"orange"}
                Disabled={false}
                onClick={async () => {
                  let Send = await sendSms();
                  if (Send === 1) {
                    console.log("Sms Mandado");
                  }
                }}
              >
                SMS
              </Button>

            </Box>

          </Flex>






          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Text sx={Estilo.h2}>Menu y Pago:</Text>
            </Box>
          </Flex>


          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "50%" }}>
              <Input
                sx={{ fontSize: "1" }}
                name="Link"
                value={Link2 + Detalles.Codigo}
                fontSize={1}
              />
            </Box>

            <Box sx={{ width: "14%" }}>
              <Button
                sx={{ fontSize: "1" }}
                bg={"slategrey"}
                Disabled={false}
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    props.Link2 + Detalles.Codigo
                  );
                }}
              >
                Copiar
              </Button>
            </Box>

            <Box sx={{ width: "15%" }}>

              <Button
                sx={{
                  fontSize: "2"
                }}
                width={1}
                bg={"orange"}
                Disabled={false}
                onClick={async () => {
                  let Send = await sendSms2();
                  if (Send === 1) {
                    console.log("Sms Mandado");
                  }
                }}
              >
                SMS
              </Button>

            </Box>

            <Box sx={{ width: "15%" }}>

              {/* <Button
                sx={{fontSize: "2"}}
                width={1}
                bg={"blue"}
                Disabled={false}
                onClick={async () => {



                }}
              >

              </Button> */}




            </Box>





          </Flex>














        </Grid>
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
    <ContextProvider theme={props.Theme}>
      <Flex>
        <Box sx={{ width: "100%" }}>
          {/* {console.log(props.LoadingDet)}
          {props.LoadingDet ? (
            <Spinner />
          ) : (
            <Form {...props} texto="Detalle de Pedido" />
          )} */}

          <Form {...props} texto="Detalle de Pedido" />
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
