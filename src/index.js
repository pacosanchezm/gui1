import React from "react";
import ReactDOM from "react-dom";

import Reloj from "./reloj.jsx";

import Dash1 from "../client2/dash1";

const rootElement = document.getElementById("root");

let torender = 1;

let usr = 5666;
let page = 1387817898201761;
let id = 188912;
let opt = 2;

if (torender == 1) {
  ReactDOM.render(
    <Dash1 usr={usr} page={page} id={id} opt={opt} />,
    rootElement
  );
}

if (torender == 2) {
  ReactDOM.render(<Kwmap7 usr={usr} opt={opt} />, rootElement);
}

//test1
//test2
//test3
//test5
//test6
//test7
