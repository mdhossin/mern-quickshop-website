import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BsTrashFill } from "react-icons/bs";
import { BASE_URL } from "../../config";

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
            `${BASE_URL}/api/admin/delete/${id}`,
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
    </>
  );
};

export default UserListItem;
