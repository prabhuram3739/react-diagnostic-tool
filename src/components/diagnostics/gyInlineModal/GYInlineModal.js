import React, {useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
  }));

function GYInlineModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [showHomeMsg, setShowHomeMsg] = React.useState(false);
  const [showVisitingMsg, setShowVisitingMsg] = React.useState(false);
  const [showRoamingMsg, setShowRoamingMsg] = React.useState(false);
  const [showSubmitMsg, setSubmitMsg] = React.useState(false);

  const apnNameRef = useRef();
  const homeRef = useRef();
  const visitingRef = useRef();
  const roamingRef = useRef();

  const onHomeClick = (() => { 
    const homeValue = homeRef.current.value;

    if(homeValue !== "") {
        return setShowHomeMsg(false);
    } else {
      return setShowHomeMsg(true);
    }
  });
  const onHomeInput = (() => { 
    setShowHomeMsg(false);
    setShowVisitingMsg(false);
    setShowRoamingMsg(false);
    setSubmitMsg(false);
  });

  const onVisitingClick = (() => { 
    const visitingValue = visitingRef.current.value;

    if(visitingValue !== "") {
        return setShowVisitingMsg(false);
    } else {
      return setShowVisitingMsg(true);
    }
  });
  const onVisitingInput = (() => { 
    setShowHomeMsg(false);
    setShowVisitingMsg(false);
    setShowRoamingMsg(false);
    setSubmitMsg(false);
  });

  const onRoamingClick = (() => { 
    const roamingValue = roamingRef.current.value;

    if(roamingValue !== "") {
        return setShowRoamingMsg(false);
    } else {
      return setShowRoamingMsg(true);
    }
  });
  const onRoamingInput = (() => { 
    setShowHomeMsg(false);
    setShowVisitingMsg(false);
    setShowRoamingMsg(false);
    setSubmitMsg(false);
  });

  const onSubmitClick = (e) => {
      const apnNameValue = apnNameRef.current.value;
      const homeRefValue = homeRef.current.value;
      const visitingRefValue = visitingRef.current.value;
      const roamingRefValue = roamingRef.current.value;

  if(((apnNameValue !== "") && (homeRefValue || visitingRefValue || roamingRefValue)) === "") {
        setSubmitMsg(true);
        e.preventDefault();
      } else {
        setSubmitMsg(false);
      }
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
        <MonetizationOnOutlinedIcon />
        </IconButton>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form onSubmit={onSubmitClick} className={classes.form}>
          <DialogTitle id="max-width-dialog-title">Enable/Disable Online Charging - Gy Inline { showSubmitMsg ? <div className="headerMsgText mt-0">At least one of Home, Visiting or Roaming should be entered.</div> : null }</DialogTitle>
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="APN Name" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" required inputRef={apnNameRef}  />
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Home" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" inputRef={homeRef} onClick={onHomeClick} onInput={onHomeInput} />
                              { showHomeMsg ? <div className="msgText">! At least one of Home, Visiting or Roaming should be entered.</div> : null }
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Visiting" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" inputRef={visitingRef} onClick={onVisitingClick} onInput={onVisitingInput} />
                              { showVisitingMsg ? <div className="msgText">! At least one of Home, Visiting or Roaming should be entered.</div> : null }
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Roaming" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" inputRef={roamingRef} onClick={onRoamingClick} onInput={onRoamingInput} />
                              { showRoamingMsg ? <div className="msgText">! At least one of Home, Visiting or Roaming should be entered.</div> : null }
                            </TableCell>
                        </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        </TableBody>
                    </Table>
                    </TableContainer>                                            
                </Grid>                   
                </Grid>
                
           
          </DialogContent>
          <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  }

  export default GYInlineModal;
