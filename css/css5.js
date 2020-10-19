import React from "react";

import styled from "styled-components";
import { themeGet } from "styled-system";

import sys from "@rebass/components";

import { Button, Text, Link, Image, Card } from "rebass";
import { Flex, Box } from "@rebass/grid";
//import "@babel/polyfill";

//-----------------------------------------------------------

exports.Flex = props => <Flex {...props} />;


exports.Box = props => <Box {...props} />;

exports.Button = props => <Button {...props} />;

exports.Text = props => <Text {...props} />;

exports.Link = props => <Link {...props} />;

exports.Image = props => <Image {...props} />;

exports.Card = props => <Card {...props} />;

//----------------------------------------------------------

exports.Container = props => (
  <Box
    {...props}
    mx="auto"
    css={{
      width: "100%"
    }}
  />
);

exports.Titulo = props => (
  <Text
    fontFamily="Arial, Helvetica, sans-serif"
    fontSize={[4]}
    fontWeight="bold"
    p={20}
    color={props.color || "white"}
    {...props}
  />
);

//---------------------------------------------------------------

exports.Checkbox = sys(
  {
    is: "input",
    type: "checkbox",
    m: 0,
    mr: 2
  },
  "space",
  "color"
);

exports.Divider = sys(
  {
    is: "hr",
    mx: 0,
    my: 3,
    border: 2,
    borderBottom: 1,
    borderColor: "gray"
  },
  "borders",
  "borderColor",
  "space",
  "color"
);

exports.Input = sys(
  {
    is: "input",
    type: "text",
    fontSize: "inherit",
    lineHeight: "inherit",
    px: 1,
    py: 2,
    m: 0,
    width: 1,
    border: 1,
    borderColor: "gray",
    boxShadow: 1,
    borderRadius: 2,
    color: "inherit",
    bg: "transparent"
  },
  "fontSize",
  "lineHeight",
  "width",
  "borders",
  "borderColor",
  "boxShadow",
  "borderRadius",
  "space",
  "color",
  props => ({
    fontFamily: "inherit",
    display: "inline-block",
    verticalAlign: "middle",
    border: 1,
    appearance: "none",
    "&:focus": {
      outline: "1",
      boxShadow: `inset 0 0 0 1px ${themeGet("colors.blue")(props)}`
    },
    "&:disabled": {
      opacity: 1 / 4
    }
  })
);

exports.Label = sys(
  {
    is: "label",
    fontSize: 1,
    mb: 1,
    alignItems: "center"
  },
  {
    display: "flex"
  },
  "alignItems",
  "fontSize",
  "space",
  "color"
);

exports.Progress = sys(
  {
    is: "progress",
    width: 1,
    m: 0,
    px: 0,
    color: "green",
    bg: "blue",
    borderRadius: 2
  },
  "width",
  "borderRadius",
  "space",
  "color",
  props => ({
    boxSizing: "border-box",
    display: "block",
    height: "4px",
    overflow: "hidden",
    appearance: "none",
    "&::-webkit-progress-bar": {
      backgroundColor: themeGet("colors.gray")(props)
    },
    "&::-webkit-progress-value": {
      backgroundColor: "currentcolor"
    },
    "&::-moz-progress-bar": {
      backgroundColor: "currentcolor"
    }
  })
);

exports.Slider = sys(
  {
    is: "input",
    type: "range",
    width: 1,
    mx: 0,
    my: 2,
    color: "inherit",
    bg: "gray",
    borderRadius: 99999
  },
  "width",
  "space",
  "color",
  "borderRadius",
  props => ({
    display: "block",
    height: "4px",
    cursor: "pointer",
    appearance: "none",
    "&::-webkit-slider-thumb": {
      width: "16px",
      height: "16px",
      backgroundColor: "currentcolor",
      border: 0,
      borderRadius: "99999px",
      appearance: "none"
    }
  })
);

exports.Switch = sys(
  {
    role: "checkbox",
    color: "gray",
    borderRadius: "99999px"
  },
  "space",
  "color",
  "borderRadius",
  props => ({
    display: "inline-flex",
    width: "40px",
    height: "24px",
    backgroundColor: props.checked
      ? "lightgreen" //themeGet('colors.' + props.color)(props)
      : "White", //'transparent'
    boxShadow: "inset 0 0 0 2px",
    transitionProperty: "background-color",
    transitionDuration: ".3s",
    transitionTimingFunction: "ease-out",
    userSelect: "none",
    "&::after": {
      content: '" "',
      width: "16px",
      height: "16px",
      margin: "4px",
      borderRadius: "99999px",
      transitionProperty: "transform, color",
      transitionDuration: ".1s",
      transitionTimingFunction: "ease-out",
      transform: props.checked ? `translateX(16px)` : `translateX(0)`,
      backgroundColor: props.checked
        ? "green" // themeGet('colors.white')(props)
        : "gray" // themeGet('colors.' + props.color)(props)
    }
  })
);

exports.Textarea = sys(
  {
    is: "textarea",
    px: 1,
    py: 2,
    m: 0,
    width: 1,
    fontSize: "inherit",
    color: "inherit",
    bg: "transparent",
    border: 1,
    borderColor: "lightgray",
    boxShadow: 1,
    borderRadius: 2
  },
  props => ({
    fontFamily: "inherit",
    appearance: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "inset 0 0 0 1px" + themeGet("colors.blue")(props)
    },
    "&:disabled": {
      opacity: 1 / 4
    }
  }),
  "space",
  "color",
  "width",
  "fontSize",
  "borders",
  "borderColor",
  "boxShadow",
  "borderRadius"
);
