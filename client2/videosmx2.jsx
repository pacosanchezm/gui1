import React, { useState, useEffect, useContext, createContext } from "react";
import theme from "../css/themes";
import { Button, Text, Image } from "rebass";
import { Flex, Box } from "@rebass/grid";
// import axios from "axios";
// import moment from "moment";
// import Hls from "hls.js";

import ReactHLS from "react-hls";

let App;

// ------------------------------------------------------------------

const StateContext = createContext();
const CtxTheme = createContext(theme.theme5);
const CtxPlaying = createContext(true);

const useStateUniv = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Playing: useState(useContext(CtxPlaying))
  };
};

const StateProvider = ({ children }) => (
  <StateContext.Provider value={useStateUniv()}>
    {children}
  </StateContext.Provider>
);

// ------------------------------------------------------------------

// const useData = props => {
//   return {
//     VideoOpen: async props => {
//       console.log(props);

//       var axdata = await axios({
//         url: "https://smxai.net/graphqlpub2",
//         method: "post",
//         data: {
//           query: `
//             mutation Logger($Query: FeedMensaje){
//               Suscriptions2M{
//                 Logger{
//                   VideoOpen(Query: $Query)
//                 }
//               }
//             }
//         `,
//           variables: {
//             Query: {
//               FbId: props.id,
//               FeedId: props.feed,
//               Link: props.url,
//               Media: props.poster
//             }
//           }
//         }
//       });

//       console.log(
//         "update: " + axdata.data.data.Suscriptions2M.Logger.VideoOpen
//       );
//       if (axdata.data.data.Suscriptions2M.Logger.VideoOpen > 0) {
//         console.log("Agregado");
//       } else {
//         console.log("NO Agregado");
//       }
//     }
//     //-------------------------
//   };
// };

// ------------------------------------------------------------------

// const Logger = props => {
//   const { VideoOpen } = useData();

//   useEffect(() => {
//     VideoOpen(props);
//   }, []);

//   try {
//     return (
//       <Flex width={1} bg={"white"}>
//         <Box bg={"White"} p={1 / 2}>
//           _
//         </Box>
//       </Flex>
//     );
//   } catch (e) {
//     console.error(e);
//   }
// };

// -----------------------------------------------------------------------------

// ------------------------------------------------------------------

const Player = props => {
  const [Theme] = useContext(StateContext).Theme;
  const [Playing, setPlaying] = useContext(StateContext).Playing;

  const mivideo = () => {
    return (
      <video width="100%" height="100%" controls poster={props.poster}>
        {" "}
        <source src={props.url} type="video/mp4" />
      </video>
    );
  };

  try {
    return (
      <Flex width={1} bg={"white"}>
        <Box bg={"White"} p={1 / 2}>
          <video width="100%" height="100%" controls poster={props.poster}>
            {" "}
            <source src={props.url} type="video/mp4" />
          </video>
        </Box>
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

const Player2 = props => {
  const [Theme] = useContext(StateContext).Theme;
  const [Playing, setPlaying] = useContext(StateContext).Playing;

  const mivideo = () => {
    return (
      <video width="100%" height="100%" controls poster={props.poster}>
        {" "}
        <source src={props.hls} />
      </video>
    );
  };

  //   if(Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
  //     hls.attachMedia(mivideo);
  //     hls.on(Hls.Events.MANIFEST_PARSED,function() {
  //       mivideo.play();
  //   });
  //  }

  try {
    return (
      <Flex width={1} bg={"white"}>
        <Box bg={"White"} p={1 / 2}>
          {/* <ReactHLS
            url={
              "https://dw20n8hp5nokx.cloudfront.net/81215d25-ecc8-414d-aaf4-93c23865bb4e/hls/98461_93_1_68590_1_70_1_19_7_270319_5.m3u8"
            }
          /> */}
          {mivideo()}
        </Box>
      </Flex>
    );
  } catch (e) {
    console.error(e);
  }
};

// -----------------------------------------------------------------------------

// const Player2 = props => {
//   const [Theme] = useContext(StateContext).Theme;
//   const [Playing, setPlaying] = useContext(StateContext).Playing;

//   const fs = require('fs');
//   const m3u8stream = require('m3u8stream')

//   const stream = m3u8stream('https://dw20n8hp5nokx.cloudfront.net/479ebaf1-55fd-472e-802a-e00d4e652fea/hls/98456_88_7_0_1_70_1_19_5_270041_30.m3u8')

//   let mistream = stream.pipe(fs.createWriteStream('videofile.mp4'))

//   try {
//     return (
//       <Flex width={1} bg={"white"}>
//         <Box bg={"White"} p={1 / 2}>
//           <video
//             width="100%"
//             height="100%"
//             controls
//             poster={props.poster + "?format=jpg&name=900x900"}
//           >
//             {" "}
//             <source src={mistream} type="application/x-mpegurl" />
//           </video>
//         </Box>

//       </Flex>
//     );
//   } catch (e) {
//     console.error(e);
//   }
// };

export default (App = props => {
  return (
    <StateProvider>
      <Flex>
        <Box>
          {/* <Logger {...props} /> */}
          <Player2 {...props} />
          {/* <Player2 {...props} /> */}
        </Box>
      </Flex>
    </StateProvider>
  );
});

// -------------------------------------------------------------------------------
