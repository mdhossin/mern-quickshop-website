import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BsTrashFill } from "react-icons/bs";

const UserListItem = ({ users, setCallback, callback }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const { addToast } = useToasts();

  const auth = useSelector((state) => state.userLogin?.userInfo);
  const token = useSelector((state) => state.userLogin?.userInfo?.access_token);

  const handleDelete = async (id) => {
    try {
      if (auth?.user?._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          const { data } = await axios.delete(
            `https://mern-quickshop-web-app.herokuapp.com/api/admin/delete/${id}`,
            {
              headers: { Authorization: token },
            }
          );

          setCallback(!callback);
          setSuccess(data.message);
          setErrorMessage("");
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      setSuccess("");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      addToast(errorMessage, { appearance: "error", autoDismiss: true });
    } else if (success) {
      addToast(success, { appearance: "success", autoDismiss: true });
    }
  }, [errorMessage, success, addToast]);

  return (
    <>
      <div className="table__container" style={{ overflowX: "auto" }}>
        <table className="table__container__table">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td data-aria-label="Id">{user._id}</td>
                  <td data-aria-label="Name"> {user.name} </td>

                  <td data-aria-label="Email">{user.email}</td>
                  <td data-aria-label="Admin">
                    {" "}
                    {user.role === 1 ? (
                      <AiOutlineCheck
                        style={{ color: "green", fontSize: "17px" }}
                      />
                    ) : (
                      <span style={{ color: "green" }}> ❌ </span>
                    )}{" "}
                  </td>

                  <td data-aria-label="Action" className="action">
                    <Link
                      title="edit user"
                      to={`/dashboard/edit_user/${user._id}`}
                    >
                      <FiEdit className="edit" title="Edit" />
                    </Link>

                    <BsTrashFill
                      className="remove"
                      title="Remove User"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* <div className="row">
        <div className="col-12">
          <Table striped bordered hover size="md" responsive>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>

                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th scope="col">*</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td> {user.name} </td>

                    <td>
                      <a href={`mailto:${user.email}`}> {user.email} </a>{" "}
                    </td>
                    <td>
                      {" "}
                      {user.role === "admin" ? (
                        <span style={{ color: "green" }}> ✔ </span>
                      ) : (
                        <span style={{ color: "green" }}> ❌ </span>
                      )}{" "}
                    </td>

                    <td>
                      <Link title="edit user" to={`/admin/edit/${user._id}`}>
                        <button className="btn btn-sm btn-info">
                          <i className="fa fa-edit"></i>
                        </button>
                      </Link>
                      <button
                        title="delete user"
                        className="btn btn-sm btn-danger ml-1"
                        //   onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div> */}
    </>
  );
};

export default UserListItem;
