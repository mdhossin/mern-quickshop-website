const UserInfo = ({ userInfo }) => (
  <div className="user-info">
    <div className="user-info__img">
      <img src={userInfo?.user?.avatar} alt="" />
    </div>
    <div className="user-info__name">
      <span>{userInfo?.user?.name}</span>
    </div>
  </div>
);

export default UserInfo;
