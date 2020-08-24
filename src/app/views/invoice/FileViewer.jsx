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
  Select,
  MenuItem,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import { getAllInvoice, deleteFile, getInvoiceById } from "./AppActions";
import { format } from "date-fns";
import { withRouter } from "react-router-dom";
import axios from "axios"
import localStorageService from "../../services/localStorageService"
import { SimpleCard, ConfirmationDialog } from "matx";

class FileViewer extends Component {
  state = {
    fileList: [],
    filename: "",
    dragClass: "",
    files: [],
  };
  subTotalCost = 0;

  componentDidMount() {
    getInvoiceById(this.props.match.params.id).then(res => {
      this.setState({ ...res.data });
    });
    }
  
   handleFileSelect = event => {
    let files = event.target.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
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

  uploadSingleFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[0];
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")} 
    }
    const user = localStorageService.getItem("auth_user")
    const appid = user.applications_as_client[0].id
    const tags = this.state.result
    const filetype = file.file.type.match(/[^\/]+$/)[0]
    const key = user.id + "/" + appid + "/" + tags + "." + filetype

    allFiles[index] = { ...file, uploading: true, error: false };

    this.setState({
      files: [...allFiles]
    });
    axios.get("https://portl-dev.herokuapp.com/api/v1/sign_s3_post/", { params: { key: key, mime_type: file.file.type }}, auth)
    .then(result => { 
    console.log(result)
    const formData = new FormData();
    formData.append("AWSAccessKeyId", result.data.data.fields.AWSAccessKeyId);
    formData.append("key", result.data.data.fields.key);
    formData.append("policy", result.data.data.fields.policy);
    formData.append("signature", result.data.data.fields.signature);
    formData.append("Content-Type", file.file.type);
    formData.append("file", this.state.files[0]);

    const data = {
      filename: file.file.name, 
      tag: tags,
      bucket: "portldump",
      application_id: appid,
      mime_type: file.file.type, 
      url: result.data.url
    }

    return axios.post(result.data.data.url, formData, { headers: { 'Content-Type': 'multipart/form-data'} })
    .then((response) => {
      return axios.post("https://portl-dev.herokuapp.com/api/v1/blobs/", data, auth)
      .then((response) => {
        return response;
      });
    });
  })
}

  render() {
    this.subTotalCost = 0;
    let {
      filename,
      updated_at,
      uploaded_at,
      tag,
      dragClass, 
      files,
      fileList,
      isEmpty
    } = this.state;

    return (
      <div className="invoice-viewer py-4">
        <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
          <Link to="/application">
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
        </div>
        <div className="m-sm-30">
          <Typography variant="h6">
            File Information
          </Typography>
          </div>
          <Card className="mb-4" elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="pl-sm-24">Name</TableCell>
                  <TableCell className="px-0">Uploaded On</TableCell>
                  <TableCell className="px-0">Updated On</TableCell>
                  <TableCell className="px-0">Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    <TableRow key={filename}>
                      <TableCell className="pl-sm-24 capitalize" align="left">
                        {filename}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {uploaded_at}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {updated_at}
                      </TableCell>
                      <TableCell className="pl-0 capitalize" align="left">
                        {tag}
                      </TableCell>
                    </TableRow>
              </TableBody>
            </Table>
          </Card>
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
              let { file, uploading, error, } = item;
              return (
            <div className="px-4 py-4" key={file.name}>
              <Grid container spacing={2} direction="row">
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {file.name}
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  {file.type}
                </Grid>
                <Grid item lg={3} md={3} sm={12} x={12}>
                  <Select fullWidth onClick={this.handleSelectChange} required="true">
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
                  </Select>
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12}>
                  {error && <Icon color="error">error</Icon>}
                  {uploading && <Icon className="text-green">done</Icon>}
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
        </div>
    );
  }
}

export default withRouter(FileViewer);
