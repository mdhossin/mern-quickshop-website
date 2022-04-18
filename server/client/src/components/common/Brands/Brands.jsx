import { brandsData } from "../../../utils/fakedata";

const Brands = () => (
  <section className="company">
    <div className="company__container container-div grid">
      {brandsData.map((brand, i) => (
        <div key={i}>
          <img src={brand.img} alt="company" />
        </div>
      ))}
    </div>
  </section>
);

export default Brands;
