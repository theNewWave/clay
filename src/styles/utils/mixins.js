import { css } from 'styled-components'
import { rgba } from 'polished'

export const breakpointStyle = (breakpoint, content) => css`
  @media ${breakpoint.value && `(min-width: ${breakpoint.value}px)`} {
    ${content};
  }
`
