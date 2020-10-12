import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Icon,
  IconButton,
  Fab,
  Grid,
  Typography,
  MenuItem,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress
} from "@material-ui/core";
import localStorageService from "../../services/localStorageService";
import { withRouter, Link } from "react-router-dom";
import axios from "axios.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { parseJSON } from "date-fns";
import { ConfirmationDialog, SimpleCard, Breadcrumb } from "matx";
import { ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles"
import { isMobile } from "utils";
import QRCode from 'react-google-qrcode'

let baseURL = "https://portl-dev.herokuapp.com/api/v1/"
var url = window.location.href
var result = url.split('?')
var token = result[result.length-3]
let user = result[result.length-2]
let app = result[result.length-1]
const auth = {
    headers: {Authorization:`Bearer ${token}`} 
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
    alignSelf: "center"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexShrink: 0,
    alignSelf: "center"
  },
  iconalign: {
    textAlign: "right",
    width: "100%",
  },
  title: {
    '&:nth-child(odd)': { 
      backgroundColor: '#f2f2f2'
    }
  }
});

class HigherOrderComponent extends Component {
  state = {
    fileList: [],
    shouldShowConfirmationDialog: false,
    filename: "",
    dragClass: "",
    files: [],
    statusList: [],
    tags: "",
    status: "",
    blobs: [],
    scan: false
  };
    
  handleFileSelect = event => {
    let files = event.target.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        success: false
      });
    }

    this.setState({
      files: [...list],
      file: URL.createObjectURL(event.target.files[0])
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      result: event.target.value
    })
  }

  scanFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[0]
    const formData = new FormData();
    formData.append("image_file", file.file);

    allFiles[0] = { ...file, uploading: true, error: false, success: false };

    this.setState({
      files: [...allFiles],
    });

    axios.post(baseURL + "scan-image", formData, { params: { b_and_w: false }, responseType: 'blob'}).then ((res) => {
      this.setState({
        preview: URL.createObjectURL(res.data),
        file: res.data
      })
      }).then((response) => {
        alert('File successfully uploaded')
        this.setState({
          files: [allFiles[0] = { ...file, uploading: false, error: false, success: true }],
          scan: true
        });
      }).catch(error => {
        alert('Photo of document must be on a single coloured background')
        this.setState({
          files: [allFiles[0] = { ...file, uploading: false, error: true, success: false }],
          scan: false
        });
     })
  }

  uploadSingleFile = () => {
    let allFiles = [...this.state.files];
    let file = this.state.files[0];
    const tags = this.state.result
    const filetype = file.file.type.match(/[^\/]+$/)[0]
    const key = user + "/" + app + "/" + tags + "." + filetype

    allFiles[0] = { ...file, uploading: true, error: false, success: false };

    if (this.state.scan === true) {
      this.setState({
        files: [...allFiles],
      });
    }

    else if (this.state.scan === false) {
      this.setState({
        files: [...allFiles],
        file: this.state.files[0].file,
      });
    }

    axios.get(baseURL + "sign-s3-post/", { params: { key: key, mime_type: file.file.type }})
    .then(result => { 
    const formData = new FormData();
    formData.append("AWSAccessKeyId", result.data.data.fields.AWSAccessKeyId);
    formData.append("key", result.data.data.fields.key);
    formData.append("policy", result.data.data.fields.policy);
    formData.append("signature", result.data.data.fields.signature);
    formData.append("Content-Type", file.file.type);
    formData.append("file", this.state.file);

    const data = {
      filename: file.file.name, 
      tag: tags,
      bucket: "portldump",
      application_id: app,
      mime_type: file.file.type, 
      url: result.data.url
    }

    return fetch(result.data.data.url, {
      method: 'post',
      body: formData,
    })
    .then((response) => {
      return axios.post(baseURL + "blobs/", data)
      .then((response) => {
        alert('Uploaded successfully, refresh on desktop to see new changes!')
        this.setState({
          files: [allFiles[0] = { ...file, uploading: false, error: false, success: true }]
        });
      });
    })
    .catch(error => {
      alert('Please refresh and try again')
      this.setState({
        files: [allFiles[0] = { ...file, uploading: false, error: true, success: false }]
      });
   })
  })

  };

  render() {
    const { classes } = this.props;
    let { dragClass, files, result, mobile, user } = this.state;
    let isEmpty = files.length === 0;
    
    return (
      <React.Fragment>
      <div className="upload-form m-sm-30">
        <SimpleCard >
        <div>
          <Typography variant="h6">
            New File Upload
          </Typography>
          <br/>
        <ValidatorForm
          ref="form"
          onSubmit={this.uploadSingleFile}
          onError={errors => null}
        >
            <label htmlFor="upload-single-file">
              <Fab className="capitalize" color="primary" component="span" variant="extended"
              >
                <div className="flex items-center">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Single File</span>
                </div>
              </Fab>
            </label>
            
            <input
              className="hidden" onChange={this.handleFileSelect} id="upload-single-file" type="file" accept="image/*, application/pdf"
            />
            <br/><br/>
            <div className="p-4">
              <Grid container spacing={2}>
                <Grid item lg={4} md={4}>Name</Grid>
                <Grid item lg={3} md={3}>Document</Grid>
                <Grid item lg={1} md={1}>Status</Grid>
                <Grid item lg={4} md={4}> Actions </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-4">No files yet!</p>}

            {files.map((item, index) => {
              let { file, uploading, error, success } = item;
              return (
            <div className="px-4 py-4" key={file.name}>
              <Grid container spacing={2} direction="row">
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {file.name}
                </Grid>
                <Grid item lg={3} md={3} sm={12} x={12}>
                  <SelectValidator fullWidth onClick={this.handleSelectChange} name="result" value={result} validators={['required']}>
                    <MenuItem value="passport">Passport</MenuItem>                
                    <MenuItem value="IMM5707">IMM5707</MenuItem>
                    <MenuItem value="IMM5409">IMM5409</MenuItem>
                    <MenuItem value="IMM5476">IMM5476</MenuItem>
                    <MenuItem value="IMM5475">IMM5475</MenuItem>
                    <MenuItem value="photo">Photos</MenuItem>
                    <MenuItem value="financials">Proof of Financial Support</MenuItem>
                    <MenuItem value="marriage">Marriage Documents</MenuItem>
                    <MenuItem value="purpose">Purpose of Travel</MenuItem>
                    <MenuItem value="immstatus">Current Immigration Status</MenuItem>
                    <MenuItem value="custody">Custody Document/Letter of Authorization</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </SelectValidator>
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                  {error && <Icon color="error">error</Icon>}
                  {uploading && <CircularProgress size={24} />}
                  {success && <Icon className="text-green">done</Icon>}
                </Grid>
                <Grid item lg={2} md={1} sm={12} xs={12}>
                  <div>
                    <Button
                      size="small" variant="contained" color="primary"
                      onClick={() => this.scanFile(index)}
                    >
                      Scan
                     </Button>
                  </div>
                </Grid>
                <Grid item lg={2} md={1} sm={12} xs={12}>
                  <div>
                    <Button
                      size="small" variant="contained" color="primary" type="submit"
                    >
                      Upload
                     </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                <img src={this.state.preview} />
                </Grid>
               </Grid>
            </div>
              );
            })}
            </ValidatorForm>
            <br/><br/>
            </div>
          </SimpleCard>
          <br/><br/>
          <Link to={`/session/signin`}>
            <SimpleCard>
            <div className="w-full text-center mb-11">
                <h3 className="m-0 font-medium">
                Login
                </h3>
                <p className="m-0 pt-4 text-muted">
                and view all your applications and files!
                </p>
            </div>
            </SimpleCard>
          </Link>
        <br /><br />
      </div>
      </React.Fragment>
    );
  }
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(HigherOrderComponent));