import { useNavigate } from "react-router-dom";

function PlayerDashboard({ user }) {
  const navigate = useNavigate();
  
  const playerName = user?.name || "Player";

  const menuItems = [
    {
      title: "Play with Players",
      description: "Challenge players from around the world.",
      button: "Play Now",
    },
    {
      title: "Play with Friend",
      description: "Invite your friends for a private match.",
      button: "Invite Friend",
    },
    {
      title: "Tournament",
      description: "Join exciting online tournaments.",
      button: "Join Tournament",
    },
    {
      title: "Match History",
      description: "View all your previous matches.",
      button: "View History",
    },
    {
      title: "Rankings",
      description: "See your position on the leaderboard.",
      button: "View Rankings",
    },
    {
      title: "Profile",
      description: "Update your profile information.",
      button: "Open Profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-3xl font-bold text-yellow-400">
            Online Chess Platform
          </h1>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Logged in as
            </p>

            <p className="text-lg font-semibold">
              {playerName}
            </p>
          </div>

        </div>
      </header>

      {/* Welcome Section */}
      <section className="text-center py-10">

        <h2 className="text-4xl font-bold">
          Welcome,
          <span className="text-yellow-400"> {playerName}</span>
        </h2>

        <p className="text-gray-400 mt-3">
          Choose an option below to start your next chess adventure.
        </p>

      </section>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-8 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-300"
            >

              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                {item.title}
              </h3>

              <p className="text-gray-300 mb-6">
                {item.description}
              </p>

              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
              >
                {item.button}
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-8 pb-12">

        <h2 className="text-2xl font-bold mb-6">
          Quick Statistics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-yellow-400 text-3xl font-bold">1250</h3>
            <p className="text-gray-400 mt-2">Rating</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-green-400 text-3xl font-bold">42</h3>
            <p className="text-gray-400 mt-2">Wins</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-red-400 text-3xl font-bold">18</h3>
            <p className="text-gray-400 mt-2">Losses</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-blue-400 text-3xl font-bold">8</h3>
            <p className="text-gray-400 mt-2">Draws</p>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8">

          <p className="text-gray-500 text-sm">
            © 2026 Online Chess Platform
          </p>

          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
            onClick={() => {localStorage.removeItem("token"), localStorage.removeItem("user");
              navigate("/login");
              }}>
            Logout
          </button>

        </div>

      </footer>

    </div>
  );
}

export default PlayerDashboard;
