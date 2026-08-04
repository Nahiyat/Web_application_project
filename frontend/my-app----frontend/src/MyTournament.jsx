import { useEffect, useState } from "react";

function MyTournament({
  onBack,
  onViewDetails,
}) {

  const [tournaments, setTournaments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // -----------------------------
  // Load My Registered Tournaments
  // -----------------------------
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/tournaments/my")

      .then((res) => {

        if (!res.ok) {
          throw new Error(
            "Unable to load your tournaments."
          );
        }

        return res.json();

      })

      .then((data) => {

        setTournaments(data);

        setLoading(false);

      })

      .catch((err) => {

        setError(err.message);

        setLoading(false);

      });

  }, []);

  // -----------------------------
  // Cancel Registration
  // -----------------------------
  const cancelRegistration = async (id) => {

    const confirmCancel = window.confirm(
      "Cancel this registration?"
    );

    if (!confirmCancel) return;

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/api/tournaments/cancel/${id}`,

        {
          method: "DELETE",
        }

      );

      if (!response.ok) {

        alert("Unable to cancel.");

        return;

      }

      setTournaments((prev) =>
        prev.filter((t) => t.id !== id)
      );

      alert("Registration Cancelled.");

    } catch (err) {

      alert("Server Error");

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white text-2xl">

        Loading Your Tournaments...

      </div>

    );

  }

  if (error) {

    return (

      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-red-400 text-xl">

        {error}

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header */}

      <div className="bg-gray-800 shadow">

        <div className="max-w-7xl mx-auto px-8 py-6">

          <h1 className="text-3xl font-bold text-yellow-400">

            My Tournaments

          </h1>

          <p className="text-gray-400 mt-2">

            View all tournaments you have registered for.

          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="max-w-7xl mx-auto mt-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-800 rounded-xl p-6">

            <h3 className="text-gray-400">

              Registered

            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-3">

              {tournaments.length}

            </p>

          </div>

          <div className="bg-gray-800 rounded-xl p-6">

            <h3 className="text-gray-400">

              Upcoming

            </h3>

            <p className="text-4xl font-bold text-green-400 mt-3">

              {
                tournaments.filter(
                  (t) => t.status === "Open"
                ).length
              }

            </p>

          </div>

          <div className="bg-gray-800 rounded-xl p-6">

            <h3 className="text-gray-400">

              Finished

            </h3>

            <p className="text-4xl font-bold text-red-400 mt-3">

              {
                tournaments.filter(
                  (t) => t.status !== "Open"
                ).length
              }

            </p>

          </div>

        </div>

      </div>

      {/* Tournament Table */}

      <div className="max-w-7xl mx-auto mt-8 bg-gray-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-700">

            <tr>

              <th className="text-left p-4">

                Tournament

              </th>

              <th className="text-left p-4">

                Date

              </th>

              <th className="text-left p-4">

                City

              </th>

              <th className="text-left p-4">

                Status

              </th>

              <th className="text-center p-4">

                Action

              </th>

            </tr>

          </thead>

          <tbody>
                    {tournaments.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center py-8 text-gray-400"
              >
                You haven't registered for any tournaments yet.
              </td>

            </tr>

          ) : (

            tournaments.map((tournament) => (

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
                  {tournament.city}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      tournament.status === "Open"
                        ? "bg-green-600"
                        : tournament.status === "Completed"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    }`}
                  >
                    {tournament.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onViewDetails(tournament)
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      View Details
                    </button>

                    {tournament.status === "Open" && (

                      <button
                        onClick={() =>
                          cancelRegistration(
                            tournament.id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>

                    )}

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

          Registered Tournament(s):

          <span className="ml-2 text-yellow-400 font-bold">

            {tournaments.length}

          </span>

        </div>

        <button
          onClick={onBack}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
        >
          Back
        </button>

      </div>

    </div>

  );
}

export default MyTournament;
