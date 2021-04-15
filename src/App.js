import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MostViewedArticles} from './components/MostViewedArticles';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {MostSharedArticles} from "./components/MostSharedArticles";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Home} from "./components/Home";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: '2%', // 16:9
  },
  grid: {
    paddingTop: '25px',
  },
  logotype: {
    color: 'inherit',
    textDecoration: 'none'
  },
  linksHolder: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline/>
      <AppBar position="relative">
        <Container maxWidth="lg">
          <Toolbar disableGutters={true}>
            <Typography variant="h6" color="inherit" noWrap>
              <Link className={classes.logotype} to={`/`}>NY Times App</Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Container className={classes.mainContainer} maxWidth="lg">
          <div className={classes.linksHolder}>
            <Button style={{marginRight: '1rem'}} variant="contained" color="primary" to={`/mostviewed`} component={Link}>To most viewed</Button>
            <Button variant="contained" color="primary" to={`/mostshared`} component={Link}>To most shared</Button>
          </div>
          <Grid className={classes.grid} container spacing={4}>
            <Switch>
              <Route exact path={`/`} render={() => <Home/>}/>
              <Route path={`/mostviewed`} render={() => <MostViewedArticles/>}/>
              <Route path={`/mostshared`} render={() => <MostSharedArticles/>}/>
            </Switch>
          </Grid>
        </Container>
      </main>
    </BrowserRouter>
  )
}
