import styled from 'styled-components'

export const Row = styled.div`
  margin-left: ${props => (props.gutter ? `-${props.gutter}px` : '-15px')};
  margin-right: ${props => (props.gutter ? `-${props.gutter}px` : '-15px')};
  font-size: 0;
`
