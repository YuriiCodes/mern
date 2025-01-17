import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import agent from "../../agent/agent";
import {ResponseTable} from "../ResponseTable/ResponseTable";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const validationSchema = yup.object({
  url: yup
    .string('Enter your url')
    .url('Enter a valid url')
    .required('Url is required'),
  maxDepths: yup
    .number('Enter your maximum depths')
    .min(1, 'maxDepths should be of minimum 1.')
    .max(10, 'maxDepths should be of maximum 10.')
    .required('maxDepths is required'),
  maxPages: yup
    .number('Enter your maximum pages')
    .min(1, 'maxDepths should be of minimum 1.')
    .required('maxPages is required'),
});


const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: '20px',
  }
}));

export const InputUrlForm = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isResultReady, setIsResultReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      url: 'https://keepshoppers.com/',
      maxDepths: 1,
      maxPages: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await agent.Crawler.crawl(values.url, values.maxDepths, values.maxPages);
      setData(d => [...d, ...res]);
      setIsResultReady(true);
      setIsLoading(false);
      console.log(res);
    },
  });

  console.log(data);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="url"
          name="url"
          label="Url of website to parse"
          value={formik.values.url}
          onChange={formik.handleChange}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
        />
        <TextField
          fullWidth
          id="maxDepths"
          name="maxDepths"
          label="Maximum depths"
          type="maxDepths"
          value={formik.values.maxDepths}
          onChange={formik.handleChange}
          error={formik.touched.maxDepths && Boolean(formik.errors.maxDepths)}
          helperText={formik.touched.maxDepths && formik.errors.maxDepths}
        />
        <TextField
          fullWidth
          id="maxPages"
          name="maxPages"
          label="Maximum pages to return"
          type="maxPages"
          value={formik.values.maxPages}
          onChange={formik.handleChange}
          error={formik.touched.maxPages && Boolean(formik.errors.maxPages)}
          helperText={formik.touched.maxPages && formik.errors.maxPages}
        />
        <Button color="primary" className={classes.submitBtn} variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      {isLoading && <CircularProgress/>}
      {isResultReady &&
        <>
          <Typography variant="h4"  sx={{ flexGrow: 1, marginTop: '1em', marginBottom: '1em'}}>Results:</Typography>
          <ResponseTable data={data}  withDate={false}/>
      </>
      }
    </div>
  );
};

