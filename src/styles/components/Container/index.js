import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: ${props => (props.maxWidth ? `${props.maxWidth}px` : '960px')};
  margin-right: auto;
  margin-left: auto;
  padding-left: ${props => (props.padding ? `${props.padding}px` : '15px')};
  padding-right: ${props => (props.padding ? `${props.padding}px` : '15px')};
  background: red;
`
