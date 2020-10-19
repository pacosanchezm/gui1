import sys from '@rebass/components'

 const Switch = sys(
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

 Switch.displayName = 'Switch'

export default Switch
