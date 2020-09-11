import {STORE_CUSTOMERS} from "../constants/constants"


export const storeCustomersToState = customers => {
    return {
      type: STORE_CUSTOMERS,
      data : customers
    };
  };