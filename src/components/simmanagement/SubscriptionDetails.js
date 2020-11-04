import React, { useContext, useRef, useCallback } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Loader from 'react-loader-spinner';
import simViewDataLayerContext from '../../simViewDataLayerContext';
import Fade from '@material-ui/core/Fade';
import * as XLSX from 'xlsx';
import {
    Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
  } from '@devexpress/dx-react-core';
  import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
    SortingState,
    IntegratedSorting, PagingState,
    IntegratedPaging, SelectionState,
    IntegratedSelection,   FilteringState,
    IntegratedFiltering, SearchState, EditingState, DataTypeProvider, RowDetailState,
  } from '@devexpress/dx-react-grid';
  import {
    Grid,
    Table,
    Toolbar,
    DragDropProvider,
    SearchPanel,
    TableHeaderRow, TableSelection, PagingPanel, TableFilterRow,
    TableColumnReordering, TableRowDetail, ExportPanel,
  } from '@devexpress/dx-react-grid-material-ui';
  import MuiGrid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import saveAs from 'file-saver';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          title: 'State',

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
              axios.put('http://18.185.117.167:8086/api/simlcstates/' + params.id + '/' + params.status , params).then(response => {
                console.log("Response Status:", response.status);
                if(response.status === 200) {
                toast.success('Successfully Updated', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
              //setRefreshGrid(true);
                }
              })
              .catch(function(error) {
                if(error.status === 500) {
                  toast.error("State transition not allowed", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                toast.error('Sorry, Not Updated', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                  console.log(error);
                }
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

    const changeAddedRows = (value) => {
      const initialized = value.map(row => (Object.keys(row).length ? row : { imsi: '' }));
      setAddedRows(initialized);
    };
  
    const commitChanges = ({ added, changed, deleted }) => {
      let changedRows = [];
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [selection, setSelection] = React.useState([]);
    const [csvColumns, setCSVColumns] = React.useState([]);
    const [setCSVData] = React.useState([]);

  
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
      return rows;
      });

   /*const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;*/

    // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const csvColumns = headers.map(c => ({
      name: c,
      selector: c,
    }));
    console.log("CSV Data:", list);
    setCSVData(list);
    setCSVColumns(csvColumns);
    /*fetch('https://[FIREBASE_URL]/users.json', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(list)
          })*/
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    console.log(file);
    if ( /\.(csv?)$/i.test(file.name) === false ) { 
      //alert("not a csv File!");
      toast.error('Please upload only a CSV file', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const csvData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(csvData);
      };
      reader.readAsBinaryString(file);
    }
  }


    return(
        <React.Fragment>       
      <div style={{height: '100%', width: '100%'}}>
      <Paper>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
        <input id="sampleFile" type="file" style={{ display: "none" }} accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
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
        columns={columns ? columns : csvColumns} getRowId={getRowId} style={{ display: 'inline', height: '100%' }}
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

