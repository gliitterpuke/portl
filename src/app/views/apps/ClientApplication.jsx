import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
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
  CircularProgress,
  Popover
} from "@material-ui/core";
import localStorageService from "../../services/localStorageService";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { parseJSON } from "date-fns";
import { ConfirmationDialog, SimpleCard, Breadcrumb } from "matx";
import { ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import { isMobile } from "utils";
import QRCode from 'react-google-qrcode';
import ReactJoyride, { ACTIONS, EVENTS, LIFECYCLE, STATUS } from "react-joyride";
import bunny from "../others/bunny.png"
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

let user = localStorageService.getItem("auth_user")

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1)
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
  thAlign: {
    textAlign: "left",
  },
  title: {
    '&:nth-child(odd)': {
      backgroundColor: '#f2f2f2'
    }
  },
  max: {
    maxWidth: "300px",
  },
});

class ClientApplication extends Component {
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
    mobile: isMobile(),
    open: false,
    scan: false,
    run: false,
    steps: [
      {
        target: ".fillable",
        content: "Here are all the forms we can help you fill out",
        disableBeacon: true,
      },
      {
        target: ".doc-checklist",
        content: "These are the documents (both required and optional) that you'll need",
      },
      {
        target: ".web-upload",
        content: "Click here to upload your files",
      },
      {
        target: ".tags-info",
        content: "Choose which category your file belongs to",
      },
      {
        target: ".add-ons",
        content: "More moolah",
      },
    ]
  };

  static propTypes = {
    joyride: PropTypes.shape({ callback: PropTypes.func })
  };

  static defaultProps = {
    joyride: {}
  };

  handleClickStart = e => {
    e.preventDefault();
    this.setState({ run: true });
  };

  callback = (data) => {
    const { joyride } = this.props;
    const { type, index, lifecycle, action, step } = data;
    if (type === EVENTS.TOUR_END && this.state.run) {
      this.setState({ run: false });
    }

    if (action === 'next' || 'start' ) {
      document.getElementsByClassName(step.target.replace('.', ''))[0].scrollIntoView({
        block: "center",
      })
    } else {
      console.group(type);
      console.log(data);
      console.groupEnd();
    }
  };

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
     });
    };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
      this.setState({ ...user })
    };

  clickMe = () => {
    let user = localStorageService.getItem('auth_user')
    let state = user.applications.find (application => application.id === this.props.location.state);
    let index = user.applications.findIndex (application => application.id === this.props.location.state);
    this.props.history.push({ pathname: `${this.props.location.state}/addons/`, 
      rep: state.professional_id, app: state.id, appindex: index });
    
  };

  handleViewClick = fileId => {
    let user = localStorageService.getItem('auth_user')
    let secondstate = user.applications.find (application => application.id === this.props.location.state);
    let blobstate = secondstate.blobs.find (blobs => blobs.id === fileId)
    this.props.history.push({ pathname: `${secondstate.id}/file/${fileId}`, state: blobstate });
  };
  handleDeleteClick = efile => {
    this.setState({ shouldShowConfirmationDialog: true, efile });
  };

  handleConfirmationResponse = () => {
    let user = localStorageService.getItem('auth_user')
    let { efile } = this.state;
    let state = user.applications.findIndex (application => application.id === this.props.location.state);
    let blobs = user.applications[state].blobs.findIndex (blobs => blobs.id === efile.id)
    this.setState({
      shouldShowConfirmationDialog: false
    });
    
    axios.delete("blobs/" + efile.id).then(res => {
      if (blobs > -1) {
        user.applications[state].blobs.splice(blobs, 1);
      }
      localStorageService.setItem("auth_user", user)
      this.forceUpdate()

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
        success: false,
        scan: false
      });
    }

    this.setState({
      files: [...list],
      preview: URL.createObjectURL(event.target.files[0])
    });
  };

  handleSingleRemove = index => {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: [...files]
    });
  };

  downloadFile = (fileId) => {
    const auth = {
      headers: {Authorization:"Bearer " + localStorage.getItem("access_token")}
    }
    let user = localStorageService.getItem("auth_user")
    let app = user.applications.find (application => application.id === this.props.location.state);
    let doc = app.blobs.find (blobs => blobs.id === fileId)
    const appid = doc.application_id
    const tags = doc.tag
    const mime_type = doc.mime_type
    const filetype = mime_type.match(/[^\/]+$/)[0]
    const key = user.id + "/" + appid + "/" + tags + "." + filetype

    if (filetype === "json") {
      const key = user.id + "/" + appid + "/" + tags + "." + "pdf"

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

    axios.post("image/scan-image", formData, { params: { b_and_w: false }, responseType: 'blob'}).then ((res) => {
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
    let user = localStorageService.getItem("auth_user")
    let allFiles = [...this.state.files];
    let file = this.state.files[0];
    const appid = this.props.location.state
    const tags = this.state.result
    const filetype = file.file.type.match(/[^\/]+$/)[0]
    const key = user.id + "/" + appid + "/" + tags + "." + filetype

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

    axios.get("sign-s3-post/", { params: { key: key, mime_type: file.file.type }})
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
      application_id: appid,
      mime_type: file.file.type,
      url: result.data.url
    }

    return fetch(result.data.data.url, {
      method: 'post',
      body: formData,
    })
    .then((response) => {
      return axios.post("blobs/", data)
      .then((response) => {
        alert('File successfully uploaded')
        this.setState({
          files: [allFiles[0] = { ...file, uploading: false, error: false, success: true }],
          scan: false
        });
        let state = user.applications.find (application => application.id === this.props.location.state);
          state.blobs.push(response.data)
          localStorageService.setItem("auth_user", user)
          this.forceUpdate()
          return response;
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
    let { dragClass, files, result, mobile, steps, run } = this.state;
    let isEmpty = files.length === 0;
    let user = localStorageService.getItem("auth_user")
    let state = user.applications.find (application => application.id === this.props.location.state);
    let index = user.applications.findIndex (application => application.id === this.props.location.state);
    let isEmptyFiles = state.blobs.length === 0
    let token = localStorage.getItem("access_token")

    return (
      <React.Fragment>
        <ReactJoyride
          continuous scrollToFirstStep showSkipButton run={run} steps={steps}
          styles={{ options: { zIndex: 10000 } }} callback={this.callback}
        />
      <div className="upload-form m-sm-30">
        <SimpleCard elevation={6} className="pricing__card px-20 pt-10 pb-10">
          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: `Application` }]} />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4} md={2} className="hide-on-mobile">
              <img src={bunny} height={150}/>
            </Grid>
            <Grid item xs={8} md={10} className="align-center">
              <h5>Click here to start the tour</h5>
              <Button color="primary" variant="contained" onClick={this.handleClickStart}>Let's Go!</Button>
            </Grid>
          </Grid>
        </SimpleCard>
        <br/>
        <SimpleCard>
          <Typography variant="h6">
            Fillable Forms
          </Typography>
          <div>
            <br/>
          <Link to={{ pathname: `${this.props.location.state}/trv/`, state: state }}>
            <Button
              size="medium" variant="contained" color="primary" className="fillable">
              IMM5257
            </Button>
          </Link>
          </div>
        </SimpleCard>
      </div>
      <div className="upload-form m-sm-30">
        <SimpleCard>
          <Typography variant="h6" className="doc-checklist">
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
                  The main application form; needs to be validated if completed on a computer.
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
          <Grid container spacing={4}>
            <Grid item xs={12} md={10}>
            <Typography variant="h6">
              New File Upload
            </Typography>
            <br/>
            <label htmlFor="upload-single-file">
              <Fab className="capitalize" color="primary" component="span" variant="extended"
              >
                <div className="flex items-center web-upload">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Single File</span>
                </div>
              </Fab>
            </label>
            <input
              className="hidden" onChange={this.handleFileSelect} id="upload-single-file" type="file" accept="image/*, application/pdf"
            />
          </Grid>
          {!mobile && (
            <Grid item md={2} >
              <QRCode
                data={`https://portlfe.herokuapp.com/session/fileupload?${token}?${user.id}?${state.id}`}
                size={115} className="qr-upload"
              />
              <br/>
            <Button size="small" variant="contained" color="primary" onClick={this.handleTouchTap}>What's this?</Button>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onClose={this.handleRequestClose}
              >
                  <Typography className="px-2">Scan this to upload a file via your phone!</Typography>
              </Popover>
            </Grid>
          )}
        </Grid>
          <br/>
        <ValidatorForm
          ref="form"
          onSubmit={this.uploadSingleFile}
          onError={errors => null}
        >
          <Table >
            <Thead>
              <Tr className={classes.thAlign}>
                <Th>Name</Th>
                <Th className="tags-info">Category</Th>
                <Th>Actions</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            {isEmpty && <p className="px-4">No files yet!</p>}
            {files.map((item, index) => {
            let { file, uploading, error, success, scan } = item;
            return (
          <Tbody key={file.name}>
            <Tr>
              <Td className="items-center">{file.name}</Td>
              <Td>
                <SelectValidator fullWidth onClick={this.handleSelectChange} name="result" value={result} validators={['required']}>
                  <MenuItem value="passport">Passport</MenuItem>
                  <MenuItem value="imm5707">IMM5707</MenuItem>
                  <MenuItem value="imm5409">IMM5409</MenuItem>
                  <MenuItem value="imm5476">IMM5476</MenuItem>
                  <MenuItem value="imm5475">IMM5475</MenuItem>
                  <MenuItem value="photo">Photos</MenuItem>
                  <MenuItem value="financials">Proof of Financial Support</MenuItem>
                  <MenuItem value="marriage">Marriage Documents</MenuItem>
                  <MenuItem value="purpose">Purpose of Travel</MenuItem>
                  <MenuItem value="immstatus">Current Immigration Status</MenuItem>
                  <MenuItem value="custody">Custody Document/Letter of Authorization</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </SelectValidator>
              </Td>
              <Td>
                <Button
                  size="small" variant="contained" color="primary" className={classes.button}
                  onClick={() => this.scanFile(index)}
                >
                  Scan
                 </Button>
                <Button
                  size="small" variant="contained" color="primary" type="submit" className={classes.button}
                >
                  Upload
                 </Button>
              </Td>
              <Td>
                {error && <Icon color="error">error</Icon>}
                {uploading && <CircularProgress size={24} />}
                {success && <Icon className="text-green">done</Icon>}
              </Td>
            </Tr>
          </Tbody>
          )})}
        </Table>
        <img src={this.state.preview} className={classes.max} />
        </ValidatorForm>
            </div>
          </SimpleCard>

        <br /><br />
        <SimpleCard elevation={6} className="w-full">
          <Typography variant="h6">
            Current Files
          </Typography>
          <br/>
          {isEmptyFiles && <p className="px-4">No files yet - upload one now!</p>}
          {state.blobs.map((doc) => (
        <Accordion className={classes.title}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading}>{doc.tag}</Typography>
            <Typography className={classes.secondaryHeading}>{doc.filename}</Typography>
              <div className={classes.iconalign}>
                <IconButton color="primary" className="mr-2" onClick={() => this.downloadFile(doc.id)} >
                  <Icon>get_app</Icon>
                </IconButton>
                <IconButton color="primary" className="mr-2" onClick={() => this.handleViewClick(doc.id)} >
                  <Icon>chevron_right</Icon>
                </IconButton>
                <IconButton onClick={() => this.handleDeleteClick(doc)}>
                  <Icon color="error">delete</Icon>
                </IconButton>
              </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.heading}>{"Created At"}</Typography>
            <Typography className={classes.secondaryHeading}>{new Date(doc.uploaded_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}</Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.heading}>{"Uploaded At"}</Typography>
            <Typography className={classes.secondaryHeading}>{new Date(doc.updated_at+"Z").toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}</Typography>
          </AccordionDetails>
        </Accordion>
        ))}
        </SimpleCard>
        <ConfirmationDialog
          open={this.state.shouldShowConfirmationDialog}
          onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleConfirmationResponse}
          text="Are you sure to delete?"
        />

        <br /><br />
        <SimpleCard elevation={6} className="w-full">
          <Typography variant="h6">
            Add-ons
          </Typography>
          <br/>
          <div>
            <Typography>
              View all add-on services including additional consultation, notarization, translation, and more!
            </Typography>
            <br/>
            <Button variant="contained" color="primary" onClick={this.clickMe} className="add-ons">
              Click here
            </Button>
          </div>
        </SimpleCard>
      </div>
      </React.Fragment>
    );
  }
}

ClientApplication.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ClientApplication));