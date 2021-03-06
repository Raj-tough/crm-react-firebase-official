import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {deleteProductFromDatabase} from "../../../services/ProductService"


const DeleteProcutDialog = (props) => {

  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const data = props.data
  const userId = props.userId
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    props.callBackToCloseDeletepopup()
    setOpen(false);
  };
  const deleteProduct = () => {
    deleteProductFromDatabase(data.id, userId)
    props.callBackToCloseDeletepopup()
    setOpen(false);
  }
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirm Delete this product ' "+  data.productName + " ' ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleteing the product from here will not be get back. it will not shown in the billing page as well. 
            would you like to continue delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteProduct} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default DeleteProcutDialog