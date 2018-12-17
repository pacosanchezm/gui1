import React from "react";
import ReactDOM from "react-dom";

import Reloj from "./reloj.jsx";
 
//import Dash1 from "../client2/dash1";
//import DashMain from "../client2/dashmain1";
//import Movs from "../eai_ui/movimientos.jsx";
import Player from "../client2/smxplayerlive1.jsx";

const rootElement = document.getElementById("root");

let torender = 4;
 
//let usr = 1309103235803674; //paco

let usr = 1918065804955896; //paco

//let page = 1387817898201761;

let page = 1670865973219070;

let id = 188912;
let opt = 2;

if (torender == 1) {
  ReactDOM.render(
    <DashMain usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender == 2) {
  ReactDOM.render(<Reloj usr={usr} opt={opt} />, rootElement);
}

if (torender == 3) {
  ReactDOM.render(
    <Movs usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender == 4) {
  ReactDOM.render(
    <Player usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}
