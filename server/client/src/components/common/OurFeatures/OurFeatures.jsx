import { featuresData } from "../../../utils/fakedata";

const OurFeatures = () => (
  <div className="features">
    <div className="features__container container-div">
      <h3>OUR FEATURES</h3>
      <p className="features__container-text">
        Handpicked electronics, crisp, clear audio, powerbeats pro, apple
        airpods, wireless plans
      </p>
      <div className="features__container__items grid">
        {featuresData.map((item) => (
          <div key={item.id} className="features__container__items__item">
            <span>{item.img}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OurFeatures;
