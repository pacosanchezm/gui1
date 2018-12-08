import { css } from 'glamor';
import glamorous, { ThemeProvider } from 'glamorous';

import React, { Component } from 'react';
import { render } from 'react-dom';

require ("babel-polyfill");


import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'


// ------------------------------------------------------------------------------



exports.field1 = (props) => {


  const MiBox = glamorous.div({
    width: props.width || props.Box.width,
    padding: props.boxpadding || props.Box.padding,
    borderRadius: props.boxborderradius || props.Box.borderradius,
    flex: props.flex || props.Box.flex,
    margin: props.margin || props.Box.margin,
    textAlign: props.textalign || props.Box.textalign,
  })

  const Mih1 = glamorous.h3({
    fontFamily: "Arial",
    fontSize: props.size || props.Texto.size,
    lineHeight: props.lineheight || props.Texto.lineheight,
    color: props.color || props.Texto.color,
    fontWeight: props.weight || props.Texto.weight,
    fontStyle: props.style || props.Texto.style,

  })

  return (

    <MiBox>

      <Mih1>
        {props.text}
      </Mih1>

    </MiBox>

  )

}













exports.input1 = (props) => {


  const MiBox = glamorous.div({
    width: props.width || props.Box.width,
    padding: props.boxpadding || props.Box.padding,
    borderRadius: props.boxborderradius || props.Box.borderradius,
    flex: props.flex || props.Box.flex,
    margin: props.margin || props.Box.margin,
    textAlign: props.textalign || props.Box.textalign,
  })

  const Miinput = glamorous.input({
    fontFamily: "Arial",
    fontSize: props.size || props.Texto.size,
    lineHeight: props.lineheight || props.Texto.lineheight,
    color: props.color || props.Texto.color,
    fontWeight: props.weight || props.Texto.weight,
    fontStyle: props.style || props.Texto.style,
    // value: props.value,
    // onChange: props.onChange,
    key: "i3",
  })

  return (

    <MiBox>

      <Miinput
        value={props.value}
        onChange={props.onChange}
        key="i2"
        >

      </Miinput>

    </MiBox>

  )

}






















exports.input1a = (props) => {


  const MiBox = glamorous.div({
    width: props.width || props.Box.width,
    padding: props.boxpadding || props.Box.padding,
    borderRadius: props.boxborderradius || props.Box.borderradius,
    flex: props.flex || props.Box.flex,
    margin: props.margin || props.Box.margin,
    textAlign: props.textalign || props.Box.textalign,
  })

  const Miinput = glamorous.input({
    fontFamily: "Arial",
    fontSize: props.size || props.Texto.size,
    lineHeight: props.lineheight || props.Texto.lineheight,
    color: props.color || props.Texto.color,
    fontWeight: props.weight || props.Texto.weight,
    fontStyle: props.style || props.Texto.style,
    // value: props.value,
    // onChange: props.onChange,
    key: "i3",
  })


  const Micomp = (

    <MiBox>

      <Miinput
        value={props.value}
        onChange={props.onChange}
        key="i2"
        >

      </Miinput>

    </MiBox>



  )









  return Micomp

}




















exports.input2 = (props) => {



  const MiBox = glamorous.div({
      width: '',
      padding: '10px 0',
      borderradius: '',
      flex: '3',
      margin: '0 8px 0 21px',
      textalign: 'left',
  })





  const Miinput = glamorous.input({
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: 1,
    fontWeight: "Normal",
    fontStyle: "Normal",
    // value: props.value,
    // onChange: props.onChange,
  })


  const Micomp = (


    <MiBox>


      <Miinput>

      </Miinput>


    </MiBox>




  )









  return Miinput

}


























































exports.BotonTexto1 = (props) => {

  const MiBoton = glamorous.div({
    border: 'none',
    cursor: 'pointer',
    display: 'inline-block',

  })

  const Box1 = glamorous.div({
    display: 'flex',
    margin: '0 0 0 0',

  })


  let PropsMih1 = {
    Texto: props.Texto,
    Box: props.Box,
    text: props.text,
    width: props.width,

    size: props.size,
    color: props.color,
    weight: props.weight,
    style: props.style,

  }


  const Mih1 = exports.field1(PropsMih1)


  return (

    <Box1>

      <MiBoton
        onClick={props.onClick}
        >

        {Mih1}

      </MiBoton>

    </Box1>

  )

}







exports.a1 = (props) => {

  const MiBox = glamorous.div({
    width: props.width || props.Box.width,
    padding: props.boxpadding || props.Box.padding,
    borderRadius: props.boxborderradius || props.Box.borderradius,
  })

  const Mia = glamorous.a({

    fontSize: props.size || props.Texto.size,

  })

  return (


    <MiBox>

      <Mia href= {props.url} target={props.target}>

        {props.text}

      </Mia>

    </MiBox>


  )

}

















exports.h3 = glamorous.h3(({ theme }) => ({
  lineHeight: theme.text.lineheight,
  fontFamily: "Arial",
  color: theme.text.color,
  fontSize: theme.text.size,
  textAlign: theme.text.textalign,
  weight: theme.text.weight,
  style: theme.text.style,

}));








exports.input3 = glamorous.input(({ theme }) => ({
    color: theme.input.color,
    fontSize: theme.input.size,
  }));




exports.box3label = glamorous.div(({ theme }) => ({
    flex: theme.boxlabel.flex,
    width: theme.boxlabel.width,
    margin: theme.boxlabel.margin,
    padding: theme.boxlabel.padding,
    textAlign: theme.boxlabel.textalign,
    borderRadius: theme.boxlabel.borderradius,
  }));




exports.box3input = glamorous.div(({ theme }) => (
  {
    flex: theme.boxinput.flex,
    margin: theme.boxinput.margin,
    padding: theme.boxinput.padding,
  }));



exports.botont3 = glamorous.div(({ theme }) => (
  {
    border: theme.botontexto.border,
    cursor: theme.botontexto.cursor,
    display: theme.botontexto.display,
  }));







exports.a3 = glamorous.a(({ theme }) => (
  {
    fontSize: theme.link.size,

  }));




exports.foto1 = glamorous.img(({ theme }) => (
  {
  	 width: 400,
     // height: height,
  }));



exports.foto2 = glamorous.img(({ theme }) => (
  {
  	 width: 150,
     // opacity: 0.5,
     // height: height,
  }));





exports.grid1 = glamorous.div(({ theme }) => (
  {

  display: 'grid',

  }));



// .wrapper {
//   display: grid;
//   grid-template-columns: 100px 100px 100px;
//   grid-gap: 10px;
//   background-color: #fff;
//   color: #444;
// }
