import {STORE_PRODUCTS, CLOSE_POPUP, CLOSE_ADD_EDIT_POPUP, DELETE, CLOSE_DELETE_POPUP, CLEAN_PRODUCT_LIST} from '../constants/constants'


export const storeProductstoState = products => {
    return {
      type: STORE_PRODUCTS,
      data : products
    };
  };
export const showAddRemoveProductPopup = data => {
  return {
    type : data.type,
    rowData : data.rowData
  }
}
export const hideAddRemoveProductPopup = data => {
  return {
    type : CLOSE_POPUP,
    action : data.action
  }
}
export const showAddEditProductPopup = data => {
  return {
    type : data.type,
    rowData : data.rowData
  }
}
export const hideAddEditProductPopup = () => {
  return {
    type : CLOSE_ADD_EDIT_POPUP
  }
}

export const showDeleteProductPopup = (data) => {
  return {
    type : DELETE,
    data : data
  }
}
export const hideDeleteProductPopup = () => {
  return {
    type : CLOSE_DELETE_POPUP
  }
}

export const cleanProductListAction = () => {
  return {
    type : CLEAN_PRODUCT_LIST
  }
}