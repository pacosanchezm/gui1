import sys from '@rebass/components'
import { themeGet, border } from "styled-system";

 const Input = sys(
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
    borderColor: "green",
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
    fontFamily: "Arial",
    display: "inline-block",
    verticalAlign: "middle",
    border: 1,
    borderColor: 'white',
    appearance: "none",
    "&:focus": {
      outline: "1",
      boxShadow: `inset 0 0 0 1px ${themeGet("colors.blue")(props)}`
    },
    "&:disabled": {
      opacity: 1 / 4
    },




  })
);

 Input.displayName = 'Input'

export default Input
