import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';



export function createData(
  _id: string,
  url: string,
  title: string,
  description: string,
  h1: string,
  h2: string,
  creationDate: string,
  updateDate: string,
  links: string[],
) {
  return {
    _id,
    url,
    title,
    description,
    h1,
    h2,
    creationDate,
    updateDate,
    links,
  };
}

interface row {
  _id: string;
  url: string;
  title: string;
  description: string;
  h1: string;
  h2: string;
  creationDate: string;
  updateDate: string;
  links: string[];
}

interface ResponseTableProps {
  withDate: boolean;
  data: row[];
}

export function ResponseTable(props: ResponseTableProps) {
  // const rows = [
  //   // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData("635baf62ffd2b53f58901da7", "https://keepshoppers.com/",
  //     "KeepShoppers - Build your Shopify business.", "KeepShoppers is a supportive community that provides the resources, knowledge, and the answers you need to succeed in eCommerce.",
  //     "Succeed With Shopify", "Find the information you need", "2022-10-28T10:30:58.321Z",
  //     "2022-10-28T10:30:58.321Z", ["https://keepshoppers.com/category/dropshipping", "https://keepshoppers.com/forum"]
  //   )
  // ];


  let rows: row[] = [];
  props.data.forEach((item: any) => {
    rows.push(createData(item._id, item.url, item.title, item.description, item.h1, item.h2, item.creationDate, item.updateDate, item.links));
  });
  debugger;
  console.log({rows})

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Url</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">H1</TableCell>
            <TableCell align="right">H2</TableCell>
            <TableCell align="right">Links</TableCell>
            {props.withDate &&
              <>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Updated at</TableCell>
              </>
            }


          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.h1}</TableCell>
              <TableCell align="right">{row.h2}</TableCell>
              <TableCell align="right">
                {/*start*/}
                      <Typography>
                        {row.links.map(link => {
                          return (
                            <Box>
                              <a href={link} target={"_blank"} key={row._id}>{link}</a>
                            </Box>
                          )
                        })}
                      </Typography>
                {/*end*/}
              </TableCell>
              <TableCell align="right">{row.creationDate}</TableCell>
              <TableCell align="right">{row.updateDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
