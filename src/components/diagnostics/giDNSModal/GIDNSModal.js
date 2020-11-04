import React, {useRef} from "react";
  import { makeStyles } from '@material-ui/core/styles';
  import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
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
  
  function GIDNSModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('md');
  
  const [showSubmitOnlyAPNMsg, setShowSubmitOnlyAPNMsg] = React.useState(false);
  const apnInputRef = useRef();
  const primaryPeerRef = useRef();
  const secondaryPeerRef = useRef();
  const onSubmitClick = (e) => {
    e.preventDefault();
    const apnName = apnInputRef.current.value;
    const primaryPeerName = primaryPeerRef.current.value;
    const secondaryPeerName = secondaryPeerRef.current.value;

    if((apnName !== "") && ((primaryPeerName && secondaryPeerName) === "")) {
        return setShowSubmitOnlyAPNMsg(true);
    }
}
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
      return (
        
          <React.Fragment>
          <Button className="iconBtn" onClick={handleClickOpen}>
          <DnsOutlinedIcon />
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          ><form className={classes.form} onSubmit={onSubmitClick}>
            <DialogTitle id="max-width-dialog-title">Add/Modify GI DNS { showSubmitOnlyAPNMsg ? <div className="msgText mt-0">At least one of Primary or Secondary IP required</div> : null }</DialogTitle>
            <DialogContent>
              
                  <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                  <Grid item xs={12} sm={12} lg={12}>
                      <TableContainer component={Paper} className={classes.boaderlessTable}>
                      <Table size="medium" style={{ width: 900 }} >
                          <TableBody>
                          <TableRow>
                              <TableCell align="left" className={classes.boaderlessTr}>
                                  <TextField label="APN Name" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" required inputRef={apnInputRef} />
                              </TableCell>
                              <TableCell align="left" className={classes.boaderlessTr}>
                                  <TextField label="Primary IP" style={{ margin: 8 }} placeholder="Primary IP" fullWidth margin="normal" inputRef={primaryPeerRef} />
                              </TableCell>
                              <TableCell align="left" className={classes.boaderlessTr}>
                                  <TextField label="Secondary IP" style={{ margin: 8 }} placeholder="Secondary IP" fullWidth margin="normal" inputRef={secondaryPeerRef}  />
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
              Modify
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
  
  
  export default GIDNSModal;