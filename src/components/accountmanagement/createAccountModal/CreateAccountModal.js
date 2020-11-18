import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
      minHeight: 150
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      },
      operationButton: {
        marginRight: theme.spacing(1),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
  }));

  function getSteps() {
    return ['Basic', 'Primary Contact', 'Primary Address'];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Basic';
      case 1:
        return 'Primary Contact';
      case 2:
        return 'Primary Address';
      default:
        return 'Unknown stepIndex';
    }
  }

function CreateAccountModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      
        <React.Fragment>
        <IconButton className="iconBtn" onClick={handleClickOpen}>
        <Button variant="contained" component="label" color="secondary" aria-label="Add New Account" >Add New Account
        </Button>
        </IconButton>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form className={classes.form}>
          <DialogTitle id="max-width-dialog-title">Account Creation</DialogTitle>
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                            ) {activeStep === 0 ? (
                                <>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Name" style={{ margin: 8, color: '#000' }} placeholder="Name" fullWidth margin="normal" value={name} 
			onChange={(e) => setName(e.target.value)}  />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Tenant" style={{ margin: 8 }} placeholder="Tenant" fullWidth margin="normal" required />
                                </TableCell>
                                
                        </TableRow>   
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Account Type" style={{ margin: 8 }} placeholder="Account Type" fullWidth margin="normal" required />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="External Account ID" style={{ margin: 8 }} placeholder="ID" disabled fullWidth margin="normal" />
                                </TableCell>
                                
                        </TableRow></>  ) : activeStep === 1 ? ( 
                            <>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="First Name" style={{ margin: 8 }} placeholder="First Name" fullWidth margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Last Name" style={{ margin: 8 }} placeholder="Last Name" fullWidth margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Email"  style={{ margin: 8 }} placeholder="Email" fullWidth margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Phone Number" style={{ margin: 8 }} placeholder="Phone Number" fullWidth margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="External Account ID" style={{ margin: 8 }} placeholder="ID" disabled fullWidth margin="normal" />
                                    </TableCell>
                            </TableRow>
                            
                            </> ) : activeStep === 2 ? ( 
                            <>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 1" style={{ margin: 8 }} placeholder="Address Line 1" fullWidth margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Postal Code" style={{ margin: 8 }} placeholder="Postal Code" fullWidth margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 2"  style={{ margin: 8 }} placeholder="Address Line 2" fullWidth margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Country" style={{ margin: 8 }} placeholder="Country" fullWidth margin="normal" required />
                                    </TableCell>
                                    
                            </TableRow>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="State & Province"  style={{ margin: 8 }} placeholder="State & Province" fullWidth margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="City" style={{ margin: 8 }} placeholder="City" fullWidth margin="normal" required />
                                    </TableCell>
                            </TableRow>
                            
                            </> ) : ''
                        
                        }   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                        </TableBody>
                    </Table>
            
          </div>
        )}
      </div>
    </div>

                    </TableContainer>                                            
                </Grid>                   
                </Grid>
                
           
          </DialogContent>
          <DialogActions>

          <div>
          <Button onClick={handleClose} color="primary" variant="contained" className={classes.operationButton}>
            Cancel
          </Button>
              <Button variant="contained" color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.operationButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Create' : 'Next'}
              </Button>
            </div>
          </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  export default CreateAccountModal;
