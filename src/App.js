import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TopNews from './components/TopNews';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import MostSharedArticles from "./components/MostSharedArticles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: '2%', // 16:9
  },
}));

export default function App(props) {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline/>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.mainContainer} maxWidth="md">
          <Link to={`/mostviewed`}>To most viewed</Link>
          <Link to={`/mostshared`}>To most shared</Link>
          <Switch>
            <Route exact path={`/`} render={() => 'test'}/>
            <Route path={`/mostviewed`} render={() => <TopNews/>}/>
            <Route path={`/mostshared`} render={() => <MostSharedArticles/>}/>
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  )
}
