import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Accordion,
  AccordionPanel,
  Box,
  Grommet,
  Text,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';

const renderPanelHeader = (title, active) => (
  <Box direction="row" align="center" pad="medium" gap="small">
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color="brand">{active ? '-' : '+'}</Text>
  </Box>
);

class CustomHeaderAccordion extends Component {
  state = {
    activeIndex: [0],
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Grommet theme={grommet}>
        <Accordion
          activeIndex={activeIndex}
          onActive={newActiveIndex =>
            this.setState({ activeIndex: newActiveIndex })
          }
        >
          <AccordionPanel
            header={renderPanelHeader('Panel 1', activeIndex.includes(0))}
          >
            <Box pad="medium" background="light-2" style={{ height: '800px' }}>
              <Text>Panel 1 contents</Text>
              <TextInput />
            </Box>
          </AccordionPanel>
          <AccordionPanel
            header={renderPanelHeader('Panel 2', activeIndex.includes(1))}
          >
            <Box pad="medium" background="light-2" style={{ height: '50px' }}>
              <Text>Panel 2 contents</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel
            header={renderPanelHeader('Panel 3', activeIndex.includes(2))}
          >
            <Box pad="medium" background="light-2" style={{ height: '300px' }}>
              <Text>Panel 3 contents</Text>
            </Box>
          </AccordionPanel>
        </Accordion>
      </Grommet>
    );
  }
}

storiesOf('Accordion', module).add('Custom Header', () => (
  <CustomHeaderAccordion />
));
