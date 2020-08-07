import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';  
import Typography from '@material-ui/core/Typography';
import Countries from './Countries';
import Marital from './Marital';
import Languages from './Languages';
import Visit from './Visit';
import ID from './ID';
import Personal from './Personal';
import Contact from './Contact';
import Education from './Education';
import Employment from './Employment';
import Background from './Background';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Countries />;
    case 2:
      return <Marital />;
    case 3:
      return <Languages />;
    case 4:
      return <ID />;
    case 5:
      return <Contact />;
    case 6:
      return <Visit />;
    case 7:
      return <Education />;
    case 8:
      return <Employment />;
    case 9:
      return <Background />;
    default:
      throw new Error('Unknown step');
  }
}

export default function ProgressMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Visitor Visa Application
          </Typography>
          <br></br>
          <React.Fragment>
          <MobileStepper
            variant="progress"
            steps={10}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
                Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
          <br></br>
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
          </React.Fragment>
          
        </Paper>
      </main>
    </React.Fragment>
  );
  
}