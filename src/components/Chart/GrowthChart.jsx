import "./GrowthChart.css";

function GrowthChart() {
  return (
    <section className="growth-section">
      <div className="growth-container">

        <div className="growth-header">
          <h2>
            Academic Progress <br />
            Visualized Clearly
          </h2>

          <p>
            Structured academic planning enables consistent progress through
            clearly defined milestones and institution-aligned timelines.
          </p>
        </div>

        <div className="chart-area">
          <div className="bar-wrapper">
            <div className="bar bar-1"></div>
            <span>Phase 1</span>
          </div>

          <div className="bar-wrapper">
            <div className="bar bar-2"></div>
            <span>Phase 2</span>
          </div>

          <div className="bar-wrapper">
            <div className="bar bar-3"></div>
            <span>Phase 3</span>
          </div>

          <div className="bar-wrapper">
            <div className="bar bar-4"></div>
            <span>Phase 4</span>
          </div>

          <div className="bar-wrapper">
            <div className="bar bar-5"></div>
            <span>Phase 5</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GrowthChart;
