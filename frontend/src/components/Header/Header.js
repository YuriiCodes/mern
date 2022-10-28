import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Link as ReactRouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuLogo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3),
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    borderColor: 'white',
    '&:hover': {
      color: 'gray',
      textDecoration: 'none',
      borderColor: 'gray',
    }
  },

}));
export function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Container fixed>
        <Typography variant="h6" noWrap>
          <Box fontWeight="fontWeightBold" m={1}>
            <span className={classes.menuLogo}>
              <Typography variant="h6" className={classes.link} component={ReactRouterLink} to="/">
              Mini Crawler
            </Typography></span>
            <Button variant="outlined" className={classes.link} component={ReactRouterLink} to="/history">
              History
            </Button>
          </Box>

        </Typography>


      </Container>
    </AppBar>
  );
}

