import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SignalCellularAltOutlinedIcon from '@material-ui/icons/SignalCellularAltOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import GXBypassModal from '../gxBypassModal/GXBypassModal';

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
  }));

function ApnShutdownGXBypassModal(props) {
  const classes = useStyles();
  const [GXBypassModalShow, setGXBypassModalShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      
        <React.Fragment>
        <IconButton className="iconBtn" onClick={handleClickOpen}>
        <SignalCellularAltOutlinedIcon />
        </IconButton>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">GX Bypass - APN Shutdown Warning</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <InputLabel className="warningLabel">APN shutdown required for this action. Existing sessions need to be removed manually. Do you want to continue?</InputLabel>
                                </TableCell>
                        </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        </TableBody>
                    </Table>
                    </TableContainer>                                            
                </Grid>                   
                </Grid>
            </form>
          </DialogContent>
          <DialogActions>
          <span onClick={() => setGXBypassModalShow(true)}>
          <GXBypassModal show={GXBypassModalShow} onHide={() => setGXBypassModalShow(false) } />
          </span>
          <Button color="primary" variant="contained" onClick={handleClose} >
            Cancel
          </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  export default ApnShutdownGXBypassModal;
