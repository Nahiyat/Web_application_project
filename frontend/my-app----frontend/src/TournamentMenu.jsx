function TournamentMenu({
  onOffline,
  onOnline,
  onMyTournaments,
  onBack,
}) {
  return (
    <div className="min-h-screen .bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Header */}
      <header className="bg-gray-800 shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-yellow-400">
            Chess Tournaments
          </h1>

          <button
            onClick={onBack}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Back
          </button>

        </div>

      </header>

      {/* Title */}

      <div className="text-center mt-12">

        <h2 className="text-4xl font-bold">
          Choose Tournament Type
        </h2>

        <p className="text-gray-400 mt-3 text-lg">
          Join official FIDE tournaments or compete online.
        </p>

      </div>

      {/* Cards */}

      <div className="max-w-6xl mx-auto mt-14 px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Offline */}

          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 hover:scale-105 transition duration-300">

            <div className="text-6xl text-center">
              
            </div>

            <h2 className="text-2xl font-bold text-center text-yellow-400 mt-5">
              Offline Tournament
            </h2>

            <p className="text-center text-gray-300 mt-4">
              Browse official Bangladesh FIDE-rated chess tournaments.
            </p>

            <button
              onClick={onOffline}
              className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition"
            >
              Browse
            </button>

          </div>

          {/* Online */}

          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 hover:scale-105 transition duration-300">

            <div className="text-6xl text-center">
              🌐
            </div>

            <h2 className="text-2xl font-bold text-center text-yellow-400 mt-5">
              Online Tournament
            </h2>

            <p className="text-center text-gray-300 mt-4">
              Join tournaments hosted on the Online Chess Platform.
            </p>

            <button
              onClick={onOnline}
              className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition"
            >
              Browse
            </button>

          </div>

          {/* My Tournaments */}

          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 hover:scale-105 transition duration-300">

            <div className="text-6xl text-center">
              📋
            </div>

            <h2 className="text-2xl font-bold text-center text-yellow-400 mt-5">
              My Tournaments
            </h2>

            <p className="text-center text-gray-300 mt-4">
              View all tournaments you've registered for and track their status.
            </p>

            <button
              onClick={onMyTournaments}
              className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Open
            </button>

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="mt-16 text-center text-gray-500 text-sm pb-6">

        © 2026 Online Chess Platform build by Abd

      </footer>

    </div>
  );
}

export default TournamentMenu;
