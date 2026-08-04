import { useState } from "react";

function TournamentDetails({
  tournament,
  onBack,
  onRegister,
}) {

  const [registering, setRegistering] = useState(false);

  if (!tournament) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <h2 className="text-2xl">
          Tournament not found.
        </h2>
      </div>
    );
  }

  const handleRegister = async () => {

    setRegistering(true);

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/tournaments/register/${tournament.id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        alert("Registration failed.");
        setRegistering(false);
        return;
      }

      alert("Successfully Registered!");

      if (onRegister) {
        onRegister();
      }

    } catch (error) {

      alert("Server Error");

    }

    setRegistering(false);

  };

  return (

    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header */}

      <div className="bg-gray-800 shadow-lg">

        <div className="max-w-6xl mx-auto px-8 py-6">

          <h1 className="text-4xl font-bold text-yellow-400">

            Tournament Details

          </h1>

          <p className="text-gray-400 mt-2">

            View complete tournament information.

          </p>

        </div>

      </div>

      {/* Main Card */}

      <div className="max-w-5xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8">

          {tournament.name}

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>

            <h3 className="text-gray-400 mb-2">
              Organizer
            </h3>

            <p className="text-xl">
              {tournament.organizer}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Tournament Type
            </h3>

            <p className="text-xl">
              {tournament.tournament_type}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              City
            </h3>

            <p className="text-xl">
              {tournament.city}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Venue
            </h3>

            <p className="text-xl">
              {tournament.venue}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Start Date
            </h3>

            <p className="text-xl">
              {tournament.start_date}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              End Date
            </h3>

            <p className="text-xl">
              {tournament.end_date}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Start Time
            </h3>

            <p className="text-xl">
              {tournament.start_time}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Status
            </h3>

            <span
              className={`px-4 py-2 rounded-lg font-semibold ${
                tournament.status === "Open"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {tournament.status}
            </span>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Registered Players
            </h3>

            <p className="text-xl">
              {tournament.players} / {tournament.max_players}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400 mb-2">
              Available Seats
            </h3>

            <p className="text-xl text-green-400">
              {tournament.max_players - tournament.players}
            </p>

          </div>

        </div>
                {/* Tournament Summary */}

        <div className="mt-10 border-t border-gray-700 pt-8">

          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Tournament Summary
          </h3>

          <p className="text-gray-300 leading-8">

            This tournament is organized by{" "}
            <span className="font-semibold text-white">
              {tournament.organizer}
            </span>
            {" "}and will take place in{" "}
            <span className="font-semibold text-white">
              {tournament.city}
            </span>
            .

          </p>

          <p className="text-gray-300 mt-4 leading-8">

            Venue:

            <span className="text-white font-semibold">
              {" "}{tournament.venue}
            </span>

          </p>

          <p className="text-gray-300 mt-4 leading-8">

            Schedule:

            <span className="text-white font-semibold">

              {" "}
              {tournament.start_date}

              {" "}to{" "}

              {tournament.end_date}

            </span>

          </p>

          <p className="text-gray-300 mt-4 leading-8">

            Starting Time:

            <span className="text-white font-semibold">

              {" "}
              {tournament.start_time}

            </span>

          </p>

          <p className="text-gray-300 mt-4 leading-8">

            Registration Status:

            <span
              className={`ml-2 font-bold ${
                tournament.status === "Open"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {tournament.status}
            </span>

          </p>

        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-4 justify-end mt-12">

          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            Back
          </button>

          <button
            disabled={
              registering ||
              tournament.status !== "Open"
            }
            onClick={handleRegister}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              tournament.status === "Open"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >

            {registering
              ? "Registering..."
              : "Register"}

          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="text-center text-gray-500 py-8">

        © 2026 Online Chess Platform

      </div>

    </div>

  );
}

export default TournamentDetails;
