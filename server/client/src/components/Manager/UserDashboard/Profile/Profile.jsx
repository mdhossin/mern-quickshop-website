import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isLength, isMatch } from "../../../../utils/validation";
import UserList from "../../AdminDashboard/UserList/UserList";
import { Loader } from "../../../../components";

const Profile = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
    cf_password: "",
    error: "",
    success: "",
  });

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const { addToast } = useToasts();
  const auth = useSelector((state) => state.userLogin?.userInfo);
  const token = useSelector((state) => state.userLogin.userInfo?.access_token);
  const { user } = auth;

  const { name, password, cf_password, error, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          error: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, error: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          error: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(
        "https://mern-camera-shop.herokuapp.com/api/upload_image",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setAvatar(res.data.url);
      setData({ ...data, success: res.data.message, error: "" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "https://mern-camera-shop.herokuapp.com/api/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, error: "", success: "Updated Success!" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        error: "Password did not match.",
        success: "",
      });

    try {
      axios.post(
        "https://mern-camera-shop.herokuapp.com/api/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, error: "", success: "Updated Success!" });
    } catch (error) {
      setData({
        ...data,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        success: "",
      });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
      setData({
        name: "",
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
      setData({
        name: "",
        password: "",
        cf_password: "",
        error: "",
        success: "",
      });
    }
  }, [error, success, addToast]);

  return (
    <section className="profile container-div">
      <h3 className="profile__title">
        {user?.role === "admin" ? "Admin Profile" : "Account Details"}
      </h3>

      <div className="profile__container grid">
        <div className="profile__container__img">
          {loading ? (
            <div>
              <Loader inline backdrop />
            </div>
          ) : (
            <img src={avatar ? avatar : user.avatar} alt="logo" />
          )}
          <span>
            <AiOutlineCamera />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="profile__container__info">
          <div className="profile__container__info-name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Your name"
              onChange={handleChange}
            />
          </div>
          <div className="profile__container__info-email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your email address"
              disabled
            />
          </div>
        </div>

        <div className="profile__container__password">
          {user.type !== "register" && (
            <small className="profile__container__password-warning">
              * Quick login account with {user.type} can't use this function *
            </small>
          )}
          <div className="profile__container__password-pass">
            <label htmlFor="password">Password</label>
            <input
              type={typePass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
              disabled={user.type !== "register"}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>
          <div className="profile__container__password-confirm">
            <label htmlFor="password">Confirm Password</label>
            <input
              type={typeCfPass ? "text" : "password"}
              name="cf_password"
              id="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              onChange={handleChange}
              disabled={user.type !== "register"}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>
        </div>
      </div>

      <div className="profile__button">
        <button
          type="submit"
          className="button"
          disabled={loading}
          onClick={handleUpdate}
        >
          Save Changes
        </button>
      </div>
      {token && user.role === 1 && <UserList />}
    </section>
  );
};

export default Profile;
