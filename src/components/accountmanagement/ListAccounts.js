import React, { useContext, useRef, useCallback } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Loader from 'react-loader-spinner';
import accountViewDataLayerContext from '../../accountViewDataLayerContext';
import Fade from '@material-ui/core/Fade';
import CreateAccountModal from './createAccountModal/CreateAccountModal';
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
    var name = 'account-export_' + d+m+y+'_'+h+min+s + '.xlsx';
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), name);
  });
};

export default function ListAccounts() {
  const classes = useStyles();
  const [tableColumnExtensions] = React.useState([
    { columnName: 'id', width: '10%' },
    { columnName: 'name', width: '15%' },
    { columnName: 'tenantId', width: '15%' },
    { columnName: 'accountType', width: '10%' },
    { columnName: 'parentAccount', width: '10%' },
    { columnName: 'accountState', width: '15%' },
    // { columnName: 'action', width: '8%' },
  ]);
  const [editingRowIds, setEditingRowIds] = React.useState([]);
  const [addedRows, setAddedRows] = React.useState([]);
  const [rowChanges, setRowChanges] = React.useState({});
  //const [tempRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageSizes] = React.useState([10, 25, 50]);
  const [filters, setFilters] = React.useState();
    
  const [selection, setSelection] = React.useState([]);
  const exporterRef = useRef(null);
  const { data, loading, count } = useContext(accountViewDataLayerContext) || {};
  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);
  const [ ModalNewAccountShow, setModalNewAccountShow ] = React.useState(false);

  const columns = [
    { name: 'id', title: 'Account ID', },
    { name: 'name', title: 'Name', },
    { name: 'tenantId', title: 'Tenant', },
    { name: 'accountType', title: 'Account Type', },
    { name: 'parentAccountId', title: 'Parent Account', },
    { name: 'accountState', title: 'Account Status', },
    // { name: 'action', title: 'Action',/ }   
  ];

  const [statusColumn] = React.useState(['accountState']);
  const [accountColumn] = React.useState(['name']);
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
    return (
      <MuiGrid container spacing={1}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="id"
              label="Account ID"
              value={row.id ? row.id : ""}
              onChange={processValueChange}
              readOnly
              disabled
            />
            <TextField
              margin="normal"
              name="name"
              label="Name"
              value={row.name ? row.name : ""}
              onChange={processValueChange}
              readOnly
              disabled
            />
            <TextField
              margin="normal"
              name="tenantId"
              label="Tenant"
              value={row.tenantId ? row.tenantId : ""}
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
            <div className="dx-field-label">Account Type</div>
            <NativeSelect
              value={row.accountType ? row.accountType : ""}
              name="accountType"
              onChange={processValueChange}
              className="statusDrpDown"
              inputProps={{ 'aria-label': 'Account Type' }}
            >
              <option value={row.accountType}>{row.accountType}</option>
              {
                arr.filter((e) => {
                  if (e.toLowerCase() === row.accountType.toLowerCase()) {
                    return false;
                  } return true;
                }).map((ele, index) => {
                  if (ele.toLowerCase() !== row.accountType.toLowerCase()) {
                    return (<React.Fragment key={index}><option value={ele.toUpperCase()}>{ele.toUpperCase()}</option></React.Fragment>);
                  } return false;
                })
              }
            </NativeSelect>
            <TextField
              margin="normal"
              name="parentAccountId"
              label="Parent Account"
              value={row.parentAccountId ? row.parentAccountId : ""}
              onChange={processValueChange}
              readOnly
              disabled
            />
            {/*<TextField
              margin="normal"
              name="accountState"
              label="Account Status"
              value={row.accountState ? row.accountState : ""}
              onChange={processValueChange}
              readOnly
              disabled
            />*/}
            <div className="dx-field-label">Account State</div>
            <NativeSelect
              value={row.accountState ? row.accountState : ""}
              name="accountState"
              onChange={processValueChange}
              className="statusDrpDown"
              inputProps={{ 'aria-label': 'Account State' }}
            >
              <option value={row.accountState}>{row.accountState}</option>
              {
                arr.filter((e) => {
                  if (e.toLowerCase() === row.accountState.toLowerCase()) {
                    return false;
                  } return true;
                }).map((ele, index) => {
                  if (ele.toLowerCase() !== row.accountState.toLowerCase()) {
                    return (<React.Fragment key={index}><option value={ele.toUpperCase()}>{ele.toUpperCase()}</option></React.Fragment>);
                  } return false;
                })
              }
            </NativeSelect>
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
      if (response.status === 200) {
        stausCheck(response.data, row);

        toast.success('Account state change request accepted.', {
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
      if (statusCheck && i <= 2) {
        const APIURL = `http://18.185.117.167:7070/api/workflow/${updatedId}?includeTasks=false`;
        axios.get(APIURL)
          .then(function (response) {
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
    (value.toLocaleLowerCase() === "draft") ? <span style={{ color: 'blue' }}> {value} </span> 
      : (value.toLocaleLowerCase() === "active") ? <span style={{ color: 'green' }}> {value} </span> 
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
    setRows(changedRows);
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
    let rowsToBeModified = [
        {
            "id": 2,
            "tenantId": 1,
            "extId": "EXT1",
            "name": "test_account",
            "accountType": "INDIVIDUAL",
            "accountState": "DRAFT",
            "billingAccountId": 1,
            "custFields": {
                "prop2": "value2",
                "prop1": "value1",
                "prop3": "value3"
            },
            "parentAccountId": 3,
            "address": {
                "id": 1,
                "tenantId": 1,
                "extId": "EXT1",
                "addressLine1": "Madhapur",
                "addressLine2": "NA",
                "state": "Telangana",
                "city": "Hyderabad",
                "postcode": "500081",
                "country": "India",
                "isDefault": true,
                "accountMasterId": 2
            },
            "contact": {
                "id": 1,
                "tenantId": 1,
                "extId": "EXT1",
                "firstName": "eswar",
                "lastName": "prasad",
                "email": "test@gmail.com",
                "phone": "7793941313",
                "isDefault": true,
                "accountMasterId": 2
            }
        },
        {
            "id": 3,
            "tenantId": 1,
            "extId": "EXT2",
            "name": "test_account_1",
            "accountType": "INDIVIDUAL",
            "accountState": "DRAFT",
            "billingAccountId": 1,
            "custFields": {
                "prop2": "value2",
                "prop1": "value1",
                "prop3": "value3"
            },
            "parentAccountId": 2,
            "address": {
                "id": 2,
                "tenantId": 1,
                "extId": "EXT2",
                "addressLine1": "Clement-Town",
                "addressLine2": "NA",
                "state": "Uttarakhand",
                "city": "Dehradun",
                "postcode": "248002",
                "country": "India",
                "isDefault": true,
                "accountMasterId": 3
            },
            "contact": {
                "id": 2,
                "tenantId": 1,
                "extId": "EXT2",
                "firstName": "Amit",
                "lastName": "Aswal",
                "email": "test2@gmail.com",
                "phone": "9908294682",
                "isDefault": true,
                "accountMasterId": 3
            }
        }
    ];
    // Check if the count is zero or undefined to display the no records message
    if (!loading) {
      if ((count === 0) || (count === undefined)) {
        return (
          <span className="ml-4">Sorry, No Account Information available</span>
        )
      }
    }
    (rowsToBeModified && rowsToBeModified.length > 0) && rowsToBeModified.map((ele, index) => {
      if (ele) {
        let rowObj = {};
        rowObj['id'] = ele.id;
        rowObj['name'] = ele.name;
        rowObj['tenantId'] = ele.tenantId;
        rowObj['accountType'] = ele.accountType;
        rowObj['parentAccountId'] = ele.parentAccountId;
        rowObj['accountState'] = ele.accountState;
        rows.push(rowObj);
      }
      return rows;

    });
    setRows(rows)
  }, [data, count, loading])

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
              <span onClick={() => setModalNewAccountShow(true)}>

        <CreateAccountModal show={ModalNewAccountShow} onHide={() => setModalNewAccountShow(false)} /> </span>
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
                defaultSorting={[{ columnName: 'id', direction: 'asc' },]}
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
		  defaultOrder={['id', 'name', 'tenantId', 'accountType', 'parentAccountId', 'accountState']}
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

