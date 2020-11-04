import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';


import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SimCardOutlinedIcon from '@material-ui/icons/SimCardOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';

import { Link, Route, Switch } from 'react-router-dom';

import Diagnostics from '../diagnostics/Diagnostics';
import Subscriber from '../subscriber/Subscriber';
import Subscriptions from '../simmanagement/Subscriptions';

import nokia_logo from '../../nokia_logo.jpg';

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  formControl: {
    margin: theme.spacing(0),
    minWidth: 180,
    //maxHeight: 20,
    backgroundColor: '#001235',
    //color: '#fff',
    borderColor: '#fff',
    paddingRight: '15px',
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
    color: '#fff',
    maxHeight: 30,
    "& .PrivateNotchedOutline-root-20.MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff"
    },
    "& .MuiSvgIcon-root.MuiSelect-icon": {
      color: "#fff"
    },
    backgroundColor: '#001235',
  },  
  link: {
    textDecoration: 'none',
    color: 'rgb(0, 0, 0, 0.87)',
  },     
}));

export default function Dashboard(match) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [tenant, setTenant] = React.useState('10');

  const handleChange = (event) => {
    setTenant(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <img src={nokia_logo} alt="Nokia Logo"/> 
          <Typography component="h1" variant="h6" color="inherit" padding="12" noWrap className={classes.title}>
          &nbsp;&nbsp;WING&nbsp;Elektra Platform
          </Typography>
        
          <Typography component="h5" variant="button" color="inherit" padding="12" noWrap>
            Tenant&nbsp;&nbsp;
          </Typography>
        <FormControl size="small" margin="none" className={classes.formControl}>
          <Select
            variant="outlined"
            id="demo-simple-select-outlined"
            value={tenant}
            onChange={handleChange}
            className={classes.selectEmpty}
          >

            <MenuItem value={10}>Admin</MenuItem>
            <MenuItem value={15}>Tele2</MenuItem>
            <MenuItem value={20}>Marubani</MenuItem>
            <MenuItem value={30}>US Cellular</MenuItem>
            <MenuItem value={40}>AT&amp;T</MenuItem>
          </Select>
        </FormControl>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
              <AccountCircleOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
          <IconButton 
            edge="start"
            color="inherit"          
            className={clsx(classes.toolbarIcon, !open && classes.toolbarIconHidden)}
            onClick={handleDrawerClose}>
            <MenuOpenOutlinedIcon style={{ color: '#001235' }}/>
          </IconButton>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuOutlinedIcon style={{ color: '#001235' }}/>
          </IconButton>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DashboardOutlinedIcon style={{ color: '#001235' }}  />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/simmanagement/Subscriptions"  className={classes.link}>
            <ListItem button>
              <ListItemIcon >
                <SimCardOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="SIM Management" />
            </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <BusinessOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="Account Management" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HomeWorkOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="Resource Management" />
            </ListItem>            
            <ListItem button>
              <ListItemIcon>
                <MonetizationOnOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="Rating Management" />
            </ListItem>
          
            <ListItem button>
              <ListItemIcon>
                <AssessmentOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
        </List>
        <Divider />
        <List>
          <div>
            <ListItem button>
              <ListItemIcon>
                <SettingsOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="Administration" />
            </ListItem>   
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineOutlinedIcon style={{ color: '#001235' }}/>
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
            <Link to="/dashboard/diagnostics"  className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LocalHospitalOutlinedIcon style={{ color: '#001235' }}/>
                </ListItemIcon>
                <ListItemText primary="Diagnostics" />
              </ListItem>
            </Link>         
          </div>
          </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Switch>
          <Route exact path="/" render={ ({...match}) => (<div></div>) } />
          <Route path="/dashboard/diagnostics" render={match => <Diagnostics {...match} />} />
          <Route path="/dashboard/subscriber" render={match =>  <Subscriber {...match} />} />
          <Route path="/simmanagement/Subscriptions" render={match =>  <Subscriptions {...match} />} />
        </Switch>      
      </main>
    </div>
  );
}