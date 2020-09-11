import {fireDb} from "../firebase/firebase"
import {storeCustomersToState} from "../actions/customersAction"

export const addCustomer = (userId, customer, resolve) => {
    console.log('add customers triggering')
    fireDb.ref('customers/' + userId).set(customer)
    .then( (data) => {
        fireDb.ref('customers/'+ userId).once('value')
        .then((data) => console.log(data.val()))
        resolve()
    })
    .catch((error) => {
        console.log(error)
        resolve()
    })
}

export const getCustomers = (userId) => dispatch => {
    fireDb.ref('customers/' + userId).on('value', (data) => {
        let firstCustomer = []
        console.log(data.val())
        console.log(data.val().length)
        if (data.val() && data.val().length === undefined) {
            firstCustomer.push(data.val())
            console.log(firstCustomer)
            dispatch(storeCustomersToState(firstCustomer))
        } else {
            console.log('nothing')
            dispatch(storeCustomersToState(data.val()))
        }
        
    })
}


