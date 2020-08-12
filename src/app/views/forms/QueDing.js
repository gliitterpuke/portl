import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export const QueDing = ({ formData, prevStep, nextStep }) => {
  const classes = useStyles();
  const { 
    PersonalDetails_ServiceIn_ServiceIn, 
    PersonalDetails_VisaType_VisaType,
    PersonalDetails_Name_FamilyName, 
    PersonalDetails_Name_GivenName, 
    PersonalDetails_AliasName_AliasNameIndicator_AliasNameIndicator,
    PersonalDetails_AliasName_AliasFamilyName,
    PersonalDetails_AliasName_AliasGivenName,
    PersonalDetails_Sex_Sex,
    PersonalDetails_DOBYear,
    PersonalDetails_DOBMonth,
    PersonalDetails_DOBDay,
    PersonalDetails_PlaceBirthCity,
    PersonalDetails_PlaceBirthCountry,
    PersonalDetails_Citizenship_Citizenship,
 } = formData;
  const handleSubmit = (event) => {
    alert(JSON.stringify(formData));
          fetch('http://localhost:8000/api/v1/forms/trv/4', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then(response => response.json())
        .then(response => {
        
            console.log(response)
        });

  event.preventDefault();
}
  return (
    <>
      <div>
        <Typography variant="h6">Confirmation</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary='First Name'
              secondary={PersonalDetails_Name_GivenName}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary='Last Name'
              secondary={PersonalDetails_Name_FamilyName}
              className={classes.textCenter}
            />
          </ListItem>
        </List>
        <div className={classes.textCenter}>
          <Button
            color='secondary'
            variant='contained'
            className={classes.button}
            onClick={() => prevStep()}
          >
            Back
          </Button>

          <Button
            color='primary'
            variant='contained'
            className={classes.button}
            onClick={() => nextStep()}
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    </>
  );
};

QueDing.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
