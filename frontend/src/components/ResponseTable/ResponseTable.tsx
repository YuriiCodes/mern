import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function createData(
  id: string,
  url: string,
  title: string,
  description: string,
  h1: string,
  h2: string,
  createdAt: string,
  updatedAt: string,
  links: string[],
) {
  return {
    id,
    url,
    title,
    description,
    h1,
    h2,
    createdAt,
    updatedAt,
    links,
  };
}

// const rows = [
//   // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData("635baf62ffd2b53f58901da7", "https://keepshoppers.com/",
//     "KeepShoppers - Build your Shopify business.", "KeepShoppers is a supportive community that provides the resources, knowledge, and the answers you need to succeed in eCommerce.",
//     "Succeed With Shopify", "Find the information you need", "2022-10-28T10:30:58.321Z",
//   "2022-10-28T10:30:58.321Z", ["https://keepshoppers.com/category/dropshipping", "https://keepshoppers.com/forum"]
// )
// ];

interface ResponseTableProps {
  withDate: boolean;
  rows: any[];
}
export function ResponseTable(props: ResponseTableProps) {
  console.log({props});
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Url</TableCell>
            <TableCell align="right">Url</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">H1</TableCell>
            <TableCell align="right">H2</TableCell>
            {props.withDate &&
              <>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Updated at</TableCell>
              </>
            }

            <TableCell align="right">Links</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">
                {row.url}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.h1}</TableCell>
              <TableCell align="right">{row.h2}</TableCell>
              {props.withDate &&
                <>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">{row.updatedAt}</TableCell>
                </>
              }
              {/*// @ts-ignore*/}
              <TableCell align="right">{props.rows.links.map(link => {
                return (
                  <ul key={link}>
                    <li>{link}</li>
                  </ul>
                )
              })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
