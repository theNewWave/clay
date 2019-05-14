import styled from 'styled-components'

export const Row = styled.div`
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '960px')};
  margin-right: auto;
  margin-left: auto;
  padding-left: ${props => (props.padding ? `${props.padding}px` : '15px')};
  padding-right: ${props => (props.padding ? `${props.padding}px` : '15px')};
`
