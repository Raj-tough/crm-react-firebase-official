import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ProductIncDecDialog from "../Dialogs/ProductPage/ProductIncDecDialog"
import ProductAddEditDialog from "../Dialogs/ProductPage/ProductAddEditDialog"
import DeleteproductDialog from "../Dialogs/ProductPage/DeleteProductDialog"


import {connect} from 'react-redux';
import { useDispatch } from 'react-redux'
import {showAddRemoveProductPopup, hideAddEditProductPopup, showAddEditProductPopup, showDeleteProductPopup, hideDeleteProductPopup} from "../../actions/productsAction"

import {ADD, REMOVE, EDIT} from "../../constants/constants"


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  // addIcon : {
  //   color: 'green'
  // },
  removeIcon : {
    color : 'red'
  },
  editIcon : {
    color : '#56A5EC'
  },
  table : {
    marginTop : 30,
    // maxHeight: 500,
    height : 460
  }
});

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       { date: '2020-01-05', customerId: '11091700', amount: 3 },
//       { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//     ],
//   };
// }

function Row(props) {

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const dispatch = useDispatch()
 

  const onHandleOpenPopupForAddQuantity = () => {
    dispatch(showAddRemoveProductPopup({"type" : ADD, "rowData" : row}))
  }
  const onHandleOpenPopupForSubtractQuantity = () => {
    dispatch(showAddRemoveProductPopup({"type" : REMOVE, "rowData" : row}))
  }

  const onHandleOpenPopupForEditProduct = () => {
    dispatch(showAddEditProductPopup({"type" : EDIT, 'rowData' : row}))
  }
  const onHandleOpenPopupForDeleteProduct =() => {
    dispatch(showDeleteProductPopup(row))
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.productName}
        </TableCell>
        <TableCell >{row.category}</TableCell>
        <TableCell >{row.size}</TableCell>
        <TableCell >{row.price}</TableCell>
        <TableCell >{row.price}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onHandleOpenPopupForAddQuantity}>
            <AddIcon className = {classes.addIcon}/>
          </IconButton>
          <IconButton aria-label="expand row" size="small" onClick={onHandleOpenPopupForSubtractQuantity}>
            <RemoveIcon className = {classes.removeIcon}/>
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onHandleOpenPopupForEditProduct}>
            <EditIcon className = {classes.editIcon} />
          </IconButton>
          <IconButton aria-label="expand row" size="small" onClick={onHandleOpenPopupForDeleteProduct}>
            <DeleteOutlineIcon className = {classes.removeIcon}/>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Add/Remove</TableCell>
                    <TableCell >Count</TableCell>
                    <TableCell >Total before update</TableCell>
                    <TableCell >Total After update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
const ProductListTable = (props) => {

  const [products, setProducts] = React.useState([])
  const dispatch = useDispatch()
  const classes = useRowStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {showIncDecProductPopup, incDecProductPopupData, incDecProductPopupType, 
    productsList, showEditProductPopup, editData, showDeleteProductPopup, user} = props

  const userId = user.uid

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect( () => {  
    // console.log(productsList)
    const arrangeProductsIntoStructure = (productsDataList) => {
      const structuredData = []
        Object.keys(productsDataList).forEach((product) => {
          if (productsDataList[product].category && productsDataList[product].DateOfAdding
            && productsDataList[product].price && productsDataList[product].productName && productsDataList[product].size) {
                structuredData.push({...productsList[product], id : product})
            }
        } )
      return structuredData
    } 
    if (productsList){
      const structuredProductsArray = arrangeProductsIntoStructure(productsList)
      setProducts(structuredProductsArray)
    }  
  }, [productsList])

  
  const hideEditProductDialog = () => {
      dispatch(hideAddEditProductPopup())
  }
  const hideDeleteProductDialog = () => {
    dispatch(hideDeleteProductPopup())
  }
  return (
    <React.Fragment>
      { showEditProductPopup ? 
            <ProductAddEditDialog action = {EDIT} data = {editData} callbackforCloseEditDialog = {hideEditProductDialog}/> 
            : null}
      { showIncDecProductPopup ? <ProductIncDecDialog type = {incDecProductPopupType} data = {incDecProductPopupData}/> : null}
      {showDeleteProductPopup ? <DeleteproductDialog userId = {userId} data = {editData} callBackToCloseDeletepopup = {hideDeleteProductDialog}/> : null}
      <TableContainer className={classes.table} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Product Name</TableCell>
              <TableCell >Type</TableCell>
              <TableCell >Size</TableCell>
              <TableCell >Price</TableCell>
              <TableCell >Quantity</TableCell>
              <TableCell >Inc / Dec Qty.</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>  
          <TableBody>
            {products.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
function mapStateToProps(state) {
  return {
    productsList : state.productsReducer.productList,
    showIncDecProductPopup : state.productsReducer.showIncDecProductPopup,
    incDecProductPopupType : state.productsReducer.incDecProductPopupType,
    incDecProductPopupData : state.productsReducer.incDecProductPopupData,
    showEditProductPopup : state.productsReducer.showEditProductPopup,
    showDeleteProductPopup : state.productsReducer.showDeleteProductPopup,
    editData : state.productsReducer.editData,
    user : state.auth.user
  };
}
export default connect(mapStateToProps)(ProductListTable);