import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/Button";

import DashboardIcon from '@material-ui/icons/Dashboard';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import BallotIcon from '@material-ui/icons/Ballot';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';

import {connect} from 'react-redux';
import { useDispatch } from 'react-redux'
import { logoutUser } from "../actions";

import Dashboard from "../components/SideBarMenus/Dashboard";
import AddBill from "../components/SideBarMenus/AddBill"
import BillManager from "../components/SideBarMenus/BillManager"
import Customers from "../components/SideBarMenus/Customers"
import Investments from "../components/SideBarMenus/Investments"
import Products from "../components/SideBarMenus/Products"
import Statistics from "../components/SideBarMenus/Statistics"
import Stocks from "../components/SideBarMenus/Stocks"

import {cleanProductList} from "../services/ProductService";

const sidebarMenus1 = [{name : 'Dashboard', selected : true}, {name : 'New bill', selected : false}, 
                        {name : 'Bill Manager', selected : false}, {name : 'Statistics', selected : false}];
const sidebarMenus2 = [{name : 'Stocks', selected :false}, {name :'Products', selected : false},
                        {name : 'Investments', selected : false}, {name : 'Customer infos', selected : false}];

const sideBarMenus1Icons = [<DashboardIcon/>, <AddIcon/>, <BallotIcon/>, <SwapCallsIcon/>] 
const sideBarMenus2Icons = [<BarChartIcon/>, <AddShoppingCartIcon/>, <AttachMoneyIcon/>, <PeopleAltIcon/>] 
const pages = [<Dashboard/>, <AddBill/>, <BillManager/>, <Statistics/>, <Stocks/>, <Products/>, <Investments/>, <Customers/>]
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logout : {
    backgroundColor : '#D3D3D3',
    position : 'absolute',
    right : 15
  },
  topBar : {
    // backgroundColor : '#008080',
    backgroundColor : '#edbc34'
    // backgroundColor : '#f0731a'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  mailId : {
    position : 'absolute',
    right : 125
  },
  drawer: {
    // backgroundColor : '#383978',
    backgroundColor : '#cc3b08',
    // backgroundColor : '#D3D3D3	',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    // backgroundColor : '#383978',
    backgroundColor : '#8c8b08',
    // backgroundColor : '#D3D3D3	',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    // backgroundColor : '#383978',
    backgroundColor : '#cc3b08',
    // backgroundColor : '#D3D3D3',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const MiniDrawer = (props) => {
  // console.log(props.signed_up_user)
  const dispatch = useDispatch()

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  // let [sidebarMenu1, setSidebarMenu1] = useState(sidebarMenus1)

  const dimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onHandleSideButton1Click = (index) => {
    setPage(index);
    sidebarMenus2.map ((obj) => (
      obj.selected = false
    ))
    sidebarMenus1.map((obj , ind) => (
      index === ind ? obj.selected = true : obj.selected = false
    ))
  }
  const onHandleSideButton2Click = (index) => {
    setPage(4 + index);
    sidebarMenus1.map ((obj) => (
      obj.selected = false
    ))
    sidebarMenus2.map((obj , ind) => (
      index === ind ? obj.selected = true : obj.selected = false
    ))
  }
  const handleLogout = () => {
    dispatch(cleanProductList())
    dispatch(logoutUser());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.topBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SRK RENTALS CRM
          </Typography>
          {dimensions.width > 375 ? <Typography className={classes.mailId}>
            {props.user ? props.user.email ? props.user.email : '' : '' }
          </Typography> : ''}          
          <Button
              className={classes.logout}
              type="button"
              variant="contained"
              color="default"
              onClick={handleLogout}
            >
              Log out
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sidebarMenus1.map(({name, selected}, index) => (
            <ListItem selected = {selected} onClick = {() => onHandleSideButton1Click(index)} button key={index}>
              <ListItemIcon>{sideBarMenus1Icons[index]}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenus2.map(({name, selected}, index) => (
            <ListItem selected = {selected} onClick = {() => onHandleSideButton2Click(index)} button key={index}>
              <ListItemIcon>{sideBarMenus2Icons[index]}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {pages[page]}
      </main>
    </div>
  );
}

function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError,
      user: state.auth.user
    };
  }
export default connect(mapStateToProps)(MiniDrawer);