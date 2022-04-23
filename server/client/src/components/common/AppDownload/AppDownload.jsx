import { appOne, appTwo } from "../../../assets";

const AppDownload = () => (
  <section>
    <div className="download">
      <div className="container-div download__container">
        <p className="download__container-desc">
          App download and buy 25% OFF !
        </p>
        <div>
          <img src={appOne} alt="" />
          <img src={appTwo} alt="" />
        </div>
      </div>
    </div>
  </section>
);

export default AppDownload;
