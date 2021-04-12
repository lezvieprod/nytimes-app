import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TopNews from './components/TopNews';
import { getTopNewsThunk } from './redux/rootReducer';
import { connect } from 'react-redux';


function App(props) {

  useEffect(() => {
    props.getTopNewsThunk()
    // getTopViewedArcticles()
  }, []) 

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <TopNews />
      </main>
    </>
  )
}

const mapStateToProps = (state) => ({
  test: state.rootReducer.test
})


export default connect(mapStateToProps, { getTopNewsThunk })(App)
