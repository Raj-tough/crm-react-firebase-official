import React, {useState} from 'react'
import {ADD} from "../../constants/constants"
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import {useDispatch} from "react-redux"
// import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import Typography from '@material-ui/core/Typography';
import ProductListTable from "../Tables/ProductListTable"
import ProductAddEditDialog from "../Dialogs/ProductPage/ProductAddEditDialog"

// import {getAndUpdateProductListDataToState} from "../../services/ProductService"


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    showAddProduct : {
        position : 'absolute',
        right : 25,
        backgroundColor: '#3BFFFF',
    },
    notification : {
        color : 'red'
    }
  }));


const Products = (props) => {
    const classes = useStyles();
    const [showPopup, setShowPopup] = useState(false)
    const {productList} = props
 

    const showAddProductDialog = () => {
        setShowPopup(true)
    }

    const hideAddProductDialog = () => {
        setShowPopup(false)
    }
    return(
        <div>
            { showPopup ? 
            <ProductAddEditDialog action = {ADD} data = {productList} callback = {hideAddProductDialog}/> 
            : null}
            <Typography variant="h6" gutterBottom component="div">
                Products Details   
                <Button
                    className={classes.showAddProduct}
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={showAddProductDialog}
                    disabled = {false}
                    >
                    + Add Product
                </Button>
              </Typography>
              <Typography variant="caption" className = {classes.notification}>
                        Inc / Dec, Edit, History options are required Version 2.0
                </Typography>
            <ProductListTable />
            
        </div>
    )
}
function mapStateToProps(state) {
    return {
        productList : state.productsReducer.productList,
        user: state.auth.user
    };
  }
export default connect(mapStateToProps)(Products);