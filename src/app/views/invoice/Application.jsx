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
  Select,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import localStorageService from "../../services/localStorageService";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllFiles, deleteFile, getFileById } from "./AppActions";
import { getApplicationById } from "../material-kit/forms/existing";
import { Link } from "react-router-dom";
import { ConfirmationDialog } from "matx";
import { SimpleCard } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles"

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  heading1: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
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
    blobs: []
  };
  componentDidMount() {
    getApplicationById(this.props.match.params.id).then(res => {
      this.setState({ ...res.data });
    });
    getAllFiles().then(res => this.setState({ fileList: res.data }))
    
    }

  handeViewClick = fileId => {
    let user = localStorageService.getItem("auth_user")
    this.props.history.push({ pathname: `${this.state.id}/file/${fileId}`, state: user.client_profile.applications });
    getFileById(fileId).then(res => console.log(this.state));
  };
  // this.props.location.state.some
  handeDeleteClick = efile => {
    this.setState({ shouldShowConfirmationDialog: true, efile });
  };

  handleConfirmationResponse = () => {
    let { efile } = this.state;
    deleteFile(efile).then(res => {
      this.setState({
        fileList: res.data,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

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

  handleDragOver = event => {
    event.preventDefault();
    this.setState({ dragClass: "drag-shadow" });
  };

  handleDrop = event => {
    event.preventDefault();
    event.persist();

    let files = event.dataTransfer.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
      });
    }

    this.setState({
      dragClass: "",
      files: [...list]
    });

    return false;
  };

  handleDragStart = event => {
    this.setState({ dragClass: "drag-shadow" });
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
    let user = localStorageService.getItem("auth_user")
    const appid = this.state.id
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
    formData.append("file", file.file);

    const data = {
      filename: file.file.name, 
      tag: tags,
      bucket: "portldump",
      application_id: appid,
      mime_type: file.file.type, 
      url: result.data.url
    }

    return axios.post(result.data.data.url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
      console.log(appid)
      return axios.post("https://portl-dev.herokuapp.com/api/v1/blobs/", data, auth)
      .then((response) => {
        this.state.blobs.push(response.data)
        localStorageService.setItem("auth_user", user)
        console.log(user)
        return response;
      });
    });
  })

  };

  render() {
    const { classes } = this.props;
    let { fileList, filename, dragClass, files, type, tag, tags, status, blobs} = this.state;
    let isEmpty = files.length === 0;
    let user = localStorageService.getItem("auth_user")
    return (
      <React.Fragment>
      <div className="upload-form m-sm-30">
        <SimpleCard>
          <Typography variant="h6">
            Fillable Forms
          </Typography>
          <div>
            <br/>
          <Button
            size="medium" variant="contained" color="primary"
            onClick={() => this.props.history.push({ pathname: `/application/${this.state.id}/trv`, state: user.client_profile.applications })}
          >
            TRV
          </Button>
          </div>
        </SimpleCard>
      </div>
      <div className="upload-form m-sm-30">
        <SimpleCard>
          <Typography variant="h6">
            Document Checklist
          </Typography>
          <br/>
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading1}>Forms</Typography>
            </AccordionSummary>
              <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>IMM5257</Typography>
                <Typography className={classes.secondaryHeading}>Application for Temporary Resident Visa</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <a href="/application/trv">The main application form; needs to be validated if completed on a computer</a>
                </Typography>
              </AccordionDetails>
            </Accordion>
              <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>IMM5707</Typography>
                <Typography className={classes.secondaryHeading}>Family Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Must be completed in the application package for your region
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>IMM5409</Typography>
                <Typography className={classes.secondaryHeading}>Statutory Delcaration of Common-law Union</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Refer to the responsible visa office for your region
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>IMM5476</Typography>
                <Typography className={classes.secondaryHeading}>Use of a Representative</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Complete this form only if you used the services of a representative, or if you are appointing/cancelling a representative.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>IMM5475</Typography>
                <Typography className={classes.secondaryHeading}>Authority to Release Personal Information to a Designated Individual (Optional)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Complete this form <b>only if</b> you authorize Citizenship and Immigration Canada (CIC) and the Canada Border Services Agency (CBSA) to release information to a designated individual.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Accordion>
          

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading1}>Documents</Typography>
            </AccordionSummary>
              <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Photocopy</Typography>
                <Typography className={classes.secondaryHeading}>Passport/Travel Document Information Page</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Must include:
                  <ul>
                    <li>passport number</li>
                    <li>issuance/expiry dates</li>
                    <li>photo, name, date and place of birth</li>
                    <li><i>Your passport must have at least one blank page in addition to the last page</i></li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Photo</Typography>
                <Typography className={classes.secondaryHeading}>Visa application photographs (2)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Print your name and date of birth on the back of the two photos which meet the following requirements:
                  <ul>
                    <li>The photographs must be identical and taken within the last six months. They may be either black and white or colour.</li>
                    <li>The photographs must be clear, well defined and taken against a plain white or light-coloured background.</li>
                    <li>If the photographs are digital, they must not be altered in any way.</li>
                    <li>Your face must be square to the camera with a neutral expression, neither frowning nor smiling, and with your mouth closed.</li>
                    <li>You may wear non-tinted prescription glasses as long as your eyes are clearly visible. Make sure that the frame does not cover any part of your eyes. Sunglasses are not acceptable.</li>
                    <li>A hairpiece or other cosmetic accessory is acceptable if it does not disguise your normal appearance.</li>
                    <li>If you must wear a head covering for religious reasons, make sure your full facial features are not obscured.</li>
                  </ul>
                  <b>Note:</b> If you are required to provide your biometrics, you <i>do not need</i> paper photos.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Proof</Typography>
                <Typography className={classes.secondaryHeading}>Financial Support</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  May include:
                  <ul>
                    <li>cash, certified cheque, bank draft or money order in an amount large enough to cover all reasonable expenses to be incurred during the stay in Canada</li>
                    <li>verbal or written statements, which can be confirmed, that satisfy an officer that sufficient financial support from friends and/or family is available and has been arranged to adequately cover all reasonable expenses to be incurred during the stay in Canada.</li>
                    <li>bank statement(s) or deposit book(s) of applicant (and spouse) that show accumulated savings</li>
                    <li>applicant's (and spouse's) letter of employment or employment book, providing name of employer, applicant's position/occupation, date employment commenced and annual earnings</li>
                    <li>host's or family member in Canada (and spouse's) evidence of income: such as previous year Revenue Canada Notice of Assessment indicating annual income; or alternately, letter from employer(s) showing position, date employment commenced and annual earnings</li>
                    <li>evidence of size of family for host or family member in Canada (to equate earnings with size of family to ensure ability to support long-term visit)</li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Photocopy</Typography>
                <Typography className={classes.secondaryHeading}>Marriage License/Certification (if applicable)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Refer to the responsible visa office in your region.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Document</Typography>
                <Typography className={classes.secondaryHeading}>Purpose of Travel</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Refer to the responsible office visa in your region.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Photocopy</Typography>
                <Typography className={classes.secondaryHeading}>Current Immigration Status</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  If your country of residence differs from your citizenship, you must provide proof of legal status in your country of residence.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Document</Typography>
                <Typography className={classes.secondaryHeading}>Custody document/Letter of Authorization (if applicable)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  For minors travelling alone or with one parent; must come from the non-accompanying parent, or a letter of authorization signed by both parents/legal guardians.
                  <br/>Refer to the responsible visa office in your region.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Document</Typography>
                <Typography className={classes.secondaryHeading}>Additional as required by the visa office (if applicable)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Refer to the visa specific instructions in your region.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Accordion>

          <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading1}>Super Visa</Typography>
              </AccordionSummary>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Document</Typography>
                  <Typography className={classes.secondaryHeading}>Letter of Invitation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Must come from your child/grandchild residing in Canada as a permanent resident or citizenship.
                    <br/>Must also include their family compositions (spouse/children/other relatives that are financially dependant on them).
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Document</Typography>
                  <Typography className={classes.secondaryHeading}>Proof of Low Income Cut-Off (LICO) Minimum</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Proof that child/grandchild meets the minimum necessary income. The following are examples of what can be used:
                    <ul>
                      <li>Notice of Assessment (NOA) or T4/T1 for the most recent tax year</li>
                      <li>Employment Insurance stubs</li>
                      <li>employment letter including salary and date of hiring</li>
                      <li>pay stubs</li>
                      <li>bank statements</li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Document</Typography>
                  <Typography className={classes.secondaryHeading}>Proof of relationship</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Evidence of the parent/grandparent relationship to the person you wish to visit (copy of birth certificate, baptismal certificate, or other official documentation naming you as the parent/grandparent).
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Document</Typography>
                  <Typography className={classes.secondaryHeading}>Proof of private medical insurance coverage</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Must be from a <b>Canadian</b> medical insurance company and include:
                    <ul>
                      <li>valid for at least 1 year from the date of entry</li>
                      <li>at least $100,000 coverage</li>
                      <li>have proof that the medical insurance has been paid (quotes aren’t accepted)</li>
                    </ul>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Accordion>
        </SimpleCard>
      </div>
      <div className="upload-form m-sm-30">
        <SimpleCard >
        <div>
          <Typography variant="h6">
            New File Upload
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
            <div
              className={`${dragClass} upload-drop-box mb-6 flex justify-center items-center`}
              onDragEnter={this.handleDragStart}
              onDragOver={this.handleDragOver}
              onDrop={this.handleDrop}
            >
              {isEmpty ? (
                <span>Drop your files here</span>
              ) : (
                <h5 className="m-0">
                  {files.length} file{files.length > 1 ? "s" : ""} selected...
                </h5>
              )}
            </div>
            <br />
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
          </SimpleCard>

        <br /><br />
        <SimpleCard elevation={6} className="w-full">
          <Typography variant="h6">
            Current Files
          </Typography>
          <br/>
          <Table className="min-w-3000">
            <TableHead>
              <TableRow>
                <TableCell className="pl-sm-24">Name</TableCell>
                <TableCell className="px-0">Upload</TableCell>
                <TableCell className="px-0">Update</TableCell>
                <TableCell className="px-0">Application</TableCell>
                <TableCell className="px-0">Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.blobs.map((efile) => (
                <TableRow key={efile.id}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {efile.filename}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {efile.uploaded_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {efile.updated_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {efile.application_id}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {efile.tag}
                  </TableCell>
                  <TableCell className="pl-0">
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => this.handeViewClick(efile.id)}
                    >
                      <Icon>chevron_right</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.handeDeleteClick(efile)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SimpleCard>
        <ConfirmationDialog
          open={this.state.shouldShowConfirmationDialog}
          onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleConfirmationResponse}
          text="Are you sure to delete?"
        />
      </div>
      </React.Fragment>
    );
  }
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(HigherOrderComponent));