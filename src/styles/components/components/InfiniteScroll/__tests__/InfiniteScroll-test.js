import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { InfiniteScroll } from '..';

describe('InfiniteScroll', () => {
  const items = [];
  while (items.length < 4) items.push(items.length);

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <InfiniteScroll />
        <InfiniteScroll items={items}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('step', () => {
    const component = renderer.create(
      <Grommet>
        <InfiniteScroll items={items} step={2}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('show', () => {
    const component = renderer.create(
      <Grommet>
        <InfiniteScroll items={items} step={2} show={3}>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renderMarker', () => {
    const component = renderer.create(
      <Grommet>
        <InfiniteScroll
          items={items}
          step={2}
          renderMarker={m => <div>{m}</div>}
        >
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('replace', () => {
    const component = renderer.create(
      <Grommet>
        <InfiniteScroll items={items} step={2} replace>
          {(item, index) => <div key={index}>{item}</div>}
        </InfiniteScroll>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
