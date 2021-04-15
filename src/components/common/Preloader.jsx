import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const Preloader = () => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '5rem 0'}}>
      <CircularProgress/>
    </div>
  )
}