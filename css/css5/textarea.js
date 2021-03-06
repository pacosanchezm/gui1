import sys from '@rebass/components'
import { themeGet } from "styled-system";

 const Textarea = sys(
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

 Textarea.displayName = 'Textarea'

export default Textarea
