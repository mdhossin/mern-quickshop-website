const NewsLetter = () => (
  <section className="newsletter">
    <div className="newsletter__container container-div">
      <div className="newsletter__container__desc">
        <p>Subscribe to our mailing list and get</p>
        <h1>
          <span>10% Off </span> Your First <br /> Order!
        </h1>
      </div>
      <div className="newsletter__container__content">
        <div className="newsletter__container__content__inputs">
          <input type="email" name="email" id="" placeholder="Your email" />
          <button className="button">Subscribe</button>
        </div>

        <p>
          Samral will use your e-mail to be in touch with you regarding product
          updates, exclusive offers and other relevant marketing!
        </p>
      </div>
    </div>
  </section>
);

export default NewsLetter;
