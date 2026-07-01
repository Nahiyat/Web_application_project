function WelcomePage({ onNext }) {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="bg-black/60 p-10 rounded-xl text-center text-white">
        <h1 className="text-5xl font-bold mb-6">
          Welcome, Future Master of the Sixty-Four Squares
        </h1>

        <p className="text-lg mb-8">
          Challenge players, improve your strategy, and become a champion.
        </p>

        <button
          onClick={onNext}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition duration-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;