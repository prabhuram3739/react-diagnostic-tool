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
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
      minHeight: 150
    },
    formControl: {
      marginTop: theme.spacing(0),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  boaderlessTr: {
      borderBottom: 0,
      padding: 0
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

function CreateAccountModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [activeStep, setActiveStep] = React.useState(0);
  const [radioVal, setRadioVal] = React.useState("master");
  const [name, setName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [externalAccountId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [addressOne, setAddressOne] = React.useState('');
  const [addressTwo, setAddressTwo] = React.useState('');
  const [post, setPost] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [parentAccount, setParentAccount] = React.useState('');
  const [tenantDrpDown, setTenantDrpDown] = React.useState('');
  const [accountTypeDrpDown, setAccountTypeDrpDown] = React.useState('');
  const steps = getSteps();

  const onSubmitClick = (e) => {
    e.preventDefault();
    let row = {
        extId: externalAccountId ? externalAccountId : "EXT2",
        name: name ? name : "",
        tenantId: tenantDrpDown ? tenantDrpDown : 1,
        parentAccountId:  parentAccount ? parentAccount : null,
        accountType : accountTypeDrpDown ?  accountTypeDrpDown : "INDIVIDUAL",
        firstName: firstName ? firstName : "",
        lastName: lastName ? lastName : "",
        email: email ? email : "test@gmail.com",
        phone: phone ? phone : "",
        addressLine1 : addressOne ? addressOne : "",
        addressLine2 : addressTwo ? addressTwo : "",
        postalCode : post ? post : "",
        country : country ? country : "",
        city: city ? city : "",
        state : state ? state : ""
    };
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
      extId: row.extId ? row.extId : "EXT2",
      name: row.name ? row.name : "",
      tenantId: row.tenantId ? row.tenantId : 1,
      accountType: row.accountType ? row.accountType : "INDIVIDUAL",
      accountState: row.accountState ? row.accountState : "DRAFT",
      billingAccountId: row.billingAccountId ? row.billingAccountId : 1,
      parentAccountId: row.parentAccountId ? row.parentAccountId : null,
        address:{
           addressLine1: row.addressLine1 ? row.addressLine1 : "",
           addressLine2: row.addressLine2 ? row.addressLine2 : "",
           city: row.city ? row.city : "",
           country: row.country ? row.country : "",
           default: row.default ?  row.default : true,
           extId: row.extId ? row.extId : "EXT2",
           postcode: row.postalCode ? row.postalCode : "",
           state: row.state ? row.state : ""
        },
        contact:{
           email: row.email ? row.email : "test@gmail.com",
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
    };
    const APIURL = `http://3.127.248.97:8081/api/account`;
    let headers = {
      "Content-Type": "application/json",
    }
    axios.post(APIURL, params, headers).then(response => {
      if (response.status === 200 || response.status === 201) {
        //stausCheck(response.data, row);
        toast.success('Account created successfully.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
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

  /*const stausCheck = (id, row) => {
    let i = 0;
    let statusCheck = true;
    let updatedId = id;
    const checkStatus = () => {
      if (statusCheck && i <= 2) {
        const APIURL = `http://18.185.117.167:7070/api/workflow/${updatedId}?includeTasks=false`;
        axios.get(APIURL)
          .then(function (response) {
            let st = response?.data?.status;
            if (st === 201 || st === 200) {
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
  }*/

  /*const showToast = (type, message, position = "top-right", autoClose = 5000) => {
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

  }*/

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setRadioVal(radioVal);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 1 && radioVal === "master") {
        setRadioVal("master");
    } else if(activeStep === 1 && radioVal === "sub") {
        setRadioVal("sub");
    }
  };

  const handleReset = () => {
    handleReset();
    setActiveStep(0);
  };

  const handleTenantChange = (e) => {
    setTenantDrpDown(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountTypeDrpDown(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressOneChange = (e) => {
    setAddressOne(e.target.value);
  };

  const handleAddressTwoChange = (e) => {
    setAddressTwo(e.target.value);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleParentAccountChange = (e) => {
    setParentAccount(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setActiveStep(0);
    setRadioVal("master");
    setOpen(false);
  };

  const handleRadioValueChange = (e) => {
      if(radioVal === "master") {
        setRadioVal("sub");
      } else {
        setRadioVal("master");
      }
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
          <Divider component="span" className={classes.divider} orientation="horizontal" />
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable} style={{boxShadow: 'none'}}>
                    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     
        {activeStep === steps.length ? (
          <>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          
            <Table size="medium" style={{ width: 900 }}>
                <TableBody>
                {activeStep === 0 ? 
                             (
                                <React.Fragment>
                                    <RadioGroup row aria-label="accounttype" name="accounttype" defaultValue={radioVal === "master" ?  "master" : "sub" } style={{marginLeft: '1%'}}>
                                    <FormControlLabel value="master" onChange={handleRadioValueChange} control={<Radio color="primary" />} label="Master Account" />
                                    <FormControlLabel value="sub" onChange={handleRadioValueChange} control={<Radio color="primary" />} label="Sub Account" />
                                    </RadioGroup>
                                    { radioVal === "master" ? (
                                        <React.Fragment>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Name" inputProps={{autoComplete: 'new-password'}} size="small" variant="outlined" value={name} onChange={handleNameChange} style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Name" margin="normal"  />
                                </TableCell>
                                </TableRow><TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <FormControl size="small" style={{minWidth: 400, marginLeft: '3%', margin: 10}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="tenant-label">Organization</InputLabel>
                                    <Select
                                    labelId="tenant-label"
                                    id="tenant"
                                    value={tenantDrpDown}
                                    onChange={handleTenantChange}
                                    label="Organization"
                                    >
                                    <MenuItem value="ATT">ATT</MenuItem>
                                    <MenuItem value="USCC">USCC</MenuItem>
                                    <MenuItem value="TELE2">TELE2</MenuItem>
                                    </Select>
                                </FormControl>
                                </TableCell>
                                
                        </TableRow>   
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <FormControl size="small" style={{minWidth: 400, marginLeft: '3%', margin: 10}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="account-type-label">Account Type</InputLabel>
                                    <Select
                                    labelId="account-type-label"
                                    id="account-type"
                                    value={accountTypeDrpDown}
                                    onChange={handleAccountTypeChange}
                                    label="Account Type"
                                    >
                                    <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                                    <MenuItem value="ENTERPRISE">ENTERPRISE</MenuItem>
                                    <MenuItem value="RESELLER">RESELLER</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                
                                </TableCell>
                                </TableRow><TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="External Account ID" value={externalAccountId} autoComplete='off' size="small" variant="outlined" style={{ margin: 8, minWidth: 400, marginBottom: 20 }} placeholder="ID" disabled margin="normal" />
                                </TableCell>
                                
                        </TableRow> </React.Fragment> ) : radioVal === "sub" ? (
                        <React.Fragment>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                            <TextField label="Name" inputProps={{autoComplete: 'new-password'}} size="small" variant="outlined" value={name} onChange={handleNameChange} style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Name" margin="normal"  />
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <FormControl size="small" style={{minWidth: 400, marginLeft: '3%', margin: 10}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="tenant-label">Organization</InputLabel>
                                    <Select
                                    labelId="tenant-label"
                                    id="tenant"
                                    value={tenantDrpDown}
                                    onChange={handleTenantChange}
                                    label="Organization"
                                    >
                                    <MenuItem value="ATT">ATT</MenuItem>
                                    <MenuItem value="USCC">USCC</MenuItem>
                                    <MenuItem value="TELE2">TELE2</MenuItem>
                                    </Select>
                                </FormControl>
                                </TableCell>
                                
                        </TableRow>   
                                
                                
                                <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                {/*<TextField label="Parent Account" inputProps={{autoComplete: 'new-password'}} size="small" variant="outlined" onChange={handleParentAccountChange} value={parentAccount} style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Parent Account" margin="normal" />*/}
                                <FormControl size="small" style={{minWidth: 400, marginLeft: '3%', margin: 10}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="parent-account-label">Parent Account</InputLabel>
                                    <Select
                                    labelId="parent-account-label"
                                    id="parent-account"
                                    onChange={handleParentAccountChange} 
                                    value={parentAccount}
                                    label="Parent Account"
                                    >
                                    {props.parentAccountIdData.map((ele, index) =>
                                        <MenuItem key={index} value={ele.parent} >{ele.parent}</MenuItem>
                                    )}
                                    </Select>
                                </FormControl>
                                
                                </TableCell>
                                
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <FormControl size="small" style={{minWidth: 400, marginLeft: '3%', margin: 10}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="account-type-label">Account Type</InputLabel>
                                    <Select
                                    labelId="account-type-label"
                                    id="account-type"
                                    value={accountTypeDrpDown}
                                    onChange={handleAccountTypeChange}
                                    label="Account Type"
                                    >
                                    <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                                    <MenuItem value="ENTERPRISE">ENTERPRISE</MenuItem>
                                    <MenuItem value="RESELLER">RESELLER</MenuItem>
                                    </Select>
                                </FormControl>
                                
                                
                                </TableCell>
                                </TableRow>  
                        <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="External Account ID" value={externalAccountId} size="small" variant="outlined" style={{ margin: 8, minWidth: 400, marginBottom: 20 }} placeholder="ID" disabled margin="normal" />
                                </TableCell>
                                
                        </TableRow>
                        </React.Fragment>  ) : ''}
                        </React.Fragment> ) : activeStep === 1 ? ( 
                            <React.Fragment>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="First Name" inputProps={{autoComplete: 'new-password'}} value={firstName} onChange={handleFirstNameChange} size="small" variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="First Name" margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="External Account ID" autoComplete='off' size="small" variant="outlined" style={{ margin: 8, marginLeft: '8%', color: '#000', minWidth: 400 }} placeholder="ID" disabled margin="normal" />
                                    </TableCell>
                                    </TableRow><TableRow>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Last Name" inputProps={{autoComplete: 'new-password'}} value={lastName} onChange={handleLastNameChange} size="small" variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Last Name" margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Email" inputProps={{autoComplete: 'new-password'}} size="small" value={email} onChange={handleEmailChange} variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="ex: test@test.com" margin="normal" />
                                    </TableCell></TableRow><TableRow>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Phone Number" inputProps={{autoComplete: 'new-password'}} size="small" value={phone} onChange={handlePhoneChange} variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400, marginBottom: 79 }} placeholder="ex: 1234567890" margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>
                            
                            </React.Fragment> ) : activeStep === 2 ? ( 
                            <React.Fragment>
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 1" inputProps={{autoComplete: 'new-password'}} size="small" value={addressOne} onChange={handleAddressOneChange} variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Address Line 1" margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Postal Code" inputProps={{autoComplete: 'new-password'}} size="small" value={post} onChange={handlePostChange} variant="outlined" style={{ margin: 8, marginLeft: '8%', color: '#000', minWidth: 400 }}placeholder="Postal Code" margin="normal" />
                                    </TableCell>
                                    
                            </TableRow>   
                            <TableRow>
                                <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="Address Line 2" inputProps={{autoComplete: 'new-password'}} size="small" value={addressTwo} onChange={handleAddressTwoChange} variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="Address Line 2" margin="normal" />
                                    </TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <FormControl size="small" style={{minWidth: 400, margin: 10, marginLeft: '8%'}} variant="outlined" required className={classes.formControl}>
                                    <InputLabel id="country-label">Country</InputLabel>
                                    <Select
                                    labelId="country-label"
                                    id="country"
                                    value={country}
                                    onChange={handleCountryChange}
                                    label="Country"
                                    >
                                    <MenuItem value="INDIA">India</MenuItem>
                                    <MenuItem value="USA">USA</MenuItem>
                                    <MenuItem value="UK">UK</MenuItem>
                                    </Select>
                                </FormControl>
                                    
                                    
                                    </TableCell>
                                    
                            </TableRow>
                            <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="State & Province" inputProps={{autoComplete: 'new-password'}} value={state} onChange={handleStateChange} size="small" variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400 }} placeholder="State & Province" margin="normal" />
                                    </TableCell></TableRow><TableRow>
                                    <TableCell align="left" className={classes.boaderlessTr}>
                                    <TextField label="City" size="small" inputProps={{autoComplete: 'new-password'}} value={city} onChange={handleCityChange} variant="outlined" style={{ margin: 8, color: '#000', minWidth: 400, marginBottom: 79 }} placeholder="City" margin="normal" required />
                                    </TableCell>
                            </TableRow>
                            
                            </React.Fragment> ) : ''
                        
                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                        </TableBody>
                    </Table>
            
          
        )}
      
    </div>

                    </TableContainer>                                            
                </Grid>                   
                </Grid>
                
           
          </DialogContent>
          <Divider component="span" className={classes.divider} orientation="horizontal" />
          <DialogActions>

          
          <Button onClick={handleClose} color="primary" variant="contained" className={classes.operationButton}>
            Cancel
          </Button>
              <Button variant="contained" color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.operationButton}
                style={{color: activeStep === 0 ?  'black' : 'white'}}
              >
                Back
              </Button>
              {activeStep <= steps.length - 2 ? (
              <Button  variant="contained" color="primary" onClick={handleNext}>
                 Next
              </Button>  ) :  ( <Button type="submit" variant="contained" color="primary" >
                 Create
              </Button> ) }
            
          </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  export default CreateAccountModal;
