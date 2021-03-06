import sys from '@rebass/components'
import { themeGet } from "styled-system";

 const Progress = sys(
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

 Progress.displayName = 'Progress'

export default Progress
