import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";


/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner } from "@theme-ui/components";

import Theme from "../css/cssui/theme";


let App;

// -----------------------------------------------------------------------


const StateContext = createContext();
const CtxCategoria = createContext("X");


// ------------------


const useStateLocal = () => {
  return {
    Categoria: useState(useContext(CtxCategoria))
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


const Encabezado = props => {
  const Estilo = useThemeUI().theme.styles;

  try {
    return (
      <div>
        <Flex sx={{ width: "100%" }}>
          <Box
            bg="primary"
            sx={{
              fontWeight: "normal",
              fontSize: 1,
              color: "text",
              fontFamily: "body",
              width: "100%"
            }}
          >
            {props.texto}
          </Box>
        </Flex>

      </div>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------



const Listado = props => {
  let Micolor = "#DCDCDC";
  const Estilo = useThemeUI().theme.styles;

  const Delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

  const waitcode  = async (seconds) => {

    if(document.readyState === 'complete') {
      //props.setLoading(true)
      let node = document.getElementById(Categoria)
      await Delay(seconds)
      //props.setLoading(false)
      if(node) {node.scrollIntoView()}
    }
  }



  const Categoria = props.Categoria
  const setCategoria = props.setCategoria


  const ListaCategorias = () => {

    const Fotos = (Cat) => {
      return props.Registros.filter(v => v.CategoriasTitulo === Cat).map((row, i) => (

          <Renglon
            key={row.Id}
            Row={row}
            getDetalle={props.getDetalle}
            navigate={props.navigate}
            setRouter={props.setRouter}
            usedata={props.usedata}
            setCategoria={props.setCategoria}

          />

      ))
    }

    const Fotos2 = (Cat) => {
      return props.Registros.filter(v => v.CategoriasTitulo === Cat).map((row, i) => (

          <Renglon2
            key={row.Id}
            Row={row}
            getDetalle={props.getDetalle}
            navigate={props.navigate}
            setRouter={props.setRouter}
            usedata={props.usedata}
            setCategoria={props.setCategoria}
          />

      ))
    }

  
    const Fotos3 = (Cat) => {
      return props.Registros.filter(v => v.CategoriasTitulo === Cat).map((row, i) => (

          <Renglon3
            key={row.Id}
            Row={row}
            getDetalle={props.getDetalle}
            navigate={props.navigate}
            setRouter={props.setRouter}
            usedata={props.usedata}
            setCategoria={props.setCategoria}
          />

      ))
    }







    const Renglones = props.Categorias.map((row, i) => {

      let columnas = (span) => {

        switch (span) {
          case 1:
            return (            
              <Flex>
                <Box sx={{ width: "100%" }}>{Fotos2(row.CategoriasTitulo)}</Box>
              </Flex>
            )


          case 2:
            return (
              <Flex>
                <Box sx={{ width: "100%" }}>{Fotos(row.CategoriasTitulo)}</Box>
              </Flex> 
            )


          case 3:
            return (
              <Flex>
                <Box sx={{ width: "100%" }}>{Fotos3(row.CategoriasTitulo)}</Box>
              </Flex>
            )


          default:
            break;
        }


      }


      


      return (
        <div>
          <div ><a id={row.CategoriasTitulo}></a> </div>

        <Flex sx={{ mt: "5px", width: "100%" }} >
          <Text sx={Estilo.t4}
          
          >{row.CategoriasTitulo}</Text>
        </Flex>  



        {columnas(row.span)}


      </div>
      );
    });

    return (
      <Flex>
        <Box sx={{ width: "100%" }}>{Renglones}</Box>
      </Flex>
      );
  };
  



  useEffect(() => {


  //   if(document.readyState === 'complete') {
  //   let node = document.getElementById(Categoria)
  //   if(node) {node.scrollIntoView()}
  // }

  waitcode(0)

  }, []);



  

  return (
    <Flex>
      <Box sx={{ width: "100%" }}>{ListaCategorias()}</Box>
    </Flex>
  );
};

// -----------------------------------------------------------------------------


const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setPedido, navigate, setRouter, setTipoAnim, getDetalle,  usedata, setCategoria } = props;

  return (

      <Button
        sx={{width : "50%", bg: "transparent"}}
        onClick={() => {
          usedata.Productos().getDetalle(Row.Id)
          navigate("/det");
          setRouter(2)
          setCategoria(Row.CategoriasTitulo)
        }}
      >

        <Image src={Row.ProductosFoto}
          sx={{borderRadius: 5, width : "170px", height : "170px"}}
          m={0}
          loading="lazy"
        />

        <Text sx={Estilo.t2s3}>{Row.Producto} {Row.ProductosTitulo} ${Row.Precio}</Text>
      
      </Button>
      
  )
};



const Renglon2 = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setPedido, navigate, setRouter, setTipoAnim, getDetalle,  usedata, setCategoria } = props;

  return (

      <Button
        sx={{width : "100%", bg: "transparent"}}
        onClick={() => {
          usedata.Productos().getDetalle(Row.Id)
          navigate("/det");
          setRouter(2)
          setCategoria(Row.CategoriasTitulo)
        }}
      >

        <Image src={Row.ProductosFoto}
          sx={{borderRadius: 5}}
          m={0}
          loading="lazy"
        />

        <Text sx={Estilo.t2s3}>{Row.Producto} {Row.ProductosTitulo} ${Row.Precio}</Text>
      
      </Button>
      
  )
};


const Renglon3 = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, setPedido, navigate, setRouter, setTipoAnim, getDetalle,  usedata, setCategoria } = props;

  return (

      <Button
        sx={{width : "33%", bg: "transparent"}}
        onClick={() => {
          usedata.Productos().getDetalle(Row.Id)
          navigate("/det");
          setRouter(2)
          setCategoria(Row.CategoriasTitulo)
        }}
      >

        <Image src={Row.ProductosFoto}
          sx={{borderRadius: 5}}
          m={0}
          loading="lazy"
        />

        <Text sx={Estilo.t2s2}>{Row.Producto} {Row.ProductosTitulo} ${Row.Precio}</Text>
      
      </Button>
      
  )
};

// -----------------------------------------------------------------------------





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <ContextProvider theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          {/* <Encabezado {...props} texto="Menú" /> */}
          {props.Loading ? <Spinner size={21} /> : <Listado {...props} />}

          {/* <Listado {...props} /> */}

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------


