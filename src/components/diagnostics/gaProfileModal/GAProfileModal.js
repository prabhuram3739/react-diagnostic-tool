  import React from "react";
  import { makeStyles } from '@material-ui/core/styles';
  import SignalCellular3BarOutlinedIcon from '@material-ui/icons/SignalCellular3BarOutlined';
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
  
  function GAProfileModal(props) {
    const classes = useStyles();
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
          <Button className="iconBtn" onClick={handleClickOpen}>
          <SignalCellular3BarOutlinedIcon />
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          ><form className={classes.form} >
            <DialogTitle id="max-width-dialog-title">Add/Modify Ga Profile</DialogTitle>
            <DialogContent>
              
                  <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                  <Grid item xs={12} sm={12} lg={12}>
                      <TableContainer component={Paper} className={classes.boaderlessTable}>
                      <Table size="medium" style={{ width: 900 }} >
                          <TableBody>
                          <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="APN Name" id="standard-full-width" style={{ margin: 8 }} placeholder="APN" fullWidth margin="normal" required />
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="GA Profile" id="standard-full-width" style={{ margin: 8 }} placeholder="GA Profile" fullWidth margin="normal" required />
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
  
  
  export default GAProfileModal;