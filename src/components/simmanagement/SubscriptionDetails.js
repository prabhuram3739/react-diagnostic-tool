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
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
} from '@devexpress/dx-react-core';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  SortingState,
  IntegratedSorting, PagingState,
  IntegratedPaging, SelectionState,
  IntegratedSelection, FilteringState,
  IntegratedFiltering, SearchState, EditingState, DataTypeProvider, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  DragDropProvider,
  SearchPanel,
  TableHeaderRow, TableSelection, PagingPanel, TableFilterRow,
  TableColumnReordering, TableRowDetail, ExportPanel
} from '@devexpress/dx-react-grid-material-ui';
import MuiGrid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Edit from '@material-ui/icons/Edit';
import Cancel from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import saveAs from 'file-saver';
import NativeSelect from '@material-ui/core/NativeSelect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.tempRows = []; 
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
    var now = new Date();
    var d = now.getDate();
    var m = now.getMonth()+1;
    var y = now.getFullYear();
    var h = now.getHours();
    var min = now.getMinutes();
    var s = now.getSeconds();
    var name = 'sim-export_' + d+m+y+'_'+h+min+s + '.xlsx';
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), name);
  });
};

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
    // { columnName: 'action', width: '8%' },
  ]);
  const [editingRowIds, setEditingRowIds] = React.useState([]);
  const [addedRows, setAddedRows] = React.useState([]);
  const [rowChanges, setRowChanges] = React.useState({});
  const [tempRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  const [pageSizes] = React.useState([10, 25, 50]);
  const [filters, setFilters] = React.useState();
    
  const [selection, setSelection] = React.useState([]);
  const exporterRef = useRef(null);
  const { data, loading, count } = useContext(simViewDataLayerContext) || {};
  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const columns = [
    { name: 'iccid', title: 'ICCID', },
    { name: 'imsi', title: 'IMSI', },
    { name: 'msisdn', title: 'MSISDN', },
    { name: 'currentSimState', title: 'State', },
    { name: 'accountName', title: 'Account', },
    { name: 'simver', title: 'SIM Version', },
    { name: 'batch', title: 'SIM Batch', },
    // { name: 'action', title: 'Action',/ }   
  ];

  const [statusColumn] = React.useState(['currentSimState']);
  const [accountColumn] = React.useState(['accountName']);
  const [actionColumn] = React.useState(['action']);

  const getRowId = row => row.id;
  function getKey(objArr) {
    const arr = [],
      obj = Object.keys(objArr);
    for (var x in obj) {
      if (objArr[obj[x]] === "ENABLED") {
        arr.push(obj[x]);
      }
    }
    return arr;
  }

  const DetailContent = ({ row, ...rest }) => {
    const {
      processValueChange,
      applyChanges,
      cancelChanges,
    } = rest;
    let arr = getKey(row);
    console.log(row);
    return (
      <MuiGrid container spacing={1}>
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
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            {/*<TextField
              margin="normal"
              name="iccid"
              label="ICCID"
              value={row.iccid}
              onChange={processValueChange}
              readOnly
              disabled
            />*/}
            {/*<TextField
              margin="normal"
              name="currentSimState"
              label="Status"
              value={row.currentSimState}
              onChange={processValueChange}
            />*/}
            <div className="dx-field-label">State</div>
            <NativeSelect
              value={row.currentSimState}
              name="currentSimState"
              onChange={processValueChange}
              className="statusDrpDown"
              inputProps={{ 'aria-label': 'Status' }}
            >
              <option value={row.currentSimState}>{row.currentSimState}</option>
              {
                arr.filter((e) => {
                  if (e.toLowerCase() === row.currentSimState.toLowerCase()) {
                    return false;
                  } return true;
                }).map((ele, index) => {
                  if (ele.toLowerCase() !== row.currentSimState.toLowerCase()) {
                    return (<React.Fragment key={index}><option value={ele.toUpperCase()}>{ele.toUpperCase()}</option></React.Fragment>);
                  } return false;
                })
              }
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
        <MuiGrid item xs={12}>
          <MuiGrid container spacing={2} justify="flex-end">
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
                commitChangedRows({ rowIds: [rowId] });
                UpdateRecord(row);
              };

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
  const UpdateRecord = (row) => {
    //console.log("Update Rows", rows)
    //let params = {
    //id: row.iccid,
    //imsi: row.imsi,
    //msisdn: row.msisdn,
    //account: row.accountName,
    //batch: row.batch,
    //status: row.currentSimState,
    //simver: row.simver
    //}
    console.log("before starting wf: ", row);
    let params = {
      iccid: row.iccid,
      imsi: row.imsi,
      curr_state: row.oldSimState,
      new_state: row.currentSimState,
    }
    const APIURL = `http://18.185.117.167:7070/api/workflow/update_sim_state_wf` // 'http://18.185.117.167:8086/api/simlcstates/' + params.id + '/' + params.status 
    let headers = {
      "Content-Type": "application/json",
    }
    axios.post(APIURL, params, headers).then(response => {
      console.log("Response Status:", response.status);
      if (response.status === 200) {
        stausCheck(response.data, row);

        toast.success('SIM state change request accepted.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        //setRefreshGrid(true);
      }
    })
      .catch(function (error) {
        console.log(error.status);
        if (error?.response?.status === 409) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          row.currentSimState = row.oldSimState;
        } else if (error?.response?.status === 500) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          row.currentSimState = row.oldSimState;
        } else if (error?.response?.status === 400) {
          toast.error('' + error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          row.currentSimState = row.oldSimState;
        } else {
          toast.error('' + error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          row.currentSimState = row.oldSimState;
        }
        console.log(error);
      });
  }
  const stausCheck = (id, row) => {
    let i = 0;
    let statusCheck = true;
    let updatedId = id;
    const checkStatus = () => {
      console.log("Checking Workflow status");
      if (statusCheck && i <= 2) {
        console.log("Getting Workflow status");
        const APIURL = `http://18.185.117.167:7070/api/workflow/${updatedId}?includeTasks=false`;
        axios.get(APIURL)
          .then(function (response) {
            console.log(response);
            console.log("inside catch:", row);
            let st = response?.data?.status;
            if (st === "COMPLETED") {
              setRows(window.tempRows);
              showToast("success", "SIM state changed successfully")
              statusCheck = false
            } else if (st === "RUNNING") {
              setTimeout(() => { checkStatus() }, 1000);
            }
            else if (st === "SCHEDULED") {
              statusCheck = false;
              setTimeout(() => { checkStatus() }, 1000);
            } else if (st === "FAILED") {
              statusCheck = false;
              let errMsg = response?.data?.output?.reason;
              let msg = "SIM State change request failed";
              if (errMsg && errMsg.length > 0)
                msg = msg + ": " + errMsg;
                row.currentSimState = row.oldSimState;
                let changedRows = rows.map(row => (rows[row.id] ? { ...row, ...rows[row.id] } : row));
                setRows(changedRows);
              showToast("error", msg);

            }
          })
          .catch(function (error) {
            showToast("error", error.message);
          });
        i++;
      }
    }
    checkStatus();
  }

  const showToast = (type, message, position = "top-right", autoClose = 5000) => {
    let toastConfig = {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
    if (type === "success") {
      toast.success(message, toastConfig);
    } else if (type === "error") {
      toast.error(message, toastConfig);
    }

  }
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

  //const StatusFormatter = ({ value }) => (
  // (value.toLocaleLowerCase() === "csp-inventory") ? <Chip style={{ color: "blue"}} size="small" label={value} />
  //  : (value.toLocaleLowerCase() === "activated") ? <Chip style={{ color: "green"}} size="small" label={value} />
  //  : (value.toLocaleLowerCase() === "suspended") ? <Chip style={{ color: "orange"}} size="small" label={value} />
  //  : (value.toLocaleLowerCase() === "retired") ? <Chip style={{ color: "red"}} size="small" label={value} />
  //  : <Chip style={{ color: "black"}} size="small" label={value} />
  //);

  const StatusFormatter = ({ value }) => (
    (value.toLocaleLowerCase() === "csp-inventory") ? <span style={{ color: 'blue' }}> {value} </span> 
      : (value.toLocaleLowerCase() === "activated") ? <span style={{ color: 'green' }}> {value} </span> 
      : (value.toLocaleLowerCase() === "suspended") ? <span style={{ color: 'orange' }}> {value} </span> 
      : (value.toLocaleLowerCase() === "retired") ? <span style={{ color: 'red' }}> {value} </span> 
      : <span style={{ color: 'black' }}> {value} </span>
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
    console.log(56)
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
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.iccid));
    }
    console.log(changedRows);
    console.log(rows);
    setRows(changedRows);
    console.log("Changed Rows:", changedRows);
    window.tempRows = changedRows;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  //const [csvColumns, setCSVColumns] = React.useState([]);
  //const [setCSVData] = React.useState([]);


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
        style={{
          top: '46%',
          left: '84%'
        }}
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
  React.useEffect(() => {
    let rows = [];
    let rowsToBeModified = data;
    // Check if the count is zero or undefined to display the no records message
    if (!loading) {
      if ((count === 0) || (count === undefined)) {
        return (
          <span className="ml-4">Sorry, No Sim Information available</span>
        )
      }
    }
    var rowId = 0;
    (rowsToBeModified && rowsToBeModified.length > 0) && rowsToBeModified.map((ele, index) => {

      if (ele && ele.simLcStates) {
        let rowObj = {};

        rowObj['id'] = rowId;
        rowObj['iccid'] = ele.iccid;
        rowObj['simStateId'] = ele.simLcStates.simStateId;
        rowObj['oldSimState'] = ele.simLcStates.currentSimState;
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
        rowId++;
      }
      // return rows;

    });
    console.log(rows);
    setRows(rows)
  }, [data])

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    console.log(file);
    if (/\.(csv?)$/i.test(file.name) === false) {
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
      const data = new FormData();
      data.append('file', file);

      axios({
        method: "post",
        url: `http://18.185.117.167:5000/upload`,
        headers: {
          Accept: "application/json",
          //"Content-Type": "application/json",
        },
        //csvData
        data
      }).then(res => {
        toast.success('SIM File Upload initiated.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
        .catch(err => {
          console.log(err);
          toast.error('SIM File Upload failed.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  }

  return (
    <React.Fragment>
      <div style={{ height: '100%', width: '100%' }}>
        <Paper>
      {/*<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />*/}
          <Box className={classes.root} style={{ height: '100%', width: '100%' }} display="flex" flexDirection="row" bgcolor="grey.300">
            <Box bgcolor="background.paper" flexGrow={1}>
              <form className={classes.root} noValidate autoComplete="off" style={{ float: "left" }}>
                <span className="topAlign">
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
              </form>
            </Box>
          </Box>

          <Box className={classes.root} style={{ height: '100%', overflow: 'auto', width: '100%' }} display="flex" >
            {loading && rows.length === 0 ? <div><div className="v-loading-indicator second v-loading-indicator-delay v-loading-indicator-wait" ></div><Loader className="centerDisplayDefaultView mt-5" type="Circles" color="#00BFFF" height={40} width={40} /></div> :
              <Grid
                rows={rows}
                columns={columns} getRowId={getRowId} style={{ display: 'inline', height: '100%' }}
              >
                <RowDetailState />
                <SearchState defaultValue="" />
                <EditingState
                  editingRowIds={editingRowIds}
                  onEditingRowIdsChange={setEditingRowIds}
                  rowChanges={rowChanges}
                  onRowChangesChange={setRowChanges}
                  addedRows={addedRows}
                  onAddedRowsChange={changeAddedRows}
                  onCommitChanges={commitChanges}
                />
		<SortingState
                defaultSorting={[{ columnName: 'imsi', direction: 'asc' },]}
                //defaultSorting={[{ columnName: 'imsi', direction: 'asc' }, { columnName: 'msisdn', direction: 'desc' },]}
              />
                { /*<GroupingState
          grouping={[{ columnName: 'imsi' }]}
        />*/}

	      <IntegratedSorting />
              { /*<IntegratedGrouping /> */}
              
              <FilteringState
                filters={filters}
                onFiltersChange={setFilters}
              />
              <IntegratedFiltering />
              <PagingState
                //defaultCurrentPage={0}
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
              <IntegratedPaging />
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
                <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
              />
              <IntegratedSelection />
                <Table columnExtensions={tableColumnExtensions} />
                <TableColumnReordering
                  //'action'
                  //defaultOrder={['iccid', 'imsi', 'msisdn', 'currentSimState', 'accountName', 'simver', 'batch']}
		  defaultOrder={['iccid', 'imsi', 'msisdn', 'simver', 'batch', 'currentSimState', 'accountName']}
                />
                <TableHeaderRow showSortingControls />
                <TableRowDetail
                  contentComponent={DetailContent}
                  cellComponent={DetailCell}
                // toggleCellComponent={ToggleCell}
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
		<PagingPanel 
                pageSizes={pageSizes}
              />
              </Grid>
            }
            <GridExporter
              ref={exporterRef}
              rows={rows}
              columns={columns}
              selection={selection}
              onSave={onSave}
            />

          </Box>

        </Paper>
      </div>
    </React.Fragment>
  );
}

