import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  preview: {
    width: '100%',
    margin: '3rem 0',
    textAlign: 'center',
    '& ul': {
      listStyle: 'none'
    }
  },
}));

export const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.preview}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          NY Times App
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component={'span'} paragraph>
          This app shows:
          <ul>
            <li> 1. Most viewed articles in 24 hours (New York Times)</li>
            <li> 2. Most shared articles on Facebook in 24 hours (New York Times)</li>
          </ul>
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          To switch the type of displayed news, click on the buttons above.
        </Typography>
      </Container>
    </div>
  )
}