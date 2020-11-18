import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SimCardOutlinedIcon from '@material-ui/icons/SimCardOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import { Link } from 'react-router-dom';

  export const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardOutlinedIcon style={{ color: '#FFFFFF' }}  />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <Link to="/simmanagement/Subscriptions">
      <ListItem button>
        <ListItemIcon >
          <SimCardOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="SIM Management" />
      </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <BusinessOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="Account Management" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="Rating Management" />
      </ListItem>
    
      <ListItem button>
        <ListItemIcon>
          <AssessmentOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </div>
  );

  export const secondaryListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <SettingsOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="Administration" />
      </ListItem>   
      <ListItem button>
        <ListItemIcon>
          <PeopleOutlineOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="User Management" />
      </ListItem>
      <Link to="/diagnostics">
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalOutlinedIcon style={{ color: '#FFFFFF' }}/>
        </ListItemIcon>
        <ListItemText primary="Diagnostics" />
      </ListItem>
      </Link> 
    
    </div>
  );
