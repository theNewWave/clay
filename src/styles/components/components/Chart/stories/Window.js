import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart, RangeSelector, Stack, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { calcs } from '../calcs';
import { generateData } from './data';

// compress data for outer control chart
const compressData = (data, max, count) => {
  const result = [];
  const bucketSize = Math.round(data.length / count);
  let bucket = [];
  let bucketMin = max;
  let bucketMax = 0;
  let date = 0;
  data.forEach(d => {
    if (bucket.length >= bucketSize) {
      result.push({ value: [date, bucketMin, bucketMax] });
      bucket = [];
      bucketMin = 100;
      bucketMax = 0;
      date = 0;
    }
    date = Math.max(date, d.time);
    bucketMin = Math.min(bucketMin, d.value);
    bucketMax = Math.max(bucketMax, d.value);
    bucket.push(d);
  });
  if (bucket.length) {
    result.push({ value: [date, bucketMin, bucketMax] });
  }
  return result;
};

class WindowChart extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, max } = nextProps;
    let outerValues;
    let outerAxis;
    let outerBounds;
    if (!prevState.outerValues) {
      outerValues = compressData(data, max, 101);
      ({ axis: outerAxis, bounds: outerBounds } = calcs(outerValues, {
        min: 0,
        max,
      }));
    } else {
      ({ outerAxis, outerBounds, outerValues } = prevState);
    }
    const range = prevState.range || [
      data.length / 2,
      data.length / 2 + data.length * 0.05,
    ];
    const innerValues = data
      .slice(range[0], range[1])
      .map(d => ({ value: [d.time, d.value] }));
    const { axis: innerAxis, bounds: innerBounds, thickness } = calcs(
      innerValues,
      {
        min: 0,
        max,
      },
    );
    return {
      innerAxis,
      innerBounds,
      innerValues,
      outerAxis,
      outerBounds,
      outerValues,
      range,
      thickness,
    };
  }

  state = {};

  onChange = range => {
    this.setState({ range });
  };

  onHover = value => over => {
    this.setState({ hover: over ? value : undefined });
  };

  render() {
    const { data } = this.props;
    const {
      hover,
      innerAxis,
      innerBounds,
      innerValues,
      outerBounds,
      outerValues,
      range,
      thickness,
    } = this.state;

    return (
      <Grommet theme={grommet}>
        <Box pad="large">
          <Box direction="row" justify="between">
            {innerAxis[0].reverse().map(t => (
              <Text key={t}>{new Date(t).toLocaleDateString()}</Text>
            ))}
          </Box>
          <Stack guidingChild="first" interactiveChild="first">
            <Box pad={{ horizontal: thickness }}>
              <Chart
                type="bar"
                color="accent-2"
                overflow
                bounds={innerBounds}
                values={innerValues.map(v => ({
                  ...v,
                  onHover: this.onHover(v),
                }))}
                thickness={thickness}
                size={{ width: 'full', height: 'small' }}
              />
            </Box>
            <Box fill justify="between">
              <Box border={{ side: 'top' }} align="start">
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{innerAxis[1][0]}</Text>
                </Box>
              </Box>
              <Box
                border={{ side: 'bottom', color: 'accent-2', size: 'medium' }}
                align="start"
              >
                <Box
                  pad="xsmall"
                  background={{ color: 'white', opacity: 'medium' }}
                >
                  <Text>{innerAxis[1][1]}</Text>
                </Box>
              </Box>
            </Box>
            {hover && (
              <Box fill align="center" justify="center">
                <Box
                  animation={{ type: 'fadeIn', duration: 100 }}
                  pad="medium"
                  background={{ color: 'white', opacity: 'strong' }}
                  border={{ color: 'accent-2' }}
                  round
                >
                  <Text size="large" weight="bold">
                    {hover.value[1]}
                  </Text>
                  <Text>{new Date(hover.value[0]).toLocaleDateString()}</Text>
                </Box>
              </Box>
            )}
          </Stack>
          <Stack>
            <Chart
              type="line"
              bounds={outerBounds}
              values={outerValues}
              size={{ width: 'full', height: 'xxsmall' }}
              thickness="xxsmall"
            />
            <RangeSelector
              min={0}
              max={data.length}
              size="full"
              values={range}
              onChange={this.onChange}
              color="accent-2"
              style={{ userSelect: 'none' }}
            />
          </Stack>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Chart', module).add('Window', () => (
  <WindowChart data={generateData(1000, 100)} max={100} />
));
