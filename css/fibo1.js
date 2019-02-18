import { css } from "glamor";
import glamorous, { ThemeProvider } from "glamorous";

import React, { Component } from "react";
import { render } from "react-dom";

import "@babel/polyfill";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

let ColorBasico = "grey";
export const HoverBasico = "DarkRed";
let ColorComplemento = "#1a1a1a";
let HoverComplemento = "#DA233C";

const spinLogoAnimation = css.keyframes({
  "0%": { transform: `rotate(0deg)` },
  "100%": { transform: `rotate(360deg)` }
});

export const MyApp = glamorous.div({
  textAlign: "center"
});

export const Logo = glamorous.img({
  animation: `${spinLogoAnimation} infinite 20s linear`,
  height: 80
});

export const Header = glamorous.div({
  backgroundColor: "#222",
  height: 150,
  padding: 20,
  color: "white"
});

export const Intro = glamorous.p({
  fontSize: "large"
});

export const ContenedorGralAuto = glamorous.div({
  width: "auto",
  marginLeft: "5%",
  marginRight: "5%",
  float: "left"
  // textalign: right,
});

export const HiperBigText = glamorous.h3({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 23,
  fontstyle: "Bold",
  lineHeight: 1,
  color: ColorComplemento
});

export const SuperBigText = glamorous.h3({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 18,
  fontstyle: "Bold",
  lineHeight: 1,
  color: ColorComplemento
});

export const BigText = glamorous.h3({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 15,
  fontstyle: "Bold",
  lineHeight: 1,
  color: ColorComplemento
});

export const MediumText = glamorous.h4({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 14,
  fontstyle: "Normal",
  lineHeight: 1,
  color: ColorComplemento
});

export const SmallText = glamorous.h5({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 13,
  fontstyle: "Normal",
  lineHeight: 1,
  color: ColorComplemento
});

export const VerySmallText = glamorous.h5({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 11,
  fontstyle: "Normal",
  lineHeight: 1,
  color: ColorComplemento
});

export const BigLink = glamorous(Link)({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 15,
  fontstyle: "Bold",
  lineHeight: 1,
  color: ColorBasico,

  ":hover": { color: HoverBasico }
});

export const MediumLink = glamorous(Link)({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 14,
  lineHeight: 1,
  color: ColorComplemento,

  ":hover": { color: HoverBasico }
});

export const SmallLink = glamorous(Link)({
  textDecoration: "none",
  fontFamily: "Arial",
  fontSize: 13,
  lineHeight: "50%",
  color: ColorBasico,

  ":hover": { color: HoverBasico }
});

export const Margen1 = glamorous.div({
  height: 13,
  clear: "both"
});

export const SmallLinea = glamorous.li({
  lineHeight: "120%"
});

export const theme = {
  main: { color: "red" }
};

export const secondaryTheme = {
  main: { color: "blue" }
};

// a themed <Title> component
export const Title = glamorous.h1(({ theme }) => ({
  color: theme.main.color
}));

// use <ThemeProvider> to pass theme down the tree
export const Basic = ({ theme }) => (
  <ThemeProvider theme={theme}>
    <Title>Hello Basic!</Title>
  </ThemeProvider>
);

// ------------------------------------------------------------------ Grids

export const MyGrid = glamorous.div({
  margin: "auto",
  backgroundColor: "GhostWhite",
  color: "#444",
  // You can use @supports with glamor!
  // So you can use @supports with glamorous as well!
  "@supports (display: grid)": {
    display: "grid",
    gridGap: 10,
    gridTemplateAreas: `
      "header header header"
      "content content content"
      "footer  footer  footer"
      "Boton1  Boton2  Boton3"
    `
  }
});

export const MyGridRow = glamorous.div({
  margin: "auto",
  backgroundColor: "#fff",
  color: "#444",
  "@supports (display: grid)": {
    display: "grid",
    gridGap: 10,
    gridTemplateAreas: `
      "cont1  cont2  cont3  cont4  cont5"
      "footer  footer  footer  footer  footer"
    `
  }
});

export const Row = glamorous.div({
  backgroundColor: "#F5F5F5",
  color: "#fff",
  // borderRadius: 5,
  // padding: 2,
  fontSize: "100%"
});

export const Box = glamorous.div({
  //backgroundColor: 'White',
  //color: 'Gray',
  // borderRadius: 5,
  // padding: 2,
});

export const HeaderFooter = glamorous(Box)({
  backgroundColor: "#fff"
});

export const MyFlex = glamorous.div({
  margin: "auto",
  // border: '5px solid #ffcc5c',
  backgroundColor: "#fff",
  display: "flex"
  // justifyContent: 'space-evenly',
});

export const MyGridRouter1 = glamorous.div({
  margin: "auto",
  backgroundColor: "White",
  // color: '#444',
  "@supports (display: grid)": {
    display: "grid",
    // justifyContent: 'start',
    // alignItems: 'start',
    gridTemplateColumns: "auto",
    //gridGap: 1,
    gridTemplateAreas: `
      "barrainfo"
      "header"
      "contenido"
      "footer"
    `
  }
});

export const MyGridRouter2 = glamorous.div({
  margin: "auto",
  backgroundColor: "White",
  // color: '#444',
  "@supports (display: grid)": {
    display: "grid",
    // justifyContent: 'start',
    // alignItems: 'start',
    gridTemplateColumns: "auto",
    //gridGap: 1,
    gridTemplateAreas: `
      "header"
      "contenido"
    `
  }
});

export const MyGridRouter2a = glamorous.div({
  margin: "auto",
  backgroundColor: "White",
  // color: '#444',
  "@supports (display: grid)": {
    display: "grid",
    // justifyContent: 'start',
    // alignItems: 'start',
    gridTemplateColumns: "auto",
    //gridGap: 1,
    gridTemplateAreas: `
      "header"
      "contenido"
      "footer"
    `
  }
});

export const MyGridRows = glamorous.div({
  margin: "auto",
  backgroundColor: "#fff",
  "@supports (display: grid)": {
    display: "grid",
    //gridGap: 5,
    gridTemplateAreas: `
      "header"
      "contenido"
      "footer"
    `
  }
});

export const MyFlex1 = glamorous.div({
  display: "flex",
  // flexWrap: 'wrap',
  // justifyContent: 'flex-start',
  // alignItems: 'flex-start',
  // alignContent: 'flex-start',

  margin: "0",
  //border: '1px solid #ffcc5c',
  backgroundColor: "White"
});

export const MyFlex2 = glamorous.div({
  display: "flex",
  // flexWrap: 'wrap',
  // justifyContent: 'flex-start',
  // alignItems: 'flex-start',
  // alignContent: 'flex-start',
  flexDirection: "column",

  // margin: 'auto',
  //border: '1px solid #ffcc5c',
  backgroundColor: "White"
});

export const MyFlex3 = glamorous.div({
  display: "flex",
  // flexWrap: 'wrap',
  // justifyContent: 'flex-start',
  // alignItems: 'flex-start',
  // alignContent: 'flex-start',
  // flexDirection: 'column',

  margin: "0 16px 0 0",
  //border: '1px solid #ffcc5c',
  // backgroundColor: 'White',
  padding: "10px 0"
});

export const MyFlexR1 = glamorous.div({
  display: "flex",
  // flexWrap: 'wrap',
  // justifyContent: 'flex-start',
  // alignItems: 'flex-start',
  // alignContent: 'flex-start',

  margin: "0 8px 0 0"
  //border: '1px solid #ffcc5c',
});

export const BoxLabel = glamorous.div({
  flex: "1",
  textAlign: "left",
  margin: "0 8px 0 34px",
  padding: "10px 0"
});

export const BoxField = glamorous.div({
  //backgroundColor: 'White',
  //color: 'Gray',
  // borderRadius: 5,
  // padding: 2,

  flex: "3",
  textAlign: "left",
  margin: "0 8px 0 21px",
  padding: "10px 0"
});

export const MyFlexF1 = glamorous.div({
  display: "flex",
  // justifyContent: 'flex-start',
  // alignContent: 'flex-start',
  flexDirection: "column",
  alignItems: "center",
  padding: 10,

  // margin: 'auto',
  //border: '1px solid #ffcc5c',
  backgroundColor: "White"
});

// ------------------------------------------------------------------
// ------------------------------------------------------------------ Modelo

exports.h1 = ({ text, size, color, weight, style }) => {
  let Misize = 12;
  let Micolor = "SlateGrey";
  let Miweight = "Normal";
  let Mistyle = "Normal";

  if (size) {
    Misize = size;
  }
  if (color) {
    Micolor = color;
  }
  if (weight) {
    Miweight = weight;
  }
  if (style) {
    Mistyle = style;
  }

  const Mih1 = glamorous.h3({
    textDecoration: "none",
    fontFamily: "Arial",
    fontSize: Misize,
    lineHeight: 1,
    color: Micolor,
    fontWeight: Miweight,
    fontStyle: Mistyle
  });

  return <Mih1>{text}</Mih1>;
};

exports.Box1 = glamorous.div({
  backgroundColor: "White",
  borderRadius: 5,
  padding: 10,
  fontSize: "100%"
});

exports.Box2 = glamorous.div(({ color, gridarea }) => ({
  backgroundColor: color,
  borderRadius: 5,
  padding: 10,
  fontSize: "150%",
  gridArea: gridarea
}));

exports.Boton1 = glamorous.button(({ color }) => ({
  backgroundColor: color,
  fontSize: 11,
  margin: 5,
  border: "none",
  cursor: "pointer",
  display: "inline-block",
  padding: "5px 10px",
  textAlign: "center",
  transition: "0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)",
  borderRadius: 4,
  color: "#fff",
  boxShadow: "0 2px 3px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
  ":hover": {
    opacity: 0.7,
    transform: "translateY(-1px)",
    boxShadow: "0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)"
  },
  ":focus": { outline: 0 },
  ":active": {
    transform: "translateY(1px)"
  }
}));

exports.Boton2 = glamorous.button(() => ({
  border: "none",
  cursor: "pointer",
  display: "inline-block"
  //padding: '5px 10px',
  //textAlign: 'center',
  //transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
  //borderRadius: 4,
  //color: '#fff',
  //boxShadow: '0 2px 3px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08),'
  // ':hover': {
  //     opacity: 0.7,
  //     transform: 'translateY(-1px)',
  //     //boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
  // },
  // ':focus': { outline: 0 },
  // ':active': {
  //     transform: 'translateY(1px)'
  // }
}));

exports.Icon1 = glamorous.img(({ color }) => ({
  margin: 0,
  border: "none",
  //cursor: 'pointer',
  //display: 'inline-block',
  padding: "1px 1px",
  //textAlign: 'center',
  // transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
  borderRadius: 1
  //color: '#fff',
  // boxShadow: '0 2px 3px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
  // ':hover': {
  //     opacity: 0.7,
  //     transform: 'translateY(-1px)',
  //     boxShadow: '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
  // },
  // ':focus': { outline: 0 },
  // ':active': {
  //     transform: 'translateY(1px)'
  // }
}));

exports.foto1 = ({ url, width, style }) => {
  const Mifoto1 = glamorous.img({
    width: width
  });

  return <Mifoto1 src={url} />;
};

exports.foto2 = ({ url, width, style, height }) => {
  const Mifoto1 = glamorous.img({
    width: width,
    height: height
  });

  return <Mifoto1 src={url} />;
};

exports.a1 = ({ url, text, style, target }) => {
  const MiA = glamorous.a({});

  return (
    <MiA href={url} target={target}>
      {text}
    </MiA>
  );
};

exports.i1 = () => {
  const Mii1 = glamorous.input();

  return <Mii1 type="text" />;
};
