

import React from "react";

import { Flex, Box } from '@rebass/grid'



export const Container = props =>
  <Box
    {...props}
    mx='auto'
    css={{
      maxWidth: '987px'
    }}
  />

// Checkbox.displayName = 'Checkbox'

export default Container
