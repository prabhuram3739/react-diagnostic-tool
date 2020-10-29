import React, { useContext } from 'react';
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
import {
    Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
  } from '@devexpress/dx-react-core';
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
    TableEditColumn,TableColumnReordering, GroupingPanel,   TableRowDetail,
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
  });

const options = [
  'Voice Services',
  'SMS Services',
  'Data Services',
  'Roaming Profile',
  'SIM Swap',
  'SIM Purge',
];


  const state_colors = {
    "CSP-Inventory": "blue",
    "Activated": "green",
    "Suspended": "red",
    "Retired": "red"
  }
    
    const rows = [
      { id: '8944500310184003050', imsi: '234500010400305', msisdn: '882362000300305', status: "CSP-Inventory", color: "blue", account: '', simver: '16.02', batch: 'Prod_Batch_1' },
      { id: '8944500310184003051', imsi: '234500010400306', msisdn: '882362000300306', status: "Activated", color: "green", account: "Icomera", simver: '16.02', batch: 'Prod_Batch_1' },
      { id: '8944500310184003052', imsi: '234500010400307', msisdn: '882362000300307', status: "Activated", color: "green", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003053', imsi: '234500010400308', msisdn: '882362000300308', status: "Suspended", color: "orange", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003054', imsi: '234500010400309', msisdn: '882362000300309', status: "CSP-Inventory", color: "blue", account: "", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003055', imsi: '234500010400310', msisdn: '882362000300310', status: "CSP-Inventory", color: "blue", account: "", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003056', imsi: '234500010400311', msisdn: '882362000300311', status: "Suspended", color: "orange", account: "BMW", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003057', imsi: '234500010400312', msisdn: '882362000300312', status: "Activated", color: "green", account: "Honda", simver: '16.02', batch: 'Prod_Batch_1'  },
      { id: '8944500310184003058', imsi: '234500010400313', msisdn: '882362000300313', status: "Retired", color: "red", account: "BMW", simver: '16.02', batch: 'Prod_Batch_1'  },
    ];

  const getRowId = row => row.id;

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
            />
            <TextField
              margin="normal"
              name="msisdn"
              label="MSISDN"
              value={row.msisdn}
              onChange={processValueChange}
            />
            <TextField
              margin="normal"
              name="account"
              label="Account"
              value={row.account}
              onChange={processValueChange}
            />
            <TextField
              margin="normal"
              name="batch"
              label="SIM Batch"
              value={row.batch}
              onChange={processValueChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
          <TextField
              margin="normal"
              name="iccid"
              label="ICCID"
              value={row.id}
              onChange={processValueChange}
            />
            <TextField
              margin="normal"
              name="status"
              label="Status"
              value={row.status}
              onChange={processValueChange}
            />
            <TextField
              margin="normal"
              name="simver"
              label="SIM Version"
              value={row.simver}
              onChange={processValueChange}
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
              <Button onClick={applyChanges} variant="text" color="primary">
                Save
              </Button>
            </MuiGrid>
            <MuiGrid item>
              <Button onClick={cancelChanges} color="secondary">
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
    <Plugin name="detailEdit">
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
    (value === "CSP-Inventory") ? <b style={{ color: 'blue' }}>
    {value}
  </b> : (value === "Activated") ? <b style={{ color: 'green' }}>
    {value}
  </b> : (value === "Suspended") ? <b style={{ color: 'orange' }}>
    {value}
  </b> : (value === "Retired") ? <b style={{ color: 'red' }}>
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
    No Account Name Available
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

export default function SubscriptionDetails() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const [value, setValue] = React.useState('1');
    const location = useLocation();
    const [tableColumnExtensions] = React.useState([
        { columnName: 'status', width: 200 },
      ]);
    const [editingRowIds, setEditingRowIds] = React.useState([]);
    const [addedRows, setAddedRows] = React.useState([]);
    const [rowChanges, setRowChanges] = React.useState({});



    const columns = [
        { name: 'id', title: 'ICCID', width: 180 },
        { name: 'imsi', title: 'IMSI', width: 150 },
        { name: 'msisdn', title: 'MSISDN', width: 160 },
        {
          name: 'status',
          title: 'Status',
          width: 150,

        },    
        {
            name: 'account',
            title: 'Account',
            width: 150,
          },
          {
            name: 'simver',
            title: 'SIM Version',
            width: 130,
          },
          {
            name: 'batch',
            title: 'SIM Batch',
            width: 150,
          },
          {
            name: 'action',
            title: 'Action',
            width: 150,
          }   
      ];

      const [statusColumn] = React.useState(['status']);
      const [accountColumn] = React.useState(['account']);
      const [actionColumn] = React.useState(['action']);
  
    const changeAddedRows = (value) => {
      const initialized = value.map(row => (Object.keys(row).length ? row : { imsi: '' }));
      setAddedRows(initialized);
    };
  
    const commitChanges = ({ added, changed, deleted }) => {
      let changedRows;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
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
        changedRows = rows.filter(row => !deletedSet.has(row.id));
      }
      //setRows(changedRows);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
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
        <div>
                  <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                  >
                  <MoreVertOutlinedIcon />
                  </IconButton>
                  <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={openMenu}
                      onClose={handleClose}
                      PaperProps={{
                          style: {
                              padding: '2px',
                          },
                          }}                                    
                  >
                      {options.map((option) => (
                      <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                          {option}
                      </MenuItem>
                      ))}
                  </Menu>
              </div>
      );
    
      const ActionProvider = props => (
        <DataTypeProvider
          formatterComponent={ActionFormatter}
          {...props}
        />
      );

    const { data, count, loading } = useContext(simViewDataLayerContext) || {};
      const finalData = [];
      finalData.push(data);
      const authResult = new URLSearchParams(window.location.search); 
      const imsi = authResult.get('imsi');
      // Check if the count is zero or undefined to display the no records message
      if(!loading) {
      if((count === 0) || (count === undefined)) {
       return (
           <span className="ml-4">Sorry, No Sim Information available</span>
       )
      }
   }

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
        <Tooltip component="span" title="Upload SIMs File" placement="top">                          
        <Button variant="contained" startIcon={<CloudUploadOutlinedIcon />} color="secondary" aria-label="Upload SIMs File">
            Upload SIMs File
        </Button>
        </Tooltip>
        </Box>
        </Box>
        <Box className={classes.root} style={{height: '100%', overflowX: 'scroll', width: '100%'}}  display="flex" >
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
          defaultOrder={['id', 'msisdn', 'status', 'account', 'simver', 'batch', 'action']}
        />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={DetailContent}
          cellComponent={DetailCell}
          toggleCellComponent={ToggleCell}
        />
        <DetailEditCell />
        {/*<TableEditRow />
        <TableEditColumn
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
        />*/}
        <Toolbar />
        <SearchPanel />
        <TableFilterRow />
        <TableSelection showSelectAll />
        { /* <TableGroupRow />
        <GroupingPanel showSortingControls /> */}
        <PagingPanel />
        </Grid>
            </Box>
            </Paper>
      </div> 
      </React.Fragment>
      );
}

