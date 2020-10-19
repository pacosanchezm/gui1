import React, { useState, useEffect, useContext, createContext } from "react";
import moment from "moment";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Grid, Button, Text, Image, Spinner, Link } from "@theme-ui/components";

import { Editor, EditorState, convertFromRaw, CompositeDecorator } from "draft-js";
import "draft-js/dist/Draft.css"


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
      <ThemeProvider theme={props.Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles;
 const [Productos, setProductos] = props.useContext.Productos;
 const [LoadingSecc] = props.useContext.LoadingSecc1;
 const [Loading, setLoading] = props.useContext.Loading;


/* eslint-disable */
const initialState = {};


const initialState2 = {"blocks":[{"key":"9gm3s","text":"Eduardo Garza es Maestro en Desarrollo Humano y Doctor en Filosofía,\u0003conferencista internacional, periodista y autor de varios libros.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"2imt0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"e8r2h","text":"Te invitamos a sumarte a esta reflexión sobre las oportunidades, competencias y retos que nos demanda el entorno actual.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":9,"style":"BOLD"},{"offset":50,"length":13,"style":"orange"},{"offset":65,"length":12,"style":"green"},{"offset":80,"length":5,"style":"indigo"}],"entityRanges":[],"data":{}},{"key":"c013v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f8oee","text":"Sé parte de los que estamos enfrentando los retos de lo inédito!","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2s0gl","text":"Este es una frase","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"green"},{"offset":0,"length":17,"style":"BOLD"},{"offset":0,"length":17,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"eop3o","text":"","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c3a2c","text":" i","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":2,"key":0}],"data":{}},{"key":"q3lj","text":"Proyecto Sintesis","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":17,"key":1}],"data":{}}],"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"https://smxai.net/empresando/conflogo2.jpg","width":37}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"www.proyectosintesis.com"}}}} 



  const DLink = props => {
    // console.log(props)
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>

    );
  };




  const linkdecorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: DLink
    }
  ]);

 // const contentState = convertFromRaw(Productos.MeetingsObv)

  const [editorState, setEditorState] = React.useState(EditorState.createWithContent(convertFromRaw(initialState2, {decorator: linkdecorator})))




 

 const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    fontSize: 14,
    padding: 20,
    width: 600
  },
  editor: {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20
  },
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: "none"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: 16,
    padding: "2px 0"
  },


  buttons: {
    marginBottom: 20
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Helvetica', sans-serif",
    marginRight: 10,
    padding: 3
  },

  button: {
    marginTop: 10,
    textAlign: "center"
  },

  link: {
    color: "#B0C4DE",
    textDecoration: "none"
  }


};








 const colorStyleMap = {
  red: {color: "rgba(255, 0, 0, 1.0)"},
  orange: {color: "rgba(255, 127, 0, 1.0)"},
  yellow: {color: "rgba(180, 180, 0, 1.0)"},
  green: {color: "rgba(0, 180, 0, 1.0)"},
  blue: {color: "rgba(0, 0, 255, 1.0)"},
  indigo: {color: "rgba(75, 0, 130, 1.0)"},
  violet: {color: "rgba(127, 0, 255, 1.0)"},
  grey: {color: "rgb(179, 179, 179"},

};


const mediaBlockRenderer = block => {
	if (block.getType() === "atomic") {
		return {
			component: Media,
			editable: false
		};
	}

	return null;
};

// const Image = props => {
// 	if (!!props.src) {
// 		return <img src={props.src} />;
// 	}
// 	return null;
// };

const Media = props => {
	const entity = props.contentState.getEntity(props.block.getEntityAt(0));
	const { src } = entity.getData();
	const type = entity.getType();

	let media;

	if (type === "image") {
		media = <Image src={src} />;
	} else {media = <div/>}

	return media;
};







  const ActDraft = async () => {
    if (Productos.MeetingsObv) {

      let currentState = EditorState.createWithContent(convertFromRaw(Productos.MeetingsObv, {decorator: linkdecorator}))
      setEditorState(EditorState.set(currentState, {decorator: linkdecorator}))

      // await setEditorState(EditorState.createWithContent(convertFromRaw(Productos.MeetingsObv, {decorator: linkdecorator})))
      //  setEditorState(EditorState.set(editorState, {decorator: linkdecorator}))

    } else {}
  }


  
  function findLinkEntities(contentBlock, callback, contentState) {

    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }
  
  
  
  React.useEffect((e) => {
    setEditorState(EditorState.set(editorState, {decorator: linkdecorator}))
  }, []);




  


  React.useEffect((e) => {
   // contentState = EditorState.createWithContent(convertFromRaw(Productos.MeetingsObv))

  ActDraft()
   //contentState = JSON.parse(Productos.MeetingsObv)
  // console.log(Productos)
  }, [Productos]);

  try {
    return (

      <div>

        <Box css={{ height: 21 }} />



        {Loading ? <Spinner size={17} ml={3} /> :  <div>



        {LoadingSecc ? <Spinner size={21} /> : (
          <div>


          {/* <Grid bg="WhiteSmoke" css={{ maxWidth: "610px" }}>
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Text sx={Estilo.msecc1}>{"Evento"}</Text>
              </Box>
            </Flex>
          </Grid> */}


            <Box css={{ height: 8 }} />



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
                    <Image sx={{ width: "100%" }} src={Productos.ProductosFoto2} />
                  </Box>
                </Flex>

                {/* <Flex sx={{ width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <Text sx={Estilo.mt1}>{Productos.ProductosTitulo}</Text>
                  </Box>
                </Flex> */}

                <Flex sx={{ width: "100%", mt:2, mb:3 }}>
                  <Box sx={{ width: "10%" }}/>
                  <Box sx={{ width: "80%" }}>
                    <Editor
                      editorState={editorState}
                      readOnly={true}
                      customStyleMap={colorStyleMap}
                      blockRendererFn={mediaBlockRenderer}
                      />

                    {/* <Text sx={Estilo.md1}>{Productos.MeetingsObv} </Text> */}
                  </Box>
                  <Box sx={{ width: "10%" }}/>

                </Flex>

              </Box>
            </Flex>

            <Box css={{ height: 4 }} />

          </div>
        )}

        </div>  
      }
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
    <ContextProvider Theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <Body {...props} texto="Catalogo" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------
