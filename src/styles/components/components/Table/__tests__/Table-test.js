import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import {
  Grommet,
  Table,
  TableHeader,
  TableFooter,
  TableBody,
  TableRow,
  TableCell,
} from '../..';

test('Table renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Table caption renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table caption="Caption" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableHeader renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableHeader />
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableFooter renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableFooter />
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableBody renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableBody />
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableRow renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableBody>
          <TableRow />
        </TableBody>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableCell renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableCell scope renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell scope="row" />
          </TableRow>
        </TableBody>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableCell size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="xsmall" />
            <TableCell size="small" />
            <TableCell size="medium" />
            <TableCell size="large" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/2" />
            <TableCell size="2/4" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/3" />
            <TableCell size="2/3" />
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="1/4" />
            <TableCell size="3/4" />
          </TableRow>
        </TableBody>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableCell verticalAlign renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell verticalAlign="top" />
            <TableCell verticalAlign="middle" />
            <TableCell verticalAlign="bottom" />
          </TableRow>
        </TableHeader>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TableCell plain renders', () => {
  const component = renderer.create(
    <Grommet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell plain />
          </TableRow>
        </TableHeader>
      </Table>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
