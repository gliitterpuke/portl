import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Tester3 extends Component {

    render() {
        const {
            values: {PersonalDetails_ServiceIn_ServiceIn, PersonalDetails_VisaType_VisaType, PersonalDetails_Name_GivenName, PersonalDetails_Name_FamilyName,  }
          } = this.props;
          const handleSubmit = (e) => {
            alert(JSON.stringify(this.props, null, 2));
            }
        return (
        <div>
            <List>
              <ListItem>
                <ListItemText primary="Last Name" secondary={PersonalDetails_Name_FamilyName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="First Name" secondary={PersonalDetails_Name_GivenName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="First Name" secondary={PersonalDetails_ServiceIn_ServiceIn} />
              </ListItem>
            </List>
            <br />
        <Button color="secondary" variant="contained" onClick={this.back}>Back</Button>
        <Button color="default" variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
    );
  }
}

export default Tester3;
