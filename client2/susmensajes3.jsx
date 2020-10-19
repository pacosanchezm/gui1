import React, { useState, useEffect, useContext, createContext } from "react";
import theme from "../css/themes";
import { Button, Text, Image } from "rebass";
import { Flex, Box } from "@rebass/grid";
import axios from "axios";
import moment from "moment";

import Dropbox from "react-select";
import DropboxCss from "../css/css5/select";

import Titulo from "../css/css5/titulo";

import Input2 from "../css/css5/input2";

let App;

// ------------------------------------------------------------------

const StateContext = createContext();
const CtxTheme = createContext(theme.theme5);

const CtxPagina = createContext(0);
const CtxFeed = createContext(0);
const CtxFeedOpts = createContext([]);

const CtxMensaje1 = createContext("");
const CtxMensaje2 = createContext("");
const CtxMensaje3 = createContext("");
const CtxMensaje4 = createContext("");

// ------------------

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Pagina: useState(useContext(CtxPagina)),
    Feed: useState(useContext(CtxFeed)),
    FeedOpts: useState(useContext(CtxFeedOpts)),

    Mensaje1: useState(useContext(CtxMensaje1)),
    Mensaje2: useState(useContext(CtxMensaje2)),
    Mensaje3: useState(useContext(CtxMensaje3)),
    Mensaje4: useState(useContext(CtxMensaje4))
  };
};

// ------------------

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    {children}
  </StateContext.Provider>
);

// ------------------------------------------------------------------

const useData = props => {
  const [Pagina] = useContext(StateContext).Pagina;
  const [Feed, setFeed] = useContext(StateContext).Feed;
  const [FeedOpts, setFeedOpts] = useContext(StateContext).FeedOpts;

  return {
    MensajeFeed: async Mensaje => {
      console.log("Mensaje: " + Mensaje);

      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            mutation MensajeFeed($Query: FeedMensaje){
              Suscriptions2M{
                Mensaje{
                  Feed(Query: $Query)
                }
              }
            }
        `,
          variables: {
            Query: {
              FeedId: Feed,
              Page: Pagina,
              Mensaje: Mensaje,
              Tipo: 1,
              Segundos: 2,
              Limit: 50,
              Offset: 0
            }
          }
        }
      });

      console.log("envio: " + axdata.data.data.Suscriptions2M.Mensaje.Feed);
    },

    getFeed: async props => {
      try {
        var axdata = await axios({
          url: "https://smxai.net/graphqlpub",
          method: "post",
          data: {
            query: `
              query Feeds {
                Feeds{Id, Titulo}
              }
            `
          }
        });

        setFeedOpts(
          axdata.data.data.Feeds.map(v => {
            return {
              value: v.Id,
              label: v.Titulo
            };
          })
        );
      } catch (e) {
        console.error(e);
      }
    }

    //-------------------------
  };
};

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

const EncabezadoPagina = (...props) => {
  const [Theme] = useContext(StateContext).Theme;
  const { MensajeFeed, getFeed } = useData();

  const [Pagina, setPagina] = useContext(StateContext).Pagina;
  const [Feed, setFeed] = useContext(StateContext).Feed;
  const [FeedOpts, setFeedOpts] = useContext(StateContext).FeedOpts;

  var PaginasOps = [
    { value: 1559949734304354, label: "YosoyCDMX" },
    { value: 473465412680744, label: "YosoyLeón" },
    { value: 608866805951764, label: "YosoyMonterrey" },
    { value: 615428365299641, label: "YosoyGuadalajara" },
    { value: 326130311097631, label: "YosoyQueretaro" },
    { value: 179694742435753, label: "YosoyTijuana" },
    { value: 1670865973219070, label: "Nelli" }
  ];

  useEffect(() => {
    getFeed(...props);
  }, []);

  return (
    <Flex>
      <Box width={1 / 2}>
        <Dropbox
          styles={DropboxCss.filtro1}
          name="DropPaginas"
          value={{
            value: Pagina,
            label: Pagina
          }}
          options={PaginasOps}
          onChange={e => {
            setPagina(e.value);
          }}
        />
      </Box>

      <Box width={1 / 2}>
        <Dropbox
          styles={DropboxCss.filtro1}
          name="DropFeeds"
          value={{
            value: Feed,
            label: Feed
          }}
          options={FeedOpts}
          onChange={e => {
            setFeed(e.value);
          }}
        />
      </Box>
    </Flex>
  );
};

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

const Form1 = (...props) => {
  const [Theme] = useContext(StateContext).Theme;
  const { MensajeFeed } = useData();

  const [Pagina, setPagina] = useContext(StateContext).Pagina;
  const [Feed, setFeed] = useContext(StateContext).Feed;

  const [Mensaje1, setMensaje1] = useContext(StateContext).Mensaje1;
  const [Mensaje2, setMensaje2] = useContext(StateContext).Mensaje2;
  const [Mensaje3, setMensaje3] = useContext(StateContext).Mensaje3;
  const [Mensaje4, setMensaje4] = useContext(StateContext).Mensaje4;

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

  return (
    <div>
      <Flex>
        <Box bg="White" css={{ height: 55 }} />

        <Box width={1}>
          <Input2
            width={3 / 4}
            {...Theme.renglon.Input}
            {...useChange(Mensaje1, setMensaje1)}
          />
          <Button
            bg={"slategray"}
            onClick={() => {
              MensajeFeed(Mensaje1);
            }}
          >
            Enviar
          </Button>
        </Box>
      </Flex>

      <Flex>
        <Box bg="White" css={{ height: 55 }} />

        <Box width={1}>
          <Input2
            width={3 / 4}
            {...Theme.renglon.Input}
            {...useChange(Mensaje2, setMensaje2)}
          />
          <Button
            bg={"slategray"}
            onClick={() => {
              MensajeFeed(Mensaje2);
            }}
          >
            Enviar
          </Button>
        </Box>
      </Flex>

      <Flex>
        <Box bg="White" css={{ height: 55 }} />

        <Box width={1}>
          <Input2
            width={3 / 4}
            {...Theme.renglon.Input}
            {...useChange(Mensaje3, setMensaje3)}
          />
          <Button
            bg={"slategray"}
            onClick={() => {
              MensajeFeed(Mensaje3);
            }}
          >
            Enviar
          </Button>
        </Box>
      </Flex>

      <Flex>
        <Box bg="White" css={{ height: 55 }} />

        <Box width={1}>
          <Input2
            width={3 / 4}
            {...Theme.renglon.Input}
            {...useChange(Mensaje4, setMensaje4)}
          />
          <Button
            bg={"slategray"}
            onClick={() => {
              MensajeFeed(Mensaje4);
            }}
          >
            Enviar
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box width={"100%"}>
          <Encabezado {...props} texto="Mensajes" />
          <EncabezadoPagina {...props} />
          <Form1 {...props} />
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
