import React from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

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

function SMSServicesModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [moBarChecked, setMOBarChecked] = React.useState(true);
  const [mtBarChecked, setMTBarChecked] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      
        <React.Fragment>
        <Button className="iconBtn" onClick={handleClickOpen}>
        <SmsOutlinedIcon/>
        </Button>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form className={classes.form}>
          <DialogTitle id="max-width-dialog-title">SMS Services</DialogTitle>
          <DialogContent>
          <DialogTitle id="max-width-dialog-title">MO SMS</DialogTitle>
          <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="MSISDN" id="standard-full-width" style={{ margin: 8 }} placeholder="MSISDN" fullWidth margin="normal" required />
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                            <FormControlLabel
                                value="MO Bar"
                                control={<Switch color="primary" />}
                                checked={moBarChecked}
                                label={moBarChecked === true ? "MO Bar Enable" : "MO Bar Disable"}
                                labelPlacement="start" onChange={(checked) => {moBarChecked === true ? setMOBarChecked(false) : setMOBarChecked(true)}}
                                style={{paddingTop: 20, marginLeft: 101}}
                            />
                            </TableCell>
                        </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        </TableBody>
                    </Table>
                    </TableContainer>                                            
                </Grid>                   
                </Grid>
            
                <DialogTitle id="max-width-dialog-title">MT SMS</DialogTitle>
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="MSISDN" id="standard-full-width" style={{ margin: 8 }} placeholder="MSISDN" fullWidth margin="normal" required />
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                            <FormControlLabel
                                value="MT Bar"
                                control={<Switch color="primary" />}
                                checked={mtBarChecked}
                                label={mtBarChecked === true ? "MT Bar Enable" : "MT Bar Disable"}
                                labelPlacement="start" onChange={(checked) => {mtBarChecked === true ? setMTBarChecked(false) : setMTBarChecked(true)}}
                                style={{paddingTop: 20}}
                            />
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
            De-Provision MO SMS
          </Button>
          <Button type="submit" color="primary" variant="contained">
            De-Provision MT SMS
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Update
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

  export default SMSServicesModal;