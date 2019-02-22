import React from "react";
import ReactDOM from "react-dom";

import Reloj from "./reloj.jsx";

import Dash1 from "../client2/dash1";
import DashMain from "../client2/dashmain1";
//import Movs from "../eai_ui/movimientos.jsx";
//import Player from "../client2/smxplayerlive1.jsx";

//import Preguntas from "../client2/livepreguntas.jsx";
//import Mensajes from "../client2/livemensajes.jsx";

//import MensajesAir from "../client2/livemensajesair.jsx";

//import SusMensajes from "../client2/susmensajes.jsx";
import Sususuarios from "../client2/sususuarios.jsx";
import Sussubs from "../client2/sussubs.jsx";

import Eventomz from "../client2/eventomzdetalle";

import Iterator1 from "../client2/smxiterator1.jsx";

import Eventodash1 from "../client2/crm1_eventodash1.jsx";

const rootElement = document.getElementById("root");

let torender = 13;

//let usr = 1309103235803674; //paco

let usr = 1658827024129843; //paco

//let page = 1387817898201761;

let page = 1670865973219070;

let id = 1;
let opt = 2;

if (torender === 1) {
  ReactDOM.render(
    <DashMain usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 2) {
  ReactDOM.render(<Reloj usr={usr} opt={opt} />, rootElement);
}

if (torender === 3) {
  ReactDOM.render(
    <Movs usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 4) {
  ReactDOM.render(
    <Player usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 5) {
  ReactDOM.render(
    <Preguntas usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 6) {
  ReactDOM.render(
    <Mensajes usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 7) {
  ReactDOM.render(
    <MensajesAir usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 8) {
  ReactDOM.render(
    <SusMensajes usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 9) {
  ReactDOM.render(
    <Sususuarios usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 10) {
  ReactDOM.render(
    <Sussubs usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 11) {
  ReactDOM.render(
    <Eventomz usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 12) {
  ReactDOM.render(
    <Iterator1 usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender === 13) {
  ReactDOM.render(
    <Eventodash1 usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}
