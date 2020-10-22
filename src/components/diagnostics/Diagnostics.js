import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import DefaultViewDataLayerContext, { DefaultViewDataProvider } from '../../DefaultViewDataLayerContext';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { withRouter } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';

import Summary from './Summary';

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    let [refreshBoolean, setRefreshBoolean] = useState(false);
    let [refreshStatus, setRefreshStatus] = useState(false);
    let [buttonText, setButtonText] = useState("Enable");
    let [timeInterval, setTimeInterval] = useState(3000);
    let [autoRefresh, setAutoRefresh] = useState("Disable");
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div>
          
                
                
                <Toolbar>
    <Grid
      justify="space-between" // Add it here :)
      container 
      spacing={10}
    >
      <Grid item>
      <Typography component="h1" variant="h6" color="inherit" padding="12" display="inline" className={classes.title}>
                Diagnostics
      </Typography>
      </Grid>

      <Grid item>
        <div>
        <InputLabel>Current Date & Time: </InputLabel>{Date().toLocaleString()}
        </div>
      </Grid>
    </Grid>
  </Toolbar>
           
            <Box m={1}>
            <DefaultViewDataProvider time={Date().toLocaleString()} imsi={queryString.parse(location.search).imsi}  refresh={refreshBoolean} refreshStatus={refreshStatus} timeInterval={timeInterval} >
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="AMS PROD CMG" value="1" />
                        <Tab label="FRA PROD CMG" value="2" />
                        <Tab label="Staging CMG" value="3" />
                    </TabList>
                    <TabPanel value="1"><Summary refresh={refreshBoolean} refreshStatus={refreshStatus} timeInterval={timeInterval} passData = {(refreshStatus, refreshBoolean, timeInterval) => { setTimeInterval(timeInterval); setRefreshBoolean(refreshBoolean); setRefreshStatus(refreshStatus)}}/></TabPanel>
                    <TabPanel value="2"><Summary /></TabPanel>
                    <TabPanel value="3"><Summary /></TabPanel>
                </TabContext>

            </DefaultViewDataProvider>           
            </Box>
        </div>
    );
}