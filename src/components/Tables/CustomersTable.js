import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Delete } from "@material-ui/icons";
import DeleteCustomersDialog from "../Dialogs/CustomersPage/DeleteCustomersDialog";
import { addCustomer } from "../../services/CustomersService";

const useRowStyles = makeStyles({
  // table : {
  //   // marginTop : 30,
  //   // maxHeight: 500,
  //   height : 460
  // }
});

const CustomersTable = (props) => {
  const { useState } = React;
  const classes = useRowStyles();
  let [showDeleteCustomersDialog, setShowDeleteCustomersDialog] = useState(
    false
  );
  let [selectedRowData, setSelectedRowData] = useState([]);
  let [customersData, setCustomersData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    { title: "DOB", field: "dob", initialEditValue: "" },
    { title: "Phone number", field: "phno", initialEditValue: "" },
    { title: "Address", field: "address" },
    {
      title: "Proof",
      field: "proof",
      lookup: {
        1: "Voter ID",
        2: "Driving license",
        3: "Smart card",
        4: "Aadhar card",
      },
    },
    {
      title: "Id Number",
      field: "idNumber",
    },
  ]);

  const [data, setData] = useState([
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
    {
      name: "Madasami",
      phno: "8879864554",
      address: "23, mela masi street, kvp",
      proof: 1,
    },
    {
      name: "Sankar",
      phno: "7868768309",
      address: "1, north st., kvp",
      proof: 2,
    },
  ]);

  const { user, customers } = props;

  useEffect(() => {
    console.log(customers);
    if (customers) {
      setCustomersData(customers);
    }
  });

  const handleAddCustomer = (customer, resolve) => {
    console.log(customer);
    console.log("triggering");
    if (!customers) {
      console.log("1st customer");
      addCustomer(user.uid, customer, resolve);
    } else {
      console.log("next customers");
      console.log(customers);
      customers.push(customer);
      addCustomer(user.uid, customers, resolve);
    }
  };

  const handleDeleteRows = (event, rowData) => {
    setSelectedRowData(rowData);
    setShowDeleteCustomersDialog(true);
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
              handleAddCustomer(newData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
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
