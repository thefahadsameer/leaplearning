import { Link } from "react-router-dom";
import "./Turnkey.css";

function Turnkey() {
  return (
    <section className="turnkey-section">
      <div className="turnkey-overlay"></div>

      <div className="turnkey-container">
        <div className="turnkey-content">

          <p className="turnkey-small">
            From Planning To Execution
          </p>

          <h2 className="turnkey-title">
            Everything Is Structured <br />
            And Ready For You
          </h2>

          <p className="turnkey-subtext">
            Our academic consulting framework removes uncertainty,
            reduces manual effort, and delivers a clearly defined
            path from enrollment to successful completion.
          </p>

          <div className="turnkey-buttons">

            <Link to="/apply" className="btn-primary">
              Start Your Academic Journey
            </Link>

            <Link to="/contact" className="btn-outline">
              Speak With An Advisor
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Turnkey;
