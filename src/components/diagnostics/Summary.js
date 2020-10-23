import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SignalCellular3BarOutlinedIcon from '@material-ui/icons/SignalCellular3BarOutlined';
import SignalCellularAltOutlinedIcon from '@material-ui/icons/SignalCellularAltOutlined';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import DefaultViewDataLayerContext, { DefaultViewDataProvider } from '../../DefaultViewDataLayerContext';
import Loader from 'react-loader-spinner';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import ApnEnableDisableModal from './apnEnableDisableModal/ApnEnableDisableModal';
import GIDNSModal from './giDNSModal/GIDNSModal';
import GYInlineModal from './gyInlineModal/GYInlineModal';
import ClearSubscriberModal from './clearSubscriberModal/ClearSubscriberModal';
import GYBypassModal from './gyBypassModal/GYBypassModal';
import GAProfileModal from './gaProfileModal/GAProfileModal';
import ApnShutdownGXInlineModal from './apnShutdownGXInlineModal/APNShutdownGXInlineModal';
import APNShutdownGXBypassModal from './apnShutdownGXBypassModal/APNShutdownGXBypassModal';

const drawerWidth = 240;

const options = [
    'Clear Subscriber',
    'APN Enable/Disable',
    'GI DNS - Add/Modify',
    'GY Inline',
    'GY Bypass',
    'GX Inline',
    'GX Bypass',
    'Ga Profile - Add/Modify',
  ];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarIconHidden: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#001235',
    //width: `calc(100%)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    background: '#001235',
    //marginLeft: drawerWidth,
    //width: `calc(100%)`,
    //width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',      
    ...theme.mixins.toolbar,
  },
  menuButtonHidden: {
    display: 'none',
  },
  ListItemIcon: {
    minWidth: '36px',      
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    marginTop: '60px',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    marginTop: '60px',
    position: 'relative',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
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
  fixedHeight: {
    height: 200,
  },
  boaderlessTable: {
    border: 'none',
    boxShadow: 'none',
  },  
  boaderlessTh: {
    color: '#094391',
    fontWeight: "700",
  },   
}));

export default function Summary(props) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState(true);
    const [ ModalAPNEnableDisableShow, setModalAPNEnableDisableShow ] = React.useState(false);
    const [ ModalGIDNSShow, setModalGIDNSShow ] = React.useState(false);
    const [ ModalGYInlineShow, setModalGYInlineShow ] = React.useState(false);
    const [ ModalGYBypassShow, setModalGYBypassShow ] = React.useState(false);
    const [ ModalGXInlineShow, setModalGXInlineShow ] = React.useState(false);
    const [ ModalGXBypassShow, setModalGXBypassShow ] = React.useState(false);
    const [ ModalGAModifyShow, setModalGAModifyShow ] = React.useState(false);
    const [ ModalClearSubscriberShow, setModalClearSubscriberShow ] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };
      
      const [anchorEl, setAnchorEl] = React.useState(null);
      const openMenu = Boolean(anchorEl);
      const [refreshAnchorEl, setRefreshAnchorEl] = React.useState(null);
      const openRefreshMenu = Boolean(refreshAnchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleRefreshClick = (event) => {
        setRefreshAnchorEl(event.currentTarget);
      };
    
      const handleRefreshClose = () => {
        setRefreshAnchorEl(null);
      };
      const toCamelCase = (str) => {
          console.log(str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()));
          return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }
      let [refreshBoolean, setRefreshBoolean] = useState(false);
    let [refreshStatus, setRefreshStatus] = useState(false);
    let [buttonText, setButtonText] = useState("Enable");
    let [timeInterval, setTimeInterval] = useState(3000);
    let [autoRefresh, setAutoRefresh] = useState("Disable");
      const { data, count, loading } = useContext(DefaultViewDataLayerContext) || {};
      const finalData = [];
      finalData.push(data.packetSwitchAdminDefaultViewVO);
      // Check if the count is zero or undefined to display the no records message
      if(!loading) {
        if((count === 0) || (count === undefined)) {
         return (
         <span className="ml-4">Sorry, No Information available</span>
         )
        }
       }
    return(
        <div className={classes.root}>
            <Grid container spacing={1} direction="column" alignContent="center" alignItems="stretch" justify="space-around" >
                <Grid item style={{width: "100%", padding: "0px"}}  xs={false} sm={false} lg={false} xl={false}>
                    <form className={classes.root} action="/dashboard/subscriber/" autoComplete="off" style={{float: "right"}}>
                        <TextField id="outlined-basic" label="Search IMSI" name = "imsi" variant="outlined" size="small" required />
                        <Tooltip title="Search IMSI" placement="top">
                        <Button type="submit" color="primary">
                            <SearchOutlinedIcon />
                        </Button>
                        </Tooltip>
                        <Divider className={classes.divider} orientation="vertical" />
                        <Tooltip title="Clear Subscriber" placement="top">
                        <span onClick={() => setModalClearSubscriberShow(true)}>
                        <ClearSubscriberModal show={ModalClearSubscriberShow} onHide={() => setModalClearSubscriberShow(false)} />
                        </span>   
                        </Tooltip>
                        <Tooltip title="Enable/Disable APN" placement="top">
                        <span onClick={() => setModalAPNEnableDisableShow(true)}>
                        <ApnEnableDisableModal show={ModalAPNEnableDisableShow} onHide={() => setModalAPNEnableDisableShow(false)} />
                        </span>
                        </Tooltip>
                        <Tooltip title="Add/Modify Gi DNS" placement="top">
                        <span onClick={() => setModalGIDNSShow(true)}>
                        <GIDNSModal show={ModalGIDNSShow} onHide={() => setModalGIDNSShow(false)} />
                        </span>
                        </Tooltip>       
                        <Tooltip title="Enable/Disable Online Charging" placement="top">                 
                        <span onClick={() => setModalGYInlineShow(true)}>
                        <GYInlineModal show={ModalGIDNSShow} onHide={() => setModalGYInlineShow(false)} />
                        </span>   
                        </Tooltip>     
                        <Tooltip title="Enable/Disable Realtime Policy" placement="top">                                     
                        <span onClick={() => setModalGYBypassShow(true)}>
                        <GYBypassModal show={ModalGYBypassShow} onHide={() => setModalGYBypassShow(false)} />
                        </span>   
                        </Tooltip> 
                        <Tooltip title="GX Inline" placement="top">
                        <span onClick={() => setModalGXInlineShow(true)}>
                        <ApnShutdownGXInlineModal show={ModalGXInlineShow} onHide={() => setModalGXInlineShow(false)} />
                        </span> 
                        </Tooltip>
                        <Tooltip title="GX Bypass" placement="top">
                        <span onClick={() => setModalGXBypassShow(true)}>
                        <APNShutdownGXBypassModal show={ModalGXBypassShow} onHide={() => setModalGXBypassShow(false)} />
                        </span> 
                        </Tooltip>
                        <Tooltip title="Add/Modify Ga Profile" placement="top">
                        <span onClick={() => setModalGAModifyShow(true)}>
                        <GAProfileModal show={ModalGAModifyShow} onHide={() => setModalGAModifyShow(false)} />
                        </span> 
                        </Tooltip>
                        <IconButton
                                aria-label="more"
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                onClick={handleRefreshClick}
                        >
                        <Tooltip title="Refresh" placement="top">                          
                        <RefreshOutlinedIcon />
                        </Tooltip>
                        </IconButton>
                        <Menu
                        id="fade-menu"
                        anchorEl={refreshAnchorEl}
                        keepMounted
                        open={openRefreshMenu}
                        onClose={handleRefreshClose}
                        PaperProps={{
                            style: {
                                padding: '2px',
                            },
                        }}           
                        TransitionComponent={Fade}
                        >
                        <MenuItem>
                        <input className="reducedPaddingTop" disabled={(autoRefresh === 'Disable') ? true : false} type="checkbox" onChange={ () => { refreshBoolean ?  props.passData(!props.refresh, props.refreshStatus, timeInterval) && setRefreshBoolean(false) : props.passData(props.refresh, props.refreshStatus, timeInterval) && setRefreshBoolean(true); refreshStatus ? props.passData(!props.refresh, !props.refreshStatus, timeInterval) && setRefreshStatus(false) : props.passData(props.refresh, props.refreshStatus, timeInterval) && setRefreshStatus(true); (buttonText === 'Enable') ? setButtonText('Disable') : setButtonText('Enable'); 
                        timeInterval === 10000 ? props.passData(!props.refreshStatus, !props.refreshBoolean, 10000) && setTimeInterval(timeInterval) : timeInterval === 60000 ? props.passData(!props.refreshStatus, !props.refreshBoolean, 60000) && setTimeInterval(timeInterval) : timeInterval === 120000 ? props.passData(!props.refreshStatus, !props.refreshBoolean, 120000) && setTimeInterval(timeInterval) : timeInterval === 300000 ? props.passData(!props.refreshStatus, !props.refreshBoolean, 300000) && setTimeInterval(timeInterval) : timeInterval === 600000 ? props.passData(!props.refreshStatus, !props.refreshBoolean, 600000) && setTimeInterval(timeInterval) : props.passData(!refreshStatus, !refreshBoolean, 3000) && setTimeInterval(0); }}/>
                        <span className="autoRefreshTxt ml-1">Auto refresh</span>
                        </MenuItem>
                        <MenuItem>
                        <input type="radio" checked={timeInterval === 10000 ?  true : false} onChange={ () => { timeInterval === 3000? setTimeInterval(10000) : setTimeInterval(3000); (autoRefresh === 'Disable') ? setAutoRefresh('Enable') : setAutoRefresh('Disable'); }}/> 10 Seconds 
                        </MenuItem>
                        <MenuItem>
                        <input type="radio" checked={timeInterval === 60000 ?  true : false} onChange={ () => { timeInterval === 3000? setTimeInterval(60000) : setTimeInterval(3000); (autoRefresh === 'Disable') ? setAutoRefresh('Enable') : setAutoRefresh('Disable'); }}/> 1 Minute
                        </MenuItem>
                        <MenuItem>
                        <input type="radio" checked={timeInterval === 120000 ?  true : false} onChange={ () => { timeInterval === 3000? setTimeInterval(120000) : setTimeInterval(3000); (autoRefresh === 'Disable') ? setAutoRefresh('Enable') : setAutoRefresh('Disable'); }}/> 2 Minutes 
                        </MenuItem>
                        <MenuItem>
                        <input type="radio" checked={timeInterval === 300000 ?  true : false} onChange={ () => { timeInterval === 3000? setTimeInterval(300000) : setTimeInterval(3000); (autoRefresh === 'Disable') ? setAutoRefresh('Enable') : setAutoRefresh('Disable'); }}/> 5 Minutes 
                        </MenuItem>
                        <MenuItem>
                        <input type="radio" checked={timeInterval === 600000 ?  true : false} onChange={ () => { timeInterval === 3000? setTimeInterval(600000) : setTimeInterval(3000); (autoRefresh === 'Disable') ? setAutoRefresh('Enable') : setAutoRefresh('Disable'); }}/> 10 Minutes
                        </MenuItem>
                        </Menu>
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
                    </form>
                </Grid>
               { loading ? <div><div className="v-loading-indicator second v-loading-indicator-delay v-loading-indicator-wait" ></div><Loader className="centerDisplayDefaultView mt-5" type="Circles" color="#00BFFF" height={40} width={40} /></div>  :
                (finalData && finalData.length > 0) &&
                finalData.map((item, index) => {
                    return(
                    <React.Fragment key={item.id}>
                <Grid item style={{width: "100%"}}  xs={false} sm={false} lg={false} xl={false}>
                    <Card style={{width: "100%", backgroundColor: "#b3e5fc"}} className={classes.card} elevation={3} component="div" >
                        <CardContent >
                            <Grid container spacing={1} alignContent="center" alignItems="center" justify="space-around" boxshadow="none">
                                <Grid item xs={false} sm={false} lg={false}>
                                <Paper className={classes.paper} elevation={0} style={{backgroundColor: "inherit"}} >
                                        <Typography component="h4" variant="h6" color="primary" className={classes.title} align="center">
                                        {item.packetSwitchAdminDefaultHeaderVO.totalNumberOfUes ? item.packetSwitchAdminDefaultHeaderVO.totalNumberOfUes : 'No Data Available'}
                                        </Typography>                                          
                                        <List dense>
                                            <ListItem >
                                                <ListItemIcon className={classes.ListItemIcon} >
                                                    <PhoneAndroidOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Total UEs" />
                                            </ListItem>  
                                        </List>
                                    </Paper>
                                </Grid>
                                <Divider className={classes.divider} orientation="vertical" />
                                <Grid item xs={false} sm={false} lg={false}>
                                    <Paper className={classes.paper} elevation={0} style={{backgroundColor: "inherit"}}>
                                        <Typography component="h4" variant="h6" color="primary" padding="12" display="inline" className={classes.title} align="center">
                                        {item.packetSwitchAdminDefaultHeaderVO.ltePdnSessions ? item.packetSwitchAdminDefaultHeaderVO.ltePdnSessions : 'No Data Available'}
                                        </Typography>
                                        <List dense>
                                            <ListItem >
                                                <ListItemIcon className={classes.ListItemIcon} >
                                                    <SignalCellular3BarOutlinedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="LTE PDN Sessions" />
                                            </ListItem>  
                                        </List>                                        
                                    </Paper>
                                </Grid>
                                <Divider className={classes.divider} orientation="vertical" />
                                <Grid item xs={false} sm={false} lg={false}>
                                <Paper className={classes.paper} elevation={0} style={{backgroundColor: "inherit"}}>
                                        <Typography component="h4" variant="h6" color="primary" padding="12" display="inline" className={classes.title} align="center">
                                        {item.packetSwitchAdminDefaultHeaderVO.twoGthreeGPdnSessions ? item.packetSwitchAdminDefaultHeaderVO.twoGthreeGPdnSessions : 'No Data Available'}
                                        </Typography>
                                        <List dense>
                                            <ListItem >
                                                <ListItemIcon className={classes.ListItemIcon} >
                                                    <SignalCellularAltOutlinedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="2G/3G SESSIONs" />
                                            </ListItem>  
                                        </List>                                          
                                    </Paper>
                                </Grid>  
                                <Divider className={classes.divider} orientation="vertical" />
                                <Grid item xs={false} sm={false} lg={false}>
                                <Paper className={classes.paper} elevation={0} style={{backgroundColor: "inherit"}}>
                                        <Typography component="h4" variant="h6" color="primary" padding="12" display="inline" className={classes.title} align="center">
                                        {item.packetSwitchAdminDefaultHeaderVO.realApns ? item.packetSwitchAdminDefaultHeaderVO.realApns : 'No Data Available'}
                                        </Typography>
                                        <List dense>
                                            <ListItem >
                                                <ListItemIcon className={classes.ListItemIcon} >
                                                    <PublicOutlinedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="TOTAL APNs" />
                                            </ListItem>  
                                        </List>                                          
                                    </Paper>
                                </Grid> 
                                <Divider className={classes.divider} orientation="vertical" />  
                                <Grid item xs={false} sm={false} lg={false}>
                                <Paper className={classes.paper} elevation={0} style={{backgroundColor: "inherit"}}>
                                        <Typography component="h4" variant="h6" color="primary" padding="12" display="inline" className={classes.title} align="center">
                                        10d 15:22:54
                                        </Typography>
                                        <List dense>
                                            <ListItem >
                                                <ListItemIcon className={classes.ListItemIcon} >
                                                    <AccessTimeOutlinedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="SYSTEM UPTIME" />
                                            </ListItem>  
                                        </List>                                         
                                    </Paper>
                                </Grid>                                             
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>


                {/* Hardware Summary Card */}
                <Grid item xs={false} sm={false} lg={false}>
                    <Grid container spacing={1} alignContent="stretch" direction="row" alignItems="stretch" justify="space-between">
                    <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard"  elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Hardware Details'}
                            />
                            <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow className={classes.boaderlessTh}>
                                                <TableCell align="left" className={classes.boaderlessTh}>Homers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Roamers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Visitors</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Buffered Gy CCRs</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Buffered Ga CDRs</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>NTP Admin Status</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>NTP Operational Status</TableCell>
                                            </TableRow>                                                                                                                                                                  
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.homers ? item.packetSwitchAdminDefaultHeaderVO.homers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.roamers ? item.packetSwitchAdminDefaultHeaderVO.roamers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.visitors ? item.packetSwitchAdminDefaultHeaderVO.visitors : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.gyCcrsBuffered ? item.packetSwitchAdminDefaultHeaderVO.gyCcrsBuffered : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.gACdrsBuffered ? item.packetSwitchAdminDefaultHeaderVO.gACdrsBuffered : 'No Data Available'}</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                            </TableRow>                                                                                                                                                                                                                                                                                                                          
                                        </TableBody>
                                    </Table>
                                </TableContainer>                                            
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard"  elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Sessions & Bearer Details'}
                            />
                            <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow className={classes.boaderlessTh}>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv4 PDN Sessions</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv6 PDN Sessions</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv4v6 PDN Sessions</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv4 Bearers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv6 Bearers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Ipv4v6 Bearers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Default Bearers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Dedicated Bearers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Bearers</TableCell>
                                            </TableRow>                                                                                                                                                                  
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv4PdnSessions ? item.packetSwitchAdminDefaultHeaderVO.ipv4PdnSessions : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv6PdnSessions ? item.packetSwitchAdminDefaultHeaderVO.ipv6PdnSessions : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv4v6PdnSessions ? item.packetSwitchAdminDefaultHeaderVO.ipv4v6PdnSessions : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv4Bearers ? item.packetSwitchAdminDefaultHeaderVO.ipv4Bearers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv6Bearers ? item.packetSwitchAdminDefaultHeaderVO.ipv6Bearers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.ipv4v6Bearers ? item.packetSwitchAdminDefaultHeaderVO.ipv4v6Bearers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.defaultBearers ? item.packetSwitchAdminDefaultHeaderVO.defaultBearers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.dedicatedBearers ? item.packetSwitchAdminDefaultHeaderVO.dedicatedBearers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.bearers ? item.packetSwitchAdminDefaultHeaderVO.bearers : 'No Data Available'}</TableCell>
                                            </TableRow>                                                                                                                                                                                                                                                                                                                          
                                        </TableBody>
                                    </Table>
                                </TableContainer>                                            
                            </CardContent>
                        </Card>
                    </Grid>

                    
                        <Grid item xs={3} sm={3} lg={6}>                    
                            <Card className="customCard"  elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Card Summary'}
                            />
                            <CardContent className={classes.cardContent}>
                                <TableContainer component={Paper} className={classes.boaderlessTable}>
                                   {/*} <Table  size="small" >
                                        <TableHead>
                                            <TableRow className={classes.boaderlessTh}>
                                                <TableCell align="left" className={classes.boaderlessTh}>Homers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Roamers</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Visitors</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Buffered Gy CCRs</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Buffered Ga CDRs</TableCell>
                                            </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.homers ? item.packetSwitchAdminDefaultHeaderVO.homers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.roamers ? item.packetSwitchAdminDefaultHeaderVO.roamers : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.visitors ? item.packetSwitchAdminDefaultHeaderVO.visitors : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.gyCcrsBuffered ? item.packetSwitchAdminDefaultHeaderVO.gyCcrsBuffered : 'No Data Available'}</TableCell>
                                                <TableCell align="left">{item.packetSwitchAdminDefaultHeaderVO.gACdrsBuffered ? item.packetSwitchAdminDefaultHeaderVO.gACdrsBuffered : 'No Data Available'}</TableCell>
                                            </TableRow>                                                                                                                                                                                                                                                                                                                          
                                        </TableBody>
                    </Table>*/}

                                    {/* Slot Table */}
                                    <Table  size="small" >
                                        <TableHead>
                                            <TableRow className={classes.boaderlessTh}>
                                                <TableCell align="left" className={classes.boaderlessTh}>Slot</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Type</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Admin State</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Operational State</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>CPU Utilization</TableCell>
                                                <TableCell align="left" className={classes.boaderlessTh}>Memory pool Utilization</TableCell>
                                            </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">1</TableCell>
                                                <TableCell align="left">iom-v</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                            </TableRow> 
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">3</TableCell>
                                                <TableCell align="left">iom-v-mg</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                            </TableRow>    
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">A</TableCell>
                                                <TableCell align="left">cpm-v</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                            </TableRow>    
                                            <TableRow style={{boader: "none"}}>
                                                <TableCell align="left">B</TableCell>
                                                <TableCell align="left">cpm-v</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                                <TableCell align="left" style={{color: "green"}}>Up</TableCell>
                                            </TableRow>                                                                                                                                                                                                                                                                                                                           
                                        </TableBody>
                                    </Table>
                                    </TableContainer>                                           
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard"  elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Gy Connections'}
                            />
                            <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow style={{boader: "none"}}>
                                            <TableCell align="left" className={classes.boaderlessTh}>Diameter Peer</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Peer Address</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Path Mgmt State</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Detail State</TableCell>
                                        </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                        {(item.gyStatisticsList !== null) && item.gyStatisticsList.map((gyStatistics, index) => {
                                        return(
                                        <TableRow key={index} style={{boader: "none"}}>
                                            <TableCell align="left">{gyStatistics.diaPeerProf ? gyStatistics.diaPeerProf : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{gyStatistics.peerAddress ? gyStatistics.peerAddress : 'No Data Available'} </TableCell>
                                            <TableCell align="left" style={{color: (gyStatistics.pathMgmtState === 'Inactive') ?  "red" : "green"}}>{gyStatistics.pathMgmtState ? gyStatistics.pathMgmtState : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{gyStatistics.detailState ? gyStatistics.detailState : 'No Data Available'}</TableCell>
                                        </TableRow>
                                        )})
                                    }                                                                                                                                                                                                   
                                        </TableBody>
                                    </Table>
                                </TableContainer>                                            
                            </CardContent>
                        </Card>
                    </Grid> 

                    <Grid item xs={3} sm={3} lg={6}>
                    <Card className="customCard"  elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Gx Connections'}
                            />
                            <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow style={{boader: "none"}}>
                                            <TableCell align="left" className={classes.boaderlessTh}>Diameter Peer</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Address</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Path Mgmt State</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Detail State</TableCell>
                                        </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                        {(item.gxStatisticsList !== null) && item.gxStatisticsList.map((gxStatistics, index) => {
                                        return(
                                        <TableRow key={index} style={{boader: "none"}}>
                                            <TableCell align="left">{gxStatistics.diaPeerProf ? gxStatistics.diaPeerProf : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{gxStatistics.peerAddress ? gxStatistics.peerAddress : 'No Data Available'}</TableCell>
                                            <TableCell align="left" style={{color: (gxStatistics.pathMgmtState === 'Inactive') ?  "red" : "green"}}>{gxStatistics.pathMgmtState ? gxStatistics.pathMgmtState : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{gxStatistics.detailState ? gxStatistics.detailState : 'No Data Available'}</TableCell>
                                        </TableRow>  
                                        )})
                                    }
                                    </TableBody>
                                    </Table>
                                    </TableContainer>                                            
                            </CardContent >
                        </Card>
                        </Grid>
                        
                        <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard"  elevation={3} component="div">
                        <CardHeader 
                            //title={'Node'}
                            subheader={'Sx Associations'}
                        />
                        <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow >
                                            <TableCell align="left" className={classes.boaderlessTh}>UP Association</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Address</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Path Mgmt State</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Last Modified</TableCell>
                                        </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                        {(item.sxStatisticsList !== null) && item.sxStatisticsList.map((sxStatistics, index) => {
                                        return(
                                        <TableRow key={index} style={{boader: "none"}}>
                                            <TableCell align="left" style={{color: (sxStatistics.uPAssociation === 'Down') ?  "red" : "green"}}>{(sxStatistics.uPAssociation && sxStatistics.uPAssociation === 'down') ? 'Down' : (sxStatistics.uPAssociation && sxStatistics.uPAssociation === 'up') ? 'Up' : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{sxStatistics.peerAddress ? sxStatistics.peerAddress : 'No Data Available'}</TableCell>
                                            <TableCell align="left" style={{color: (sxStatistics.pathMgmtState === 'down') ?  "red" : "green"}}>{(sxStatistics.pathMgmtState && sxStatistics.pathMgmtState === 'down') ? 'Down' : (sxStatistics.pathMgmtState && sxStatistics.pathMgmtState === 'up') ? 'Up' : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{sxStatistics.lastChangeTime ? sxStatistics.lastChangeTime : 'No Data Available'}</TableCell>
                                        </TableRow>
                                        )})
                                        }                                                                                                                                                                                                  
                                        </TableBody>
                                    </Table>
                                    </TableContainer>                                                                     
                            </CardContent>
                        </Card>
                        </Grid>

                        <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard" elevation={3} component="div">
                        <CardHeader 
                            //title={'Node'}
                            subheader={'Ga Connections'}
                        />
                        <CardContent className={classes.cardContent}>
                        <TableContainer component={Paper} className={classes.boaderlessTable}>
                            <Table  size="small" >
                                <TableHead>
                                <TableRow style={{boader: "none"}}>
                                    <TableCell align="left" className={classes.boaderlessTh}>GTP Primary Group</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTh}>Address</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTh}>Operational State</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTh}>Up Time</TableCell>
                                </TableRow>                                                                                                                                                              
                                </TableHead>
                                <TableBody>
                                {(item.gaStatisticsList !== null) && item.gaStatisticsList.map((gaStatistics, index) => {
                                return(
                                <TableRow key={index} style={{boader: "none"}}>
                                    <TableCell align="left">{gaStatistics.gtpPrimGrp ? gaStatistics.gtpPrimGrp : 'No Data Available'}</TableCell>
                                    <TableCell align="left">{gaStatistics.peerAddress ? gaStatistics.peerAddress : 'No Data Available'}</TableCell>
                                    <TableCell align="left" style={{color: "red"}}>{(gaStatistics.operState && gaStatistics.operState === 'down') ? 'Down' : (gaStatistics.operState && gaStatistics.operState === 'up') ? 'Up' : 'No Data Available'}</TableCell>
                                    <TableCell align="left">{gaStatistics.upTime ? gaStatistics.upTime : 'No Data Available'}</TableCell>
                                </TableRow>  
                                )})
                                }                                                                                                                                                              
                                </TableBody>
                            </Table>
                        </TableContainer>                                            
                        </CardContent>
                        </Card>
                        </Grid>

                        <Grid item xs={3} sm={3} lg={6}>
                        <Card className="customCard" elevation={3} component="div">
                            <CardHeader 
                                //title={'Node'}
                                subheader={'Radius Connections'}
                            />
                            <CardContent className={classes.cardContent}>
                            <TableContainer component={Paper} className={classes.boaderlessTable}>
                                    <Table  size="small" >
                                        <TableHead>
                                        <TableRow style={{boader: "none"}}>
                                            <TableCell align="left" className={classes.boaderlessTh}>Group</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Peer Address</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Operational State</TableCell>
                                            <TableCell align="left" className={classes.boaderlessTh}>Admin State</TableCell>
                                        </TableRow>                                                                                                                                                              
                                        </TableHead>
                                        <TableBody>
                                        {(item.radStatisticsList !== null) && item.radStatisticsList.map((radStatistics, index) => {
                                        return(
                                        <TableRow key={index} style={{boader: "none"}}>
                                            <TableCell align="left">{radStatistics.groupName ? radStatistics.groupName : 'No Data Available'}</TableCell>
                                            <TableCell align="left">{radStatistics.peerAddress ? radStatistics.peerAddress : 'No Data Available'}</TableCell>
                                            <TableCell align="left" style={{color: "green"}}>{radStatistics.operationState ? radStatistics.operationState : 'No Data Available'}</TableCell>
                                            <TableCell align="left" style={{color: "green"}}>{(radStatistics.adminState && radStatistics.adminState === 'up') ? 'Up' : (radStatistics.adminState && radStatistics.adminState === 'down') ? 'Down' : 'No Data Available'}</TableCell>
                                        </TableRow>
                                        )})
                                        }                                                                                                                                                                                                 
                                        </TableBody>
                                    </Table>
                                    </TableContainer>                                            
                                </CardContent>
                            </Card>
                        </Grid>                     
                        </Grid>
                        </Grid>
                </React.Fragment>
                    )
})
}
            </Grid>
        </div>
    );
}
