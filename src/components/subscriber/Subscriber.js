import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SignalCellular3BarOutlinedIcon from '@material-ui/icons/SignalCellular3BarOutlined';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import { DataProvider } from '../../searchViewDataLayerContext';
import { CircuitDataProvider } from '../../circuitViewDataLayerContext';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import PsDetails from './PsDetails';
import CsDetails from './CsDetails';
import GeneralDetails from './GeneralDetails';
import SIMActivateModal from './simActivateModal/SIMActivateModal';
import VoiceServicesModal from './voiceServicesModal/VoiceServicesModal';
import SMSServicesModal from './smsServicesModal/SMSServicesModal';
import SIMSwapModal from './simSwapModal/SIMSwapModal';
import SIMPurgeModal from './simPurgeModal/SIMPurgeModal';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    padding: '5px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: '5px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  cardContent: {
    padding: '5px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },  
  boaderlessTable: {
    border: 'none',
    boxShadow: 'none',
  },  
  boaderlessTh: {
    color: '#094391',
    fontWeight: "500",
    width: "160px",
  },  
  boaderlessTr: {
    fontWeight: "500",
    borderBottom: 'none',
  },   
}));

/*const options = [
  'Activate/Deactivate SIM',
  'Voice Services',
  'SMS Services',
  'Data Services',
  'Roaming Profile',
  'SIM Swap',
  'SIM Purge',
];*/

export default function Subscriber() {
    const classes = useStyles();
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const imsi = queryString.parse(location.search).imsi;
    const [imsiNumber, imsiValue] = React.useState(imsi);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleIMSIChange = (event)  =>{
      imsiValue(event.target.value);
     }
    //const [anchorEl, setAnchorEl] = React.useState(null);
    //const openMenu = Boolean(anchorEl);

    const [ ModalVoiceServicesShow, setModalVoiceServicesShow ] = React.useState(false);
    const [ ModalSMSServicesShow, setModalSMSServicesShow ] = React.useState(false);
    const [ ModalSIMSwapShow, setModalSIMSwapShow ] = React.useState(false);
    const [ ModalSIMPurgeShow, setModalSIMPurgeShow ] = React.useState(false);
    const [ ModalSIMActivateShow, setModalSIMActivateShow ] = React.useState(false);
  
    /*const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };*/

    return(
        <div>
            <Box m={2}>
                <Typography component="h1" variant="h6" color="inherit" padding="12" display="inline" className={classes.title}>
                Diagnostics &gt; Subscriber
                </Typography>
            </Box>
            <Box m={1}>
            <Grid container spacing={1} direction="column" alignContent="center" alignItems="stretch" justify="space-around" >
                <Grid item style={{width: "100%", padding: "0px"}}  xs={false} sm={false} lg={false} xl={false}>
                <Card className={classes.card}  elevation={1} component="div">
                  <CardHeader 
                    //title={'Node'}
                    subheader={'Subscriber Details'}
                    action={<form className={classes.root} action="/dashboard/subscriber/" autoComplete="off" style={{float: "right"}}>
                      <TextField id="outlined-basic" label="Search IMSI" name="imsi" variant="outlined" size="small" required value={imsiNumber} onChange={handleIMSIChange} />
                      <Tooltip title="Search IMSI" placement="top">
                      <Button type="submit" color="primary">
                        <SearchOutlinedIcon />
                      </Button>
                      </Tooltip>
                      <Divider className={classes.divider} orientation="vertical" />
                      <Tooltip title="Activate/Deactivate SIM" placement="top">
                        <span onClick={() => setModalSIMActivateShow(true)}>
                        <SIMActivateModal imsi={imsi} show={ModalSIMActivateShow} onHide={() => setModalSIMActivateShow(false)} />
                        </span>   
                      </Tooltip>
                      <Tooltip title="Voice Services" placement="top">
                        <span onClick={() => setModalVoiceServicesShow(true)}>
                        <VoiceServicesModal imsi={imsi} show={ModalVoiceServicesShow} onHide={() => setModalVoiceServicesShow(false)} />
                        </span>   
                      </Tooltip>
                      <Tooltip title="SMS Services" placement="top">
                      <span onClick={() => setModalSMSServicesShow(true)}>
                        <SMSServicesModal imsi={imsi} show={ModalSMSServicesShow} onHide={() => setModalSMSServicesShow(false)} />
                        </span>   
                      </Tooltip>       
                      <Tooltip title="Data Services" placement="top">                 
                      <IconButton type="submit" className={classes.iconButton} aria-label="Data Services" >
                          <SignalCellular3BarOutlinedIcon />
                      </IconButton>    
                      </Tooltip> 
                      <Tooltip title="Roaming Profile" placement="top">                 
                      <IconButton type="submit" className={classes.iconButton} aria-label="Roaming Profile" >
                          <BallotOutlinedIcon />
                      </IconButton>    
                      </Tooltip>                           
                      <Tooltip title="SIM Swap" placement="top">                 
                      <span onClick={() => setModalSIMSwapShow(true)}>
                        <SIMSwapModal imsi={imsi} show={ModalSIMSwapShow} onHide={() => setModalSIMSwapShow(false)} />
                        </span>   
                      </Tooltip> 
                      <Tooltip title="SIM Purge" placement="top">                 
                      <span onClick={() => setModalSIMPurgeShow(true)}>
                        <SIMPurgeModal imsi={imsi} show={ModalSIMPurgeShow} onHide={() => setModalSIMPurgeShow(false)} />
                        </span> 
                      </Tooltip>                       
                      <Tooltip title="Refresh" placement="top">                          
                      <IconButton type="submit" className={classes.iconButton} aria-label="refresh">
                          <RefreshOutlinedIcon />
                      </IconButton>
                      </Tooltip>
                      {/*<div>
                              <IconButton
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                              >
                              <MoreVertOutlinedIcon />
                          </IconButton>
                          <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={openMenu}
                              onClose={handleClose}
                              PaperProps={{
                                  style: {
                                      padding: '2px',
                                  },
                                  }}                                    
                          >
                              {options.map((option) => (
                              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                  {option}
                              </MenuItem>
                              ))}
                          </Menu>
                      </div>*/}
                      </form>}
                    >                          
                  </CardHeader>
                  <CircuitDataProvider imsi={imsi} >
                  <CardContent className={classes.cardContent}>
                    <GeneralDetails />
                  </CardContent>
                  </CircuitDataProvider>
                  </Card>
                </Grid>
              </Grid>
              </Box>
            <Box m={1}>             
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Circuit Core Data" className="noUpperCaseTxt" value="1" />
                        <Tab label="Packet Core Data" className="noUpperCaseTxt" value="2" />
                    </TabList>
                    <CircuitDataProvider imsi={imsi} >
                    <TabPanel value="1"><CsDetails/></TabPanel>
                    </CircuitDataProvider>
                    <DataProvider imsi={imsi} >
                    <TabPanel value="2"><PsDetails/></TabPanel>
                    </DataProvider>
                </TabContext>            
            </Box>
        </div>
    );
}
