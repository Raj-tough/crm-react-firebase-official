import {STORE_PRODUCTS, ADD, REMOVE, CLOSE_POPUP, EDIT, CLOSE_ADD_EDIT_POPUP, DELETE, CLOSE_DELETE_POPUP } from "../constants/constants";
  
  export default (
    state = {
      productList: {},
      showIncDecProductPopup : false,
      incDecProductPopupType : '',
      incDecProductPopupData : {},
      showEditProductPopup : false,
      editData : {},
      showDeleteProductPopup : false
    },
    action
  ) => {
    switch (action.type) {

      case STORE_PRODUCTS:
        return {
          ...state,
          productList : action.data
        };
        case ADD :
          return {
            ...state,
            showIncDecProductPopup : true,
            incDecProductPopupType : action.type,
            incDecProductPopupData : action.rowData

          };
          case REMOVE :
          return {
            ...state,
            showIncDecProductPopup : true,
            incDecProductPopupType : action.type,
            incDecProductPopupData : action.rowData,
          }
          case CLOSE_POPUP :
          return {
            ...state,
            showIncDecProductPopup : false,
            incDecProductPopupType : "",
            incDecProductPopupData : {},
          }
          case EDIT :
          return {
            ...state,
            showEditProductPopup : true,
            editData : action.rowData,            
          }
          case CLOSE_ADD_EDIT_POPUP :
          return {
            ...state,
            showEditProductPopup : false,
            editData : {},            
          }
          case DELETE :
          return {
            ...state,
            showDeleteProductPopup : true,
            editData : action.data       
          }
          case CLOSE_DELETE_POPUP :
          return {
            ...state,
            showDeleteProductPopup : false,
            editData : {}     
          }
          // case CLEAN_PRODUCT_LIST :
          //   return {
          //     ...state,
          //     productList : {}
          //   }

      default:
        return state;
    }
    
  };