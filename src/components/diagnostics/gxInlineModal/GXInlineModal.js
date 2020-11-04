import React, {useRef, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
  const [showGXProfileMsg, setShowGXProfileMsg] = React.useState(false);
    const [showPrimaryPeerMsg, setShowPrimaryPeerMsg] = React.useState(false);
    const [showSecondaryPeerMsg, setShowSecondaryPeerMsg] = React.useState(false);
    const [showDiameterPeerMsg, setShowDiameterPeerMsg] = React.useState(false);
    const [showSubmitOnlyAPNMsg, setShowSubmitOnlyAPNMsg] = React.useState(false);
    const [showSubmitOnlyAPNGXPriofileMsg, setShowSubmitOnlyAPNGXProfileMsg] = React.useState(false);
    const onGXProfileClick = () => setShowGXProfileMsg(true);
    const onGXProfileInput = () => setShowGXProfileMsg(false);

    const apnInputRef = useRef();
    const gxProfileRef = useRef();
    const primaryPeerRef = useRef();
    const secondaryPeerRef = useRef();
    const diameterPeerRef = useRef();

    const [disabled, setDiameterPeerGroupDisabled] = useState(false);
    const [priSecDisabled, setPrimarySecondaryDisabled] = useState(false);

    const onPrimaryPeerClick = (() => { 
      setShowPrimaryPeerMsg(true);

      const primaryValue = primaryPeerRef.current.value;

      if(primaryValue !== "") {
          return setShowPrimaryPeerMsg(false);
      } else {
        return setShowPrimaryPeerMsg(true);
      }
    });
    const onPrimaryPeerInput = (() => { 
      setShowPrimaryPeerMsg(false);
      setShowSecondaryPeerMsg(false);
      setShowDiameterPeerMsg(false);
      setShowSubmitOnlyAPNMsg(false);
      handleDiameterPeerGroupDisableInput();
    });

    const onSecondaryPeerClick = (() => { 
      setShowSecondaryPeerMsg(true);

      const secondaryValue = secondaryPeerRef.current.value;

      if(secondaryValue !== "") {
          return setShowSecondaryPeerMsg(false);
      } else {
        return setShowSecondaryPeerMsg(true);
      }
    });
    const onSecondaryPeerInput = (() => { 
      setShowPrimaryPeerMsg(false);
      setShowSecondaryPeerMsg(false);
      setShowDiameterPeerMsg(false);
      setShowSubmitOnlyAPNMsg(false);
      handleDiameterPeerGroupDisableInput();
    });


    const onDiameterPeerClick = (() => { 
      setShowDiameterPeerMsg(true);

      const diameterValue = diameterPeerRef.current.value;

      if(diameterValue !== "") {
          return setShowDiameterPeerMsg(false);
      } else {
        return setShowDiameterPeerMsg(true);
      }
    });
    const onDiameterPeerInput = (() => { 
      setShowPrimaryPeerMsg(false);
      setShowSecondaryPeerMsg(false);
      setShowDiameterPeerMsg(false);
      setShowSubmitOnlyAPNMsg(false);
      handlePriSecDisableInput();
    });

    function handleDiameterPeerGroupDisableInput() {
      setDiameterPeerGroupDisabled(!disabled);
    }

    function handlePriSecDisableInput() {
      setPrimarySecondaryDisabled(!priSecDisabled);
    }

    const onSubmitClick = (e) => {
        const gxProfileName = gxProfileRef.current.value;
        const primaryPeerName = primaryPeerRef.current.value;
        const secondaryPeerName = secondaryPeerRef.current.value;
        const diameterPeerName = diameterPeerRef.current.value;

         if(!primaryPeerName.trim() && !secondaryPeerName.trim() && !diameterPeerName.trim()) {
          setShowSubmitOnlyAPNGXProfileMsg(false);
          setShowSubmitOnlyAPNMsg(true);
          e.preventDefault();
        } 
        if((!gxProfileName.trim()) && (primaryPeerName && secondaryPeerName && diameterPeerName)) {
          setShowSubmitOnlyAPNMsg(false);
          setShowSubmitOnlyAPNGXProfileMsg(true);
          e.preventDefault();
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
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Continue
        </Button>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form onSubmit={onSubmitClick} className={classes.form}>
          <DialogTitle id="max-width-dialog-title">Gx Inline
            { showSubmitOnlyAPNMsg ? <div className="headerMsgText mt-0">At least one of Primary or Secondary Diameter peer name required OR Diameter Peer Group name is required.</div> : null }
            { showSubmitOnlyAPNGXPriofileMsg ? <div className="headerMsgText mt-0">At least one of Primary or Secondary Diameter peer name required OR Diameter Peer Group name is required.</div> : null }</DialogTitle>
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="APN Name" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" required inputRef={apnInputRef}  />
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="GX Profile" id="standard-full-width" style={{ margin: 8 }} placeholder="gxProfile" fullWidth margin="normal" inputRef={gxProfileRef} onClick={onGXProfileClick} onInput={onGXProfileInput} />
                              { showGXProfileMsg ? <div className="msgText">! GX Profile is optional</div> : null }
                            </TableCell>
                            </TableRow>
                            <TableRow> 
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Primary Diameter Peer" id="standard-full-width" disabled={priSecDisabled} style={{ margin: 8 }} placeholder="primaryDiameterPeer" fullWidth margin="normal" inputRef={primaryPeerRef} onClick={onPrimaryPeerClick} onInput={onPrimaryPeerInput} />
                              { showPrimaryPeerMsg ? <div className="msgText">! At least one of Primary or Secondary Diameter peer name is required.</div> : null }
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Secondary Diameter Peer" id="standard-full-width" disabled={priSecDisabled} style={{ margin: 8 }} placeholder="secondaryDiameterPeer" fullWidth margin="normal" inputRef={secondaryPeerRef} onClick={onSecondaryPeerClick} onInput={onSecondaryPeerInput} />
                              { showSecondaryPeerMsg ? <div className="msgText">! At least one of Primary or Secondary Diameter peer name is required.</div> : null }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell align="left" className={classes.boaderlessTr}>
                              <TextField label="Diameter Group Peer" id="standard-full-width" disabled={disabled} style={{ margin: 8 }} placeholder="diameterGroupPeer" fullWidth margin="normal" inputRef={diameterPeerRef} onClick={onDiameterPeerClick} onInput={onDiameterPeerInput} />
                              { showDiameterPeerMsg ? <div className="msgText">! Diameter group peer is not required if at least one of Primary or Secondary Diameter peer name is provided.</div> : null }
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