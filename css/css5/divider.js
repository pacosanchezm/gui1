import sys from '@rebass/components'

 const Divider = sys(
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

 Divider.displayName = 'Divider'

export default Divider
