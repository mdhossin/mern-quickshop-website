import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="notfound container-div">
    <h1>404, Page Not Found!</h1>
    <Link to="/">
      <button className="button-back">Back to login</button>
    </Link>
  </div>
);

export default NotFound;
