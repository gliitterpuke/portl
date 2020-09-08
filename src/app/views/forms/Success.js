import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleCard } from 'matx';

const useStyles = makeStyles(theme => ({
  textCenter: {
    textAlign: 'center',
    display: 'flex',
    margin: 0,
  }
}));

export const Success = () => {
  const classes = useStyles();
  return (
    <div className={classes.textCenter}>
      <SimpleCard>
      <h3>Thank You For Your Submission</h3>
      <p>Your representative has been notified and will review your application shortly.</p>
      </SimpleCard>
    </div>
  )}