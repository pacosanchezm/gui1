
import React from "react";
import { Text } from "rebass";

const Titulo = props => (
  <Text
    fontFamily="Arial, Helvetica, sans-serif"
    fontSize={[4]}
    fontWeight="bold"
    p={20}
    color={props.color || "white"}
    {...props}
  />
);

export default Titulo
