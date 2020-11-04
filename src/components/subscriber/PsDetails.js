import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loader-spinner';
import searchViewDataLayerContext from '../../searchViewDataLayerContext';

const drawerWidth = 240;

/*const options = [
    'Enable/Disable APN',
    'Add/Modify Gi DNS',
    'Enable/Disable Online Charging',
    //'Disable Online Charging',
    'Enable/Disable Realtime Policy',
    //'Disable Realtime Policy',
    'Add/Modify Ga Profile',
  ];*/

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

export default function PsDetails() {
    const classes = useStyles();
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    //const [open, setOpen] = React.useState(true);
    /*const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };*/
      
      //const [anchorEl, setAnchorEl] = React.useState(null);
      /*const openMenu = Boolean(anchorEl);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };*/

      const { data, count, loading } = useContext(searchViewDataLayerContext) || {};
      const finalData = [];
      finalData.push(data);
      //const authResult = new URLSearchParams(window.location.search); 
      //const imsi = authResult.get('imsi');
      // Check if the count is zero or undefined to display the no records message
      if(!loading) {
      if((count === 0) || (count === undefined)) {
       return (
           <span className="ml-4">Sorry, No Packet Switch Information available</span>
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
                            <Table size="small" >
                                <TableBody>
                                <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>APN Requested:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.apnRequested ? item.packetSwitch.apnRequested : 'No Data Available'}</TableCell>
                                  </TableRow>
                                <TableRow style={{boader: "none"}}>
                                        <TableCell align="right" className={classes.boaderlessTh}>Up Time:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.upTime ? item.packetSwitch.upTime : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Netork MCC:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.networkMCC ? item.packetSwitch.networkMCC : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>UE IPv4 Address:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ueIpv4Address ? item.packetSwitch.ueIpv4Address :  'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Pri DNS IPv4 Address:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.primaryDnsIpv4Address ? item.packetSwitch.primaryDnsIpv4Address : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Sec DNS IPv6 Address:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.secondaryDnsIpv6Address ? item.packetSwitch.secondaryDnsIpv6Address : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Total Data Volume Used (MB):</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.totalDataVolumeUsed ? item.packetSwitch.totalDataVolumeUsed : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>PGW Ctl Addr:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.s8PgwCtlAddr ? item.packetSwitch.s8PgwCtlAddr : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>SGW Data Addr:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.s8SgwDataAddr ? item.packetSwitch.s8SgwDataAddr : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>Gx Diameter Peer Profile In Use:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.gxPeerProfileInUse ? item.packetSwitch.gxPeerProfileInUse : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right"className={classes.boaderlessTh}>Gx failover count:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.gxFailoverCount ? item.packetSwitch.gxFailoverCount : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>DCCA Profile In Use:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.dccaProfile ? item.packetSwitch.dccaProfile : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>GY Diameter Peer In Use:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.peerProfileInUse ? item.packetSwitch.peerProfileInUse : 'No Data Available'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right" className={classes.boaderlessTh}>GY Failover Count:</TableCell>
                                        <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.failoverCount ? item.packetSwitch.failoverCount : 'No Data Available'}</TableCell>
                                    </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                                </TableBody>
                            </Table>
                        </TableContainer>                                           
                    </Grid>
                    <Grid item xs={2} sm={2} lg={4}>
                        <TableContainer component={Paper} className={classes.boaderlessTable}>
                        <Table  size="small" >
                                <TableBody>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Virtual APN:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.virtualApn ? item.packetSwitch.virtualApn : 'No Data Available'}</TableCell>
                                </TableRow> 
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>RAT Type:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ratType ? item.packetSwitch.ratType : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Network MNC:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.networkMNC ? item.packetSwitch.networkMNC : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>UE IPv6 Address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.networkMNC ? item.packetSwitch.networkMNC : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Sec DNS IPv4 address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.secondaryDnsIpv4Address ? item.packetSwitch.secondaryDnsIpv4Address : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>DL APN AMBR:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.dlApnAmbr ? item.packetSwitch.dlApnAmbr : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow style={{boader: "none"}}>
                                  <TableCell align="right" className={classes.boaderlessTh}>DL Bytes:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.s8DlBytes ? item.packetSwitch.s8DlBytes : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>PGW Data Addr:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.s8PgwDataAddr ? item.packetSwitch.s8PgwDataAddr : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className="customRowClass"></TableCell>
                                  <TableCell align="left" className="customRowClass"></TableCell>
                                </TableRow>
                                <TableRow style={{boader: "none"}}>
                                  <TableCell align="right" className={classes.boaderlessTh}>PCRF Local Hostname:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.pcrfHostname ? item.packetSwitch.pcrfHostname : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>PCRF Destination Hostname:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.pcrfDestinationHost ? item.packetSwitch.pcrfDestinationHost : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>OCS Address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ocsAddress ? item.packetSwitch.ocsAddress : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>OCS Destination Realm:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ocsDestinationRealm ? item.packetSwitch.ocsDestinationRealm : 'No Data Available'}</TableCell>
                                </TableRow>    
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>OCS Destination Hostname:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ocsDestinationHost ? item.packetSwitch.ocsDestinationHost : 'No Data Available'}</TableCell>
                                </TableRow>                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                </TableBody>
                            </Table>
                        </TableContainer>                                            
                    </Grid>                        
                <Grid item xs={2} sm={2} lg={4}>
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                    <Table  size="small" >
                                <TableBody>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Number of PDN Connection:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.numbercontexts ? item.packetSwitch.numbercontexts : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Network:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.networkMCCMNC? item.packetSwitch.networkMCCMNC.replace(/[ ,]+/g, ", ") : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Cell ID:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.cellID ? item.packetSwitch.cellID : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>PDN Type:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.pdnType ? item.packetSwitch.pdnType : 'No Data Available'}</TableCell>
                                </TableRow>    
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>Pri DNS IPv6 Address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.primaryDnsIpv6Address ? item.packetSwitch.primaryDnsIpv6Address : 'No Data Available'}</TableCell>
                                </TableRow>  
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>UL APN AMBR:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.ulApnAmbr ? item.packetSwitch.ulApnAmbr : 'No Data Available'}</TableCell>
                                </TableRow>     
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>UL Bytes:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.sgiUlBytes ? item.packetSwitch.sgiUlBytes : 'No Data Available'}</TableCell>
                                </TableRow>       
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>SGW/SGSN Ctl Address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.s8SgwV4CtlAdr ? item.packetSwitch.s8SgwV4CtlAdr : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className="customRowClass"></TableCell>
                                  <TableCell align="left" className="customRowClass"></TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className={classes.boaderlessTh}>PCRF IP Address:</TableCell>
                                  <TableCell align="left" className={classes.boaderlessTr}>{item.packetSwitch.pcrfAddress ? item.packetSwitch.pcrfAddress : 'No Data Available'}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="right" className="customRowClass"></TableCell>
                                  <TableCell align="left" className="customRowClass"></TableCell>
                                </TableRow> 
                                {item.packetSwitch.ratingGroupDataList.map((rating, index) => {
                                  return(
                                  <React.Fragment key={index}>
                                  <TableRow>
                                    <TableCell align="right" className={classes.boaderlessTh}>Rating Group:</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>{rating.ratingGroup ? rating.ratingGroup : 'No Data Available'}</TableCell>
                                  </TableRow> 
                                  <TableRow>
                                    <TableCell align="right" className={classes.boaderlessTh}>Used Total Octets:</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>{rating.usedTotalOctets ? rating.usedTotalOctets : 'No Data Available'}</TableCell>
                                  </TableRow> 
                                  <TableRow>
                                    <TableCell align="right"className={classes.boaderlessTh}>Diameter Code:</TableCell>
                                    <TableCell align="left" className={classes.boaderlessTr}>{rating.diameterCode ? rating.diameterCode : 'No Data Available'}</TableCell>
                                  </TableRow>
                                  </React.Fragment>    
                                  )
                                })}                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
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
