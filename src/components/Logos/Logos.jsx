import "./Logos.css";

import euroAsian from "../../assets/logos/euro-asian.png";
import centralGlobal from "../../assets/logos/central-global.png";
import kennedyBaptist from "../../assets/logos/kennedy-baptist.png";


function Logos() {
  return (
    <section className="logos-section">
      <div className="logos-container">

        <p className="logos-text">
          Recognized & Associated With Institutions Worldwide
        </p>

        <div className="logos-row">

          <div className="logo-item">
            <img src={euroAsian} alt="Euro Asian University" />
          </div>

          <div className="logo-item">
            <img src={centralGlobal} alt="Central Global University" />
          </div>

          <div className="logo-item">
            <img src={kennedyBaptist} alt="Kennedy University of Baptist" />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Logos;
