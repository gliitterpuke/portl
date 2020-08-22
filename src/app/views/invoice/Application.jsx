import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  Icon,
  IconButton,
  Fab,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  Divider,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllInvoice, deleteFile } from "./AppActions";
import { Link } from "react-router-dom";
import { ConfirmationDialog } from "matx";
import { SimpleCard } from "matx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles"

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
  },
});

class HigherOrderComponent extends React.Component {
  state = {
    fileList: [],
    shouldShowConfirmationDialog: false,
    filename: "",
    dragClass: "",
    files: [],
    statusList: [],
  };
  componentDidMount() {
    getAllInvoice().then(res => this.setState({ fileList: res.data }));
  }

  handeViewClick = invoiceId => {
    this.props.history.push(`/invoice/${invoiceId}`);
    // getInvoiceById(invoiceId).then(res => console.log(res.data));
  };

  handeDeleteClick = invoice => {
    this.setState({ shouldShowConfirmationDialog: true, invoice });
  };

  handleConfirmationResponse = () => {
    let { invoice } = this.state;
    deleteFile(invoice).then(res => {
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

  handleAllRemove = () => {
    this.setState({ files: [] });
  };

  uploadSingleFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: true, error: false };

    this.setState({
      files: [...allFiles]
    });
  };

  uploadAllFile = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
    });
  };

  handleSingleCancel = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: false, error: true };

    this.setState({
      files: [...allFiles]
    });
  };

  handleCancelAll = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
    });
  };
  render() {
    const { classes } = this.props;
    let { fileList, filename, dragClass, files, mime_type, tag} = this.state;
    let isEmpty = files.length === 0;
    return (
      <React.Fragment>
      <div className="upload-form m-sm-30">
        <SimpleCard title="Document Checklist">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Form</Typography>
              <Typography className={classes.secondaryHeading}>Main form title</Typography>
            </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>IMM5257</b> Testing
            </Typography>
          </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Form</Typography>
              <Typography className={classes.secondaryHeading}>Yarrrr</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Form</Typography>
              <Typography className={classes.secondaryHeading}>Yarrrr</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Form</Typography>
              <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </SimpleCard>
      </div>
      <div className="upload-form m-sm-30">
        <SimpleCard title="New File Upload">
        <div>
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
              <Grid container spacing={2}>
                <Grid item lg={3} md={3}>
                  <InputLabel>Type of Document</InputLabel>
                  <Select variant='outlined' fullWidth InputLabelProps={{ shrink: true }}>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="form">Form</MenuItem>
                    <MenuItem value="something">Something</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            <div className="p-4">
              <Grid container spacing={2}>
                <Grid item lg={4} md={4}>Name</Grid>
                <Grid item lg={2} md={2}>Type</Grid>
                <Grid item lg={2} md={2}>Status</Grid>
                <Grid item lg={4} md={4}> Actions </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-4">No files yet!</p>}

            {files.map((item, index) => {
              let { file, uploading, error, } = item;
              return (
            <div className="px-4 py-4" key={file.name}>
              <Grid container spacing={2} direction="row"
              >
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {file.name}
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  {file.type}
                </Grid>
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  {error && <Icon color="error">error</Icon>}
                  {/* {uploading && <Icon className="text-green">done</Icon>} */}
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <div>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
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
        <SimpleCard elevation={6} className="w-full overflow-auto" title="Existing Files">
          <Table className="min-w-3000">
            <TableHead>
              <TableRow>
                <TableCell className="pl-sm-24">Name</TableCell>
                <TableCell className="px-0">Program</TableCell>
                <TableCell className="px-0">Upload</TableCell>
                <TableCell className="px-0">Update</TableCell>
                <TableCell className="px-0">Type</TableCell>
                <TableCell className="px-0">Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileList.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell className="pl-sm-24 capitalize" align="left">
                    {invoice.filename}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {invoice.program}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {invoice.uploaded_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize" align="left">
                    {invoice.updated_at}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {invoice.mime_type}
                  </TableCell>
                  <TableCell className="pl-0 capitalize">
                    {invoice.tag}
                  </TableCell>
                  <TableCell className="pl-0">
                    <IconButton
                      color="primary"
                      className="mr-2"
                      onClick={() => this.handeViewClick(invoice.id)}
                    >
                      <Icon>chevron_right</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.handeDeleteClick(invoice)}>
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

export default withStyles(styles)(HigherOrderComponent);