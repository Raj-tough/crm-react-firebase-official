import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {addProduct} from "../../../services/ProductService"
import { ADD, EDIT } from '../../../constants/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  showAddProduct : {
      // color : 'green',
      backgroundColor: '#3BB9FF'
  },
  content : {
    color : 'black'
  },
  button : {
    width : '100px'
  }
}));

const ProductAddEditDialog = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [isSubmitButtonDisabled, setisSubmitButtonDisabled] = useState(true)

  let userId = props.user && props.user.uid ? props.user.uid : ''
  const { productList } = props
  const action = props.action
  const editData = props.data


  useEffect( () => {
    if (action === EDIT) {
      setProductName(editData.productName)
      setCategory(editData.category)
      setSize(editData.size)
      setPrice(editData.price)
    }
  }, [editData.productName, editData.category, editData.size, editData.price, action])
  

  const handleClose = () => {
    if(action === ADD) {
      props.callback()
    }
    if (action === EDIT){
      props.callbackforCloseEditDialog()
    }
    setOpen(false);
  };

  const onProductNameChange = (event) => {
    setProductName(event.target.value)
    checkFormValidation()
    if (event.target.value === '') setisSubmitButtonDisabled(true)
    else checkFormValidation()
  }

const onCategoryChange = (event) => {
    setCategory(event.target.value)
    checkFormValidation()
    if (event.target.value === '') setisSubmitButtonDisabled(true)
    else checkFormValidation()
}

const onSizeChange = (event) => {
    setSize(event.target.value)
    checkFormValidation()
    if (event.target.value === '') setisSubmitButtonDisabled(true)
    else checkFormValidation()
}

const onPriceChange = (event) => {
    setPrice(event.target.value)
    if (event.target.value === '') setisSubmitButtonDisabled(true)
    else checkFormValidation()
}

const checkFormValidation = () => {
    if (productName !== '' && category !== '' && size !== '' && price !== '') {
        setisSubmitButtonDisabled(false)
    }
}

const onhandleSubmitForm = () => {
    const productDetails = { 
        "productName" :  productName, 
        "category" : category, 
        "size" : size, 
        "price" : price, 
        "DateOfAdding" : String(new Date()) }
    const productExistance = checkProductExistence(productList, productDetails)
    console.log(productExistance)
    if (!productExistance) {
        addProduct(productDetails,userId)
        setProductName('')
        setCategory('')
        setSize('')
        setPrice('')
        handleClose()
    } else {
        console.log("already product is there.. !!!")
    }
}
const checkProductExistence  = (products, productDetails) => {
    const objectKeys = Object.keys(products)
    for (let i = 0; i < objectKeys.length; i++) {
        if (products[objectKeys[i]].productName === productDetails.productName && 
            products[objectKeys[i]].category === productDetails.category && 
            products[objectKeys[i]].size === productDetails.size && 
            products[objectKeys[i]].price === productDetails.price ){
              console.log('exist')
                return true
            }
    }
    return false
}
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{action === ADD ? 'Add New Product' : 'Edit product'}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.content}>
            {action === ADD ? 'Enter the Product Details..' : 'Edit this Product Details..'}  
          </DialogContentText>

          <form className={classes.root} noValidate autoComplete="off">
      
                <TextField id="standard-basic" required	= {true} label="Product Name" value = {productName} onChange = {onProductNameChange}/>
                <TextField id="standard-basic" required	= {true} label="Type/Category" value = {category} onChange = {onCategoryChange}/>
                <TextField id="standard-basic" required	= {true} label="Size" value = {size} onChange = {onSizeChange}/>
                <TextField id="standard-basic" required	= {true} label="Price per unit" value = {price} onChange = {onPriceChange}/>

                 <Button
                    className={classes.button}
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={onhandleSubmitForm}
                    disabled = {isSubmitButtonDisabled}
                    >
                    {action}
                </Button>
                <Button
                    className={classes.button}
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={handleClose}
                    disabled = {false}
                    >
                    Cancel
                </Button>
            </form> 
        </DialogContent>
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
    return {
      productList : state.productsReducer.productList,
      user: state.auth.user
    };
  }
export default connect(mapStateToProps)(ProductAddEditDialog)