import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "react-bootstrap";
import { BASE_URL } from "../../config";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useToasts();

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const { users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      navigate("/dashboard/users");
    }
  }, [users, id, navigate, userInfo?.access_token]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        setLoading(true);
        const res = await axios.patch(
          `${BASE_URL}/api/admin/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: userInfo.access_token },
          }
        );

        setError("");
        setSuccess(res.data.message);
        setNum(0);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setSuccess("");
      err.response &&
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setError("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      navigate("/dashboard/users");
    }
  }, [addToast, error, success, navigate]);

  return (
    <div className="profile_page edit_user">
      <div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          className="go_back"
        >
          <BsFillArrowLeftCircleFill /> Go Back
        </button>
      </div>

      <div className="col-left">
        <h2 className="edit">Edit User</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button
          style={{ width: "200px" }}
          className="button"
          onClick={handleUpdate}
        >
          {loading ? <Spinner animation="border" size="sm" /> : " Update"}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
