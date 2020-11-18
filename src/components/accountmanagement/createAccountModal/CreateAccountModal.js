import React, {useRef} from "react";
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
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

  /*function getStepContent(stepIndex) {
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
  }*/

function CreateAccountModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [activeStep, setActiveStep] = React.useState(0);
  const [radioVal, setRadioVal] = React.useState("master");
  const steps = getSteps();

  const nameInputRef = useRef();
  const tenantRef = useRef();
  const parentAccountRef = useRef();
  const accountTypeRef = useRef();
  const externalAccountIdRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressOneRef = useRef();
  const addressTwoRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onSubmitClick = (e) => {
      e.preventDefault();
      console.log(e);
    const accountName = nameInputRef.current.value ? nameInputRef.current.value : "";
    console.log("AccountName:", nameInputRef.current.value);
    const tenant = tenantRef.current.value ? tenantRef.current.value : "";
    const parentAccount = parentAccountRef.current.value ? parentAccountRef.current.value : "";
    const accountType = accountTypeRef.current.value ? accountTypeRef.current.value : "";
    const externalAccountId = externalAccountIdRef.current.value ? externalAccountIdRef.current.value : "";
    const firstName = firstNameRef.current.value ? firstNameRef.current.value : "";
    const lastName = lastNameRef.current.value ? lastNameRef.current.value : "";
    const email = emailRef.current.value ? emailRef.current.value : "";
    const phone = phoneRef.current.value ? phoneRef.current.value : "";
    const addressOne = addressOneRef.current.value ? addressOneRef.current.value : "";
    const addressTwo = addressTwoRef.current.value ? addressTwoRef.current.value : "";
    const postalCode = postalCodeRef.current.value ? postalCodeRef.current.value : "";
    const country = countryRef.current.value ? countryRef.current.value : "";
    const city = cityRef.current.value ? cityRef.current.value : "";
    const state = stateRef.current.value ? stateRef.current.value : "";

    let row = {
        extId: externalAccountId ? externalAccountId : "",
        name: accountName ? accountName : "",
        tenantId: tenant ? tenant : "",
        parrentAccountId:  parentAccount ? parentAccount : "",
        accountType : accountType ?  accountType : "",
        firstName: firstName ? firstName : "",
        lastName: lastName ? lastName : "",
        email: email ? email : "",
        phone: phone ? phone : "",
        addressLine1 : addressOne ? addressOne : "",
        addressLine2 : addressTwo ? addressTwo : "",
        postalCode : postalCode ? postalCode : "",
        country : country ? country : "",
        city: city ? city : "",
        state : state ? state : ""
    };
    console.log("Form values:", row);
    createAccount(row);
};

  const createAccount = (row) => {
   /* {
        "extId":"EXT2",
        "name":"test_account_3",
        "tenantId":1,
        "accountType":"INDIVIDUAL",
        "accountState":"DRAFT",
        "billingAccountId":1,
        "parentAccountId":"",
        "address":{
           "addressLine1":"Madinaguda",
           "addressLine2":"NA",
           "city":"Hyderabad",
           "country":"India",
           "default":true,
           "extId":"EXT2",
           "postcode":"248002",
           "state":"Telangana"
        },
        "contact":{
           "email":"test3@gmail.com",
           "extId":"EXT2",
           "firstName":"Test firstName",
           "lastName":"Test LastName",
           "phone":"9900000682"
        },
        "custFields":{
           "prop1":"value1",
           "prop2":"value2",
           "prop3":"value3"
        }
     }
     
*/     
    let params = {
      id: row.id ? row.id : "",
      name: row.name ? row.name : "",
      tenantId: row.tenantId ? row.tenantId : "",
      accountType: row.accountType ? row.accountType : "",
      accountState: row.accountState ? row.accountState : "",
      billingAccountId: row.billingAccountId ? row.billingAccountId : 1,
      parentAccountId: row.parentAccountId ? row.parentAccountId : "",
        address:{
           addressLine1: row.addressLine1 ? row.addressLine1 : "",
           addressLine2: row.addressLine2 ? row.addressLine2 : "",
           city: row.city ? row.city : "",
           country: row.country ? row.country : "",
           default: row.default ?  row.default : true,
           extId: row.extId ? row.extId : "EXT2",
           postcode: row.postCode ? row.postCode : "",
           state: row.state ? row.state : ""
        },
        contact:{
           email: row.email ? row.email : "",
           extId: row.extId ? row.extId : "EXT2",
           firstName: row.firstName ? row.firstName : "",
           lastName: row.lastName ? row.lastName : "",
           phone: row.phone ? row.phone : ""
        },
        custFields:{
           prop1: row.prop1 ?  row.prop1 : "value1",
           prop2: row.prop2 ?  row.prop2 : "value2",
           prop3: row.prop3 ?  row.prop3 : "value3"
        }
    }
    const APIURL = `http://18.185.117.167:7070/api/account`;
    let headers = {
      "Content-Type": "application/json",
    }
    axios.post(APIURL, params, headers).then(response => {
      if (response.status === 200) {
        stausCheck(response.data, row);
        toast.success('Account create request accepted.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
      .catch(function (error) {
        if (error?.response?.status === 409) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error?.response?.status === 500) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error?.response?.status === 400) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('' + error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(error);
      });
  }

  const stausCheck = (id, row) => {
    let i = 0;
    let statusCheck = true;
    let updatedId = id;
    const checkStatus = () => {
      if (statusCheck && i <= 2) {
        const APIURL = `http://18.185.117.167:7070/api/workflow/${updatedId}?includeTasks=false`;
        axios.get(APIURL)
          .then(function (response) {
            let st = response?.data?.status;
            if (st === "COMPLETED") {
              //setRows(window.tempRows);
              showToast("success", "Account created successfully")
              statusCheck = false
            } else if (st === "RUNNING") {
              setTimeout(() => { checkStatus() }, 1000);
            }
            else if (st === "SCHEDULED") {
              statusCheck = false;
              setTimeout(() => { checkStatus() }, 1000);
            } else if (st === "FAILED") {
              statusCheck = false;
              let errMsg = response?.data?.output?.reason;
              let msg = "Account create request failed";
              if (errMsg && errMsg.length > 0)
                msg = msg + ": " + errMsg;
                //let changedRows = rows.map(row => (rows[row.id] ? { ...row, ...rows[row.id] } : row));
                //setRows(changedRows);
              showToast("error", msg);

            }
          })
          .catch(function (error) {
            showToast("error", error.message);
          });
        i++;
      }
    }
    checkStatus();
  }

  const showToast = (type, message, position = "top-right", autoClose = 5000) => {
    let toastConfig = {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
    if (type === "success") {
      toast.success(message, toastConfig);
    } else if (type === "error") {
      toast.error(message, toastConfig);
    }

  }

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

  const handleRadioValueChange = (e) => {
    setRadioVal(e.target.value);
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
        ><form onSubmit={onSubmitClick} className={classes.form}>
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
                             {activeStep === 0 ? 
                             (
                                <React.Fragment>
                                    <RadioGroup row aria-label="accounttype" name="accounttype" defaultValue="master" onChange={handleRadioValueChange} style={{marginLeft: '5%'}}>
                                    <FormControlLabel value="master" control={<Radio color="primary" />} label="Master Account" />
                                    <FormControlLabel value="sub" control={<Radio color="primary" />} label="Sub Account" />
                                    </RadioGroup>
                                    { radioVal === "master" ? (
                                        <React.Fragment>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Name" style={{ margin: 8, color: '#000' }} placeholder="Name" fullWidth margin="normal" inputRef={nameInputRef}  />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Tenant" style={{ margin: 8 }} placeholder="Tenant" fullWidth margin="normal" inputRef={tenantRef} required />
                                </TableCell>
                                
                        </TableRow>   
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Account Type" style={{ margin: 8 }} placeholder="Account Type" fullWidth margin="normal" inputRef={accountTypeRef} required />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="External Account ID" style={{ margin: 8 }} placeholder="ID" disabled fullWidth margin="normal" inputRef={externalAccountIdRef} />
                                </TableCell>
                                
                        </TableRow> </React.Fragment> ) : (
                        <React.Fragment>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Name" style={{ margin: 8, color: '#000' }} placeholder="Name" fullWidth margin="normal" inputRef={nameInputRef}  />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Parent Account" style={{ margin: 8 }} placeholder="Parent Account" fullWidth margin="normal" inputRef={parentAccountRef} />
                                </TableCell>
                                
                        </TableRow>   
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Account Type" style={{ margin: 8 }} placeholder="Account Type" fullWidth margin="normal" inputRef={accountTypeRef} required />
                                </TableCell>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="External Account ID" style={{ margin: 8 }} placeholder="ID" disabled fullWidth margin="normal" inputRef={externalAccountIdRef} />
                                </TableCell>
                                
                        </TableRow>
                        </React.Fragment>  )}
                        </React.Fragment> ) : activeStep === 1 ? ( 
                            <React.Fragment>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="First Name" style={{ margin: 8 }} placeholder="First Name" fullWidth margin="normal" inputRef={firstNameRef} />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Last Name" style={{ margin: 8 }} placeholder="Last Name" fullWidth margin="normal" inputRef={lastNameRef} />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Email"  style={{ margin: 8 }} placeholder="Email" fullWidth margin="normal" inputRef={emailRef} />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Phone Number" style={{ margin: 8 }} placeholder="Phone Number" fullWidth margin="normal" inputRef={phoneRef} />
                                    </TableCell>
                                    
                            </TableRow>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="External Account ID" style={{ margin: 8 }} placeholder="ID" disabled fullWidth margin="normal" inputRef={externalAccountIdRef} />
                                    </TableCell>
                            </TableRow>
                            
                            </React.Fragment> ) : activeStep === 2 ? ( 
                            <React.Fragment>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 1" style={{ margin: 8 }} placeholder="Address Line 1" fullWidth margin="normal" inputRef={addressOneRef} />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Postal Code" style={{ margin: 8 }} placeholder="Postal Code" fullWidth margin="normal" inputRef={postalCodeRef} />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 2"  style={{ margin: 8 }} placeholder="Address Line 2" fullWidth margin="normal" inputRef={addressTwoRef} />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Country" style={{ margin: 8 }} placeholder="Country" fullWidth margin="normal" required inputRef={countryRef} />
                                    </TableCell>
                                    
                            </TableRow>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="State & Province"  style={{ margin: 8 }} placeholder="State & Province" fullWidth margin="normal" inputRef={stateRef} />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="City" style={{ margin: 8 }} placeholder="City" fullWidth margin="normal" required inputRef={cityRef} />
                                    </TableCell>
                            </TableRow>
                            
                            </React.Fragment> ) : ''
                        
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
              {activeStep <= steps.length - 2 ? (
              <Button  variant="contained" color="primary" onClick={handleNext}>
                 Next
              </Button>  ) :  ( <Button type="submit" variant="contained" color="primary" >
                 Create
              </Button> ) }
            </div>
          </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  export default CreateAccountModal;
