import React, {Component, Fragment} from 'react';
import Box from '@material-ui/core/Box';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap';

//import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    PieChart, Pie, Sector,
    XAxis, YAxis,
    ResponsiveContainer,
    Bar,
    BarChart,
    Tooltip,
    LineChart,
    LabelList, Cell
} from 'recharts';

import {
    faAngleUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const drawerWidth = 240;

const useStyles = theme => ({
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
    ListItemIcon: {
      minWidth: '36px',      
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
      //overflow: 'auto',
      flexDirection: 'column',
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
      padding: '20px',
      display: 'flex',
      //overflow: 'auto',
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
      fontWeight: "700",
    },   
  });

const data = [
    {name: 'Denver', Data: 4000, pv: 2400, amt: 2400},
    {name: 'Alpine', Data: 3000, pv: 1398, amt: 2210},
    {name: 'Maria', Data: 2000, pv: 9800, amt: 2290},
    {name: 'PowerPlus', Data: 2780, pv: 3908, amt: 2000},
    {name: 'Icomera', Data: 1890, pv: 4800, amt: 2181},
    {name: 'Southern', Data: 2390, pv: 3800, amt: 2500},
    {name: 'Blueberry', Data: 3490, pv: 4300, amt: 2100},
    {name: 'Holstein', Data: 2000, pv: 6800, amt: 2290},
    {name: 'Snipe', Data: 4780, pv: 7908, amt: 2000},
    {name: 'UPS', Data: 2890, pv: 9800, amt: 2181},
];

const data2 = [
    {name: 'Jan', uv: 5400, pv: 5240, amt: 1240},
    {name: 'Feb', uv: 7300, pv: 4139, amt: 3221},
    {name: 'Mar', uv: 8200, pv: 7980, amt: 5229},
    {name: 'Apr', uv: 6278, pv: 4390, amt: 3200},
    {name: 'May', uv: 3189, pv: 7480, amt: 6218},
    {name: 'Jun', uv: 9478, pv: 6790, amt: 2200},
    {name: 'Jul', uv: 1289, pv: 1980, amt: 7218},
    {name: 'Aug', uv: 3139, pv: 2380, amt: 5150},
    {name: 'Sep', uv: 5349, pv: 3430, amt: 3210},
    {name: 'Oct', uv: 5349, pv: 6470, amt: 3910},
    {name: 'Nov', uv: 7349, pv: 5505, amt: 6210},
];

const data3 = [
    {name: '2020-07-01', active: 2000, zerousage: 600, inactive: 6800},
    {name: '2020-07-04', active: 2300, zerousage: 670, inactive: 4850},
    {name: '2020-07-07', active: 2950, zerousage: 850, inactive: 3800},
    {name: '2020-07-10', active: 3020, zerousage: 770, inactive: 3290},
    {name: '2020-07-13', active: 3780, zerousage: 960, inactive: 2590},
    {name: '2020-07-16', active: 4500, zerousage: 1070, inactive: 1570},
    {name: '2020-07-19', active: 4870, zerousage: 850, inactive: 1620},
    {name: '2020-07-22', active: 5440, zerousage: 880, inactive: 1600},
    {name: '2020-07-25', active: 5900, zerousage: 980, inactive: 1480},
    {name: '2020-07-28', active: 8240, zerousage: 1020, inactive: 1270},
];

const data4 = [
    { name: 'Denver', value: 318 },
    { name: 'Alpine', value: 326 },
    { name: 'Maria', value: 614 },
    { name: 'PowerPlus', value: 257 },
    { name: 'Icomera', value: 464 },
    { name: 'Southern', value: 173 },
    { name: 'Blueberry', value: 516 },
    { name: 'Holstein', value: 104 },
    { name: 'Other', value: 347 },
  ];
  //const user_colors = ['#311b92', '#5e35b1', '#9575cd'];
  const pdn_colors = ['#003367', '#456696', '#311b92', '#5e35b1', '#9575cd', '#004d40', '#009688', '#4db6ac', '#d84315'];
  //['2020-04-01','2020-04-04','2020-04-07','2020-04-10','2020-04-13','2020-04-16','2020-04-19','2020-04-22','2020-04-25','2020-04-28','2020-05-01','2020-05-04','2020-05-07','2020-05-10','2020-05-13','2020-05-16','2020-05-19','2020-05-22','2020-05-25','2020-05-28','2020-05-31']


const data5 = [
    {name: '2020-04-01', Total: 10.4, Upload: 4.4, Download: 6.0},
    {name: '2020-04-04', Total: 15.2, Upload: 2.1, Download: 13.1},
    {name: '2020-04-07', Total: 18.1, Upload: 4.4, Download: 13.7},
    {name: '2020-04-10', Total: 22.3, Upload: 5.2, Download: 17.1},
    {name: '2020-04-13', Total: 17.2, Upload: 4.2, Download: 13.0},
    {name: '2020-04-16', Total: 26.7, Upload: 10.4, Download: 16.3},
    {name: '2020-04-19', Total: 25.7, Upload: 9.4, Download: 16.3},
    {name: '2020-04-22', Total: 22.1, Upload: 9.7, Download: 12.4},
    {name: '2020-04-25', Total: 24.2, Upload: 8.1, Download: 14.1},
    {name: '2020-04-28', Total: 20.1, Upload: 5.0, Download: 15.1},
    {name: '2020-05-01', Total: 18.2, Upload: 7.0, Download: 11.2},
    {name: '2020-05-04', Total: 20.5, Upload: 5.1, Download: 15.4},
    {name: '2020-05-07', Total: 20.1, Upload: 8.0, Download: 12.1},
    {name: '2020-05-10', Total: 23.7, Upload: 10.4, Download: 13.3},
    {name: '2020-05-13', Total: 21.3, Upload: 7.4, Download: 13.9},
    {name: '2020-05-16', Total: 26.8, Upload: 10.4, Download: 16.4},
    {name: '2020-05-19', Total: 34.7, Upload: 15.4, Download: 19.3},
    {name: '2020-05-22', Total: 24.2, Upload: 10.2, Download: 14.0},
    {name: '2020-05-25', Total: 25.5, Upload: 8.4, Download: 17.1},
    {name: '2020-05-28', Total: 31.7, Upload: 11.4, Download: 20.3},
    {name: '2020-05-31', Total: 27.3, Upload: 15.2, Download: 18.1},
]

const data6 = [
    {name: '2020-04-01', Total: 244, MoSMS: 100, MtSMS: 144},
    {name: '2020-04-04', Total: 320, MoSMS: 200, MtSMS: 120},
    {name: '2020-04-07', Total: 300, MoSMS: 170, MtSMS: 130},
    {name: '2020-04-10', Total: 280, MoSMS: 110, MtSMS: 170},
    {name: '2020-04-13', Total: 275, MoSMS: 125, MtSMS: 150},
    {name: '2020-04-16', Total: 350, MoSMS: 170, MtSMS: 180},
    {name: '2020-04-19', Total: 340, MoSMS: 190, MtSMS: 150},
    {name: '2020-04-22', Total: 360, MoSMS: 200, MtSMS: 160},
    {name: '2020-04-25', Total: 380, MoSMS: 190, MtSMS: 190},
    {name: '2020-04-28', Total: 400, MoSMS: 190, MtSMS: 210},
    {name: '2020-05-01', Total: 470, MoSMS: 270, MtSMS: 200},
    {name: '2020-05-04', Total: 420, MoSMS: 190, MtSMS: 230},
    {name: '2020-05-07', Total: 450, MoSMS: 210, MtSMS: 230},
    {name: '2020-05-10', Total: 470, MoSMS: 270, MtSMS: 200},
    {name: '2020-05-13', Total: 460, MoSMS: 210, MtSMS: 250},
    {name: '2020-05-16', Total: 480, MoSMS: 210, MtSMS: 270},
    {name: '2020-05-19', Total: 500, MoSMS: 250, MtSMS: 250},
    {name: '2020-05-22', Total: 520, MoSMS: 280, MtSMS: 240},
    {name: '2020-05-25', Total: 510, MoSMS: 250, MtSMS: 260},
    {name: '2020-05-28', Total: 525, MoSMS: 220, MtSMS: 325},
    {name: '2020-05-31', Total: 520, MoSMS: 300, MtSMS: 220},
]

/*function getArraySum(a){
    var total=0;
    for(var i in a) {
        total += a[i].value
    }
    return total;
}*/

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    return (
        <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
        {/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}%)`}
    </text>*/}
        </g>
    );
    };

class AnalyticsDashboard extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',
            activeIndex: 1,

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);

    }

    onPieEnter = (data, index) => {
      this.setState({
        activeIndex: index,
      });
    };

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        {/*}
                        <PageTitle
                            heading="Dashboard"
                            subheading=""
                            icon="pe-7s-graph1 icon-gradient bg-mean-fruit"
                        />
                        */}
                        {/*<Row>*/}
                        <Box m={2}>
                            <Typography component="h1" variant="h6" color="inherit" padding="12" display="inline" className={classes.title}>
                            Dashboard
                            </Typography>
                        </Box>
                        <Box m={1} style={{height: '100%'}}> 
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="icon-wrapper rounded-circle" style={{display: "inline-flex"}}>
                                                <span className="icon-wrapper-bg bg-success" />
                                                <i className="lnr-smartphone text-success"/>
                                            </span>

                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                &nbsp;&nbsp;SIM Activations 30 Days
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-success">
                                                <span className="pr-1">43% Month over Month</span>
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                            </span>                                        
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
                                            <PieChart  margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                                    <Pie
                                                    data={data4}
                                                    activeIndex={this.state.activeIndex}
                                                    activeShape={renderActiveShape}
                                                    
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius='60%'
                                                    outerRadius='75%'
                                                    fill="#8884d8"
                                                    paddingAngle={1}
                                                    dataKey="value"
                                                    onMouseEnter={this.onPieEnter}
                                                    >
                                                        {
                                                            data4.map((entry, index) => <Cell key={`cell-${index}`} fill={pdn_colors[index % pdn_colors.length]} />)
                                                        }
                                                        {/*<Label width={30} position="center">
                                                            { getArraySum(data4) + ` Activations` }
                                                        </Label>*/}
                                                        <LabelList dataKey="name"/>
                                                    </Pie>
                                                    {/*<Legend layout="vertical" align="right" verticalAlign="top" height={36}/>*/}
                                                </PieChart>                                            
                                            </ResponsiveContainer>
                                    </CardBody>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="icon-wrapper rounded-circle" style={{display: "inline-flex"}}>
                                            <span className="icon-wrapper-bg bg-primary"/>
                                            <i className="lnr-laptop-phone text-primary"/>
                                            </span>

                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                &nbsp;&nbsp; 10.1k SIM Users Analysis
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-success">
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                                <span className="pl-1">27% Month over Month</span>
                                            </span>                                        
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
                                            <AreaChart data={data3} margin={{top: -45, right: 0, left: 0, bottom: 0}}>
                                                <defs>
                                                    <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ef9a9a" stopOpacity={0.5}/>
                                                        <stop offset="95%" stopColor="#ef9a9a" stopOpacity={0.5}/>
                                                    </linearGradient>
                                                    <linearGradient id="colorPv3" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#b71c1c" stopOpacity={0.9}/>
                                                        <stop offset="95%" stopColor="#b71c1c" stopOpacity={0.9}/>
                                                    </linearGradient>  
                                                    <linearGradient id="colorPv4" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ef5350" stopOpacity={0.5}/>
                                                        <stop offset="95%" stopColor="#ef5350" stopOpacity={0.5}/>
                                                    </linearGradient>                                                                                                        
                                                </defs>
                                                <Tooltip/>
                                                <Area type='monotoneX' dataKey='active' stroke='#ef9a9a' strokeWidth={1} fillOpacity={1}
                                                        fill="url(#colorPv2)"/>
                                                <Area type='monotoneX' dataKey='zerousage' stroke='#b71c1c' strokeWidth={1} fillOpacity={1}
                                                        fill="url(#colorPv3)"/>
                                                <Area type='monotoneX' dataKey='inactive' stroke='#ef5350' strokeWidth={1} fillOpacity={1}
                                                        fill="url(#colorPv4)"/>
                                            </AreaChart>                                          
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="icon-wrapper rounded-circle" style={{display: "inline-flex"}}>
                                                <span className="icon-wrapper-bg bg-danger"/>
                                                <i className="lnr-cloud-download text-success"/>
                                            </span>

                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                &nbsp;&nbsp; Usage Trend for Data
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-danger">
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                                <span className="pl-1">23% Month over Month</span>
                                            </span>                                        
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
                                            <AreaChart data={data5}
                                                       margin={{top: 0, right: 5, left: 5, bottom: 0}}>                                                       
                                                {/*<Area type="monotone" dataKey="Total" stroke="#81d4fa" fillOpacity={2} fill="#81d4fa" />*/}
                                                <Area type="monotone" dataKey="Download" stackId="1" stroke="#1976d2" fillOpacity={2} fill="#1976d2" />
                                                <Area type="monotone" dataKey="Upload" stackId="1" stroke="#81d4fa" fillOpacity={2} fill="#81d4fa" />
                                                <Tooltip/>
                                            </AreaChart>                                            
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="icon-wrapper rounded-circle" style={{display: "inline-flex"}}>
                                                <span className="icon-wrapper-bg bg-primary"/>
                                                <i className="lnr-envelope text-primary"/>
                                            </span>

                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                &nbsp;&nbsp; Usage Trend for SMS
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-danger">
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                                <span className="pl-1">10% Month over Month</span>
                                            </span>                                        
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={2.0 / 1.0}>
                                            <AreaChart data={data6}
                                                       margin={{top: 0, right: 5, left: 5, bottom: 0}}>
                                                {/*<Line type="monotone" dot={false} dataKey="Total" stroke="#311b92" strokeWidth={2}/>
                                                <Line type="monotone" dot={false} dataKey="MoSMS" stroke="#d84315" strokeWidth={2}/>
                                                <Line type="monotone" dot={false} dataKey="MtSMS" stroke="#283593" strokeWidth={2}/>*/}
                                                <Area type="monotone" dataKey="MoSMS" stackId="1" stroke="#ffc400" fillOpacity={2} fill="#ffc400" />
                                                <Area type="monotone" dataKey="MtSMS" stackId="1" stroke="#fff59d" fillOpacity={2} fill="#fff59d" />
                                                <Tooltip/>
                                            </AreaChart>                                            
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>
                            </Grid>                            
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                Top 10 Account Usage
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-danger">
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                                <span className="pl-1">Top 10 Account Usage</span>
                                            </span>                                        
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={2.4 / 1.0} >
                                         <BarChart data={data} barSize={10}>
                                                <XAxis dataKey="name"/>
                                                <YAxis hide="true" />
                                                <Bar dataKey='Data' fill='#d84315' stroke='#d84315' strokeWidth={1}/>
                                                <Tooltip dataKey="name"/>
                                            </BarChart>
                                                                                    
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>                                
                            </Grid>
                            <Grid item xs={8}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                Active Account Usage Trend
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span className="widget-description text-danger">
                                                 <div className="widget-description">
                                            Up by
                                            <span className="text-danger pl-1 pr-1">
                                                <FontAwesomeIcon icon={faAngleUp}/>
                                                <span className="pl-1">54.1%</span>
                                            </span>
                                            from 30 days ago
                                        </div></span>
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={5.0 / 1.0} >
                                        <LineChart data={data2}
                                                       margin={{top: 0, right: 5, left: 5, bottom: 0}}>
                                                <XAxis dataKey="name"/>
                                                <Line type="monotone" dataKey="pv" stroke="#d84315" strokeWidth={2}/>
                                                <Line type="monotone" dataKey="uv" stroke="#283593" strokeWidth={2}/>
                                            </LineChart>                                      
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>                                 
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                Total Views
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span cclassName="widget-description text-success">
                                            <FontAwesomeIcon icon={faAngleUp}/>
                                            <span className="pl-1">175.5%</span>
                                            </span>
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={3.0 / 1.0} >
                                            <LineChart data={data}
                                                       margin={{top: 0, right: 5, left: 5, bottom: 0}}>
                                                <Line type='monotone' dataKey='pv' stroke='#283593' strokeWidth={2}/>
                                            </LineChart>                                  
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>                                                        
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                Profiles
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span cclassName="widget-description text-warning">
                                            <span className="pr-1">175.5%</span>
                                            <FontAwesomeIcon icon={faArrowLeft}/>
                                            </span>
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={3.0 / 1.0} >
                                            <AreaChart data={data}
                                                       margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                                <Area type='monotoneX' dataKey='amt' stroke='#d84315' fill='#d84315'/>
                                            </AreaChart>                                
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>                        
                            </Grid>
                            <Grid item xs={4}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5" >                       
                                            <span className="widget-numbers"  style={{display: "inline-table"}}>
                                                Reports Submitted
                                            </span>
                                        </CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            <span cclassName="widget-description text-danger">
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                            <span className="pl-1">54.1%</span>
                                            </span>
                                        </CardSubtitle>                                       
                                        <ResponsiveContainer width='100%' aspect={3.0 / 1.0} >
                                            <BarChart data={data} barSize={10}>
                                                <XAxis dataKey="name"/>
                                                <YAxis hide="true" />
                                                <Bar dataKey='pv' fill='#283593' stroke='#283593' strokeWidth={2}/>
                                            </BarChart>                             
                                        </ResponsiveContainer>
                                    </CardBody>
                                </Card>                           
                            </Grid>
                        </Grid>
                        </Box>                        
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

export default withStyles(useStyles)(AnalyticsDashboard);
