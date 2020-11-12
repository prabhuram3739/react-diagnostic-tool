import React, { useContext }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loader-spinner';
import circuitViewDataLayerContext from '../../circuitViewDataLayerContext';

const drawerWidth = 240;

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
    fontWeight: "500",
    borderBottom: 'none',
    padding: '6px',
  },  
}));

export default function GeneralDetails() {
    const classes = useStyles();

      const { data, count, loading } = useContext(circuitViewDataLayerContext) || {};
      const finalData = [];
      finalData.push(data);
      //const authResult = new URLSearchParams(window.location.search); 
      //const imsi = authResult.get('imsi');
      // Check if the count is zero or undefined to display the no records message
      if(!loading) {
      if((count === 0) || (count === undefined)) {
       return (
           <span className="ml-4">Sorry, No General Information available</span>
       )
      }
   }


    return(
        <div className={classes.root}>
          { loading ? <div><div className="v-loading-indicator second v-loading-indicator-delay v-loading-indicator-wait" ></div><Loader className="centerDisplayDefaultView mt-5" type="Circles" color="#00BFFF" height={40} width={40} /></div>  :
                (finalData && finalData.length > 0) &&
                finalData.map((item, index) => {
                    if(item.iccid) {
                    return(
                    <React.Fragment key={item.iccid}>
                <Grid container spacing={1} alignContent="center" alignItems="stretch" justify="space-between">
                    <Grid item xs={4} sm={4} lg={4}>                    
                    <TableContainer component={Paper} className={classes.boaderlessTable}>
                      <Table size="small">
                              <TableBody>
                                  <TableRow className={classes.boaderlessTh}>
                                      <TableCell align="right" className={classes.boaderlessTh}>IMSI:</TableCell>
                                      <TableCell align="left" className={classes.boaderlessTr}>{item.imsi ? item.imsi : 'No Data Available'}</TableCell>
                                  </TableRow>                                                                                                                                                              
                                  <TableRow style={{boader: "none"}}>
                                      <TableCell align="right" className={classes.boaderlessTh}>ICCID:</TableCell>
                                      <TableCell align="left" className={classes.boaderlessTr}>{item.iccid ? item.iccid : 'No Data Available'}</TableCell>
                                  </TableRow>  
                                  <TableRow style={{boader: "none"}}>
                                      <TableCell align="right" className={classes.boaderlessTh}>MSISDN:</TableCell>
                                      <TableCell align="left" className={classes.boaderlessTr}>{item.gprsMsisdn ? item.gprsMsisdn : 'No Data Available'}</TableCell>
                                  </TableRow> 
                              </TableBody>
                          </Table>
                          </TableContainer>                                          
                    </Grid>                                        
            </Grid>
            </React.Fragment>
            )
            } else {
                return "";
            }
          })
          }
        </div>
    );
}
