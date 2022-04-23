import { iphone } from "../../../assets";

const Iphone = () => (
  <section className="iphone-section">
    <h2 className="title">iPhone 11 Pro</h2>
    <div className="iphone">
      <div className="container-div iphone__container grid">
        <div className="iphone__left grid">
          <div className="end">
            <h4>Design</h4>
            <p>
              Four new textured matt lass finishes, 5.8 inches or 6.5 inches
              Super Retina XDR display. And the toughest glass in a smartphone.
            </p>
          </div>
          <div>
            <h4>4K Video</h4>
            <p>
              Shoot 4K video with extended dynamic range at 60 fps. Capture four
              times more scene. And edit with new tools like rotate, crop and
              filters
            </p>
          </div>
        </div>
        <div className="iphone__middle">
          <img src={iphone} alt="" />
        </div>
        <div className="iphone__right grid">
          <div className="end">
            <h4>Night Mode</h4>
            <p>
              From dimly lit restaurants to sunsets on the beach, the new Night
              mode delivers natural low-light shots - automatically
            </p>
          </div>
          <div>
            <h4>Privacy</h4>
            <p>
              Face ID is the most secure facial authentication in a smartphone.
              And it doesn't sore or share your photo. Because with iPhone, your
              privacy comes irst.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Iphone;
