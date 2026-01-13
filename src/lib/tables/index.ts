/**
 * Svelte Garden - Tables Module
 */

import Table from './Table.svelte';
import Caption from './Caption.svelte';
import Head from './Head.svelte';
import Body from './Body.svelte';
import Row from './Row.svelte';
import HeaderCell from './HeaderCell.svelte';
import Cell from './Cell.svelte';
import SortableCell from './SortableCell.svelte';

export {
  Table,
  Caption,
  Head as TableHead,
  Body as TableBody,
  Row as TableRow,
  HeaderCell as TableHeaderCell,
  Cell as TableCell,
  SortableCell as TableSortableCell
};

export type {
  TableProps,
  CaptionProps,
  HeadProps as TableHeadProps,
  BodyProps as TableBodyProps,
  RowProps as TableRowProps,
  HeaderCellProps as TableHeaderCellProps,
  CellProps as TableCellProps,
  TableSize
} from './types';
