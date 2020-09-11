import {fireDb} from "../firebase/firebase"
import {storeProductstoState, cleanProductListAction} from "../actions/productsAction"

// const addProduct = (productData, userId) => {
//     myFirebase.firestore().collection('Products').doc(`${userId}`).set(productData)
//     .then(() => {console.log('Data written')})
//     .catch((error) => {console.log(error)})
// };

export const createInitialTestProduct = (userId) => {
    let productData = {"product_name" : "test_product"}
    fireDb.ref('products/' + userId + `/product_1`).set(productData)
            .then(() => {console.log('succefully written initial data')})
            .catch((errors) => console.log(errors)) 

}

export const addProduct = (productData, userId) => {
    let productCount
    fireDb.ref('products/' + userId).once('value')
    .then((snapshot) => {
        productCount = Object.keys(snapshot.val()).length
            fireDb.ref('products/' + userId + `/product_${productCount+1}`).set(productData)
            .then(() => dispatch =>{
                fireDb.ref('products/' + userId).on('value', 
                (data) => { 
                    dispatch(storeProductstoState(data.val()))
                })
                // console.log('succefully written')
            })
            .catch((errors) => console.log(errors)) 
    })
    .catch((errors) => {console.log(typeof errors)})

};

export const deleteProductFromDatabase = (productId, userId) => {
    console.log(productId, userId)
    fireDb.ref(`products/${userId}/${productId}`).remove( () => {console.log('deleted')})
}

// export const getProductList = (userId) => {
//     return new Promise( resolve => { 
//         fireDb.ref('products/' + userId).on('value', 
//             (data) => { 
//                 resolve(data.val())
//             })
//         })
//     // .then((data) => {console.log(data)})
//     // .catch((error) => {console.log(error)})
//     // console.log(dbData)
// }

export const getAndUpdateProductListDataToState = (userId) => dispatch => { 
    // console.log(userId)
    fireDb.ref('products/' + userId).on('value', 
    (data) => { 
        // console.log(data.val())
        dispatch(storeProductstoState(data.val()))
    })}

export const cleanProductList = () => dispatch =>{
    dispatch(cleanProductListAction())
}