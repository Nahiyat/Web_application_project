import { useEffect, useState } from "react";

function OfflineTournament({ onBack }) {

    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/tournaments/offline")
            .then((response) => response.json())
            .then((data) => {
                setTournaments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

    return (

        <div className="min-h-screen bg-gray-900 text-white">

            <div className="bg-gray-800 p-6 flex justify-between">

                <h1 className="text-3xl font-bold text-yellow-400">
                    Offline FIDE Tournaments
                </h1>

                <button
                    onClick={onBack}
                    className="bg-red-500 px-5 py-2 rounded"
                >
                    Back
                </button>

            </div>

            <div className="p-8">

                {loading ?

                    <h2>Loading...</h2>

                    :

                    <table className="w-full bg-gray-800 rounded-xl">

                        <thead>

                            <tr className="bg-yellow-500 text-black">

                                <th className="p-3">Tournament</th>
                                <th>Start Date</th>
                                <th>Time</th>
                                <th>Venue</th>
                                <th>City</th>
                                <th>Players</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {tournaments.map((tournament) => (

                                <tr
                                    key={tournament.id}
                                    className="border-b border-gray-700 hover:bg-gray-700"
                                >

                                    <td className="p-3">
                                        {tournament.name}
                                    </td>

                                    <td>
                                        {tournament.start_date}
                                    </td>

                                    <td>
                                        {tournament.time}
                                    </td>

                                    <td>
                                        {tournament.venue}
                                    </td>

                                    <td>
                                        {tournament.city}
                                    </td>

                                    <td>
                                        {tournament.players}
                                    </td>

                                    <td>

                                        <button
                                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                                        >
                                            Register
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                }

            </div>

        </div>

    );

}

export default OfflineTournament;
