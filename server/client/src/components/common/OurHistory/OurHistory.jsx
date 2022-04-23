import ourHistory from "../../../assets/images/our-history.jpg";

const OurHistory = () => (
  <div className="history grid container-div">
    <img className="history__img" src={ourHistory} alt="" />
    <div className="history__content grid">
      <div className="history__content__text">
        <h5>OUR SAMRAL HISTORY</h5>
        <h2>Setting Industry Standards</h2>
        <p>
          Fixo vultus campos. Sua quoque utramque convexi inter phoebe
          instabilis. Zonae utramque dominari orbe orba speciem sidera origo
          iners? Cognati caeli litem arce subsidere ventis foret. Regna ad
          porrexerat. Diversa utramque discordia quisquis. Densior mollia inter
          totidemque temperiemque mixta proximus quia flexi conversa.
        </p>
      </div>

      <div className="history__content__customer">
        <h1>18,452</h1>
        <h6>CUSTOMERS​</h6>
        <p>Satisfied customers worldwide and growing</p>
      </div>
    </div>
  </div>
);

export default OurHistory;
