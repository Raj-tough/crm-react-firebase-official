import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Delete } from "@material-ui/icons";
import DeleteCustomersDialog from "../Dialogs/CustomersPage/DeleteCustomersDialog";
import {addCustomer} from "../../services/CustomersService";
import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

let newCustomerPhno = ''
let newCustomerAddress = ''

const useRowStyles = makeStyles({
  // table : {
  //   // marginTop : 30,
  //   // maxHeight: 500,
  //   height : 460
  // }
  MapIconAddressBar : {
    display : 'flex',
    flexDirection : 'row'
  }
});

const CustomersTable = (props) => {
    const { useState } = React;
    const classes = useRowStyles();
    let [ showDeleteCustomersDialog, setShowDeleteCustomersDialog] = useState(false)
    let [selectedRowData, setSelectedRowData] = useState([])
    let [customersData, setCustomersData] = useState([])

    const handleChange = (event) => {
      console.log(event)
    }
    const onHandleOpenMapDialog = () => {
      console.log('open map dialog')
    }

    const onHandleUpdateNewCustomerAddress = (event) => {
      console.log(event.target.value)
      newCustomerAddress = event.target.value
    }
    const onHandleUpdateNewCustomerPhno = (event) => {
      console.log(event.target.value)
      newCustomerPhno = event.target.value
    }

    const [columns, setColumns] = useState([
      { title: 'Name', field: 'name', cellStyle : {maxWidth : 150} },
      { title: 'DOB', field: 'dob', type : 'date', cellStyle : {maxWidth : 40}},
      { title: 'Phone number', field: 'phno',
        editComponent : props => (
          <PhoneInput
            country={'in'}
            preferredCountries = {['in', 'us']}
            placeholder	={''}
            // containerStyle = {{width : 40}}
            onBlur={ onHandleUpdateNewCustomerPhno}
          />
        )
      },
      { title: 'Address', field: 'address',
        editComponent: props => (
          <div className = {classes.MapIconAddressBar}>
            <TextField required id="standard-required"  onBlur = {onHandleUpdateNewCustomerAddress} value = {props.address}/>
            {/* <IconButton color="primary" aria-label="upload picture" component="span" onClick = {onHandleOpenMapDialog}>
              <LocationOnIcon />
            </IconButton> */}
          </div>
        )
      },
      {
        title: 'Proof',
        field: 'proof',
        lookup: { 0: 'Voter ID', 1: 'Driving license', 2: 'Smart card', 3 : 'Aadhar card' },
      },
      {
        title: 'Id Number',
        field: 'idNumber',
      },
    ]);
  
    const [data, setData] = useState([
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
      { name: 'Madasami', phno: '8879864554', address: '23, mela masi street, kvp', proof: 1 },
      { name: 'Sankar', phno: '7868768309', address: '1, north st., kvp', proof: 2 },
    ]);

  const { user, customers } = props;

    useEffect(() => {
      console.log(customers)
      if (customers) {
        setCustomersData(customers)
      }
    }, [customers])

    const handleAddCustomer = (customer, resolve) => {
      console.log(customer)
      let dob = customer.dob ? customer.dob : ""
      if (dob) {
        const month = dob.getMonth()+1 >=10 ? dob.getMonth()+1 : `0${dob.getMonth()+1}`
        const date = dob.getDate() >=10 ? dob.getDate() : `0${dob.getDate()}`
        const formattedDob = `${dob.getFullYear()}-${month}-${date}`
        customer.dob = formattedDob
      }
      customer = {...customer, phno : newCustomerPhno, address : newCustomerAddress}
      console.log(customer)
      if (!customers) {
        addCustomer(user.uid, customer, resolve)
      } else {
        customers.push(customer)
        addCustomer(user.uid, customers, resolve)
      }
    }

    const handleEditCustomer = (oldCustomer, editedCustomer, resolve) => {
      console.log('old Customer', oldCustomer)
      editedCustomer.phno = newCustomerPhno
      editedCustomer.address = newCustomerAddress
      console.log('new customer', editedCustomer)
      console.log(customers)


    }

    const handleDeleteRows = (event, rowData) => {
      setSelectedRowData(rowData)
      setShowDeleteCustomersDialog(true)
    };

  const cbForDeleteCustomers = () => {
    // console.log(rowData)
    // let _data = [...data];
    // rowData.forEach(rd => {
    //   _data = _data.filter(t => t.tableData.id !== rd.tableData.id);
    // });
    // setData(_data);
  };
  const cbForCloseDeleteCustomersDialog = () => {
    setShowDeleteCustomersDialog(false);
  };

  return (
    <div className={classes.table}>
      {showDeleteCustomersDialog ? (
        <DeleteCustomersDialog
          selectedRowData={selectedRowData}
          cbForDeleteCustomers={cbForDeleteCustomers}
          cbForCloseDeleteCustomersDialog={cbForCloseDeleteCustomersDialog}
        />
      ) : null}
      <MaterialTable
        title="Customers"
        columns={columns}
        data={customersData}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleAddCustomer(newData, resolve)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleEditCustomer(oldData, newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
        options={{
          // pageSize:40,  --> Initial page size.
          pageSizeOptions: [5, 10, 20, 30, 50, 100],
          maxBodyHeight: 470,
          selection: true,
          rowStyle: (rowData, index, level) => ({
            backgroundColor: index % 2 === 0 ? "#EEE" : "white",
          }),
          actionsColumnIndex: -1,
          headerStyle: { backgroundColor: "#18de99", fontWeight: "bold" },
          exportButton: true,
          // emptyRowsWhenPaging: false,
          exportAllData: true,
        }}
        actions={[
          {
            icon: () => <Delete />,
            tooltip: "Delete Rows",
            onClick: handleDeleteRows,
          },
        ]}
      />
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    customers: state.customersReducer.customers,
  };
}
export default connect(mapStateToProps)(CustomersTable);
