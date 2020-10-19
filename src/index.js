import React from "react";
import ReactDOM from "react-dom";




//import Reloj from "./reloj.jsx";

// import Dash1 from "../client2/dash1";
// import DashMain from "../client2/dashmain1";
//import Movs from "../eai_ui/movimientos.jsx";
//import Player from "../client2/smxplayerlive1.jsx";

//import Preguntas from "../client2/livepreguntas.jsx";
//import Mensajes from "../client2/livemensajes.jsx";

//import MensajesAir from "../client2/livemensajesair.jsx";

//import SusMensajes from "../client2/susmensajes.jsx";
//import Sususuarios from "../client2/sususuarios.jsx";
//import Sussubs from "../client2/sussubs.jsx";
//import Eventomz from "../client2/eventomzdetalle";
//import Iterator1 from "../client2/smxiterator1.jsx";
//import Eventodash1 from "../client2/crm1_eventodash1.jsx";

//import Hooks1 from "../client2/hooks1.jsx";

//import Usedataapi from "../client2/usedataapi.jsx";




// import Ciudades from "../client2/crm1_ciudades.jsx";

// import Maildash1 from "../client2/crm1_maildash1.jsx";
// import Maildash1 from "../client2/crm1_maildash1.jsx";

// import UsrAccDia from "../client2/crm1_usr_acc_dia.jsx";

// import UsrAccMes from "../client2/crm1_usr_acc_mes";

// import UsrInfo1 from "../client2/crm1_usr_info1";

// import UsrGral from "../client2/crm1_usr_gral";

// import UsrInd1 from "../client2/crm1_usr_ind1";

// import Vx1 from "../client2/vx1";

// import Video2 from "../client2/videosmx2";

// import SusMensajes3 from "../client2/susmensajes3.jsx";

// import SusVideo1 from "../client2/susvideo1";

// import Stripe1ch from "../client2/stripe1ch";


// import Stripe2ch from "../client2/stripe2ch";

// import Stripe1ch3 from "../client2/stripe1ch3";

//  import Position from "../client2/positiondemo";

// import Movs2wab from "../client2/movs2wab";

// import Indexmovs from "../client2/indexmovs";

// import Rechart1 from "../client2/rechart1";

// import Rechart5 from "../client2/rechart5";

// import Indexmovschart1 from "../client2/indexmovschart1";

// import Theme from "../css/cssui/theme";

// import IndexPagos from "../client2/pagos1i";




// import Pagosch from "../client2/pagos1ch";
// import Pagosch2 from "../client2/pagos1ch2";





// import Moodi from "../tracking/ui/moodi";

// import Dash1i from "../tracking/ui/dash1i";


// import Check from "../eai_ui/cs1check"



//--- 41
// import IndexPagos2 from "../client2/pagos2i";



//--- 39
// import Indexcs1 from "../eai_ui/cs1i";



//--- 44
 import Indexcf1 from "../eai_ui/cf1i";



// import Indexcd1 from "../eai_ui/cd1i";



//--- 47
//  import Indexcq1 from "../eai_ui/cq1i";


//--- 48
// import Loguincq1 from "../eai_ui/cq1login";


//--- 40
// import Indexcs2 from "../eai_ui/cs2i";





// import Indexcs3 from "../eai_ui/cs3i";

// import Loguincs2 from "../eai_ui/cs2logini";


const rootElement = document.getElementById("root");

let page;
let id;



//let usr = 1309103235803674; //paco
// let usr = 1658827024129843; //paco

// page = 1387817898201761; // empresando
// id = 288937;

//page = 146706498705609; //fpv
//id = 290256;

// page = 2315779415325834; //mxlib
// id = 290256;

// let opt = 2;
// let atiende = 0;
// let ciudad = 7;

// --------------------------------------------------------------

let torender = 44;

// --------------------------------------------------------------








if (torender === 48) {ReactDOM.render(
  <Loguincq1 id={"F402"}
    opt={2}
    token={34}
  />, rootElement);
}




if (torender === 47) {ReactDOM.render(
  <Indexcq1 id={"3619946"}
    opt={2}
    token={1041}
  />, rootElement);
}



if (torender === 46) {
  ReactDOM.render(<Pagosch2 id={"6179918"} usr={6} token={34} />, rootElement);
}


if (torender === 45) {
  ReactDOM.render(<Indexcd1 id={"empb1"} />, rootElement);
}


if (torender === 44) {
 // ReactDOM.render(<Indexcf1 id={"082820"} token={1}/>, rootElement);
  ReactDOM.render(<Indexcf1 id={"juansolodemo"} token={1}/>, rootElement);

}

if (torender === 43) {
  ReactDOM.render(<Loguincs2 usr={26} token={34} />, rootElement);
}



if (torender === 42) {
  ReactDOM.render(<Indexcs3 id={"6328933"} token={34} />, rootElement);
}








if (torender === 41) {
  ReactDOM.render(
    <IndexPagos2 id={8} usr={26} token={34} />, rootElement
  );
}


if (torender === 40) {
  ReactDOM.render(<Indexcs2 id={"5793158"} token={34} />, rootElement);
}

if (torender === 39) {
  ReactDOM.render(<Indexcs1 id={"1334366"}
  opt={2}
  token={34} />, rootElement);
}




// if (torender === 35) {
//   ReactDOM.render(
//       <IndexPagos id={8} usr={"NQi8ZqW"} token={34} />,
//     rootElement
//   );
// }

// if (torender === 36) {
//   ReactDOM.render(<Pagosch id={"6179918"} usr={6} token={34} />, rootElement);
// }

// if (torender === 37) {
//   ReactDOM.render(
//     <Moodi id={"3579491"} usr={"NQi8ZqW"} token={1} />,
//     rootElement
//   );
// }

// if (torender === 38) {
//   ReactDOM.render(<Dash1i id={"1"} usr={"N"} token={1} />, rootElement);
// }

// if (torender === 1) {
//   ReactDOM.render(
//     <DashMain usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 2) {
//   ReactDOM.render(<Reloj usr={usr} opt={opt} />, rootElement)
// }

// if (torender === 3) {
//   ReactDOM.render(<Movs usr={usr} page={page} id={id} opt={opt} />, rootElement)
// }

// if (torender === 4) {
//   ReactDOM.render(
//     <Player usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 5) {
//   ReactDOM.render(
//     <Preguntas usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 6) {
//   ReactDOM.render(
//     <Mensajes usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 7) {
//   ReactDOM.render(
//     <MensajesAir usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 8) {
//   ReactDOM.render(
//     <SusMensajes usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 9) {
//   ReactDOM.render(
//     <Sususuarios usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 10) {
//   ReactDOM.render(
//     <Sussubs usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 11) {
//   ReactDOM.render(
//     <Eventomz usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 12) {
//   ReactDOM.render(
//     <Iterator1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 13) {
//   ReactDOM.render(
//     <Eventodash1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 14) {
//   ReactDOM.render(
//     <Hooks1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 15) {
//   ReactDOM.render(
//     <Usedataapi usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   )
// }

// if (torender === 16) {
//   ReactDOM.render(
//     <Ciudades usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   );
// }

// if (torender === 17) {
//   ReactDOM.render(
//     <Maildash1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   );
// }

// if (torender === 18) {
//   ReactDOM.render(
//     <UsrAccDia
//       usr={usr}
//       page={page}
//       id={id}
//       opt={opt}
//       page={1964012340493592}
//     />,
//     rootElement
//   );
// }

// if (torender === 19) {
//   ReactDOM.render(
//     <UsrInfo1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   );
// }

// if (torender === 20) {
//   switch (atiende) {
//     case 4:
//       atiende = "Sofia";
//       break;
//     default:
//       atiende = "Todos";
//   }

//   switch (ciudad) {
//     case 7:
//       ciudad = "Ciudad Juárez";
//       break;
//     default:
//       ciudad = "Todos";
//   }

//   ReactDOM.render(
//     <UsrGral
//       usr={usr}
//       page={page}
//       id={id}
//       opt={opt}
//       atiende={atiende}
//       ciudad={ciudad}
//     />,
//     rootElement
//   );
// }

// if (torender === 21) {
//   switch (atiende) {
//     case 4:
//       atiende = "Sofia";
//       break;
//     default:
//       atiende = "Todos";
//   }

//   switch (ciudad) {
//     case 7:
//       ciudad = "Ciudad Juárez";
//       break;
//     default:
//       ciudad = "Todos";
//   }

//   ReactDOM.render(
//     <UsrInd1
//       usr={usr}
//       page={page}
//       id={id}
//       opt={opt}
//       atiende={atiende}
//       ciudad={ciudad}
//     />,
//     rootElement
//   );
// }

// if (torender === 22) {
//   ReactDOM.render(<Vx1 usr={usr} page={page} id={id} opt={opt} />, rootElement);
// }

// if (torender === 23) {
//   ReactDOM.render(
//     <UsrAccMes
//       usr={usr}
//       page={page}
//       id={id}
//       opt={opt}
//       page={1964012340493592}
//     />,
//     rootElement
//   );
// }

// if (torender === 24) {
//   ReactDOM.render(
//     <Video2
//       id={334557}
//       feed={3}
//       url={
//         "https://s3.amazonaws.com/lmxwebsite/videosmintomin/98261_42_1_123318.mp4"
//       }
//       hls={
//         "https://dw20n8hp5nokx.cloudfront.net/479ebaf1-55fd-472e-802a-e00d4e652fea/hls/98456_88_7_0_1_70_1_19_5_270041_30.m3u8"
//       }
//       poster={"https://smxai.net/somosfutbol/pqYfdjfFi-N0cnZC.jpeg"}
//     />,
//     rootElement
//   );
// }

// if (torender === 25) {
//   ReactDOM.render(
//     <SusMensajes3 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   );
// }

// if (torender === 26) {
//   ReactDOM.render(
//     <SusVideo1 usr={usr} page={page} id={id} opt={opt} />,
//     rootElement
//   );
// }

// if (torender === 27) {
//   ReactDOM.render(
//     <Stripe2ch id={786} cart={6788} token={896} op={1} />,
//     rootElement
//   );
// }

// if (torender === 28) {
//   ReactDOM.render(
//     <Stripe1ch3 id={786} cart={6788} token={896} op={1} />,
//     rootElement
//   );
// }

// if (torender === 29) {
//   ReactDOM.render(<Position />, rootElement);
// }

// if (torender === 30) {
//   ReactDOM.render(<Movs2wab id={8} usr={"NQi8ZqW"} token={34} />, rootElement);
// }

// if (torender === 31) {
//   ReactDOM.render(<Indexmovs id={8} usr={"NQi8ZqW"} token={34} />, rootElement);
// }

// if (torender === 32) {
//   ReactDOM.render(<Rechart1 id={8} usr={"NQi8ZqW"} token={34} />, rootElement);
// }

// if (torender === 33) {
//   ReactDOM.render(
//     <Indexmovschart1 id={8} usr={"NQi8ZqW"} token={34} />,
//     rootElement
//   );
// }

// if (torender === 34) {
//   ReactDOM.render(
//     <Rechart5
//       id={8}
//       usr={"NQi8ZqW"}
//       token={34}
//       Ano={2020}
//       Mes={6}
//       Dia={14}
//       Hora={18}
//       Sucursal={null}
//       Theme={Theme}
//     />,
//     rootElement
//   );
// }
