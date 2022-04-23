import { supportData } from "../../../utils/fakedata";

const SupportArea = () => (
  <section className="support section container-div">
    <div className="support__area grid">
      {supportData.map(({ id, title, desc, img }) => (
        <div key={id} className="support__area__item">
          <img className="support__area__item-img" src={img} alt="" />
          <div className="support__area__item__desc">
            <h4 className="support__area__item__desc-title">{title}</h4>
            <div className="support__area__item__desc-text">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default SupportArea;
