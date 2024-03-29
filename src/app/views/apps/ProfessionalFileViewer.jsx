import React, { Component } from "react";
import {
  Icon,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Card,
  Typography,
  Fab,
  Grid,
  CircularProgress
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { parseJSON } from "date-fns";
import { withRouter } from "react-router-dom";
import axios from "axios.js"
import localStorageService from "../../services/localStorageService"
import { SimpleCard, Breadcrumb } from "matx"

let user = localStorageService.getItem("auth_user")

class ProfessionalViewer extends Component {
  state = {
    fileList: [],
    filename: "",
    dragClass: "",
    files: [],
  };

  componentDidMount() {
    let state = user.applications.findIndex (application => application.id === this.props.location.state.application_id);
    let blobs = user.applications[state].blobs.findIndex (blobs => blobs.id === this.props.location.state.id)
      this.setState({ ...user.applications[state].blobs[blobs] });
    }
  
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
      files: [...list]
    });
  };

  handleSingleRemove = index => {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: [...files]
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      result: event.target.value
    })
  }

  downloadFile = () => {
    let file = this.state.files[0];
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
    let user = localStorageService.getItem("auth_user")
    const appid = this.state.application_id
    const tags = this.state.tag
    const mime_type = this.state.mime_type
    const filetype = mime_type.match(/[^\/]+$/)[0]
    const key = this.props.location.id + "/" + appid + "/" + tags + "." + filetype
    
    if (filetype === "json") {
      const appid = this.state.application_id
      const tags = this.state.tag
      const key = this.props.location.id + "/" + appid + "/" + tags + "." + "pdf"

      axios.get("sign-s3-get/", { params: { bucket: "portldump", key: key }}, auth)
      .then(result => { 
      const win = window.open(`${result.data}`);
      win.focus();
    })
  }
    else {
    axios.get("sign-s3-get/", { params: { bucket: "portldump", key: key }}, auth)
    .then(result => { 
    const win = window.open(`${result.data}`);
    win.focus();
    })
  }
  }

  uploadSingleFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[0];
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
    const user = localStorageService.getItem("auth_user")
    const appid = this.state.application_id
    const tags = this.state.tag
    const mime_type = this.state.mime_type
    const filetype = mime_type.match(/[^\/]+$/)[0]
    const key = this.props.location.id + "/" + appid + "/" + tags + "." + filetype

    allFiles[index] = { ...file, uploading: true, error: false, success: false };

    this.setState({
      files: [...allFiles]
    });
    axios.get("sign-s3-post/", { params: { key: key, mime_type: mime_type }}, auth)
    .then(result => { 
    const formData = new FormData();
    formData.append("AWSAccessKeyId", result.data.data.fields.AWSAccessKeyId);
    formData.append("key", result.data.data.fields.key);
    formData.append("policy", result.data.data.fields.policy);
    formData.append("signature", result.data.data.fields.signature);
    formData.append("Content-Type", file.file.type);
    formData.append("file", file.file);

    const data = {
      filename: file.file.name, 
      tag: tags,
      bucket: "portldump",
      application_id: appid,
      mime_type: mime_type, 
      url: result.data.url
    }

    return fetch(result.data.data.url, {
      method: 'post',
      body: formData,
    })
    .then((response) => {
      return axios.put("blobs/" + this.props.location.state.id, data, auth)
      .then((response) => {
        let state = user.applications.findIndex (application => application.id === this.props.location.state.application_id);
        let blobs = user.applications[state].blobs.findIndex (blobs => blobs.id === this.props.location.state.id)
        user.applications[state].blobs[blobs] = response.data
        localStorageService.setItem("auth_user", user)
        alert('File update successful!')
        this.forceUpdate()
        this.setState({
          files: [allFiles[index] = { ...file, uploading: false, error: false, success: true }]
        });
        return response;
      });
    })
    .catch(error => {
      alert('Error; please try again later')
      this.setState({
        files: [allFiles[index] = { ...file, uploading: false, error: true, success: false }]
      });
   });
  })
}

  render() {
    let {
      files,
      isEmpty
    } = this.state;
    console.log(this.props.location.id)
    let user = localStorageService.getItem("auth_user")
    let state = user.applications.findIndex (application => application.id === this.props.location.state.application_id);
    let blobs = user.applications[state].blobs.findIndex (blobs => blobs.id === this.props.location.state.id)

    return (
      <div className="upload-form m-sm-30">
        <SimpleCard>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: `File` }]} />
        </div>
        <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
            <IconButton onClick={() => this.props.history.goBack()}>
              <Icon>arrow_back</Icon>
            </IconButton>
        </div>
        <div className="m-sm-30 justify-between flex items-center">
          <Typography variant="h6">
            File Information
          </Typography>
              <Button
                size="medium" variant="contained" color="primary"
                onClick={() => this.downloadFile()}
              >
              Download
             </Button>
          </div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="pl-sm-24">Name</TableCell>
                  <TableCell className="px-0">Uploaded</TableCell>
                  <TableCell className="px-0">Updated</TableCell>
                  <TableCell className="px-0">Document</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    <TableRow key={user.applications[state].blobs[blobs].filename}>
                      <TableCell className="pl-sm-24 capitalize" align="left">
                        {user.applications[state].blobs[blobs].filename}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {new Date(user.applications[state].blobs[blobs].uploaded_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {new Date(user.applications[state].blobs[blobs].updated_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {user.applications[state].blobs[blobs].tag}
                      </TableCell>
                    </TableRow>
              </TableBody>
            </Table>
          
          <div className="upload-form m-sm-30">
        <div>
          <Typography variant="h6">
            Change File
          </Typography>
          <br/>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
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
                <Grid item lg={3} md={3}>Type</Grid>
                <Grid item lg={3} md={3}>Document</Grid>
                <Grid item lg={1} md={1}>Status</Grid>
                <Grid item lg={1} md={1}> Actions </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-4">No files yet!</p>}

            {files.map((item, index) => {
              let { file, uploading, error, success } = item;
              let { type, tag } = this.state
              return (
            <div className="px-4 py-4" key={file.name}>
              <Grid container spacing={2} direction="row">
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {file.name}
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  {type}
                </Grid>
                <Grid item lg={3} md={3} sm={12} x={12}>
                  {tag}
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                  {error && <Icon color="error">error</Icon>}
                  {success && <Icon className="text-green">done</Icon>}
                  {uploading && <CircularProgress size={24} />}
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                  <div>
                    <Button
                      size="small" variant="contained" color="primary"
                      onClick={() => this.uploadSingleFile(index)}
                    >
                      Upload
                     </Button>
                  </div>
                </Grid>
               </Grid>
            </div>
              );
            })}
            </ValidatorForm>
            </div>
            
      </div>
      </SimpleCard>
        </div>
    );
  }
}

export default withRouter(ProfessionalViewer);
