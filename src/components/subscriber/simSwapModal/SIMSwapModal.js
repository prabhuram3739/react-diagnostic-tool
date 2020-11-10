import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
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
import { CUSTOM_ERROR_MSG, HANDLE_ERROR, HTTP_CALL, HANDLE_SUCCESS} from "../../../hooks/http";
import {POST , SIM_SWAP} from "../../../hooks/api"

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

function SIMSwapModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [imsi, IMSIValue] = React.useState(props.imsi);
  const [newimsi, newIMSIValue] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleIMSIChange = (event)  =>{
    IMSIValue(event.target.value);
   }
   const handleNewIMSIChange = (event)  =>{
    newIMSIValue(event.target.value);
   }
   const handleFormSubmit = async (event) =>{
    event.preventDefault();
    let requestData = {"oldSim": imsi ,"newSim":newimsi}
        let response = '';    
        try {
          response = await HTTP_CALL("/"+imsi+SIM_SWAP, POST,JSON.stringify(requestData))
          if (response && response.data.code === 200) {
            HANDLE_SUCCESS(response.data.message ? response.data.message : response.statusText);
          } else {
            CUSTOM_ERROR_MSG(response.data.message ? response.data.message : response.statusText);
          }
      } catch (error) {
        HANDLE_ERROR(error);
      }
  }
    return (
      
        <React.Fragment>
        <IconButton className="iconBtn" onClick={handleClickOpen}>
        <SwapHorizontalCircleOutlinedIcon/>
        </IconButton>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form className={classes.form} onSubmit={handleFormSubmit}>
          <DialogTitle id="max-width-dialog-title">SIM Swap</DialogTitle>
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="Old IMSI" id="standard-full-width" style={{ margin: 8 }} placeholder="Old IMSI" fullWidth margin="normal" required disabled value={imsi} onChange={handleIMSIChange}/>
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="New IMSI" id="standard-full-width" style={{ margin: 8 }} placeholder="New IMSI" fullWidth margin="normal" required value={newimsi} onChange={handleNewIMSIChange} />
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

  export default SIMSwapModal;
