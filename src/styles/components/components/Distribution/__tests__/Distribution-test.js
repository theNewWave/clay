import React from 'react';
import 'jest-styled-components';
import { render } from 'react-testing-library';

import { Grommet } from '../../Grommet';
import { Distribution } from '..';

describe('Distribution', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Distribution values={[]} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('values renders', () => {
    const { container } = render(
      <Grommet>
        <Distribution
          values={[{ value: 20 }, { value: 3 }, { value: 2 }, { value: 1 }]}
        >
          {value => <span>{value.value}</span>}
        </Distribution>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap renders', () => {
    const { container } = render(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large'].map(gap => (
          <Distribution
            key={gap}
            gap={gap}
            values={[{ value: 3 }, { value: 2 }, { value: 1 }]}
          >
            {value => <span>{value.value}</span>}
          </Distribution>
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
