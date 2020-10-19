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


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import dataurls from "./dataurl/urls"

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfMake.vfs;


let App;

// -----------------------------------------------------------------------

const StateContext = createContext();
const CtxTelefono = createContext("");
//const CtxNombre = createContext("");
//const CtxApellidos = createContext("");

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
  const {
    navigate,
    Detalles,
    setDetalle,
    Editado,
    setEditado,
    Link,
    Link2,
    Link3,
    //usedata,
    Pedidos,
    Clientes,
    // upDetalle,
    // pullCliente,
    // sendSms,
    // sendSms2,
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


  var documentDefination = {

        pageSize: {
          width: 410,
          height: 'auto'
        },

        pageMargins: [ 5, 5, 5, 5 ],


    content: [


      [{
       image: dataurls.logofactory,
        //image: "https://smxai.net/sf/cs1/factorylogo.png",

        width: 200,
        style: 'centerme'
      }],

      {
        text: '¡Hola ' + Detalles.Nombre + '!',
        fontSize: 18,
			  bold: true,
        margin: [5, 10],
        alignment: 'center'
      },

      [{
        image: dataurls.botonfactory,
        //image: "https://smxai.net/sf/cs1/menuboton1.jpg",

        link: Link2 + Detalles.Codigo,
        width: 230,
        style: 'centerme'
      }],


      [{
        image: dataurls.coverfactory,
        //image: "https://smxai.net/sf/cs1/cover1.jpg",


        style: 'centerme'
      }],











      // {
      //   layout: "lightHorizontalLines", // optional
      //   table: {
      //     // headers are automatically repeated if the table spans over multiple pages
      //     // you can declare how many rows should be treated as headers
      //     //headerRows: 1,
      //     widths: ["*", "auto", 100, "*"],

      //     body: [
      //       // ["First", "Second", "Third", "The last one"], // heading
      //       // ["Value 1", "Value 2", "Value 3", "Value 4"],
      //       // [{ text: "Ordena en Línea", bold: true }],

      //       [{
      //         image: dataurls.logofactory,
      //         style: 'rightme'
      //       }],


      //       [{
      //         image: dataurls.botonfactory,
      //         link: 'https://smxai.net/SushiFactory?id=3515866'
      //       }],


      //       [{
      //         image: dataurls.coverfactory,
            
      //       }],



      //     ],



      //   }
      // }




    ],


    styles:{
      centerme:
      {   
          alignment: 'center'
      }
    },


  };

  const pdfmakedownload = () => {
    pdfMake.createPdf(documentDefination).download('Sushi Factory Fortuna - ' + Detalles.Nombre + ' - Pedido ' + Detalles.Cuenta)



    // var win = window.open('', '_blank')
    // pdfMake.createPdf(documentDefination).open({}, win)


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
                // setTipoAnim(2);
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
                  //pullCliente();

                  //usedata.Clientes().pull(props)
                  Clientes.pull(props)


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
              //upDetalle();

              //usedata.Pedidos().up(props)
              Pedidos.up(props)

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
                  //let Send = await sendSms();

                  let Send = await Pedidos.sendSms(props);

                  

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
            <Box sx={{ width: "70%" }}>
              <Text sx={Estilo.h2}>Solo Pago - Mercado Pago:</Text>
            </Box>
          </Flex>


          <Flex sx={{ width: "100%" }}>

            <Box sx={{ width: "65%" }}>
              <Input
                sx={{ fontSize: "1" }}
                name="Link"
                value={Link3 + Detalles.Codigo + "&usr=" + Detalles.Sucursal}
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
                    props.Link3 + Detalles.Codigo + "&usr=" + Detalles.Sucursal
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
                  //let Send = await sendSms();

                  let Send = await Pedidos.sendSms3(props);

                  

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
                  //let Send = await sendSms2();

                  let Send = await Pedidos.sendSms2(props);


                  

                  if (Send === 1) {
                    console.log("Sms Mandado");
                  }
                }}
              >
                SMS
              </Button>

            </Box>

            <Box sx={{ width: "15%" }}>

              <Button
                sx={{
                  fontSize: "2"
                }}
                width={1}
                bg={"darkred"}
                Disabled={false}
                onClick={async () => {
                  //let Send = await sendSms2();
                  pdfmakedownload()
                }}
              >
                PDF
              </Button>

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
          {console.log(props.LoadingDet)}
          {props.LoadingDet ? (
            <Spinner />
          ) : (
            <Form {...props} texto="Detalle de Pedido" />
          )}

          {/* <Form {...props} texto="Detalle de Pedido" /> */}
        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
