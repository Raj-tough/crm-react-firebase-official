import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {hideAddRemoveProductPopup} from "../../../actions/productsAction"
import {useDispatch} from "react-redux";
import {CLOSE_POPUP} from "../../../constants/constants"


const ProductIncDecDialog = (props) => {

  const dispatch = useDispatch()
//   const [type, setType] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [data, setData] = React.useState({})

  const actionType = props.type
  const rowData = props.data
  React.useEffect( () => {
    setTitle(actionType)
    setData(rowData)
  }, [actionType, rowData])

  const handleClose = () => {
    dispatch(hideAddRemoveProductPopup({action : CLOSE_POPUP}))
  };
  console.log(title,data)
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Here we can {title.toLocaleLowerCase()} our quantity of products. This feature will be update in the version 2.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={"Enter the qunatity to " + title.toLocaleLowerCase()}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            {title}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductIncDecDialog