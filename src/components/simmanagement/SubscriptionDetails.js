import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import Chip from '@material-ui/core/Chip';
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
import simViewDataLayerContext from '../../simViewDataLayerContext';
import Fade from '@material-ui/core/Fade';
import {
    Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
  } from '@devexpress/dx-react-core';
  import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
    SortingState,
    IntegratedSorting, PagingState,
    IntegratedPaging,  GroupingState,
    IntegratedGrouping, SelectionState,
    IntegratedSelection,   FilteringState,
    IntegratedFiltering, SearchState, EditingState, DataTypeProvider, RowDetailState,
  } from '@devexpress/dx-react-grid';
  import {
    Grid,
    Table,
    Toolbar,
    DragDropProvider,
    SearchPanel,
    TableHeaderRow, TableSelection, PagingPanel,   TableGroupRow,   TableFilterRow, TableEditRow,
    TableEditColumn,TableColumnReordering, GroupingPanel,   TableRowDetail, ExportPanel,
  } from '@devexpress/dx-react-grid-material-ui';
  import {PieChart, Pie, Sector, Cell, LabelList, Legend, Label} from 'recharts';
  import MuiGrid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import saveAs from 'file-saver';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import NativeSelect from '@material-ui/core/NativeSelect';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      ListItemIcon: {
        minWidth: '36px',
        color: 'secondary',     
      },
      title: {
        flexGrow: 1,
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
        //
        backgroundColor: "primary.main",
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
        //color: "primary",
        fontWeight: "700",
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
      testMenu: {
        top: '60%'
    }
}));

const styles = theme => ({
    toggleCell: {
      textAlign: 'center',
      textOverflow: 'initial',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing(1),
    },
    toggleCellButton: {
      verticalAlign: 'middle',
      display: 'inline-block',
      padding: theme.spacing(1),
    },
    testMenu: {
      position: 'absolute'
    }
  });

const options = [
  'Voice Services',
  'SMS Services',
  'Data Services',
  'Roaming Profile',
  'SIM Swap',
  'SIM Purge',
];

const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };
  const state_colors = {
    "CSP-Inventory": "blue",
    "Activated": "green",
    "Suspended": "red",
    "Retired": "red"
  }
    
    /*const rows = [
      { id: '8944500310184003050', imsi: '234500010400305', msisdn: '882362000300305', status: "CSP-Inventory", color: "blue", account: '', simver: '16.02', batch: 'Prod_Batch_1' },
      { id: '8944500310184003051', imsi: '234500010400306', msisdn: '882362000300306', status: "Activated", color: "green", account: "Icomera", simver: '16.02', batch: 'Prod_Batch_1' },
      { id: '8944500310184003052', imsi: '234500010400307', msisdn: '882362000300307', status: "Activated", color: "green", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003053', imsi: '234500010400308', msisdn: '882362000300308', status: "Suspended", color: "orange", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003054', imsi: '234500010400309', msisdn: '882362000300309', status: "CSP-Inventory", color: "blue", account: "", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003055', imsi: '234500010400310', msisdn: '882362000300310', status: "CSP-Inventory", color: "blue", account: "", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003056', imsi: '234500010400311', msisdn: '882362000300311', status: "Suspended", color: "orange", account: "BMW", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003057', imsi: '234500010400312', msisdn: '882362000300312', status: "Activated", color: "green", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003058', imsi: '234500010400313', msisdn: '882362000300313', status: "Retired", color: "red", account: "BMW", simver: '16.02', batch: 'Prod_Batch_1'  },
    ];*/

export default function SubscriptionDetails() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const [refreshGrid, setRefreshGrid] = React.useState(false);
    const [tableColumnExtensions] = React.useState([
        { columnName: 'iccid', width: '15%' },
        { columnName: 'imsi', width: '15%' },
        { columnName: 'msisdn', width: '15%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'account', width: '10%' },
        { columnName: 'simver', width: '9%' },
        { columnName: 'batch', width: '9%' },
        { columnName: 'action', width: '8%' },
      ]);
      const [state, setState] = React.useState({
        age: '',
        name: 'hai',
      });
    const [editingRowIds, setEditingRowIds] = React.useState([]);
    const [addedRows, setAddedRows] = React.useState([]);
    const [rowChanges, setRowChanges] = React.useState({});
    const exporterRef = useRef(null);
  
    const startExport = useCallback((options) => {
      exporterRef.current.exportGrid(options);
    }, [exporterRef]);


    const columns = [
        { name: 'iccid', title: 'ICCID', },
        { name: 'imsi', title: 'IMSI', },
        { name: 'msisdn', title: 'MSISDN', },
        {
          name: 'currentSimState',
          title: 'Status',

        },    
        {
            name: 'accountName',
            title: 'Account',
          },
          {
            name: 'simver',
            title: 'SIM Version',
          },
          {
            name: 'batch',
            title: 'SIM Batch',
          },
          {
            name: 'action',
            title: 'Action',
          }   
      ];

      const [statusColumn] = React.useState(['currentSimState']);
      const [accountColumn] = React.useState(['accountName']);
      const [actionColumn] = React.useState(['action']);

      const getRowId = row => row.iccid;

  const DetailContent = ({ row, ...rest }) => {
    const {
      processValueChange,
      applyChanges,
      cancelChanges,
    } = rest;
    return (
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="IMSI"
              label="IMSI"
              value={row.imsi}
              onChange={processValueChange}
              readOnly
              disabled
            />
            <TextField
              margin="normal"
              name="msisdn"
              label="MSISDN"
              value={row.msisdn}
              onChange={processValueChange}
              readOnly
              disabled
            />
            <TextField
              margin="normal"
              name="account"
              label="Account"
              value={row.accountName}
              onChange={processValueChange}
              readOnly
              disabled
            />
            <TextField
              margin="normal"
              name="batch"
              label="SIM Batch"
              value={row.batch}
              onChange={processValueChange}
              readOnly
              disabled
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
          <TextField
              margin="normal"
              name="iccid"
              label="ICCID"
              value={row.iccid}
              onChange={processValueChange}
              readOnly
              disabled
            />
            {/*<TextField
              margin="normal"
              name="currentSimState"
              label="Status"
              value={row.currentSimState}
              onChange={processValueChange}
            />*/}
          <NativeSelect
          value={row.currentSimState}
          name="currentSimState"
          onChange={processValueChange}
          className="statusDrpDown"
          inputProps={{ 'aria-label': 'Status' }}
          >
          <option value={row.currentSimState}>{row.currentSimState}</option>
          <option value="CSP-INVENTORY">CSP-INVENTORY</option>
          <option value="ACTIVATED">ACTIVATED</option>
          <option value="IN-BILLING">IN-BILLING</option>
          <option value="TRIAL">TRIAL</option>
          <option value="SUSPENDED">SUSPENDED</option>
          <option value="RETIRED">RETIRED</option>
          <option value="PURGED">PURGED</option>
          </NativeSelect>
            <TextField
              margin="normal"
              name="simver"
              label="SIM Version"
              value={row.simver}
              onChange={processValueChange}
              readOnly
              disabled
            />
          </FormGroup>
        </MuiGrid>
        {/*<MuiGrid item xs={12}>
          <FormGroup>
            <TextField
              margin="normal"
              name="Notes"
              label="Notes"
              multiline
              rowsMax={4}
              value={row.Notes}
              onChange={processValueChange}
            />
          </FormGroup>
        </MuiGrid>*/}
        <MuiGrid item xs={12}>
          <MuiGrid container spacing={3} justify="flex-end">
            <MuiGrid item>
              <Button onClick={applyChanges} variant="contained" color="primary" aria-label="Save">
                Save
              </Button>
            </MuiGrid>
            <MuiGrid item>
              <Button onClick={cancelChanges} variant="contained" color="primary" aria-label="Save">
                Cancel
              </Button>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    );
  };

  const simStatusChange = () => 
  {
    //console.log(currentSimState);
  }

  const ToggleCellBase = ({
    style, expanded, classes, onToggle,
    tableColumn, tableRow, row,
    className,
    ...restProps
  }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      onToggle();
    };
    return (
      <TableCell
        className={clsx(classes.toggleCell, className)}
        style={style}
        {...restProps}
      >
        <IconButton
          className={classes.toggleCellButton}
          onClick={handleClick}
        >
          {
            expanded
              ? <Cancel />
              : <Edit />
          }
        </IconButton>
      </TableCell>
    );
  };
  
  const ToggleCell = withStyles(styles, { name: 'ToggleCell' })(ToggleCellBase);

  const DetailEditCell = () => (
    <Plugin name="DetailEditCell">
      <Action
        name="toggleDetailRowExpanded"
        action={({ rowId }, { expandedDetailRowIds }, { startEditRows, stopEditRows }) => {
          const rowIds = [rowId];
          const isCollapsing = expandedDetailRowIds.indexOf(rowId) > -1;
          if (isCollapsing) {
            stopEditRows({ rowIds });
          } else {
            startEditRows({ rowIds });
          }
        }}
      />
      <Template
        name="tableCell"
        predicate={({ tableRow }) => tableRow.type === TableRowDetail.ROW_TYPE}
      >
        {params => (
          <TemplateConnector>
            {({
              tableColumns,
              createRowChange,
              rowChanges,
            }, {
              changeRow,
              commitChangedRows,
              cancelChangedRows,
              toggleDetailRowExpanded,
            }) => {
              if (tableColumns.indexOf(params.tableColumn) !== 0) {
                return null;
              }
              const { tableRow: { rowId } } = params;
              const row = { ...params.tableRow.row, ...rowChanges[rowId] };
  
              const processValueChange = ({ target: { name, value } }) => {
                const changeArgs = {
                  rowId,
                  change: createRowChange(row, value, name),
                };
                changeRow(changeArgs);
              };
  
              const applyChanges = () => {
                toggleDetailRowExpanded({ rowId });
                UpdateRecord();
                console.log(refreshGrid);
                commitChangedRows({ rowIds: [rowId] });
              };

              const UpdateRecord = () => {
                let params = {
                  id: row.iccid,
                  imsi: row.imsi,
                  msisdn: row.msisdn,
                  account: row.accountName,
                  batch: row.batch,
                  status: row.currentSimState,
                  simver: row.simver
                }

                console.log(params);
                console.log('http://18.185.117.167:8086/api/simlcstates/' + params.id + '/' + params.status);
          
              axios.put('http://18.185.117.167:8086/api/simlcstates/' + params.id + '/' + params.status , params).then(response => {
              window.location.reload();

              //setRefreshGrid(true);
              console.log(refreshGrid);
              console.log(response.data);
              })
              .catch(function(error) {
                  console.log(error);
              });

              }
              const cancelChanges = () => {
                toggleDetailRowExpanded({ rowId });
                cancelChangedRows({ rowIds: [rowId] });
              };
  
              return (
                <TemplatePlaceholder params={{
                  ...params,
                  row,
                  tableRow: {
                    ...params.tableRow,
                    row,
                  },
                  changeRow,
                  processValueChange,
                  applyChanges,
                  cancelChanges,
                  UpdateRecord
                }}
                />
              );
            }}
          </TemplateConnector>
        )}
      </Template>
    </Plugin>
  );
  
  const DetailCell = ({
    children, changeRow, editingRowIds, addedRows, processValueChange,
    applyChanges, cancelChanges, 
    UpdateRecord,
    ...restProps
  }) => {
    const { row } = restProps;
  
    return (
      <TableRowDetail.Cell {...restProps}>
        {React.cloneElement(children, {
          row, changeRow, processValueChange, applyChanges, cancelChanges,
        })}
      </TableRowDetail.Cell>
    );
  };

  const StatusFormatter = ({ value }) => (
    (value.toLocaleLowerCase() === "csp-inventory") ? <b style={{ color: 'blue' }}>
    {value}
  </b> : (value.toLocaleLowerCase() === "activated") ? <b style={{ color: 'green' }}>
    {value}
  </b> : (value.toLocaleLowerCase() === "suspended") ? <b style={{ color: 'orange' }}>
    {value}
  </b> : (value.toLocaleLowerCase() === "retired") ? <b style={{ color: 'red' }}>
    {value}
  </b> : <b style={{ color: 'black' }}>
    {value}
  </b>
  );
  
  const StatusTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={StatusFormatter}
      {...props}
    />
  );

  const AccountNameFormatter = ({ value }) => (
    (value === "") ? <b style={{ color: 'red' }}>
    No Acct Available
  </b> : <b>
    {value}
  </b>
  );

  const AccountNameProvider = props => (
    <DataTypeProvider
      formatterComponent={AccountNameFormatter}
      {...props}
    />
  );

  //create your forceUpdate hook
const  useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

      const onDrop = (files) => {

        this.setState({ files });
    
        var file = files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => {
    
            var simList = [];
    
            for (var i = 0; i < data.length; i++) {
              const iccid = data[i][0];
              const imsi = data[i][1];
              const msisdn = data[i][2];
              const status = data[i][3];
              const account = data[i][4];
              const simVersion = data[i][5];
              const batch = data[i][6];
              const newSim = { "iccid": iccid, "imsi": imsi, "msisdn": msisdn, "currentSimState": status, "account": account, "simver": simVersion, "batch": batch };
              simList.push(newSim);
    
              fetch('http://18.185.117.1676:8086/sims.json', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSim)
              })
            };
          });
        };
    
        reader.readAsBinaryString(file);
      }
  
    const changeAddedRows = (value) => {
      const initialized = value.map(row => (Object.keys(row).length ? row : { imsi: '' }));
      setAddedRows(initialized);
    };
  
    const commitChanges = ({ added, changed, deleted }) => {
      let changedRows;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].iccid + 1 : 0;
        changedRows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        changedRows = rows.map(row => (changed[row.iccid] ? { ...row, ...changed[row.iccid] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        changedRows = rows.filter(row => !deletedSet.has(row.iccid));
      }
      //setRows(changedRows);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
      const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [selection, setSelection] = React.useState([]);

  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const ActionFormatter = (params) => (
      <React.Fragment>
                  <IconButton
                      aria-label="more"
                      aria-controls="fade-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                  >
                    <Tooltip title="Action" placement="top">            
                  <MoreVertOutlinedIcon />
                  </Tooltip>
                  </IconButton>
                  <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={openMenu}
                      onClose={handleClose}
                      PaperProps={{
                          style: {
                              padding: '2px'
                          },
                          }}
                      style={{top: '46%',
                        left: '84%'}}
                      TransitionComponent={Fade}                                    
                  >
                      {options.map((option) => (
                      <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                          {option}
                      </MenuItem>
                      ))}
                  </Menu>
                  </React.Fragment>   
      );
    
      const ActionProvider = props => (
        <DataTypeProvider
          formatterComponent={ActionFormatter}
          {...props}
        />
      );

    const { data, loading, count } = useContext(simViewDataLayerContext) || {};
      let simLcStatesArr=[];
      let rows=[];
      
      let rowsToBeModified = data;
      /*let rowsToBeModified = [
        {
          iccid: 3436456456456616,
          simLcStates: {
            simStateId: 53465645645672,
            iccid: 3436456456456616,
            currentSimState: "CSP-INVENTORY",
            simTransitionsId: null,
            factoryReady: "DISABLED",
            dispatched: "DISABLED",
            cspInventory: "DISABLED",
            enterpriseInventory: "DISABLED",
            trial: "DISABLED",
            activated: "DISABLED",
            suspended: "DISABLED",
            regulatoryHold: "DISABLED",
            cspHold: "DISABLED",
            conditionalSuspend: "DISABLED",
            deactivated: "DISABLED",
            purged: "DISABLED",
            retired: null,
            transferred: "DISABLED"
          },
          imsi: "567659",
          msisdn: "78768435458",
          identityVendor: null,
          lastUpdated: "10/07/2020",
          accountNumber: "645645645",
          accountName: "3M Tech"
        },
        {
          iccid: 3436456456456617,
          simLcStates: {
          simStateId: 53465645645673,
          iccid: 3436456456456617,
          currentSimState: "ACTIVATED",
          simTransitionsId: null,
          factoryReady: "DISABLED",
          dispatched: "DISABLED",
          cspInventory: "DISABLED",
          enterpriseInventory: "DISABLED",
          trial: "DISABLED",
          activated: "DISABLED",
          suspended: "DISABLED",
          regulatoryHold: "DISABLED",
          cspHold: "DISABLED",
          conditionalSuspend: "DISABLED",
          deactivated: "DISABLED",
          purged: "DISABLED",
          retired: null,
          transferred: "DISABLED",
        },
          imsi: "567658",
          msisdn: "78768435459",
          identityVendor: null,
          lastUpdated: "10/07/2020",
          accountNumber: "645645645",
          accountName: "Honda"
        },
        {
          iccid: 3436456456456618,
          simLcStates: {
          simStateId: 53465645645676,
          iccid: 3436456456456618,
          currentSimState: "SUSPENDED",
          simTransitionsId: null,
          factoryReady: "DISABLED",
          dispatched: "DISABLED",
          cspInventory: "DISABLED",
          enterpriseInventory: "DISABLED",
          trial: "DISABLED",
          activated: "DISABLED",
          suspended: "DISABLED",
          regulatoryHold: "DISABLED",
          cspHold: "DISABLED",
          conditionalSuspend: "DISABLED",
          deactivated: "DISABLED",
          purged: "DISABLED",
          retired: null,
          transferred: "DISABLED",
          },
          imsi: "567662",
          msisdn: "78768435460",
          identityVendor: null,
          lastUpdated: "10/07/2020",
          accountNumber: "645645645",
          accountName: ""
        },
      ];*/

      //const loading = rowsToBeModified.length > 0 ? true : false;

       // Check if the count is zero or undefined to display the no records message
       if(!loading) {
       if((count === 0) || (count === undefined)) {
         return (
             <span className="ml-4">Sorry, No Sim Information available</span>
         )
        }
     }

      (rowsToBeModified && rowsToBeModified.length > 0) && rowsToBeModified.map((ele, index) => {
        if(ele &&  ele.simLcStates) {
       let rowObj = {};
       rowObj['iccid'] = ele.iccid;
       rowObj['simStateId'] = ele.simLcStates.simStateId;
       rowObj['currentSimState'] = ele.simLcStates.currentSimState;
       rowObj['simTransitionsId'] = ele.simLcStates.simTransitionsId;
       rowObj['factoryReady'] = ele.simLcStates.factoryReady;
       rowObj['dispatched'] = ele.simLcStates.dispatched;
       rowObj['cspInventory'] = ele.simLcStates.cspInventory;
       rowObj['enterpriseInventory'] = ele.simLcStates.enterpriseInventory;
       rowObj['trial'] = ele.simLcStates.trial;
       rowObj['activated'] = ele.simLcStates.activated;
       rowObj['suspended'] = ele.simLcStates.suspended;
       rowObj['regulatoryHold'] = ele.simLcStates.regulatoryHold;
       rowObj['cspHold'] = ele.simLcStates.cspHold;
       rowObj['conditionalSuspend'] = ele.simLcStates.conditionalSuspend;
       rowObj['deactivated'] = ele.simLcStates.deactivated;
       rowObj['purged'] = ele.simLcStates.purged;
       rowObj['retired'] = ele.simLcStates.retired;
       rowObj['transferred'] = ele.simLcStates.transferred;
       rowObj['imsi'] = ele.imsi;
       rowObj['batch'] = ele.simBatchId;
       rowObj['simver'] = ele.simVersion;
       rowObj['msisdn'] = ele.msisdn;
       rowObj['identityVendor'] = ele.identityVendor;
       rowObj['lastUpdated'] = ele.lastUpdated;
       rowObj['accountNumber'] = ele.accountNumber;
       rowObj['accountName'] = ele.accountName;
       rows.push(rowObj);
      }
      });

   const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return(
        <React.Fragment>       
      <div style={{height: '100%', width: '100%'}}>
      <Paper>
        <Box className={classes.root} style={{height: '100%', width: '100%'}} display="flex" flexDirection="row" bgcolor="grey.300">
        <Box bgcolor="background.paper" flexGrow={1}>
        <form className={classes.root} noValidate autoComplete="off" style={{float: "left"}}>
        <span>
            Total rows selected:
            {' '}
            {selection.length}
            </span>
        </form>

        </Box>
        <Box bgcolor="background.paper">
        <Divider component="span" className={classes.divider} orientation="vertical" />
        <form id='uploadForm' action='http://18.185.117.167:8086/upload' method='post' encType="multipart/form-data">
        <Tooltip component="span" title="Upload SIMs File" placement="top">
        <Button htmlFor="sampleFile" variant="contained" component="label" startIcon={<CloudUploadOutlinedIcon />} color="secondary" aria-label="Upload SIMs File">Upload SIMs File
        <input id="sampleFile" type="file" style={{ display: "none" }} />
        </Button>
        </Tooltip>
        {/*<div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={onDrop.bind(this)}>
  {dropzoneProps => {
    return (
      <div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    );
  }}
</Dropzone>;
          <br /><br /><br />
        </div>
        
</div>*/}
        </form>
        </Box>
        </Box>
        
        <Box className={classes.root} style={{height: '100%', overflow: 'auto', width: '100%'}}  display="flex" >
        { loading && rows.length === 0 ? <div><div className="v-loading-indicator second v-loading-indicator-delay v-loading-indicator-wait" ></div><Loader className="centerDisplayDefaultView mt-5" type="Circles" color="#00BFFF" height={40} width={40} /></div>  :
        <Grid
        rows={rows}
        columns={columns} getRowId={getRowId} style={{ display: 'inline', height: '100%' }}
        >
            <RowDetailState
          defaultExpandedRowIds={[1]}
        />
        <SearchState defaultValue="" />
        <EditingState
          defaultEditingRowIds={[1]}
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
        />
        <SortingState
          defaultSorting={[{ columnName: 'imsi', direction: 'asc' }, { columnName: 'msisdn', direction: 'desc' },]}
        />
        { /*<GroupingState
          grouping={[{ columnName: 'imsi' }]}
        />*/}
        <IntegratedSorting />
        { /*<IntegratedGrouping /> */}
        <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
        <PagingState
          defaultCurrentPage={0}
          pageSize={10}
        />
        <IntegratedSelection />
        <IntegratedPaging />
        
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <DragDropProvider />
        <StatusTypeProvider
          for={statusColumn}
        />
        <AccountNameProvider
          for={accountColumn}
        />
        <ActionProvider
          for={actionColumn}
        />
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnReordering
          defaultOrder={['iccid', 'imsi', 'msisdn', 'currentSimState', 'accountName', 'simver', 'batch', 'action']}
        />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={DetailContent}
          cellComponent={DetailCell}
          toggleCellComponent={ToggleCell}
        />
        <DetailEditCell />
        {/*<TableEditRow />*/}
        {/*<TableEditColumn
          showDeleteCommand
        />*/}
        <Toolbar />
        <ExportPanel startExport={startExport} />
        <SearchPanel />
        <TableFilterRow />
        <TableSelection showSelectAll />
        { /* <TableGroupRow />
        <GroupingPanel showSortingControls /> */}
        <PagingPanel />

        </Grid>
      }
        <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        onSave={onSave}
      />
    
            </Box>

            </Paper>
      </div> 
      </React.Fragment>
      );
}

