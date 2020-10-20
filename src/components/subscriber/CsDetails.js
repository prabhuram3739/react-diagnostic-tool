import React, { useState, useContext }  from 'react';
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
import Loader from 'react-loader-spinner';
import searchViewDataLayerContext from '../../searchViewDataLayerContext';

const drawerWidth = 240;

const options = [
    'Enable/Disable APN',
    'Add/Modify Gi DNS',
    'Enable/Disable Online Charging',
    //'Disable Online Charging',
    'Enable/Disable Realtime Policy',
    //'Disable Realtime Policy',
    'Add/Modify Ga Profile',
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
    fontWeight: "500",
    width: '205px',
    minWidth: '205px',
    padding: '6px',
  },   
  boaderlessTr: {
    fontWeight: "700",
    borderBottom: 'none',
    padding: '6px',
  },  
}));

export default function CsDetails() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };
      
      const [anchorEl, setAnchorEl] = React.useState(null);
      const openMenu = Boolean(anchorEl);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const { data, count, loading } = useContext(searchViewDataLayerContext) || {};
      const finalData = [];
      finalData.push(data);
      const authResult = new URLSearchParams(window.location.search); 
      const imsi = authResult.get('imsi');
      // Check if the count is zero or undefined to display the no records message
      if(!loading) {
      if((count === 0) || (count === undefined)) {
       return (
           <span className="ml-4">Sorry, No Circuit Switch Information available</span>
       )
      }
   }


    return(
        <div className={classes.root}>
          { loading ? <div><div className="v-loading-indicator second v-loading-indicator-delay v-loading-indicator-wait" ></div><Loader className="centerDisplayDefaultView mt-5" type="Circles" color="#00BFFF" height={40} width={40} /></div>  :
                (finalData && finalData.length > 0) &&
                finalData.map((item, index) => {
                    return(
                    <React.Fragment key={item.id}>
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                    <Grid item xs={4} sm={4} lg={4}>                    
                        <TableContainer component={Paper} className={classes.boaderlessTable}>
                            <Table  size="small" >
                                <TableBody>
                                <TableRow style={{boader: "none"}}>
                                        <TableCell align="right" className={classes.boaderlessTh}>Subscriber Status</TableCell>
                                        <TableCell align="left" style={{color: "green"}} className={classes.boaderlessTr}>{item.circuitSwitch.subscriberStatus === true ? 'IMSI Active' : 'IMSI Inactive'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>3G APN List:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>
                                        {item.circuitSwitch.threeGApnDataList.map((threeGApnList, index) => {
                                        return(
                                        <span key={index}>{threeGApnList.apn ? threeGApnList.apn : 'No Data Available'}</span>
                                          )
                                        })}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>4G APN List:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>
                                        {item.circuitSwitch.fourGApnDataList.map((fourGApnList, index) => {
                                        return(
                                          <span key={index}>{fourGApnList.apn ? fourGApnList.apn : 'No Data Available'}</span>
                                        )
                                        })}
                                        </TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>VLR Number:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.vlrNumber ? item.circuitSwitch.vlrNumber : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>SGSN Number:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.sgsnNumber ? item.circuitSwitch.sgsnNumber : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>MME-ID:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.mmeId ? item.circuitSwitch.mmeId : 'No Data Available'}</TableCell>
                                    </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                </TableBody>
                            </Table>
                        </TableContainer>                                           
                    </Grid>
                    <Grid item xs={2} sm={2} lg={4}>
                        <TableContainer component={Paper} className={classes.boaderlessTable}>
                        <Table  size="small" >
                                <TableBody>
                                <TableRow style={{boader: "none"}}>
                                        <TableCell align="right" className={classes.boaderlessTh}>Voice MO Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.outgoingCallStatus ? item.circuitSwitch.outgoingCallStatus : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Voice MT Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.incomingCallStatus ? item.circuitSwitch.incomingCallStatus : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>SMS-MO Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.moSmsStatus ? item.circuitSwitch.moSmsStatus : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>SMS-MT Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.mtSmsStatus ? item.circuitSwitch.mtSmsStatus : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>3G DATA - Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.threeGDataStatus ? item.circuitSwitch.threeGDataStatus : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>4G DATA - Status:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.fourGDataStatus ? item.circuitSwitch.fourGDataStatus : 'No Data Available'}</TableCell>
                                    </TableRow>                                      
                                </TableBody>
                            </Table>
                        </TableContainer>                                            
                    </Grid>                        
                <Grid item xs={2} sm={2} lg={4}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table  size="small" >
                                <TableBody>
                                <TableRow style={{boader: "none"}}>
                                        <TableCell align="right" className={classes.boaderlessTh}>3G Roaming Profile:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.threeGDataRoamStatus ? item.circuitSwitch.threeGDataRoamStatus : 'No Data Available'}</TableCell>
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>4G Roaming Profile:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.fourGDataStatus ? item.circuitSwitch.fourGDataStatus : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Prepaid/Camel Data:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.camelSubscriptionStatus ? item.circuitSwitch.camelSubscriptionStatus : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>CS Raoming Profile:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.camelSubscriptionStatus ? item.circuitSwitch.camelSubscriptionStatus : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>PS Roaming Profile::</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.camelSubscriptionStatus ? item.circuitSwitch.camelSubscriptionStatus : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>EPS Roaming Profile:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.circuitSwitch.camelSubscriptionStatus ? item.circuitSwitch.camelSubscriptionStatus : 'No Data Available'}</TableCell>
                                    </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                </TableBody>
                            </Table>
                    </TableContainer>                                            
                </Grid>                                         
            </Grid>
            </React.Fragment>
            )
          })
          }
        </div>
    );
}