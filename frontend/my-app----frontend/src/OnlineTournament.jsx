import { useEffect, useState } from "react";

function OnlineTournament({ onBack, onViewDetails }) {
  const [tournaments, setTournaments] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // Load Online Tournaments
  // -----------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tournaments/online")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unable to load tournaments.");
        }
        return res.json();
      })
      .then((data) => {
        setTournaments(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // -----------------------------
  // Search Filter
  // -----------------------------
  useEffect(() => {
    let data = [...tournaments];

    if (search !== "") {
      data = data.filter(
        (tournament) =>
          tournament.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          tournament.organizer
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      data = data.filter(
        (tournament) => tournament.status === status
      );
    }

    setFiltered(data);
  }, [search, status, tournaments]);

  // -----------------------------
  // Register Tournament
  // -----------------------------
  const registerTournament = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tournaments/register/${id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        alert("Registration failed.");
        return;
      }

      alert("Successfully Registered!");

      const updated = await response.json();

      setTournaments((prev) =>
        prev.map((t) =>
          t.id === id ? updated : t
        )
      );
    } catch (err) {
      alert("Server Error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white text-2xl">
        Loading Online Tournaments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header */}
      <div className="bg-gray-800 px-8 py-6 shadow">

        <h1 className="text-3xl font-bold text-yellow-400">
          Online Chess Tournaments
        </h1>

        <p className="text-gray-400 mt-2">
          Join official online chess tournaments.
        </p>

      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto mt-8 bg-gray-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Search Tournament
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Search */}
          <div>

            <label className="block mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Tournament Name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
            />

          </div>

          {/* Status */}
          <div>

            <label className="block mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
            >
              <option>All</option>
              <option>Open</option>
              <option>Closed</option>
            </select>

          </div>

          {/* Tournament Count */}
          <div className="flex items-end">

            <div className="bg-yellow-500 text-black rounded-lg px-5 py-3 font-bold">
              {filtered.length} Tournament(s)
            </div>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto mt-8 bg-gray-800 rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-700">

            <tr>

              <th className="p-4">Tournament</th>

              <th className="p-4">Start Date</th>

              <th className="p-4">Time</th>

              <th className="p-4">Venue</th>

              <th className="p-4">Players</th>

              <th className="p-4">Status</th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>
                      {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-400"
                >
                  No tournaments found.
                </td>
              </tr>
            ) : (
              filtered.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-4 font-semibold">
                    {tournament.name}
                  </td>

                  <td className="p-4">
                    {tournament.start_date}
                  </td>

                  <td className="p-4">
                    {tournament.start_time}
                  </td>

                  <td className="p-4">
                    Online
                  </td>

                  <td className="p-4">
                    {tournament.players} / {tournament.max_players}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        tournament.status === "Open"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {tournament.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex gap-3 justify-center">

                      <button
                        onClick={() =>
                          onViewDetails(tournament)
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                      >
                        Details
                      </button>

                      <button
                        disabled={
                          tournament.status !== "Open"
                        }
                        onClick={() =>
                          registerTournament(
                            tournament.id
                          )
                        }
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          tournament.status === "Open"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                            : "bg-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Register
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="max-w-7xl mx-auto flex justify-between items-center mt-8 pb-10">

        <div className="text-gray-400">

          Total Online Tournaments:{" "}
          <span className="font-bold text-yellow-400">
            {filtered.length}
          </span>

        </div>

        <button
          onClick={onBack}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default OnlineTournament;  
