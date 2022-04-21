import { Helmet } from "react-helmet";
const NotFound = () => (
  <div className="notfound container-div">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Not - Found</title>
    </Helmet>
    <h1>404, Page Not Found!</h1>
  </div>
);

export default NotFound;
