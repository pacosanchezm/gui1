import React from "react";
import ReactDOM from "react-dom";

import Reloj from "./reloj.jsx";

import Dash1 from "../client2/dash1";
import DashMain from "../client2/dashmain1";
import Movs from "../eai_ui/movimientos.jsx";


const rootElement = document.getElementById("root");

let torender = 2;

let usr = 5666;
let page = 1387817898201761;
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
  ReactDOM.render(<Reloj usr={usr} opt={opt} />, rootElement);
}

