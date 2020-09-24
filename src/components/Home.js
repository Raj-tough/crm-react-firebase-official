import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import MiniDrawer from "../components/sidebar";
import {getAndUpdateProductListDataToState} from "../services/ProductService"
import {getCustomers} from "../services/CustomersService"

const Home = (props) =>  {

  const dispatch = useDispatch()
  const { user } = props

  useEffect( () => {
    // window.navigator.onLine ? console.log("online") : console.log("offline")
    if (user && user.uid) {
      dispatch(getAndUpdateProductListDataToState(user.uid))
      dispatch(getCustomers(user.uid))

    }
  }, [user, dispatch])

  return (
    <div>
      <MiniDrawer/>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    productList : state.productsReducer.productList
  };
}

export default connect(mapStateToProps)(Home);