import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { data, columns } from './data';

const DefaultTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Table caption="Default Table">
        <TableHeader>
          <TableRow>
            {columns.map(c => (
              <TableCell key={c.property} scope="col" align={c.align}>
                <Text>{c.label}</Text>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(datum => (
            <TableRow key={datum.id}>
              {columns.map(c => (
                <TableCell key={c.property} scope={c.dataScope} align={c.align}>
                  <Text>{c.format ? c.format(datum) : datum[c.property]}</Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {columns.map(c => (
              <TableCell key={c.property} align={c.align}>
                <Text>{c.footer}</Text>
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  </Grommet>
);

storiesOf('Table', module).add('Default', () => <DefaultTable />);
