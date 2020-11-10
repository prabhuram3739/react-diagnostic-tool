import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SimCardOutlinedIcon from '@material-ui/icons/SimCardOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import { CUSTOM_ERROR_MSG, HANDLE_ERROR, HTTP_CALL} from "../../../hooks/http";
import {POST , SIM_ACTIVATE , SIM_DEACTIVATE} from "../../../hooks/api";
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

function SIMActivateModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [simActivateChecked, setsimActivateChecked] = React.useState(true);
  const [imsi, imsiValue] = React.useState(props.imsi);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIMSIChange = (event)  =>{
    imsiValue(event.target.value);
   }

   const handleFormSubmit = async (event) =>{
    event.preventDefault();
    let requestData = {"id": imsi}
    let response = '';    
        try {
        if(simActivateChecked){
          response = await HTTP_CALL("/"+imsi+SIM_ACTIVATE, POST,requestData)
        }else{
          response = await HTTP_CALL("/"+imsi+SIM_DEACTIVATE, POST,requestData)
        }
        console.log(response);
        if (response && response.data.code === 200) {
          CUSTOM_ERROR_MSG(response.data.message ? response.data.message : response.statusText);
        } else {
          CUSTOM_ERROR_MSG(response.data.message ? response.data.message : response.statusText);
        }
      } catch (error) {
        HANDLE_ERROR(error);
    }
 }

    return (
      
        <React.Fragment>
        <IconButton className="iconBtn" aria-label="Activate/Deactivate SIM" onClick={handleClickOpen}>
            <SimCardOutlinedIcon/>
        </IconButton>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        ><form className={classes.form} onSubmit={handleFormSubmit}>
          <DialogTitle id="max-width-dialog-title">Activate/Deactivate SIM</DialogTitle>
          <DialogContent>
            
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table size="medium" style={{ width: 900 }} >
                        <TableBody>
                        <TableRow>
                            <TableCell align="left" className={classes.boaderlessTr}>
                                <TextField label="IMSI" id="standard-full-width" style={{ margin: 8 }} placeholder="IMSI" fullWidth margin="normal" required onChange={handleIMSIChange} value={imsi} disable="true"/>
                            </TableCell>
                            <TableCell align="left" className={classes.boaderlessTr}>
                            <FormControlLabel
                                value="Activate SIM"
                                control={<Switch color="primary" />}
                                checked={simActivateChecked}
                                label={simActivateChecked === true ? "SIM Activate" : "SIM Deactivate"}
                                labelPlacement="start" onChange={(checked) => {simActivateChecked === true ? setsimActivateChecked(false) : setsimActivateChecked(true)}}
                                style={{paddingTop: 20, marginLeft: 101}}
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
          <Button type="submit" color="primary"  variant="contained">
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

  export default SIMActivateModal;
