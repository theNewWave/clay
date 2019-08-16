import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0px;
  margin-right: 0px;
  @media (min-width: 480px) {
    margin-left: ${props => (props.gutter ? `-${props.gutter}px` : '-15px')};
    margin-right: ${props => (props.gutter ? `-${props.gutter}px` : '-15px')};
  }
  background: yellow;
`
