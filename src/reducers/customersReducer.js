import {STORE_CUSTOMERS} from "../constants/constants";
  
  export default (
    state = {
      customers : []
    },
    action
  ) => {
    switch (action.type) {

      case STORE_CUSTOMERS:
        return {
          ...state,
          customers : action.data
        };
      default:
        return state;
    }
    
  };