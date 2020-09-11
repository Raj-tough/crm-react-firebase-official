
import { myFirebase } from "../firebase/firebase";
import {fireDb} from "../firebase/firebase"
import {createInitialTestProduct} from "../services/ProductService"

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user: user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const signUpRequest = () => {
  return {
    type : SIGN_UP_REQUEST
  }
}

const signUpSuccess = (user) => {
  return {
    type : SIGN_UP_SUCCESS,
    user_signedup : user
  }
}

// export const AddSignedUpUserToFirestore =  async (user) => {
  
// }
export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
      // getAndUpdateProductListDataToState(user.user.uid)
      // console.log('dispatched')
    })
    .catch(error => {
      dispatch(loginError());
    });
};

export const  handleSignUp = (email, password) => dispatch => {
  dispatch(signUpRequest())
  myFirebase
  .auth().createUserWithEmailAndPassword(email, password)
  .then(user=>{
    dispatch(signUpSuccess(user));
    // console.log(user.user.uid);
    fireDb.ref('users/' + user.user.uid).set({'user_id': user.user.uid, 'date' : String(new Date())})
    .then(() => {console.log('created sucessfully')})
    .catch((errors) => {console.log(errors)})
    createInitialTestProduct(user.user.uid)
    })
  .catch((error) => {
    dispatch(loginError());
    })
  
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};


