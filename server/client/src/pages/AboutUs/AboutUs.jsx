import {
  AppDownload,
  Footer,
  NewsLetter,
  OurFeatures,
  OurHistory,
} from "../../components";
import { Helmet } from "react-helmet";
const AboutUs = () => (
  <section>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About</title>
    </Helmet>
    <div className="about">
      <div className="about__home">
        <div className="about__home__desc container-div grid">
          <div>
            <h3>About Us</h3>
            <p>
              Squid wayfarers next level, lumbersexual before they sold out
              gluten-free leg gings blog tote bag Helvetica. Art party pork
              belly fingerstache tattooed tumblr, Williamsburg you probably
              haven’t heard of them wolf moon flannel Cornhole kogi bespoke
              skateboard scenester.
            </p>
          </div>
        </div>
      </div>
    </div>

    <OurHistory />
    <OurFeatures />
    <NewsLetter />
    <AppDownload />
    <Footer />
  </section>
);

export default AboutUs;
