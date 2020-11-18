import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@material-ui/core/Typography';
import { DataProvider } from '../../accountViewDataLayerContext';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import ListAccounts from './ListAccounts';

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

export default function Accounts() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div>
          <DataProvider imsi={queryString.parse(location.search).imsi} >
            <Box m={2}>
                <Typography component="h1" variant="h6" color="inherit" padding="12" display="inline" className={classes.title}>
                Account Management
                </Typography>
            </Box>
            <Box m={1} style={{height: '100%'}}> 
                <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="Accounts">
                        <Tab label="Accounts" value="1" />
                    </TabList>
                    <TabPanel value="1"><ListAccounts /> </TabPanel>
                </TabContext>            
            </Box>
            </DataProvider>
        </div>
    );
}

