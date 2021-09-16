import { WorkSheet, WorkBook } from 'xlsx';
import { s } from '@angular/core/src/render3';

// These functions are defined here:
// https://github.com/Microsoft/TypeScript/blob/master/lib/lib.webworker.d.ts
// Easiest way to be able to use the Web workers API on our TypeScript files is to declare
// the specific API functions we want to use according to:
// https://github.com/Microsoft/TypeScript/issues/20595#issuecomment-351030256
declare function importScripts(...urls: string[]): void;
declare function postMessage(message: any): void;

// Declare the library object so the script can be compiled without any problem
declare const XLSX: any;

export const EXCEL_JSON = (input) => {
  // Allocate required libraries
  // Since the host may change, we'll request it from the caller
  importScripts(`${input.protocol}//${input.host}/scripts/xlsx.full.min.js`);

  // Process the body data
  const data = input.config.body;
  const customRange =input.config.range

  var range = XLSX.utils.decode_range(data['!ref']);
  range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
  range.e.c = customRange.columnCount - 1; // 6 == XLSX.utils.decode_col("G")
  range.s.r = customRange.headerRowNumber - 1; // 6 == XLSX.utils.decode_row("G")
  var new_range = XLSX.utils.encode_range(range);


  const workdata = XLSX.utils.sheet_to_json(data, {
    raw: true,
    range: new_range,
    defval: null,
    blankrows: true
  });
  // const workdata = XLSX.utils.sheet_to_json(data, { header: 1 });

  // Call postMessage with the result data.
  postMessage(workdata);
};

export const EXCEL_HEADERS = (input) => {
  importScripts(`${input.protocol}//${input.host}/scripts/xlsx.full.min.js`);
  const worksheet = input.config.body;
  const customRange =input.config.range

  var headers = [];
  var range = XLSX.utils.decode_range(worksheet['!ref']);
  var C = range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
  var EC = range.e.c = customRange.columnCount - 1; // 6 == XLSX.utils.decode_col("G")
  var R = range.s.r = customRange.headerRowNumber - 1; // 6 == XLSX.utils.decode_row("G")
  for (C = range.s.c; C <= EC; ++C) {
    var cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

    var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

    headers.push(hdr);
  }
  postMessage(headers);
}

