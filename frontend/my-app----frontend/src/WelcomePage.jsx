import "./WelcomePage.css";

function WelcomePage({ onNext }) {
  return (
    <div className="welcome-page">
      {/* Dark overlay */}
      <div className="welcome-overlay"></div>

      {/* Content */}
      <div className="welcome-content">
        <h1>Welcome, Future Master of the Sixty-Four Squares</h1>

        <p>
          Challenge players worldwide, sharpen your strategy,
          and become a champion.
        </p>

        <button onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;