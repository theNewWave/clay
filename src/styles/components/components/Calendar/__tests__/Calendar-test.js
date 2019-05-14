import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { Box, Button, Calendar, Grommet, Text } from '../..';

const DATE = '2018-01-15T00:00:00-08:00';
const DATES = [
  '2018-01-12T00:00:00-08:00',
  ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00'],
];

describe('Calendar', () => {
  test('date', () => {
    // need to set the date to avoid snapshot drift over time
    const component = renderer.create(
      <Grommet>
        <Calendar date={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dates', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar dates={DATES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('daysOfWeek', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar daysOfWeek dates={DATES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar size="small" date={DATE} />
        <Calendar size="medium" date={DATE} />
        <Calendar size="large" date={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('firstDayOfWeek', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar firstDayOfWeek={0} date={DATE} />
        <Calendar firstDayOfWeek={1} date={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('reference', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar reference={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar
          date={DATE}
          onSelect={() => {}}
          size="small"
          bounds={['2018-09-08', '2018-12-13']}
          header={({
            date,
            locale,
            onPreviousMonth,
            onNextMonth,
            previousInBound,
            nextInBound,
          }) => (
            <Box direction="row" align="center" justify="between">
              <Button onClick={previousInBound && onPreviousMonth}>
                <Box>
                  <FormPreviousLink />
                </Box>
              </Button>
              <Text size="small">
                <strong>
                  {date.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </strong>
              </Text>
              <Button onClick={nextInBound && onNextMonth}>
                <Box>
                  <FormNextLink />
                </Box>
              </Button>
            </Box>
          )}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
