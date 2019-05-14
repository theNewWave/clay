import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

class IPv4MaskedInput extends Component {
  state = { value: '' };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <MaskedInput
              mask={[
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
                { fixed: '.' },
                {
                  length: [1, 3],
                  regexp: IPv4ElementExp,
                  placeholder: 'xxx',
                },
              ]}
              value={value}
              onChange={this.onChange}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('MaskedInput', module).add('IPv4 Address', () => <IPv4MaskedInput />);
