import styled from 'styled-components'

export const Col = styled.div`
  width: ${props => (props.col ? `calc(${props.col} / 12 * 100%)` : '100%')};
  padding-left: ${props => (props.gutter ? `${props.gutter}px` : '15px')};
  padding-right: ${props => (props.gutter ? `${props.gutter}px` : '15px')};
  background: green;
`
