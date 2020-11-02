
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
import axios from 'axios';
import './Login.css';
import { authEndpoint } from '../../environment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      title: {
        flexGrow: 1,
      },
}));

export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClick = (event) => {
    var apiBaseUrl = "http://localhost:4000";
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
    console.log(response);
    if(response.data.code === 200){
    console.log("Login successfull");
    }
    else if(response.data.code === 204){
    console.log("Username password do not match");
    alert("username password do not match")
    }
    else{
    console.log("Username does not exists");
    alert("Username does not exist");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
    }

    return (
        <React.Fragment>
{/*<div id="ROOT-2521314" className="v-app nokia mavocenterui">
        <div className="login-background">
    <div className="login-panel-container layout horizontal center center-justified">
        <div className="login-panel layout horizontal">
            <div className="nokia-logo layout vertical">
            <img className="login-logo" alt="Nokia" src={"https://jt-poc.nokiawing.com/VAADIN/themes/nokia/layouts/../img/nokia_white.svg"} />
                <p className="nokia-product">Diagnostic Portal</p>
                <p className="flex"></p>
                <p className="nokia-status">Based on WING © by Nokia</p>
            </div>
            <div className="login-form layout vertical center-justified" location="login-form"><div className="v-customlayout v-layout v-widget v-has-width" style={{borderStyle: "none", margin: 0, padding: 0}}><div className="login-form-content nokia-fields layout vertical center-justified">
    <div className="flex layout vertical center-justified">
        <div className="login-fields-input">
    <div location="user_name_field"><div className="v-captionwrapper"><div className="v-caption v-caption-inline-icon" id="gwt-uid-3" for="gwt-uid-4"><FontAwesomeIcon icon = { faUser } className="v-icon ml-3" style={{marginTop: 38}} /><div className="v-captiontext">E-mail</div></div><input type="text" className="v-textfield v-widget inline-icon v-textfield-inline-icon" id="gwt-uid-4" aria-labelledby="gwt-uid-3" tabindex="0"  /></div></div>
            <div location="password_field"><div className="v-captionwrapper"><div className="v-caption v-caption-inline-icon" id="gwt-uid-5" for="gwt-uid-6"><FontAwesomeIcon icon = { faLock } className="v-icon ml-3" style={{marginTop: 38}} /><div className="v-captiontext">Password</div></div><input type="password" className="v-textfield v-widget inline-icon v-textfield-inline-icon" id="gwt-uid-6" aria-labelledby="gwt-uid-5" tabindex="0" /></div></div>
            <div className="nokia-options layout horizontal justified">
                <div className="self-start layout horizontal center" location="remember_me"><span className="v-checkbox v-widget"><input type="checkbox" value="on" id="gwt-uid-2" tabindex="0" /><label for="gwt-uid-2">Remember username</label></span></div>
                <div className="self-end" location="reset_password"><div tabindex="0" role="button" className="v-button v-widget link v-button-link"><span className="v-button-wrap"><span className="v-button-caption">Forgot password?</span></span></div></div>
            </div>
        </div>
        <div className="layout horizontal self-end" style={{paddingBottom: 10}} location="captcha"></div>
        <div location="submit_button"><div tabindex="0" role="button" className="v-button v-widget primary v-button-primary"><span className="v-button-wrap"><span className="v-button-caption">Sign In</span></span></div></div>
        <div location="cas_login_button"></div>
    </div>
    <div className="nokia-language layout horizontal center">
        <div style={{paddingBottom: 1}}>Language:</div>
        <div location="lang_menu"><div tabindex="0" className="v-menubar v-widget borderless v-menubar-borderless language-menu v-menubar-language-menu"><span className="v-menubar-menuitem"><span className="v-menubar-submenu-indicator">►</span><span className="v-menubar-menuitem-caption">English</span></span></div></div>
    </div>
</div></div></div>
        </div>
    </div>
</div>
    </div>*/}

<div className={classes.root}>
            <Grid container spacing={1} direction="column" alignContent="center" alignItems="stretch" justify="space-around" >
                <Grid item style={{width: "100%", padding: "0px"}}  xs={false} sm={false} lg={false} xl={false}>
                    </Grid>
                    
                    </Grid>
                    </div>




</React.Fragment>
    );
}