import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {connect} from "react-redux";
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    formControl : {
        width : 250
    },
    selectProductCategory : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : 10
    },
    previewTab : {
        marginTop: 10
    },
    Line : {
        color: '#D3D3D3',
        backgroundColor: '#D3D3D3',
        height: .1,
        borderColor : '#D3D3D3',
        border : 'none'
    }, 
    BillingSection : {
        // width: '50%'
    },
    PreviewSection : {
        // width: '50%',
    },
    Seperator : {
        // display : 'flex',
    },
    Autocomplete : {
        width : 500
    },
    TextFields: {
        marginLeft : 20
    },
    TextField1: {
        marginLeft : 20
    },
    AddIcon : {
        // position : 'absolute',
        // right : 25,
        marginLeft : 20,
        marginTop : 5,
        color : 'blue'
    }
}));
  
const AddBill = (props) => {

    const classes = useStyles();
    let [product, setProduct] = useState({name:'Test', key : 0});
    let [productNamesList, setProductsNameList] = useState([{name:'loading..', key : 0}])
    let [quantity, setQuantity] = useState(1)
    let [price, setPrice] = useState(0)

    const {productsList} = props

    const today = new Date()
    const month = today.getMonth()+1 >=10 ? today.getMonth()+1 : `0${today.getMonth()+1}`
    const date = today.getDate() >=10 ? today.getDate() : `0${today.getDate()}`
    const hours = today.getHours() >= 10 ? today.getHours() : `0${today.getHours()}`
    const min = today.getMinutes() >= 10 ? today.getMinutes() : `0${today.getMinutes()}`
    const formattedDate = `${today.getFullYear()}-${month}-${date}T${hours}:${min}`
    // console.log(formattedDate)


    useEffect( () => {
        updateProductList(productsList)
    },[productsList])

    const updateProductList = (productList) => {
        const productNamesWithTypeAndSize = []
        if (productList){
            // console.log('product',  productList)
            Object.keys(productList).forEach( (key, index) => {
                if (productList[key].category)
                productNamesWithTypeAndSize.push({
                    name : `${productList[key].productName} - ${productList[key].category} - ${productList[key].size} - ₹${productList[key].price}`,
                    key : index})
            })
        }
        // console.log('product', productNamesWithTypeAndSize)
        setProductsNameList(productNamesWithTypeAndSize)
        setProduct(productNamesWithTypeAndSize[0])
        if (productNamesWithTypeAndSize[0]) {
            setPrice(productNamesWithTypeAndSize[0]['name'].split('₹')[1])
        }
    }   
    
    const handleChangeProducts = (event, value) => {
        // console.log(value)
        setProduct(value)
        if (value) {
            setPrice(value['name'].split('₹')[1])
            setQuantity(0)
        }
    }

    const onChangeQuantityHandler = (event) => {
        setQuantity(event.target.value)
    }

    const onChangePriceHandler = (event) => {
        setPrice(event.target.value)
    }
    const onChangeMobileNumberHandler = (event) => {
        // let number = event.target.value
    }
    const onKeyDownMobileNumberHandler = (event) => {
        console.log(event.keyCode)
        let key = event.keyCode
        if (key === 8 || key === 46 || key >= 37 || key <= 40) {
            return 0
        }
        if (key <= 48 || key >= 57 ) {
            event.preventDefault()
        }
    }
    return(
        <div className = {classes.Seperator}> 
            <h3>Create new bills here</h3>
            <h5> customer Details</h5>
            <div>
            <TextField 
                className = {classes.TextField1}
                id="outlined-search-1" 
                label="Customer name" 
                type="text" 
                variant="outlined" 
            />
            <TextField 
                className = {classes.TextField1}
                id="outlined-search-2" 
                label="Mobile no." 
                type="text" 
                variant="outlined" 
                onChange = {onChangeMobileNumberHandler}
                onKeyDown={ onKeyDownMobileNumberHandler}
            />
             <TextField 
                className = {classes.TextField1}
                id="outlined-search-3" 
                label="Site address" 
                type="text" 
                variant="outlined" 
            />
            </div>
            <h5> Product Details</h5>
            <div className = {classes.BillingSection}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div className = {classes.selectProductCategory}>
                        <Autocomplete
                            className = {clsx(classes.margin, classes.textField)}
                            id="highlights-demo"
                            style={{ width: 400 }}
                            options={productNamesList}
                            getOptionLabel={(option) => option.name }    
                            onChange= {handleChangeProducts}
                            value = {product}
                            renderInput={(params) => (
                                <TextField  style={{ width: 400 }}{...params} label=" search by name, type or price *" variant="outlined" margin="normal" />
                            )}
                            renderOption={(option, { inputValue }) => {
                                const matches = match(option.name, inputValue);
                                const parts = parse(option.name, matches);
                                return (
                                <div>
                                    {parts.map((part, index) => (
                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                        {part.text}
                                    </span>
                                    ))}
                                </div>
                                );
                            }}
                        />
                        <div className = {classes.TextFields}> 
                            <TextField
                                id="outlined-number"
                                label=" Quantity *"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">nos.</InputAdornment>,
                                }}
                                value = {quantity}
                                onChange = {onChangeQuantityHandler}
                                variant="outlined"
                            />
                            <TextField
                                label=" Price / item / day *"
                                id="outlined-start-adornment"
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                                }}
                                value = {price}
                                onChange = {onChangePriceHandler}
                                variant="outlined"
                            />              
                            <TextField
                                id="datetime-local"
                                label=" Delivery date *"
                                type="datetime-local"
                                defaultValue = {formattedDate}
                                className={classes.textField}
                                style = {{width: 250}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />  
                        </div>
                        <div>
                        <IconButton 
                            className = {classes.AddIcon}
                            aria-label="add">
                            <AddIcon />
                        </IconButton>
                        </div>
                    </div>
                </form>
            </div>
            <hr className = {classes.Line}/>
            <div className = {classes.PreviewSection}> 
                <h3>Preview</h3>
            </div>
            
        </div>
    );
}
function mapStateToProps(state) {
    return {
      productsList : state.productsReducer.productList,
      user : state.auth.user
    };
  }
export default connect(mapStateToProps)(AddBill);

