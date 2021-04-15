import MuiAlert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
import React from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const FetchError = (props) => {
  return (
    <Alert severity="error" style={{width: '100%', margin: '2rem 1rem'}}>
      <AlertTitle>{props.name}</AlertTitle>
      {props.message}
    </Alert>
  )
}