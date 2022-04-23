import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "../../components/UserListItem/UserListItem";
import { userList } from "../../redux/actions/userActions";
import { Spinner } from "react-bootstrap";
import Profile from "../../components/Profile/Profile";

const UserList = () => {
  const dispatch = useDispatch();

  const [callback, setCallback] = useState(false);

  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch, callback, userInfo?.access_token]);
  return (
    <>
      <Profile />
      <hr />
      <div className="profile__admin">
        <div className="profile__admin__users">
          <h2 className="profile__admin__users-title">Users</h2>

          {loading ? (
            <Spinner
              style={{ marginLeft: "50%", marginTop: "5%" }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <h2
              style={{ color: "#333", fontWeight: "500", textAlign: "center" }}
            >
              {error}
            </h2>
          ) : (
            <UserListItem
              callback={callback}
              setCallback={setCallback}
              users={users}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
