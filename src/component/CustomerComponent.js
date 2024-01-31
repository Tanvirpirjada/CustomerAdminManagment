import React, { useEffect, useState } from "react";
import "./customer.css";
import { deleteMapping, getMapping, postMapping, putMapping } from "./Config";

export default function CustomerComponent() {
  const [id, setId] = useState(null);
  const [addBtn, setAddBtn] = useState(false);
  let resetValues = {
    id: "",
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    state: "",
    email: "",
    phone_number: "",
  };
  const [addUser, setAddUser] = useState(resetValues);
  const [customerByName, setCustomerByName] = useState(null);
  const [customer, setcustomer] = useState([]);

  useEffect(() => {
    getFunction();
  }, []);

  async function getFunction() {
    try {
      let detail = await getMapping("getcustomerlist");
      setcustomer(detail);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function searchUser() {
    console.log(customerByName);
    if (customerByName && customerByName !== "") {
      try {
        let detail = await getMapping(`searchCustomer/${customerByName}`);
        setcustomer(detail);
      } catch (error) {
        console.error("Error searching user:", error);
      }
    } else {
      getFunction();
    }
  }

  async function handleAddUser(addUser) {
    console.log(addUser);
    if (addBtn) {
      try {
        let detail = await postMapping({
          url: "createcustomer",
          body: addUser,
        });

        // Call getFunction after successful response
        if (detail) {
          getFunction();
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      try {
        let detail = await putMapping({
          url: `updatecustomer`,
          body: addUser,
        });

        // Call getFunction after successful response
        if (detail) {
          getFunction();
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  }

  const resetUserList = () => {
    getFunction();
    setCustomerByName("");
  };

  const editUser = (userDetails) => {
    setAddBtn(false);
    setAddUser(userDetails);
    setId(userDetails.userId);
  };

  async function deleteUser(id) {
    try {
      await deleteMapping(`${id}`);
      getFunction();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <diV>
          <div className="mb-3">
            <h2>Customer Management</h2>
          </div>

          <div className="mb-3 navbar-user">
            <div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name or Email"
                  value={customerByName}
                  onChange={(e) => setCustomerByName(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    
                    className="btn btn-info mx-2"
                    type="button"
                    onClick={searchUser}
                  >
                    Search
                  </button>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn btn-success mx-2"
                    type="button"
                    onClick={resetUserList}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#addCustomer"
              className="btn btn-primary m-2"
              onClick={() => setAddBtn(true)}
            >
              Add Customer
            </button>
            <div
              class="modal fade"
              id="addCustomer"
              tabindex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {addBtn ? "Add Customer" : "Edit User"}
                    </h5>
                    <button
                      type="button"
                      onClick={() => setAddUser(resetValues)}
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">First Name</label>
                      <input
                        className="form-control"
                        value={addUser.first_name}
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            first_name: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Last Name</label>
                      <input
                        value={addUser.last_name}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            last_name: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        value={addUser.street}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            street: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">City</label>
                      <input
                        value={addUser.city}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            city: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">State</label>
                      <input
                        value={addUser.state}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            state: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        value={addUser.email}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            email: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        value={addUser.phone_number}
                        className="form-control"
                        onChange={(e) =>
                          setAddUser((prevInfo) => ({
                            ...prevInfo,
                            phone_number: e.target.value,
                          }))
                        }
                      ></input>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => setAddUser(resetValues)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => handleAddUser(addUser)}
                    >
                      {addBtn ? "Save" : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>S.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th colSpan={2} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer &&
                    customer.map((user, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.street}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#addCustomer"
                            className="btn btn-danger mr-2 mx-2"
                            onClick={() => editUser(user)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </diV>
      </div>
    </div>
  );
}
