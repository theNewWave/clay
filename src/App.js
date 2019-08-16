import React from 'react'
import Sanitize from './styles/components/Sanitize'
import { Container } from './styles/components/Container'
import { Row } from './styles/components/Row'
import { Col } from './styles/components/Column'

const App = () => {
  return (
    <>
      <Sanitize />
      <div className="App">
        <header className="App-header">
          <p>
            Edit
            <code>src/App.js</code>
            and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Container maxWidth={1024}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magni
          delectus eveniet sapiente necessitatibus accusantium eum maxime
          commodi veritatis quidem eligendi, recusandae voluptatem doloremque
          molestias dignissimos architecto saepe libero repellat?
          <Row>
            <Col col={4}>aaaaaaaaaa</Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default App
