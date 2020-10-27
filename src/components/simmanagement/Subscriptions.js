import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SignalCellular3BarOutlinedIcon from '@material-ui/icons/SignalCellular3BarOutlined';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import SignalCellularNoSimOutlinedIcon from '@material-ui/icons/SignalCellularNoSimOutlined';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import { Link } from 'react-router-dom';
import searchViewDataLayerContext, { DataProvider } from '../../searchViewDataLayerContext';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import SubscriptionDetails from './SubscriptionDetails';

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
    fontWeight: "700",
    borderBottom: 'none',
  },   
}));

const options = [
  'Voice Services',
  'SMS Services',
  'Data Services',
  'Roaming Profile',
  'SIM Swap',
  'SIM Purge',
];

export default function Subscriptions() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' },
      ];
      const rows = [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
      ];
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const [ ModalVoiceServicesShow, setModalVoiceServicesShow ] = React.useState(false);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <div>
          <DataProvider imsi={queryString.parse(location.search).imsi} >
            <Box m={2}>
                <Typography component="h1" variant="h6" color="inherit" padding="12" display="inline" className={classes.title}>
                SIM Management &gt; Subscriptions
                </Typography>
            </Box>
            <Box m={1}>             
            <SubscriptionDetails />           
            </Box>
            </DataProvider>
        </div>
    );
}

