import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import axios from "axios";
import localStorageService from "../../services/localStorageService";
import { SimpleCard } from 'matx';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export const QueDing = ({ formData, prevStep, nextStep, currentApp }) => {
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
    let user = localStorageService.getItem("auth_user")
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
    //axios.get("https://portl-dev.herokuapp.com/api/v1/users/me/", auth)
    axios.post("https://portl-dev.herokuapp.com/api/v1/forms/trv/" + currentApp, formData, auth)
      .then(result => { 
      //console.log(currentApp)
      return axios.post("https://portl-dev.herokuapp.com/api/v1/blobs/", result.data, auth)
      .then((response) => {
        user.client_profile.applications.push(response.data)
        localStorageService.setItem("auth_user", user)
        return response;
      });
    })

  event.preventDefault();
}
  return (
    <>
      <div className="upload-form m-sm-30">
      <SimpleCard>
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
        </SimpleCard>
      </div>
    </>
  );
};

QueDing.propTypes = {
  formData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};
